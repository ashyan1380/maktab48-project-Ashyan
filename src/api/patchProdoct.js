import axios from "axios";

export const update = async (prodoct) => {
    const data = await axios.patch(
        `http://localhost:5000/product/${prodoct.id}`,prodoct)
};