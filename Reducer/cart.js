const cart = (state= [] , action) => {
    switch (action.type) {
        case "ADDCART":
            return  [action.payload, ...state];
        case "DELETCART":
            return state.filter((item) => item.id !== action.payload)
        case "DELETALL":
            return  [];
        default :
            return state;
    }
}
export default cart;