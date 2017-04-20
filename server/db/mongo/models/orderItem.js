import mongoose from 'mongoose';

export const OrderItemSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  date: { type: Date, default: new Date() },
  quantity: { type: Number, min: 1 },
  price: Number,
  dish: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish'},
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

// Compiles the schema into a model, opening (or creating, if
// nonexistent) the 'Topic' collection in the MongoDB database
export default mongoose.model('OrderItem', OrderItemSchema);
