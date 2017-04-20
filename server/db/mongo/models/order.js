import mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
  date: { type: Date, default: new Date() },
  total: { type: Number, min: 0 },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

// Compiles the schema into a model, opening (or creating, if
// nonexistent) the 'Topic' collection in the MongoDB database
export default mongoose.model('Order', OrderSchema);
