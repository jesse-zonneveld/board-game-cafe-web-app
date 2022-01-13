import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {Button, Form, Col} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as RestaurantActions from '../../redux/actions/restaurantsActions';

const UpdateRestaurant = () => {
    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const currentState = useSelector(state => state.restaurants.currentItem.restaurant);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await dispatch(RestaurantActions.updateRestaurant({ id, name, location, price}))
            history.push("/");
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(RestaurantActions.fetchRestaurant(id));    
;            } catch (err) {
                console.log(err);
            };
        }

        fetchData();
    }, [dispatch, id]);

    useEffect(() => {
        const setupRestaurantValues = () => {            
            setName(currentState.name);
            setLocation(currentState.location);
            setPrice(currentState.price);
        }

        if (currentState) {
            setupRestaurantValues();
        }
    }, [currentState]);

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control id="name" onChange={e => setName(e.target.value)} value={name}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Location</Form.Label>
                    <Form.Control id="location" onChange={e => setLocation(e.target.value)} value={location}/>
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="formGridState">
                    <Form.Label>Price </Form.Label>
                    <Form.Select id="price" onChange={e => setPrice(parseInt(e.target.value))} value={price}>
                        <option disabled>Price </option>
                        <option value="1">$</option>
                        <option value="2">$$</option>
                        <option value="3">$$$</option>
                        <option value="4">$$$$</option>
                        <option value="5">$$$$$</option>
                    </Form.Select>
                </Form.Group>
                <Button type="submit">Update</Button>
            </Form>
        </div>
    )
};

export default UpdateRestaurant;
