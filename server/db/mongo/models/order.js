import mongoose from 'mongoose';
import Dish from './dishes'

const OrderSchema = new mongoose.Schema({
  date: { type: Date },
  // price: { type: Number, min: 0 }
  dishes: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish' }
});

// Compiles the schema into a model, opening (or creating, if
// nonexistent) the 'Topic' collection in the MongoDB database
export default mongoose.model('Order', OrderSchema);
