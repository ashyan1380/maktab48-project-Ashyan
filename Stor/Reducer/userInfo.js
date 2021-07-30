const userInfoo = (state = [] , action) => {
    switch (action.type) {
        case "INFO":
            return  action.payload;
        default :
            return state;
    }
}
export default userInfoo;