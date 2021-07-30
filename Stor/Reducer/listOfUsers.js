const listOfUsers = (state = [] , action) => {
    switch (action.type) {
        case "GET":
            return  action.payload;
            case "DELETHANDLE":
                return  state.filter((item) => item.id != action.payload)
        default :
            return state;
    }
}
export default listOfUsers;