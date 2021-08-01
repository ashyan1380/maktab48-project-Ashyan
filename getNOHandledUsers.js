import axios from "axios";

export const getNOHandledUsers = async () => {
    const data = await axios({
        method:"GET",
        url:"http://localhost:5000/users?isHandOver=false",
    }).then((res) =>{return res.data}) 
    .catch((err)=> console.log(err))
    return data;
};