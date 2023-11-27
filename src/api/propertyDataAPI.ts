import axios from "axios";

const URL = "http://localhost:8000"


export const getPropertyData = async()=>{

    console.log("importing property data from",`${URL}`)

    return await axios.get(`${URL}/api/propertyList`)
}

export const postPropertyData = async()=>{

    console.log("exporting property data to",`${URL}`)

    return await axios.post(`${URL}/api/propertyList`)
}

