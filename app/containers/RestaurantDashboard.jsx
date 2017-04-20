import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from '../css/components/dashboard';
import DishStatCard from '../components/DishStatCard';
const cx = classNames.bind(styles);
import axios from 'axios';
import moment from 'moment';
import NumberFormat from 'react-number-format';

const billsImg = "https://cdn1.iconfinder.com/data/icons/finance-solid-icons-vol-2/48/052-512.png";
const billImg = "http://icons.iconarchive.com/icons/iconsmind/outline/128/Dollar-icon.png";

class RestaurantDashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      earnings: [],
      leastSoldDish: {
        today: null,
        week: null,
        month: null
      },
      mostSoldDish: {
        today: null,
        week: null,
        month: null
      }
    }
  }

  componentDidMount() {
    this.getMostSoldDishToday();
    this.getMostSoldDishWeek();
    this.getMostSoldDishMonth();
    this.getLeastSoldDishToday();
    this.getLeastSoldDishWeek();
    this.getLeastSoldDishMonth();
    this.getWeekEarnings();
  }

  getMostSoldDishToday() {
      const { user } = this.props;
      const minDate = moment().startOf('day').toDate();
      const maxDate = moment().endOf('day').toDate();
      axios.get(`/api/stats/restaurant/${user._id}/most-sold-dish`, { params: { minDate, maxDate }})
        .then(res => {
          this.setState((state) => ({
            mostSoldDish: Object.assign({}, state.mostSoldDish, { today: res.data })
          }))
        })
        .catch(console.log)
  }

  getMostSoldDishMonth() {
      const { user } = this.props;
      const minDate = moment().startOf('month').toDate();
      const maxDate = moment().endOf('month').toDate();
      axios.get(`/api/stats/restaurant/${user._id}/most-sold-dish`, { params: { minDate, maxDate }})
        .then(res => {
          this.setState((state) => ({
            mostSoldDish: Object.assign({}, state.mostSoldDish, { month: res.data })
          }))
        })
        .catch(console.log)
  }

  getMostSoldDishWeek() {
      const { user } = this.props;
      const minDate = moment().startOf('week').toDate();
      const maxDate = moment().endOf('week').toDate();
      axios.get(`/api/stats/restaurant/${user._id}/most-sold-dish`, { params: { minDate, maxDate }})
        .then(res => {
          this.setState((state) => ({
            mostSoldDish: Object.assign({}, state.mostSoldDish, { week: res.data })
          }))
        })
        .catch(console.log)
  }

  getLeastSoldDishToday() {
      const { user } = this.props;
      const minDate = moment().startOf('day').toDate();
      const maxDate = moment().endOf('day').toDate();
      axios.get(`/api/stats/restaurant/${user._id}/least-sold-dish`, { params: { minDate, maxDate }})
        .then(res => {
          this.setState((state) => ({
            leastSoldDish: Object.assign({}, state.leastSoldDish, { today: res.data })
          }))
        })
        .catch(console.log)
  }

  getLeastSoldDishMonth() {
      const { user } = this.props;
      const minDate = moment().startOf('month').toDate();
      const maxDate = moment().endOf('month').toDate();
      axios.get(`/api/stats/restaurant/${user._id}/least-sold-dish`, { params: { minDate, maxDate }})
        .then(res => {
          this.setState((state) => ({
            leastSoldDish: Object.assign({}, state.leastSoldDish, { month: res.data })
          }))
        })
        .catch(console.log)
  }

  getLeastSoldDishWeek() {
      const { user } = this.props;
      const minDate = moment().startOf('week').toDate();
      const maxDate = moment().endOf('week').toDate();
      axios.get(`/api/stats/restaurant/${user._id}/least-sold-dish`, { params: { minDate, maxDate }})
        .then(res => {
          this.setState((state) => ({
            leastSoldDish: Object.assign({}, state.leastSoldDish, { week: res.data })
          }))
        })
        .catch(console.log)
  }

  getWeekEarnings() {
      const { user } = this.props;
      const minDate = moment().startOf('week').toDate();
      const maxDate = moment().endOf('week').toDate();
      axios.get(`/api/stats/restaurant/${user._id}/earnings`, { params: { minDate, maxDate }})
        .then(res => {
          this.setState({
            earnings: res.data,
          });
        })
        .catch(console.log)
  }

  render() {
    const { user } = this.props;
    const { leastSoldDish, mostSoldDish, earnings } = this.state;
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
            <h3 style={{color: 'grey'}}>Stats</h3>
          </div>
        </div>
        <div className={cx('stat-section')}>
          <h1>Most Sold Dish</h1>
          <div className={cx('stats-container')}>
            {leastSoldDish.today && (
              <DishStatCard img={billsImg} period="Today" quantity={mostSoldDish.today.total} name={mostSoldDish.today.name} nameColor="#0F9D58"/>
            )}
            {leastSoldDish.week && (
              <DishStatCard img={billsImg} period="Week" quantity={mostSoldDish.week.total} name={mostSoldDish.week.name} nameColor="#0F9D58"/>
            )}
            {leastSoldDish.month && (
              <DishStatCard img={billsImg} period="Month" quantity={mostSoldDish.month.total} name={mostSoldDish.month.name} nameColor="#0F9D58"/>
            )}
          </div>
        </div>
        <div className={cx('stat-section')}>
          <h1>Least Sold Dish</h1>
          <div className={cx('stats-container')}>
            {leastSoldDish.today && (
              <DishStatCard img={billImg} period="Today" quantity={leastSoldDish.today.total} name={leastSoldDish.today.name} nameColor="#db4437"/>
            )}
            {leastSoldDish.week && (
              <DishStatCard img={billImg} period="Week" quantity={leastSoldDish.week.total} name={leastSoldDish.week.name} nameColor="#db4437"/>
            )}
            {leastSoldDish.month && (
              <DishStatCard img={billImg} period="Month" quantity={leastSoldDish.month.total} name={leastSoldDish.month.name} nameColor="#db4437"/>
            )}
          </div>
        </div>
        <div className={cx('stat-section')}>
          <h1>Week Sales</h1>
          <div className={cx('stats-container')}>
            {earnings.map(earning => (
              <DishStatCard img={earning.total > 10 ? billsImg : billImg } period={moment(earning.date).format('ddd D, MMM YYYY')} quantity={<NumberFormat value={earning.total} displayType={'text'} thousandSeparator={true} prefix={'$'} />} quantityColor="#0F9D58"/>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

RestaurantDashboard.propTypes = {

};

function mapStateToProps(state) {
  return {
    user: state.user.user
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps)(RestaurantDashboard);
