const rowsNames = (state= [] , action) => {
    switch (action.type) {
        case "FETCHGET":
            return  action.payload;
        case "DELET":
            return state.filter((item) => item.id != action.payload)
        // case "ADD":
        //     return [action.payload , ...state]
        // case "EDIT":
        //     return 
        default :
            return state;
    }
}
export default rowsNames;