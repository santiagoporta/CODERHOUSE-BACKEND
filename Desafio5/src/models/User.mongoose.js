import { Schema, model } from "mongoose";

const userSchema = new Schema({
    nombre: { type : String, unique: true, required: true },
    apellido : { type : String, required: true  },
    description: { type : String, required: true  },
    email: { type : String, required: true, unique: true },
    rol: { type : String, required: true  },
    edad: { type : Number, required: true  },
    contrasenia: { type : String, required: true  },
},{
    strict:'throw',
    versionKey:false,
    statics:{},
    methods:{}
})

export const dbUsers = model('users', userSchema)