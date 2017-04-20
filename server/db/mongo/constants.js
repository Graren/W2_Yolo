export const db = process.env.MONGOHQ_URL || process.env.MONGODB_URI || 'mongodb://localhost/w2_yolo';

export default {
  db
};
