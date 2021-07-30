// import axios from "axios";

// export const newUserOrder = async (user) => {
//     const data = await axios.post(
//         `http://localhost:5000/users/`,user);
// };
import axios from "axios";

export const newUserOrder = async (user) => {
    const data = await axios.post(
        `http://localhost:5000/users`,user)
        .then((res) =>{return res.data}) .catch((err)=> console.log(err))
};