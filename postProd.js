import axios from "axios";

export const add = async (prodoct) => {
    const data = await axios.post(
        `http://localhost:5000/product`,prodoct)
        .then((res) =>{return res.data}) .catch((err)=> console.log(err))
};