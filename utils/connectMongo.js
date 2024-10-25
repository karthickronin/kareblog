import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Schema, model, models } from "mongoose";

dotenv.config();

const connectMongo = async () => {
    await mongoose.connect("mongodb://localhost:27017/next_blog")
}

const postSchema = new Schema({
  title: {
    type : String,
    required : true
  },
  description: {
    type : String,
    required : true
  },
  image: {
    type : String,
    required : true
  },
  created_at: {
    type : String,
    required : true
  },
},{
  toJSON:{ virtuals:true }
});

postSchema.virtual("short_description").get(function() {
  return this.description.substr(0,100)+"..."
})
postSchema.virtual("created_at_formatted").get(function() {
  return changeDateFormat(this.created_at)
})

const enquirySchema = new Schema({
  name : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true
  },
  message : {
    type : String,
    required : true
  } 
})

function changeDateFormat (datestr) {
  const date = new Date(datestr)
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
  return `${date.getDate()} ${months[date.getMonth()]},${date.getFullYear()}`
}


const postModel = models.Post || model("Post", postSchema);
const enquiryModel = models.Enquiries || model("Enquiries", enquirySchema);

export {connectMongo, postModel, enquiryModel };