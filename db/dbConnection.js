import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const res = mongoose.connect(process.env.DB_URI);
    console.log(`Databse connected successfully`);
  } catch (error) {
    console.log(`Error while connec database ${error}`);
  }
};

export default dbConnect;
