import axios from "axios";

export const prodoctsCategor = async (category) => {
    const data = await axios({
        method:"GET",
        url:`http://localhost:5000/product?category=${category}`
    }).then((res) =>{return res.data}) .catch((err)=> console.log(err))
    return data;
};
export default prodoctsCategor;