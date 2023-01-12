import { Schema, model } from 'mongoose';

const hiloSchema = new Schema(
    {
        code: {
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

export default model('HiloCategory', hiloSchema)