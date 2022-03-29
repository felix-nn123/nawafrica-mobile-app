import http from "./httpService"

const URL='https://nawafrica.com'

//function to Add a Listing
export function  addListing(formData, UploadProgress){
return http.post(`${URL}/composeListing`, formData,{
headers: {
'Content-Type': 'application/json',
},
onUploadProgress: (progress)=>  UploadProgress(progress.loaded/progress.total)
})                    
}

//function to edit a listing
export function  editListing(formData,id, UploadProgress){
return http.put(`${URL}/composeListing/${id}`, formData,{
headers: {
'Content-Type': 'application/json',
},
onUploadProgress: (progress)=>  UploadProgress(progress.loaded/progress.total)
})                                   
}

//function to get all listingd
export function  getListings(){
return http.get(`${URL}/composeListing`)                                       
 }

 //function to get a listing by his id
export function  getListingsById(id){
return http.get(`${URL}/composeListing/${id}`)                                                       
}

//function to apply for a listing
export function  applyForAListing(id){
 return http.post(`${URL}/composeListing/handleAddApplicant/${id}`) 
}

//function to get all applications for a listing
export function  getAllApplications(id){
 return http.get(`${URL}/composeListing/handleAddApplicant/${id}`) 
}

// function to get all applications
export function  getApplications(){
 return http.get(`${URL}/composeListing/applications`) 
}

//function get applications by users id
export function getApplicationsByUsersId(id){
return http.get(`${URL}/composeListing/applications/${id}`)             
}

//Delete a given application
export function deleteApplicationById(id){
return http.delete(`${URL}/composeListing/applications/${id}`)
}

//function to like a listing
export function  likeAListing(id){
return http.post(`${URL}/composeListing/like/${id}`)              
}

//function to get all likes for a listing
export function  getAllLikes(id){
return http.get(`${URL}/composeListing/like/${id}`)              
}

//function to report a listing
export function  reportAListing(message,id){
return http.post(`${URL}/composeListing/report/${id}`,message,{
 headers: {
 'Content-Type': 'application/json',
}})
}
   
//function to that publish or unpublish a listing
export function publishAListing(id){
return http.put(`${URL}/composeListing/publish/${id}`)
}

//Delete a listing
export function deleteAListing(id){
return http.delete(`${URL}/composeListing/${id}`)             
}

       
//Delete a listing
export function deleteAListingByUpdateStatus(id){
 return http.put(`${URL}/composeListing/delete/${id}`)             
 }
  