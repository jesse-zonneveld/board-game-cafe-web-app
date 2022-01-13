import React, { useState } from 'react'
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

const RegisterUser = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [password2, setPassword2] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await dispatch(AuthActions.createUser({ username, email, password }));
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <StyledForm onSubmit={handleSubmit}>
                <StyledRow>
                    <Col>
                        <Form.Control value={username} onChange={e => setUsername(e.target.value)} placeholder="username" />
                    </Col>
                </StyledRow>
                <StyledRow>
                    <Col>
                        <Form.Control value={email} onChange={e => setEmail(e.target.value)} placeholder="email" />
                    </Col>
                </StyledRow>
                <StyledRow>
                    <Col>
                        <Form.Control value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"/>
                    </Col>
                </StyledRow>
                {/* <StyledRow>
                    <Col>
                        <Form.Control value={password2} onChange={e => setPassword2(e.target.value)} placeholder="Confirm Password"/>
                    </Col>
                </StyledRow> */}
                <StyledRow>
                    <Col>
                        <StyledButton type="submit">Submit</StyledButton>
                    </Col>
                </StyledRow>
            </StyledForm>
        </div>
    );
};

export default RegisterUser;
