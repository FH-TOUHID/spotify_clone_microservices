import mongoose from "mongoose";

const musicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    artist: {
      type: String,
      required: true,
    },

    artistId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    musicFileId: {
      type: String,
      required: true,
    },

    musicPath: {
      type: String,
      required: true,
    },

    coverFileId: {
      type: String,
      required: true,
    },

    coverPath: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  },
);

const musicModel = mongoose.model("music", musicSchema);

export default musicModel;
