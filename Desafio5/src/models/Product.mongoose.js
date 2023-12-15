import { Schema, model } from "mongoose";

const productSchema = new Schema({
    _id: { type : String, unique: true, required: true },
    title : { type : String, required: true  },
    description: { type : String, required: true  },
    price: { type : Number, required: true  },
    thumbnail: { type : String, required: true  },
    stock: { type : Number, required: true  },
    status: { type : Boolean, required: true  },
    category: { type : String, required: true  }
},{
    strict:'throw',
    versionKey:false,
    statics:{},
    methods:{}
})

export const dbProducts = model('products', productSchema)