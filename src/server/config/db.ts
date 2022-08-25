import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI,
      //     {
      // useNewUrlParser:true,
      // useCreateIndex:true,
      // useFindAndModify:false,
      // useUnifiedTopology:true
      // }
    );
    // TODO logging

    // eslint-disable-next-line no-console
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    // TODO logging
    // eslint-disable-next-line no-console
    console.log(err);
    process.exit(1);
  }
};

export default connectDB;
