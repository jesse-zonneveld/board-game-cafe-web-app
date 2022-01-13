import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as RestaurantActions from '../redux/actions/restaurantsActions';
import Reviews from '../components/Reviews';
import AddReview from '../components/forms/AddReview';
import StarRating from '../components/StarRating';
import { Button } from 'react-bootstrap';

const RestaurantDetailPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const currentState = useSelector(state => state.restaurants.currentItem.restaurant);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(RestaurantActions.fetchRestaurant(id));    
            } catch (err) {
                console.log(err);
            };
        }

        fetchData();
    }, [dispatch, id]);

    return (
        <div>
            {currentState && 
            currentState.reviews && 
            (currentState.averageRating || currentState.averageRating == 0) ?
                console.log("uhuhhhh") : console.log("ohohhhh")
            }
            <div>{currentState && 
                    currentState.reviews && 
                    (currentState.averageRating || currentState.averageRating == 0) && (
                <div>
                    {console.log('here')}
                    {console.log(currentState)}
                    <div>
                        <h1>{currentState.name}</h1>
                        <StarRating rating={currentState.averageRating} count={currentState.reviews.length} />
                    </div>
                    <Reviews reviews={currentState.reviews}/>
                    <AddReview />
                    <Button onClick={() => console.log(currentState.reviews)}>Get Reviews</Button>
                </div>
                )}
            </div>

        </div>
    )
};

export default RestaurantDetailPage;
