import React from "react";
import axios from "axios";

export const getImageList =  (per_page, page ) =>{
   return  axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${process.env.REACT_APP_API_KEY}&tags=technology&per_page=${per_page}&page=${page}&format=json&nojsoncallback=1`)
        .then((res)=>{
            return res.data.photos
        })
}