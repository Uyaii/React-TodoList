import express, { request, response } from "express";
import cors from "cors";
import mongoose, { MongoClient } from "mongodb";
import User from "../models/user.mjs";

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;

// * LANDING ROUTE
app.get("/api/landing", (request, response) => {
  response.json({ message: "landed safely!1" });
});

// ! MONGODB CONNECTION
const uri =
  "mongodb+srv://maryanneinyang:ndifreke_12383@cluster0.ubrui.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);
// async function connectDb() {
//   try {
//     const database = client.db
//   }
// }
// mongoose
//   .connect(
//     "mongodb+srv://maryanneinyang:ndifreke_12383@cluster0.ubrui.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
//   )
//   .then(() => console.log("Mongodb connected!"))
//   .catch((error) => console.log(error));

//! SIGN UP ROUTE
app.post("/api/signup", async (response, request) => {
  try {
    const { fullname, username, email, password } = request.body;
    const newUser = new User({ fullname, username, email, password });
    await newUser.save();
    response.statusCode(201).json({ message: "User created successfully!" });
  } catch (error) {
    response.statusCode(500).json({ error: "Failed to create user!" });
  }
});
app.listen(PORT, () => {
  console.log(`running on port: ${PORT}`);
});
