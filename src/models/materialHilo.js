import { Schema, model } from 'mongoose';

const hiloSchema = new Schema(
    {
        sku: {
            type: String,
            require: true,
            unique: true,
            trim: true,
        },
        name: {
            type: String,
            require: true,
            trim: true,
        },
        description: {
            type: String,
            require: true,
            trim: true,
        },
        marca:{
            type: String,
            trim: true,
        },
        grosor:{
            type: String,
            trim: true,
        },
        priceRef:{
            type: Number,
            trim: true,
        },
        minQuantity:{
            type: Number,
            trim: true,
        },
        stock:{
            type: Number,
            trim: true,
        },
        color: {
            type: Schema.Types.ObjectId,
            ref: 'Color',         
        },
        category:{
            type: Schema.Types.ObjectId,
            ref: 'HiloCategory',
        },
        unit: {
            type: Schema.Types.ObjectId,
            ref: 'Units',
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model('Hilo', hiloSchema)