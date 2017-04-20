import _ from 'lodash';
import OrderItem from '../models/orderItem';
import Dish from '../models/dishes';
import mongoose from 'mongoose';
import moment from 'moment';

function getSoldItem(restaurantId, minDate, maxDate, type = 'most') {
  return new Promise((resolve, reject) => {
    if(!minDate) minDate = moment().startOf('day').toDate();
    if(!maxDate) maxDate = moment().endOf('day').toDate();
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
      Dish.findById(result._id, (err, dish) => {
        if (err) {
          reject(err);
        }
        const resultPopulated = Object.assign({}, result, dish._doc);
        resolve(resultPopulated);
      })
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

export default {
  leastSoldDish,
  mostSoldDish,
  earnings: mostSoldDish
};
