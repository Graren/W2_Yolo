import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import CurrencyInput from 'react-currency-input';
import styles from '../css/components/home';

const cx = classNames.bind(styles);

class RestaurantHome extends Component {
  render() {
    const { user } = this.props;
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
        <div className={cx('dish')}>
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
      </div>
    );
  }
}

RestaurantHome.propTypes = {

};

function mapStateToProps(state) {
  return {
    user: state.user.user
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps)(RestaurantHome);
