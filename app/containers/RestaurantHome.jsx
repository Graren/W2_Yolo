import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import CurrencyInput from 'react-currency-input';
import styles from '../css/components/home';
import axios from 'axios';

const cx = classNames.bind(styles);

class RestaurantHome extends Component {

  updateDish = (dishId, i) => {
    const name = this.dishRefs[i].name.value;
    const price = Number(this.dishRefs[i].price.getMaskedValue().replace(/(,|\$)/ig, ''));
    axios.put(`api/dish/${dishId}`, {name, price})
      .then(console.log)
      .catch(console.log)
  }

  render() {
    const { user, dishes } = this.props;
    this.dishRefs = Array(dishes.length);
    console.log(this.dishRefs)
    return (
      <div className={cx()}>
        <div style={{display: 'flex'}}>
          <img
            className={cx('restaurant-img')}
            src="https://image.freepik.com/free-icon/restaurant-cutlery-circular-symbol-of-a-spoon-and-a-fork-in-a-circle_318-61086.jpg"
            width={90}
            height={90}
          />
          <div>
            <h2>Restaurant {user.name}</h2>
            <h3 style={{color: 'grey'}}>Create your Menu</h3>
          </div>
        </div>
        <div style={{display: 'flex'}}>
          <div className={cx('new-dish')}>
            <h3>Add a new dish</h3>
            <form>
              <div className={cx('flex-col')}>
                <label for="name" className={cx('input-label')}>Name</label>
                <input label="name" type="text" placeholder="Spaghetti" className={cx('input')} />
              </div>
              <div style={{marginTop: '10px'}} className={cx('flex-col')}>
                <label className={cx('input-label')}>Price</label>
                <CurrencyInput prefix="$" className={cx('input')} />
              </div>
              <input
                className={cx('button')}
                type="submit"
                value="Add Dish"
               />
            </form>
          </div>
          <div className={cx('dishes-list')}>
            {dishes && dishes.map((dish, key) => (
              <div key={key} className={cx('dish')}>
                <img
                  className={cx('restaurant-img')}
                  src="https://d30y9cdsu7xlg0.cloudfront.net/png/12611-200.png"
                  width={90}
                  height={90}
                />
                <div>
                  <div className={cx('flex-col')}>
                    <label for="name" className={cx('input-label')}>Name</label>
                    <input
                      label="name"
                      type="text"
                      key={key}
                      placeholder="Spaghetti"
                      className={cx('input')}
                      ref={ref => {
                        if(ref) {
                          ref.value = ref.value ? ref.value : dish.name;
                          this.dishRefs[key] = Object.assign({}, this.dishRefs[key], {name: ref});
                        }
                      }}
                    />
                  </div>
                  <div style={{marginTop: '10px'}} className={cx('flex-col')}>
                    <label className={cx('input-label')}>Price</label>
                    <CurrencyInput
                      prefix="$"
                      key={key}
                      className={cx('input')}
                      value={dish.price}
                      ref={ref => {
                        if(ref) {
                          this.dishRefs[key] = Object.assign({}, this.dishRefs[key], {price: ref});
                        }
                      }}
                    />
                  </div>
                  <div style={{display: 'flex'}}>
                    <button className={cx('button')} onClick={() => this.updateDish(dish._id, key)}>Update</button>
                    <button className={cx('remove-button')}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

RestaurantHome.propTypes = {

};

function mapStateToProps(state) {
  return {
    user: state.user.user,
    dishes: state.restaurant.dishes
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps)(RestaurantHome);
