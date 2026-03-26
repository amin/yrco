import cloudinary from "../lib/cloudinary.js";

export const uploadImage = async (path, buffer) => {
  const env = process.env.NODE_ENV === "production" ? "prod" : "dev";
  const folder = `${process.env.APP_NAME}/${env}`;
  const result = await cloudinary.uploader.upload(
    `data:image/jpeg;base64,${buffer.toString("base64")}`,
    { public_id: `${folder}/${path}`, overwrite: true },
  );
  return result.secure_url;
};
