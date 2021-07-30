import axios from "axios";

export const login = async (email, password) => {
  let res = await axios({
    method: "post",
    url: "https://60d1c0dc5b017400178f44c7.mockapi.io/users/users",
    headers: { "content-type": "application/json" },
    data: JSON.stringify({
      email,
      password,
    }),
  });
  return res;
};