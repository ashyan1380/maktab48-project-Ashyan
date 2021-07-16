import axios from "axios";

export const handled = async (userInfo) => {
    const data = await axios.patch(
        `http://localhost:5000/users/${userInfo.id}`,userInfo)
};