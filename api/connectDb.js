import mongoose from "mongoose";

export default function connectDb() {
  mongoose.Promise = global.Promise;

  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('> Connected to database');
  }).catch((err) => {
    console.error(`> Error in database connection:\n${err}`);
  });
}

