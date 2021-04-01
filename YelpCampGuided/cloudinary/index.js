// Tuesday March 23, 2021 529. Uploading to Cloudinary Basics
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary, //this cloudinary storage instance now has credentials for our cloudinary acct
    params: {
        folder: "YelpCamp", //we want to upload things into the YelpCamp folder
        allowedFormats: ["jpeg", "png", "jpg"]
    }
});

module.exports = {
    cloudinary,
    storage
}