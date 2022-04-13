import mongoose from "mongoose";

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Db running... ${mongoose.connection.host}`);
  } catch (error) {
    console.log("Something went wrong " + error.message);
    process.exit(1);
  }
};

export default connection;
