import {Schema,model} from "mongoose";

const provSchema = new Schema (
    {
        typeId: {
          type: String,
          require: true,
          trim: true,
        },
        nroId: {
          type: Number,
          require: true,
          trim: true,
        },
        name: {
          type: String,
          require: true,
          trim: true,
        },
        about: {
          type: String,
          trim: true,
        },
        email: {
          type: [String],
          trim: true,
        },
        numberPhone: [
          {
            code: {
              type: Number,
              trim: true,
            },
            phone: {
              type: Number,
              trim: true,
            } 
          }
        ],
        //add model contactInfo much
        address: [
          {
            departamento: {
              type: String,
              trim: true,
            },
            provincia: {
              type: String,
              trim: true,
            },
            distrito: {
              type: String,
              trim: true,
            },
            address: {
              type: String,
              trim: true,
            },
            reference: {
              type: String,
              trim: true,
            },
          },
        ],
      },
      {
        timestamps: true,
        versionKey: false,
      }
)

export default model("Proveedor", provSchema);