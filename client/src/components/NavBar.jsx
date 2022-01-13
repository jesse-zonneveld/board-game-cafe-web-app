import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as AuthActions from '../redux/actions/authActions';

const NavBar = () => {
    const currentState = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const unathenticatedNavBar = () => {
        return (
            <>
                <Link to="/">
                    <li className="nav-item nav-link">Home</li>
                </Link>
                <Link to="/auth/login">
                    <li className="nav-item nav-link">Login</li>
                </Link>
                <Link to="/auth/register">
                    <li className="nav-item nav-link">Register</li>
                </Link>
            </>
        )
    }

    const logoutUser = () => {
        dispatch(AuthActions.logoutUser());
    }

    const athenticatedNavBar = () => {
        return (
            <>
                <Link to="/">
                    <li className="nav-item nav-link">Home</li>
                </Link>
                <Button onClick={logoutUser}>Logout</Button>
            </>
        )
    }

    return (
        <div className="nav-bar">
            <ul>
                {currentState.isLoggedIn ? athenticatedNavBar() : unathenticatedNavBar()}
            </ul>
        </div>
    );
}

export default NavBar;
