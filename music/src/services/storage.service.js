import ImageKit from "@imagekit/nodejs";
const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});
export async function uploadFile(file, folder) {
  const fileName = `${Date.now()}-${file.originalname}`;
  const result = await imagekit.files.upload({
    file: file.buffer.toString("base64"),
    fileName,
    folder,
    isPrivateFile: true,
  });
  return {
    fileId: result.fileId,

    filePath: result.filePath,
  };
}

export function getSignedFileUrl(filePath) {
  const url = imagekit.helper.buildSrc({
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,

    src: filePath,

    signed: true,

    expiresIn: 3600,
  });

  return url;
}
