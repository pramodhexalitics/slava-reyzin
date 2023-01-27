import config from "../config";

const httpHeader = {
   Accept: "application/json",
   "Content-Type": "application/json",
   "api-key": `${config.token}`,
};

const getSocialLinks = async () => {
   return await fetch(`${config.serviceUrl}/getSocialLinks`, {
      method: 'GET',
      headers: httpHeader
   });
}

const getFrontPageBanner = async () => {
   return await fetch(`${config.serviceUrl}/getBanners`, {
      method: 'GET',
      headers: httpHeader
   });
}

const getHomePageData = async () => {
   return await fetch(`${config.serviceUrl}/getHomePageData`, {
      method: 'GET',
      headers: httpHeader
   });
}

const getGalleryPageData = async (page) => {
   return await fetch(`${config.serviceUrl}/getGallery?page=${page}&no_of_rows=10000`, {
      method: 'GET',
      headers: httpHeader
   });
}

const getVideos = async () => {
   return await fetch(`${config.serviceUrl}/getVideos`, {
      method: 'GET',
      headers: httpHeader
   });
}

const getGalleryImages = async (gallery_id, page) => {
   return await fetch(`${config.serviceUrl}/getGalleryImages?gallery_id=${gallery_id}&page=${page}&no_of_rows=100000`, {
      method: 'GET',
      headers: httpHeader
   });
}

const getGalleryImageDetail = async (painting_image_id, page) => {
   return await fetch(`${config.serviceUrl}/imageDetailById?painting_image_id=${painting_image_id}`, {
      method: 'GET',
      headers: httpHeader
   });
}

const ContactUs = async (contactUsData) => {
   return await fetch(`${config.serviceUrl}/contactUs`, {
      method: 'POST',
      headers: httpHeader,
      body: JSON.stringify(contactUsData),
      /* {
         "salutation": contactUsData.salutation,
         "username": contactUsData.username,
         "email ": contactUsData.email,
         "subject ": contactUsData.subject,
         "message": contactUsData.message,
         "user_id": "",
      } */
   });
};

const API = {
   getSocialLinks,
   getFrontPageBanner,
   getHomePageData,
   getGalleryPageData,
   getVideos,
   getGalleryImages,
   getGalleryImageDetail,
   ContactUs
}

export default API