import React from 'react';
import AddRestaurant from '../components/forms/AddRestaurant';
import Header from '../components/Header';
import RestaurantList from '../components/RestaurantList';
import {Container, Button} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import * as AuthActions from '../redux/actions/authActions';

const Home = () => {
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(AuthActions.logoutUser());
    }

    return (
        <Container>
            <Header/>
            <AddRestaurant/>
            <RestaurantList/>
            <Button onClick={logout}>Logout</Button>
        </Container>
    );
};

export default Home;
