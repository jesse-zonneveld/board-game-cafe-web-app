import React from 'react';
import { useSelector } from 'react-redux';

const Header = () => {
    const currentState = useSelector(state => state.auth);    
    
    return (
        <div>
            <h1 className="font-weight-light display-1 text-center">Restaurants Finder</h1>
            <h3>{currentState.username}</h3>
        </div>
    );
};

export default Header;
