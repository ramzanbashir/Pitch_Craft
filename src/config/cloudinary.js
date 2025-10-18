export const uploadToCloudinary = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "imagessss");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/dh5hzm9dn/image/upload`,
    { method: "POST", body: data }
  );

  const response = await res.json();
  return response.secure_url;
};
