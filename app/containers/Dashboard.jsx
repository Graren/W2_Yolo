import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from '../css/components/home';
import RestaurantDashboard from './RestaurantDashboard'
import ClientDashboard from './ClientDashboard'

const cx = classNames.bind(styles);

class Dashboard extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className={cx('container')}>
        {user ? (
          <div>
            {user.userType === 'client' ? (
              <ClientDashboard />
            ) : (
              <RestaurantDashboard />
            )}
          </div>
        ) : (
          <div className={cx('cover-screen')}>
            <h1>Login / Signup to use app</h1>
          </div>
        )}
      </div>
    );
  }
}

Dashboard.propTypes = {

};

function mapStateToProps(state) {
  return {
    user: state.user.user
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps)(Dashboard);
