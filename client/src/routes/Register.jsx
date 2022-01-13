import React from 'react';
import { Link } from 'react-router-dom';
import RegisterUser from '../components/forms/RegisterUser';

const Register = () => {
    return (
        <div>
            <h1>Register</h1>
            <RegisterUser />
            <h5>Already registed? <Link to="/auth/login">Login</Link></h5>
        </div>
    );
};

export default Register;
