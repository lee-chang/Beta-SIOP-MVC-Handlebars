import { Schema, model } from 'mongoose';

const quimicoSchema = new Schema(
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
        observaciones:{
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
        unit: {
            type: Schema.Types.ObjectId,
            ref: 'Units',
        },
        proveedor: [{
            type: Schema.Types.ObjectId,
            ref: 'Proveedor',
        }]
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model('Quimico', quimicoSchema)