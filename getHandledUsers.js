import axios from "axios";

export const getHandledUsers = async () => {
    const data = await axios({
        method:"GET",
        url:"http://localhost:5000/users?isHandOver=true",
    }).then((res) =>{return res.data}) 
    .catch((err)=> console.log(err))
    return data;
};