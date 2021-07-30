const isLogged = (state= true , action) => {
    switch (action.type) {
        case "LOGGEDIN":
            return !state;
        default:
            return state;
    }
}
export default isLogged;