import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    type: {
      type: String,
    },
    muscle: {
      type: String,
    },
    difficulty: {
      type: String,
    },
    instructions: {
      type: String,
    },
    equipment: {
      type: String
    },
    offset: {
      type: Number,
    },
    videoURL: {
      type: String,
    }
  });

const exerciseModel = mongoose.model("Exercise", exerciseSchema);

export default exerciseModel;
