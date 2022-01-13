import API from '../../api/axiosAPI';

// Refresh Token
export const refreshToken = () => async (dispatch, getState) => {
    console.log("inside refresh token");
    dispatch({
        type: "REQUEST_TOKEN_REQUEST",
    });

    try {
        await API.post("/auth/refresh-token", null, {withCredentials: true});

        await dispatch({
            type: "REQUEST_TOKEN_SUCCESS",
        });

    } catch (error) {
        dispatch({
            type: "REQUEST_TOKEN_FAILURE",
            error: error.response.data.errors
        });
    }
}

//Login User
export const loginUser = (user) => async (dispatch, getState) => {
    const { email, password } = user;
 
    dispatch({
        type: "LOGIN_USER_REQUEST",
    });

    try {
        const response = await API.post("/auth/login/login-user", {
            email,
            password,
        }, {withCredentials: true});

        await dispatch({
            type: "LOGIN_USER_SUCCESS",
            payload: response.data.user
        });

    } catch (error) {
        dispatch({
            type: "LOGIN_USER_FAILURE",
            error: error.response.data.errors
        });
    }
}

//Logout User
export const logoutUser = () => async (dispatch, getState) => {
 
    dispatch({
        type: "LOGOUT_USER_REQUEST",
    });

    try {
        await API.get("/auth/logout", {withCredentials: true});

        await dispatch({
            type: "LOGOUT_USER_SUCCESS",
        });

    } catch (error) {
        dispatch({
            type: "LOGOUT_USER_FAILURE",
            error: error.response.data.errors
        });
    }
}

//Create User
export const createUser = (data) => async (dispatch, getState) => {
    console.log(data);
    const { username, email, password } = data;
 
    dispatch({
        type: "CREATE_USER_REQUEST",
    });

    try {
        const response = await API.post("/auth/register/create-user", {
            username,
            email,
            password
        });

        await dispatch({
            type: "CREATE_USER_SUCCESS",
            payload: response.data.data
        });

        dispatch(loginUser({ email, password }));
    } catch (error) {
        dispatch({
            type: "CREATE_USER_FAILURE",
            error: error.response.data.errors
        });
    }
}