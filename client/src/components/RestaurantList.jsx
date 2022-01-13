import React, { useEffect } from 'react'
import { Table, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as RestaurantActions from '../redux/actions/restaurantsActions';
import StarRating from './StarRating';

const RestaurantList = (props) => {
    const dispatch = useDispatch();
    const currentState = useSelector(state => state.restaurants);
    let history = useHistory();

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        try {
            dispatch(RestaurantActions.deleteRestaurant(id));
        } catch (err) {
            console.log(err);
        }
    }

    const handleUpdate = (e, id) => {
        e.stopPropagation();
        history.push("/restaurants/" + id + "/update");
    }

    const handleRestaurantSelect = (id) => {
        history.push("/restaurants/" + id);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(RestaurantActions.fetchRestaurants());
                console.log(currentState);
            } catch (err) {
                console.log(err);
            };
        }

        fetchData();
    }, [dispatch]);

    const renderRestaurants = () => {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Restaurant</th>
                        <th>Location</th>
                        <th>Price Range</th>
                        <th>Reviews</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {currentState.items && currentState.items.map((restaurant) => {
                        return (
                            <tr onClick={() => handleRestaurantSelect(restaurant._id)} key={restaurant._id}>
                                <td>{restaurant.name}</td>
                                <td>{restaurant.location}</td>
                                <td>{"$".repeat(restaurant.price)}</td>
                                <td><StarRating rating={restaurant.averageRating} count={restaurant.reviews.length} /></td>
                                <td><Button onClick={(e) => handleUpdate(e, restaurant._id)}>Edit</Button></td>
                                <td><Button onClick={(e) => handleDelete(e, restaurant._id)} variant="danger">Delete</Button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        )
    }

    return (
        <div>
            {renderRestaurants()}
        </div>
    );
};

export default RestaurantList;
