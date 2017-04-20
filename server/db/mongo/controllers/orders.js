import _ from 'lodash';
import Order from '../models/order';

/**
 * List
 */
export function all(req, res) {
  const query = req.params.id ? { _id: req.params.id } : {};
  if (req.query.client) query.client = req.query.client
  Order.find(query)
  .populate('client', 'name _id')
  .populate({
    path: 'dishes',
    select: 'name price _id restaurant',
    populate: {
      path: 'restaurant',
      select: 'name _id'
    }
  })
  .exec((err, dishes) => {
    if (err) {
      console.log('Error in first query');
      return res.status(500).send('Something went wrong getting the data');
    }
    return res.json(dishes);
  });
}

/**
 * Add a Dish*/
 //58f8cfdb2a1b5f2cfc4a0a35
 //
 export function add(req, res) {
  const data = Object.assign({}, req.body, { client : req.user._id});
  data.dishes = req.body.dishes;
  Order.create(data, (err, dish) => {
    if (err) {
      return res.status(400).send(err);
    }
    return res.status(200).send(dish);
  });
}


export default {
  all,
  add
};
