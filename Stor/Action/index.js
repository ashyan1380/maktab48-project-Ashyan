export const loginValidation = () =>{
    return{
        type:"LOGGEDIN",
    }
}

export const fetchProd = (newProd) => {
    return {
        type:"FETCHGET",
        payload:newProd,
    }
}

export const deletProd = (prodId)=>{
    return {
        type:"DELET",
        payload:prodId,
    }
}

export const getUser = (users)=>{
    return {
        type:"GET",
        payload:users,
    }
}
export const deletUserHandle = (id) => {
    return{
        type:"DELETHANDLE",
        payload:id,
    }
}

export const addProdToCart =(prod)=>{
    return {
        type:"ADDCART",
        payload:prod,
    }
}

export const deletProdToCart =(id)=>{
    return {
        type:"DELETCART",
        payload:id,
    }
}

export const userInfo = (info)=>{
    return {
        type:"INFO",
        payload:"info",
    }
}