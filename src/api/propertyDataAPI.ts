import axios from "axios";

const URL = "http://localhost:8000"


export const getPropertyData = async()=>{

    console.log("importing property data from",`${URL}`)

    return await axios.get(`${URL}/api/propertyList`)
<<<<<<< HEAD
}

export const postPropertyData = async()=>{

    console.log("exporting property data to",`${URL}`)

    return await axios.post(`${URL}/api/propertyList`)
}

=======
}
>>>>>>> 76f0471e5be454d85c3b764545deb7885f2c9a92
