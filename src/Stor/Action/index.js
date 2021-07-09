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

export const editProd = (prodoct)=> {
    return{
        type:"EDIT",
        payload:prodoct,
    }
}