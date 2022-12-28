const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const transportationSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      maxLength: 50,
      lowercase: true,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    companyName: {
      type: String,
      trim: true,
      maxLength: 50,
      required: true,
    },
    companyPhoneNumber: {
      type: String,
      trim: true,
      match: [
        /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
        "Vui lòng nhập đúng định dạng số điện thoại",
      ],
      require: true,
    },
    companyEmail: {
      type: String,
      trim: true,
      lowercase: true,
      maxLength: 50,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Vui lòng nhập đúng định dạng email",
      ],
    },
    note: {
      type: String,
      trim: true,
      maxLength: 200,
    },
  },
  { strict: "throw" } // If the field haven't existed in MongooseSchema, throw error
);

//validateBeforeSave
transportationSchema.set("validateBeforeSave", true);

const Transportation = model("Transportation", transportationSchema);

module.exports = Transportation;
