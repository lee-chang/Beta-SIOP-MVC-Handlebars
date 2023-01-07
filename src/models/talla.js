import {Schema,model} from "mongoose";

const tallaSchema = new Schema (
    {
        code:{
            type: Number,
            require: true,
            unique: true,
            trim: true,
        },
        description:{
            type: String,
            require: true,
            trim: true,
        }

    },
    {
        timestamps: true,
        versionKey: false
    }
)

export default model("Talla", tallaSchema);