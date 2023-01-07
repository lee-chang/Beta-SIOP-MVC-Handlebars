import { Schema, model } from "mongoose";

const UnidadMedidaSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    validUnitBase: {
      type: Boolean,
    },
    unitBase: {
      type: String,
    },
    operator: {
      type: String,
      trim: true,
    },
    operationValue: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Units", UnidadMedidaSchema);