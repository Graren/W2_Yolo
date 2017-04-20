import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from '../css/components/dishStatCard';

const cx = classNames.bind(styles);

const DishStatCard = (props) => (
  <div className={cx('card')}>
    <img src={props.img} width={100} height={100} />
    <h3 style={{color: 'grey'}}>{props.period}</h3>
    <h1 style={{fontSize: '46px', margin: 0, color:props.quantityColor}}>{props.quantity}</h1>
    <h2 style={{color: props.nameColor}}>{props.name}</h2>
  </div>
);

DishStatCard.defaultProps = {
  quantityColor: '#4F4F4F'
};

export default DishStatCard;
