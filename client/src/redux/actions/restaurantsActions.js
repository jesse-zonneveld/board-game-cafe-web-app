import API from '../../api/axiosAPI';
// import { useDispatch } from 'react-redux';


//Get All Restaurants - no thunk
// export const readAllRestaurants = async () => {
//     return {
//         type: "READ_RESTAURANTS",
//     }
// }

//Get All Restaurants
// export const readAllRestaurants = () => async (dispatch, getState) => {
//     const response = await Restaurants.get('/restaurants');

//     console.log(response.data.data.restaurants);
//     dispatch({
//         type: "READ_ALL_RESTAURANTS",
//         payload: response.data.data.restaurants
//     })
// }

//Fetch Restaurants
export const fetchRestaurants = () => async (dispatch, getState) => {
    dispatch({
        type: "FETCH_RESTAURANTS_REQUEST",
    });

    try {
        const response = await API.get('/restaurants');

        dispatch({
            type: "FETCH_RESTAURANTS_SUCCESS",
            payload: response.data.data
        });
    } catch (error) {
        dispatch({
            type: "FETCH_RESTAURANTS_FAILURE",
            error: error.response.data.errors
        });
    }
}

//Fetch Restaurant
export const fetchRestaurant = (id) => async (dispatch, getState) => {
    console.log("inside fetch restuarant");
    
    dispatch({
        type: "FETCH_RESTAURANT_REQUEST",
    });

    try {
        const response = await API.get('/restaurants/' + id, {withCredentials: true});

        dispatch({
            type: "FETCH_RESTAURANT_SUCCESS",
            payload: {
                restaurant: response.data.data.restaurant,
            }
        });
    } catch (error) {
        dispatch({
            type: "FETCH_RESTAURANT_FAILURE",
            error: error.response.data.errors
        });
    }
}

//Create Restaurant
export const createRestaurant = (data) => async (dispatch, getState) => {
    const { name, location, price } = data;
 
    dispatch({
        type: "CREATE_RESTAURANT_REQUEST",
    });

    try {
        const response = await API.post("/restaurants", {
            name,
            location,
            price
        }, {withCredentials: true});

        dispatch({
            type: "CREATE_RESTAURANT_SUCCESS",
            payload: response.data.data
        });
    } catch (error) {
        dispatch({
            type: "CREATE_RESTAURANT_FAILURE",
            error: error.response.data.errors
        });
    }
}

//Delete Restaurant
export const deleteRestaurant = (id) => async (dispatch, getState) => {
    dispatch({
        type: "DELETE_RESTAURANT_REQUEST",
    });

    try {
        await API.delete("/restaurants/" + id, {withCredentials: true});

        dispatch({
            type: "DELETE_RESTAURANT_SUCCESS",
            id
        });
    } catch (error) {
        dispatch({
            type: "DELETE_RESTAURANT_FAILURE",
            error: error.response.data.errors
        });
    }
}

//Update Restaurant
export const updateRestaurant = (data) => async (dispatch, getState) => {
    const { id, name, location, price } = data;

    dispatch({
        type: "UPDATE_RESTAURANT_REQUEST",
    })

    try {
        await API.put("/restaurants/" + id, {
            name,
            location,
            price
        }, {withCredentials: true});

        dispatch({
            type: "UPDATE_RESTAURANT_SUCCESS",
        });
    } catch (error) {
        dispatch({
            type: "UPDATE_RESTAURANT_FAILURE",
            error: error.response.data.errors
        });
    }
}

//Create Review
export const createReview = (data) => async (dispatch, getState) => {
    const { restaurant_id, username, body, rating } = data;
    // const dispatch = useDispatch();
 
    dispatch({
        type: "CREATE_REVIEW_REQUEST",
    })

    try {
        const response = await API.post("/reviews/" + restaurant_id + "/create-review", {
            username,
            body,
            rating
        }, {withCredentials: true});

        await dispatch({
            type: "CREATE_REVIEW_SUCCESS",
            payload: response.data.data
        });

    } catch (error) {
        console.log(error);
        dispatch({
            type: "CREATE_REVIEW_FAILURE",
            error: error.response.data.errors
        });
    }
}