const mongoose = require('mongoose');
const {Schema, model } = mongoose;


const supplierSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            unique: true,
            maxLength: [100, 'Tên nhà cung cấp không quá 100 kí tự'],
            required: [true, 'Tên nhà cung cấp không được để trống']
        },
        email: {
            type: String,
            trim: true,
            lowercase : true,
            unique: true,
            maxLength:[ 50, 'Email không vượt quá 50 kí tự'],
            required: [true, 'Email không được để trống'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Vui lòng nhập đúng định dạng email']
        },
        phoneNumber: {
            type: String,
            trim: true,
            unique: true,
            match: [/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/, 'Vui lòng nhập đúng định dạng số điện thoại']
        },
        address: {
            type: String,
            trim: true,
            maxLength: [500, 'Địa chỉ không vượt quá 500 kí tự'],
            required: [true, 'Địa chỉ không được để trống']
        },
        imageUrl: {
            type: String,
            trim: true,
        },
    },
    {"strict": "throw"} // If the field haven't existed in MongooseSchema, throw error

);

//validateBeforeSave
supplierSchema.set('validateBeforeSave', true);

const Supplier = model('Supplier', supplierSchema);

module.exports = Supplier;