import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from '../css/components/dashboard';

const cx = classNames.bind(styles);

class ClientDashboard extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className={cx()}>
        <span>Client</span>
      </div>
    );
  }
}

ClientDashboard.propTypes = {

};

function mapStateToProps(state) {
  return {
    user: state.user.user
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps)(ClientDashboard);
