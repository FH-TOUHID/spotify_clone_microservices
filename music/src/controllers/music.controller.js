import musicModel from "../models/music.model.js";

import { uploadFile, getSignedFileUrl } from "../services/storage.service.js";

export async function uploadMusic(req, res) {
  try {
    const musicFile = req.files?.music?.[0];

    const coverImageFile = req.files?.coverImage?.[0];

    if (!musicFile || !coverImageFile) {
      return res.status(400).json({
        message: "Music and cover image are required",
      });
    }

    const { title, artist } = req.body;

    if (!title || !artist) {
      return res.status(400).json({
        message: "Title and artist are required",
      });
    }

    const musicUpload = await uploadFile(
      musicFile,

      "/spotify/music",
    );

    const coverUpload = await uploadFile(
      coverImageFile,

      "/spotify/covers",
    );

    const music = await musicModel.create({
      title,

      artist,

      artistId: req.user.id,

      musicFileId: musicUpload.fileId,

      musicPath: musicUpload.filePath,

      coverFileId: coverUpload.fileId,

      coverPath: coverUpload.filePath,
    });

    return res.status(201).json({
      message: "Music uploaded successfully",

      music,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function getArtistMusics(req, res) {
  try {
    const musicDocs = await musicModel
      .find({
        artistId: req.user.id,
      })
      .lean();

    const musics = musicDocs.map((music) => {
      return {
        ...music,

        musicUrl: getSignedFileUrl(music.musicPath),

        coverImageUrl: getSignedFileUrl(music.coverPath),
      };
    });

    return res.status(200).json({
      musics,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function getAllMusics(req, res) {
  try {
    const musicDocs = await musicModel
      .find()
      .sort({
        createdAt: -1,
      })
      .lean();

    const musics = musicDocs.map((music) => {
      return {
        ...music,

        musicUrl: getSignedFileUrl(music.musicPath),

        coverImageUrl: getSignedFileUrl(music.coverPath),
      };
    });

    return res.status(200).json({
      musics,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
