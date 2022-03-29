import logger from "../services/loggerService";

//function use to upload file to cloudinary
export const uploadSingleFileToCloudinary= async (image, data)=>{
try {
const url = `https://api.cloudinary.com/v1_1/${`captivator`}/upload`;

const {signature}=data
const {timestamp}=data
const {cloudinary_public_key}=data


const formData = new FormData();
formData.append("file", image);
formData.append("signature", signature);
formData.append("timestamp", timestamp);
formData.append("api_key", cloudinary_public_key);

const response = await fetch(url, {
                 method: "post",
                 body: formData,
                 });

const sentData = await response.json();

return sentData
                 
} catch (error) {
    logger.log(error)             
}    
}



//function use to upload file to cloudinary
export const uploadMultipleFileToCloudinary= async (image, data)=>{
try {
const url = `https://api.cloudinary.com/v1_1/${`captivator`}/upload`;
             
const {signature}=data
const {timestamp}=data
const {cloudinary_public_key}=data

const myImage={
    uri:image,
    type:`picture/${image.split('.')[1]}`,
    name:`picture.${image.split('.')[1]}`
}  
                 
const formData = new FormData();
formData.append("file", myImage);
formData.append("signature", signature);
formData.append("timestamp", timestamp);
formData.append("api_key", cloudinary_public_key);
             
const response = await fetch(url, {
method: "post",
body: formData,
});

const sentData = await response.json();

return sentData
                 
} catch (error) {
    // logger.log(error)             
}
                   
}