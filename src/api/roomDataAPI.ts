import axios from "axios";

const URL = "http://localhost:8000"


export const getRoomData = async(id:any)=>{

    console.log("importing property data from",`${URL}`)
    console.log(`${URL}/api/roomList/${id}`);
    return await axios.get(`${URL}/api/roomList/${id}`)
}