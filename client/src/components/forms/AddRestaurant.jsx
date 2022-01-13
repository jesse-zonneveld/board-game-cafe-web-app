import React, { useState } from 'react'
import {Button, Form, Row, Col} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import * as RestaurantActions from '../../redux/actions/restaurantsActions';

const AddRestaurant = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            dispatch(RestaurantActions.createRestaurant({ name, location, price }))
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="my-5">
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.Control value={name} onChange={e => setName(e.target.value)} placeholder="name"/>
                    </Col>
                    <Col>
                        <Form.Control value={location} onChange={e => setLocation(e.target.value)} placeholder="location"/>
                    </Col>
                    <Col>
                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Select onChange={e => setPrice(e.target.value)} defaultValue="Price Range">
                                <option disabled>Price Range</option>
                                <option value="1">$</option>
                                <option value="2">$$</option>
                                <option value="3">$$$</option>
                                <option value="4">$$$$</option>
                                <option value="5">$$$$$</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col><Button type="submit">Add</Button></Col>
                </Row>
            </Form>
        </div>
    );
};

export default AddRestaurant;
