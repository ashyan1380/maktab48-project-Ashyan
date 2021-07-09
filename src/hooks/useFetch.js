import axios from "axios";
import { useEffect, useState } from "react";

export const useFetch = async (url) => {
  const [status, setStatus] = useState();
  const [data, setData] = useState();
  /*   useEffect(()=>{

  },[url]) */
  let res = await axios({
    method: "post",
    url: url,
    headers: { "content-type": "application/json" },
  });
  return res;
};
