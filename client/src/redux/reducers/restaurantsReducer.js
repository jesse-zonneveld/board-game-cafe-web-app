const initialState = {
    items: [],
    itemsCount: 0,
    currentItem: {},
    loading: false,
    error: null
}

export const restaurantsReducer = (state = initialState, action) => {
    switch (action.type) {
        //FETCH ALL CASES
        case "FETCH_RESTAURANTS_REQUEST":
            return {
                ...state,
                loading: true,
                error: null
            };
        case "FETCH_RESTAURANTS_SUCCESS":
            return {
                ...state,
                items: action.payload,
                loading: false,
                error: null
            };
        case "FETCH_RESTAURANTS_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.error
            };

        //FETCH SINGULAR CASES
        case "FETCH_RESTAURANT_REQUEST":
            return {
                ...state,
                loading: true,
                error: null
            };
        case "FETCH_RESTAURANT_SUCCESS":
            let payloadCopy = action.payload;
            if (!payloadCopy.restaurant['averageRating']) {
                payloadCopy.restaurant['averageRating'] = 0;
            }

            console.log(payloadCopy);
            
            return {
                ...state,
                currentItem: payloadCopy,
                loading: false,
                error: null
            };
        case "FETCH_RESTAURANT_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.error
            };

        //CREATE RESTAURANT CASES
        case "CREATE_RESTAURANT_REQUEST":
            return {
                ...state,
                loading: true,
                error: null
            };
        case "CREATE_RESTAURANT_SUCCESS":
            return {
                ...state,
                items: [...state.items, action.payload],
                loading: false,
                error: null
            };
        case "CREATE_RESTAURANT_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.error
            };

        //DELETE CASES
        case "DELETE_RESTAURANT_REQUEST":
            return {
                ...state,
                loading: true,
                error: null
            };
        case "DELETE_RESTAURANT_SUCCESS":
            return {
                ...state,
                items: state.items.filter(restaurant => restaurant._id !== action.id),
                loading: false,
                error: null
            };
        case "DELETE_RESTAURANT_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.error
            };

        //UPDATE CASES
        case "UPDATE_RESTAURANT_REQUEST":
            return {
                ...state,
                loading: true,
                error: null
            };
        case "UPDATE_RESTAURANT_SUCCESS":            
            return {
                ...state,
                loading: false,
                error: null
            };
        case "UPDATE_RESTAURANT_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.error
            };

        //CREATE REVIEW CASES
        case "CREATE_REVIEW_REQUEST":
            return {
                ...state,
                loading: true,
                error: null
            };
        case "CREATE_REVIEW_SUCCESS":
            return {
                ...state,
                currentItem: { 
                    restaurant: { 
                        ...state.currentItem.restaurant, 
                        reviews: [...state.currentItem.restaurant.reviews, action.payload]
                    }
                },
                loading: false,
                error: null
            };
        case "CREATE_REVIEW_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.error
            };

        default:
            return state;
    }
}