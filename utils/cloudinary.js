import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';


// Configuration of Cloudinary
cloudinary.config({ 
    cloud_name: 'dglnpuq0z', 
    api_key: "211379616618194", 
    api_secret: "Nbi-SQG_JW5Lhtp_uocvxDwycXE"
});
// Function to upload image to Cloudinary when local file path is given
const imageupload = async (localfilepath) => {
    try {
        const uploadResult = await cloudinary.uploader.upload(localfilepath, {
            resource_type: "auto"
        });

        // Remove the local file after successful upload
        if (fs.existsSync(localfilepath)) {
            fs.unlinkSync(localfilepath);
        }

        return uploadResult; // Send the response
    } catch (error) {
        // Remove the local file if the upload operation failed
        if (fs.existsSync(localfilepath)) {
            fs.unlinkSync(localfilepath);
        }

        console.error("Error during image upload:", error);
        return { success: false, error: error.message };
    }
};

export { imageupload };
