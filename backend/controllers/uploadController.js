import Product from "../model/productSchema.js";
import cloudinary from "../service/cloudinary.js";
import getDataUri from "../utils/dataUri.js";

export const uploadImage = async (req, res) => {
  try {
    const image = req.file;
    if (!image) {
      throw new Error("Image Not found");
    }

    const fileUri = getDataUri(image);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    const productImage = await product.save();
    return res.status(200).json({
      success: true,
      productImage,
      message: "Image Uploaded ",
    });
  } catch (error) {
    console.log(error);
  }
};
