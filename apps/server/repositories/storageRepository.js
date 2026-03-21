import { bucket } from "../lib/firebase.js";

export const uploadImage = async (path, buffer, contentType = "image/jpeg") => {
  const file = bucket.file(path);
  await file.save(buffer, { contentType, public: true });
  return file.publicUrl();
};
