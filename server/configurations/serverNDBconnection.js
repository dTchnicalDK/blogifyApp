import mongoose from "mongoose";

export const connectDb = async (dbUri, port, app) => {
  try {
    //connecting dbs
    await mongoose.connect(dbUri);
    console.log("db connected");
    //starting server
    app.listen(port, () => {
      console.log(`server started on http://localhost:${port}`);
    });
  } catch (error) {
    console.log("db connection error");
  }
};
