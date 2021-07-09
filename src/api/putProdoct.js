import axios from "axios";

export const update = async (prodoct) => {
    const data = await axios.put(
        `http://localhost:5000/product/${prodoct.id}`,prodoct)
        .then((res) =>{return res.data}) .catch((err)=> console.log(err))
};