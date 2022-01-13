import React, { useState } from 'react'
import {Button, Form, Row, Col} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as RestaurantActions from '../../redux/actions/restaurantsActions';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const StyledRow = styled(Row)`
    margin: 20px 0;
`;

const StyledButton = styled(Button)`
`;

const StyledForm = styled(Form)`
    max-width: 500px;
`;

const AddReview = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const currentState = useSelector(state => state.auth);
    const [rating, setRating] = useState("");
    const [body, setBody] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await dispatch(RestaurantActions.createReview({ 
                restaurant_id: id, 
                username: currentState.username, 
                body, 
                rating 
            }));
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <StyledForm onSubmit={handleSubmit}>
                <StyledRow>
                    <Col>
                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Select onChange={e => setRating(e.target.value)} defaultValue="Rating">
                                <option disabled>Rating</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </StyledRow>
                <StyledRow>
                    <Col>
                        <Form.Control as="textarea" rows={3} value={body} onChange={e => setBody(e.target.value)} placeholder="Write your review..."/>
                    </Col>
                </StyledRow>
                <StyledRow>
                    <Col>
                        <StyledButton type="submit">Submit</StyledButton>
                    </Col>
                </StyledRow>
            </StyledForm>
        </div>
    );
};

export default AddReview;
