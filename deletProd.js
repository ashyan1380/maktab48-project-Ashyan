import axios from "axios";

export const deleteProdoct = async (id) => {
  console.log(id);
   axios.delete(
    `http://localhost:5000/product/${id}`
  )
  // return data;
}
