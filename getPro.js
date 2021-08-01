import axios from "axios";

export const getNames = async () => {
    const data = await axios({
        method:"GET",
        url:"http://localhost:5000/product",
    }).then((res) =>{return res.data}) .catch((error)=> {console.log(error);})
    return data;
};