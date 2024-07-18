import axios from "axios";

const UplaodImage = async function (Image: any) {
  const formData: any = new FormData();
  formData.append("file", Image);
  formData.append("upload_preset", "cloudinary_next");
  const data = await axios.post(
    "https://api.cloudinary.com/v1_1/dkygtb78m/image/upload",
    formData
  );

  return data;
};

export default UplaodImage;
