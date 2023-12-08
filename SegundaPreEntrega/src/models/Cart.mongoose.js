import { Schema, model, mongoose } from "mongoose";

const cartSchema = new Schema({
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
            quantity: { type : Number }
        }
    ]
},{
    strict:'throw',
    versionKey:false,
    statics:{},
    methods:{}
})

export const dbCarts = model('carts', cartSchema)