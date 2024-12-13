const { Schema, model } = require("mongoose")

const cartSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true, 
    },
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
}}, {
    timestamps: true
})

const Cart = model("carts", cartSchema)

module.exports = Cart