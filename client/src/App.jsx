import React from 'react';
import {BrowserRouter as Router, Switch } from "react-router-dom";
import Login from './routes/Login';
import Home from './routes/Home';
import RestaurantDetailPage from './routes/RestaurantDetailPage';
import UpdateRestaurantPage from './routes/UpdateRestaurantPage';
import Register from './routes/Register';
import AuthRoute from './components/AuthRoute';
import NavBar from './components/NavBar';
import Message from './components/Message';
import { Button } from 'react-bootstrap';
import * as AuthActions from './redux/actions/authActions';
import { useDispatch } from 'react-redux';

const App = () => {
    const dispatch = useDispatch();

    return (
        <div>
            <Router>
                <NavBar />
                    <Switch>
                        <AuthRoute exact path="/auth/login" type="guest" component={Login} />
                        <AuthRoute exact path="/auth/register" type="guest" component={Register} />
                        <AuthRoute exact path="/" component={Home} type="private"/>
                        <AuthRoute exact path="/restaurants/:id/update" component={UpdateRestaurantPage} type="private"/>
                        <AuthRoute exact path="/restaurants/:id" component={RestaurantDetailPage} type="private"/>
                    </Switch>
                    <Message />
                    <Button onClick={() => dispatch(AuthActions.refreshToken())}>RefrershToken</Button>
            </Router>
        </div>
    );
}

export default App;