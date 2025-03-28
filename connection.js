import mongoose from "mongoose";
//localip:127.0.0.1

const url = "mongodb://localhost:27017/mernbatchtraing12march";

mongoose.connect(url);

console.log("Data Base Connected Suceesfuly");