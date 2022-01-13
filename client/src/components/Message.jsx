import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Message = () => {
    const currentRestErrorState = useSelector(state => state.restaurants.error);
    const currentAuthErrorState = useSelector(state => state.auth.error);

    const renderAuthErrors = () => {
        console.log(currentAuthErrorState);
        return (
            <>
                {Object.keys(currentAuthErrorState).map( (key, i) => {
                    return (
                        <div key={i}>
                            <span>{key}</span>
                            <span>{currentAuthErrorState[key]}</span>
                        </div>
                    );
                })}
            </>
        );
    }

    const renderRestaurantErrors = () => {
        console.log(currentRestErrorState);

        return (
            <>
                {Object.keys(currentRestErrorState).map( (key, i) => {
                    return (
                        <div key={i}>
                            <span>{key}</span>
                            <span>{currentRestErrorState[key]}</span>
                        </div>
                    );
                })}
            </>
        );
    }

    return (
        <div>
            {currentAuthErrorState && renderAuthErrors()}
            {currentRestErrorState && renderRestaurantErrors()}
        </div>
    );
}

export default Message;
