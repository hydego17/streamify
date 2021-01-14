import mongoose from 'mongoose';

async function createSession() {
  const MONGO_URL = process.env.MONGO_URL || '';
  if (!MONGO_URL) {
    throw new Error('Missing MONGO_URL!');
  }

  const db = await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  console.log(`
  =============================================
  Host: ${db.connection.host}
  Database: ${db.connection.name}
  =============================================
  `);
}

export default createSession;
