import express from "express";

import multer from "multer";

import * as musicController from "../controllers/music.controller.js";

import {
  authMiddleware,
  authArtistMiddleware,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 25 * 1024 * 1024,
  },
});

router.post(
  "/upload",

  authArtistMiddleware,

  upload.fields([
    {
      name: "music",

      maxCount: 1,
    },

    {
      name: "coverImage",

      maxCount: 1,
    },
  ]),

  musicController.uploadMusic,
);

router.get(
  "/artist-musics",

  authArtistMiddleware,

  musicController.getArtistMusics,
);

router.get(
  "/",

  authMiddleware,

  musicController.getAllMusics,
);

export default router;
