import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from '../css/components/home';
import axios from 'axios';
import _ from 'lodash';
const cx = classNames.bind(styles);
import NumberFormat from 'react-number-format';
import moment from 'moment';

class ClientDashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      orders: {},
    }
  }

  componentDidMount() {
    axios.get('/api/order', { params: { client: this.props.user._id}})
      .then(res => {
        this.setState({orders: res.data});
      })
      .catch(console.log)
  }

  render() {
    const { user } = this.props;
    const { orders } = this.state;
    return (
      <div>
        <h1>Orders</h1>
        {_.map(orders, (order) => (
          <div key={order._id} className={cx('restaurant-menu')}>
            <div style={{display: 'flex'}}>
              <img
                className={cx('restaurant-img')}
                src="http://megaicons.net/static/img/icons_sizes/8/178/512/accounting-bill-icon.png"
                width={125}
                height={125}
              />
              <div>
                <h2>ID: {order._id}</h2>
                <h3 style={{color: 'grey'}}>Invoice Date: {moment(order.date).format('MMM D, YYYY. HH:mm:ss')}</h3>
                <h3>
                  <span>Total: </span>
                  <NumberFormat
                    value={order.total}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'$'}
                    decimalPrecision={2}
                  />
                </h3>
              </div>
            </div>

          </div>
        ))}
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
