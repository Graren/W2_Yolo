import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from '../css/components/home';
import axios from 'axios';
import _ from 'lodash';
const cx = classNames.bind(styles);
import NumberFormat from 'react-number-format';

class ClientHome extends Component {

  constructor(props) {
    super(props);
    this.state = {
      restaurants: {},
      cart: {},
    }
  }

  componentDidMount() {
    axios.get('/api/dish')
      .then(res => {
        const restaurants = _.groupBy(res.data, dish => dish.restaurant.name);
        this.setState({restaurants});
      })
      .catch(console.log)
  }

  buy = (total) => {
    axios.post('/api/order', {total, items: _.map(this.state.cart, dish => dish)})
      .then(res => {
        alert('Order Completed');
        this.setState({cart: {}});
      })
      .catch(console.log)
  }

  reduceDishQuantity = (dishId) => {
    this.setState(state => {
      const newQuantity = (state.cart[dishId] && state.cart[dishId].quantity) ? state.cart[dishId].quantity - 1  : 1;
      const dish = {
        [dishId]: Object.assign({}, state.cart[dishId], { quantity: newQuantity }),
      }
      const cart = newQuantity > 0 ? Object.assign({}, state.cart, dish) : _.omit(state.cart, dishId);
      const newState = Object.assign({}, state, { cart })
      return newState;
    })
  }


  addDishToCart = (dish) => {
    this.setState(state => {
      const newQuantity = (state.cart[dish._id] && state.cart[dish._id].quantity) ? state.cart[dish._id].quantity + 1  : 1;
      const cart = Object.assign({}, state.cart, {
        [dish._id]: Object.assign({}, state.cart[dish._id], {
          name: dish.name,
          dish: dish._id,
          restaurant: dish.restaurant._id,
          price: dish.price,
          quantity: newQuantity,
        })
      })
      const newState = Object.assign({}, state, { cart })
      return newState;
    })
  }

  render() {
    const { user } = this.props;
    const { restaurants, cart } = this.state;
    const cartTotal = _.reduce(cart, (sum, dish) => sum + dish.price * dish.quantity, 0);
    return (
      <div style={{display: 'flex'}}>
        <div>
          {_.map(restaurants, (dishes, name) => (
            <div key={name} className={cx('restaurant-menu')}>
              <div style={{display: 'flex'}}>
                <img
                  className={cx('restaurant-img')}
                  src="https://d30y9cdsu7xlg0.cloudfront.net/png/6564-200.png"
                  width={90}
                  height={90}
                />
                <div>
                  <h2>Restaurant {name}</h2>
                  <h3 style={{color: 'grey'}}>Menu</h3>
                </div>
              </div>
              <div>
                {dishes.map(dish => (
                  <div className={cx('menu-dish')}>
                    <h4 style={{margin: '0 0 10px 0'}}>{dish.name} - {<NumberFormat value={dish.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />}</h4>
                    <button className={cx('button')} onClick={() => this.addDishToCart(dish)}>Add to Cart</button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className={cx('cart')}>
          <h1>Cart</h1>
          <div style={{width: '100%'}}>
            {_.map(cart, (dish, id) => (
              <div className={cx('menu-dish')} style={{display: 'flex'}}>
                <h4 style={{margin: '0 0 10px 0', flex: 1}}>
                  <span style={{color: '#0F9D58'}}>{dish.quantity} X </span>
                  <span>{dish.name} - </span>
                  <NumberFormat value={dish.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                </h4>
                <button className={cx('reduce-quantity-btn')} onClick={() => this.reduceDishQuantity(id)}>-</button>
              </div>
            ))}
          </div>
          <h2>
            <span>Total: </span>
            <NumberFormat
              value={cartTotal}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'$'}
              decimalPrecision={2}
            />
            <button className={cx('button')} onClick={() => this.buy(cartTotal)}>Buy</button>
          </h2>
        </div>
      </div>
    );
  }
}

ClientHome.propTypes = {

};

function mapStateToProps(state) {
  return {
    user: state.user.user
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps)(ClientHome);
