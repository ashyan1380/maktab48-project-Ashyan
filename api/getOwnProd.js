import axios from "axios";

export const getOwnProd = async (id) => {
    const data = await axios({
        method:"GET",
        url:`http://localhost:5000/product?id=${id}`
    }).then((res) =>{return res.data}) .catch((err)=> console.log(err))
    return data;
};
export default getOwnProd;