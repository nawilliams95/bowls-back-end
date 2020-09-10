const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BowlSchema = new Schema(
    {
        base: {
            type: String,
            required: true
        },
        protein: {
            type: [String],
            required: true
        },
        sides: {
            type: [String],
            required: true
        },
        toppings: {
            type: [String],
            required: true
        },
        sauce: {
            type: [String],
            required: true
        },
    },
    { timestamps: true }
);

//  Create Model from our Schema
const Bowl = mongoose.model("Bowl", BowlSchema);

// Export Bowl Model
module.exports = Bowl;