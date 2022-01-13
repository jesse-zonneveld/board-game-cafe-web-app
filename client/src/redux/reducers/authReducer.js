const initialState = {
    isLoggedIn: false,
    username: "",
    email: "",
    loading: false,
    error: null
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
         //CREATE USER CASES
         case "CREATE_USER_REQUEST":
            return {
                ...state,
                loading: true,
                error: null
            };
        case "CREATE_USER_SUCCESS":
            return {
                ...state,
                isLoggedIn: true,
                username: action.payload.username,
                email: action.payload.email,
                loading: false,
                error: null
            };
        case "CREATE_USER_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.error
            };

         //LOGIN USER CASES
         case "LOGIN_USER_REQUEST":
            return {
                ...state,
                loading: true,
                error: null
            };
        case "LOGIN_USER_SUCCESS":
            console.log(action.payload);
            return {
                ...state,
                isLoggedIn: true,
                username: action.payload.username,
                email: action.payload.email,
                loading: false,
                error: null
            };
        case "LOGIN_USER_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.error
            };

         //LOGOUT USER CASES
         case "LOGOUT_USER_REQUEST":
            return {
                ...state,
                loading: true,
                error: null
            };
        case "LOGOUT_USER_SUCCESS":
            return {
                ...state,
                isLoggedIn: false,
                username: "",
                email: "",
                loading: false,
                error: null
            };
        case "LOGOUT_USER_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.error
            };

        default:
            // console.log("default case", action.type);
            return state;
    }
}