import _ from 'lodash';
import Order from '../models/order';
import OrderItem from '../models/orderItem';
import mongoose from 'mongoose';
/**
 * List
 */
export function all(req, res) {
  const query = req.params.id ? { _id: req.params.id } : {};
  if (req.query.client) query.client = req.query.client
  Order.findOne(query)
  .lean()
  .exec((err, order) => {
    if (err) {
      return res.status(500).send('Something went wrong getting the data');
    }
    OrderItem.find({ order: order._id })
    .exec((err, items) => {
      if (err) {
        return res.status(500).send('Something went wrong getting the data');
      }
      order.items = items;
      return res.json(order);
    });
  });
}

/**
 * Add a Dish*/
 //58f8cfdb2a1b5f2cfc4a0a35
 //
 export function add(req, res) {
  const data = Object.assign({}, req.body, { client : req.user._id });
  // OrderItem.aggregate([
  //   {
  //     $match: {
  //       restaurant: mongoose.Types.ObjectId('58f8aa2ff137776656fd045e'),
  //       // date: {
  //       //   $gte: new Date('12/01/2014'),
  //       //   $lt:new Date('12/30/2018')
  //       // }
  //     }
  //   },
  //   {
  //     $group: {
  //       _id: '$dish',
  //       total: {$sum: '$quantity'},
  //       ordersCount: {$sum: 1}
  //     }
  //   },
  //   {
  //     $sort: {
  //       total: -1
  //     }
  //   },
  //   {
  //     $limit: 1
  //   }
  // ], function (err, result) {
  //   if (err) {
  //     return res.status(400).send(err);
  //   }
  //   return res.status(200).send(result);
  // });
  Order.create(data, (err, order) => {
    if (err) {
      return res.status(400).send(err);
    }
    const items = req.body.items.map(item => Object.assign({}, item, { order: order._id }))
    OrderItem.create(items, (err, createdItems) => {
      if (err) {
        return res.status(400).send(err);
      }
      order = order.toObject();
      order.items = createdItems;
      return res.status(200).send(order);
    })
  });
}


export default {
  all,
  add
};
