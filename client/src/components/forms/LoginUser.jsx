import React, { useEffect, useState } from 'react'
import {Button, Form, Row, Col} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import * as AuthActions from '../../redux/actions/authActions';
import styled from 'styled-components';

const StyledRow = styled(Row)`
    margin: 20px 0;
`;

const StyledButton = styled(Button)`
`;

const StyledForm = styled(Form)`
    max-width: 500px;
`;

const LoginUser = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await dispatch(AuthActions.loginUser({ email, password }));
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <StyledForm onSubmit={handleSubmit}>
                <StyledRow>
                    <Col>
                        <Form.Control value={email} onChange={e => setEmail(e.target.value)} placeholder="email" required/>
                    </Col>
                </StyledRow>
                <StyledRow>
                    <Col>
                        <Form.Control value={password} onChange={e => setPassword(e.target.value)} placeholder="password" required/>
                    </Col>
                </StyledRow>
                <StyledRow>
                    <Col>
                        <StyledButton type="submit">Login</StyledButton>
                    </Col>
                </StyledRow>
            </StyledForm>
        </div>
    );
};

export default LoginUser;
