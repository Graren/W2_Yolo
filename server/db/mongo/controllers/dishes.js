import _ from 'lodash';
import Dish from '../models/dishes';

/**
 * List
 */
export function all(req, res) {
  const query = req.params.id ? { _id: req.params.id } : {};
  if (req.query.restaurant) query.restaurant = req.query.restaurant
  Dish.find(query)
  .populate('restaurant', 'name _id')
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
 export function add(req, res) {
  const data = Object.assign({}, req.body, { restaurant: req.user._id});
  Dish.create(data, (err, dish) => {
    if (err) {
      return res.status(400).send(err);
    }
    return res.status(200).send(dish);
  });
}

/**
 * Update a topic
*   Cant say I understand this
 */
export function update(req, res) {
  const query = { _id: req.params.id };
  const omitKeys = ['_id', '_v', 'restaurant'];
  const data = _.omit(req.body, omitKeys);
  Dish.findOneAndUpdate(query, data, (err) => {
    if (err) {
      console.log('Error on save!');
      return res.status(500).send('We failed to save for some reason');
    }

    return res.status(200).send('Updated successfully');
  });
}

/**
 * Remove a topic
 */
export function remove(req, res) {
  const query = { _id: req.params.id };
  Dish.findOneAndRemove(query, (err) => {
    if (err) {
      console.log('Error on delete');
      return res.status(500).send('We failed to delete for some reason');
    }

    return res.status(200).send('Removed Successfully');
  });
}

export default {
  all,
  add,
  update,
  remove
};
