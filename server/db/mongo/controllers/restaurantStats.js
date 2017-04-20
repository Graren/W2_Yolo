import _ from 'lodash';
import OrderItem from '../models/orderItem';
import Dish from '../models/dishes';
import mongoose from 'mongoose';
import moment from 'moment';

function getSoldItem(restaurantId, minDate, maxDate, type = 'most') {
  return new Promise((resolve, reject) => {
    minDate = minDate ? new Date(minDate) : moment().startOf('day').toDate();
    maxDate = maxDate ? new Date(maxDate) : moment().endOf('day').toDate();
    OrderItem.aggregate([
      {
        $match: {
          restaurant: mongoose.Types.ObjectId(restaurantId),
          date: {
            $gte: minDate,
            $lte: maxDate
          }
        }
      },
      {
        $group: {
          _id: '$dish',
          total: {$sum: '$quantity'},
          ordersCount: {$sum: 1}
        }
      },
      {
        $sort: {
          total: type === 'most' ? -1 : 1
        }
      },
      {
        $limit: 1
      }
    ], function (err, results) {
      if (err) {
        reject(err);
      }
      const result = results[0];
      if (!result) {
        reject(result);
      } else {
        Dish.findById(result._id, (err, dish) => {
          if (err) {
            reject(err);
          }
          const resultPopulated = Object.assign({}, result, dish._doc);
          resolve(resultPopulated);
        });
      }
    });
  })
}

function getEarnings(restaurantId, date) {
  return new Promise((resolve, reject) => {
    const minDate = date ? moment(date).startOf('day').toDate(): moment().startOf('day').toDate();
    const maxDate = date ? moment(date).endOf('day').toDate() : moment().endOf('day').toDate();
    OrderItem.aggregate([
      {
        $match: {
          restaurant: mongoose.Types.ObjectId(restaurantId),
          date: {
            $gte: minDate,
            $lte: maxDate
          }
        }
      },
      {
        $group: {
          _id: { dish: '$dish', restaurant: '$restaurant', price: '$price' },
          quantity: {$sum: '$quantity'},
        }
      },
      {
        $project: {
          _id: '$_id',
          subtotal: { $multiply: [ "$_id.price", "$quantity" ] },
        }
      },
      {
        $group: {
          _id: '$_id.restaurant',
          total: { $sum: '$subtotal'},
        }
      }
    ], function (err, results) {
      if (err) {
        reject(err);
      } else {
        const result = results[0];
        if (!result) {
          resolve({
            date,
            total: 0
          });
        } else {
          resolve({
            date,
            total: result.total
          });
        }
      }
    });
  })
}

export function leastSoldDish(req, res) {
  getSoldItem(req.params.id, req.query.minDate, req.query.maxDate, 'least')
    .then(result => {
      return res.status(200).send(result);
    })
    .catch(err => {
      return res.status(400).send(err);
    })
}

export function mostSoldDish(req, res) {
  getSoldItem(req.params.id, req.query.minDate, req.query.maxDate, 'most')
    .then(result => {
      return res.status(200).send(result);
    })
    .catch(err => {
      return res.status(400).send(err);
    })
}

export function earnings(req, res) {
  const minDate = moment(req.query.minDate).startOf('day');
  const maxDate = moment(req.query.maxDate).endOf('day');
  const dates = [];
  for (let m = minDate; m.isBefore(maxDate); m.add(1, 'days')) {
    dates.push(m.toDate());
  }
  Promise.all(dates.map(date => getEarnings(req.params.id, date)))
    .then(data => {
      return res.status(200).send(data);
    })
    .catch(err => {
      return res.status(400).send(err);
    })
}

export default {
  leastSoldDish,
  mostSoldDish,
  earnings
};
