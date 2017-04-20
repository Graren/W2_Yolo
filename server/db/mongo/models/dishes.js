/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';

const DishSchema = new mongoose.Schema({
  id: String,
  name: String,
  price: { type: Number, min: 0 },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

// Compiles the schema into a model, opening (or creating, if
// nonexistent) the 'Topic' collection in the MongoDB database
export default mongoose.model('Dish', DishSchema);
