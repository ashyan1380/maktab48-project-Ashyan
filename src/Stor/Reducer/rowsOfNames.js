const rowsNames = (state= [] , action) => {
    switch (action.type) {
        case "FETCHGET":
            return  action.payload;
        case "DELET":
            return state.filter((item) => item.id != action.payload)
        case "EDIT":
            return [action.payload , ...state]
        default :
            return state;
    }
}
export default rowsNames;