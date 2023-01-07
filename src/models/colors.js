import {Schema,model} from "mongoose";

const colorSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true
    },
    codeColor: {
      type: String,
      require: true,
      unique: true,
      trim: true
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Color", colorSchema);  