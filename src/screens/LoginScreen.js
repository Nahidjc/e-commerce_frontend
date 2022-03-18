import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Bars } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams, Navigate } from 'react-router-dom';
import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    let location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const redirect = location.search ? location.search.split('=')[1] : '/';
    const userLogin = useSelector(state => state.userLogin);
    const { error, loading, userInfo } = userLogin;

    useEffect(() => {

        if (userInfo) {
            toast.success("Successfully Login Done!");
            navigate(redirect)
        }
        if (error) {

            toast.error(error);
        }
    }, [navigate, userInfo, redirect, error])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));

    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <div className="d-flex justify-content-center align-items-center " style={{ height: '80vh' }}> <Bars color="#00BFFF" height={80} width={80} /></div>}
            <Form onSubmit={submitHandler}>
                <ToastContainer />

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}

                        placeholder='Enter Email'

                    >

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}

                        placeholder='Password'

                    >

                    </Form.Control>
                </Form.Group>
                <br />
                <Button type='submit' variant="primary">Sign In</Button>
            </Form>
            <Row>
                <Col>
                    New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} >Register </Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default LoginScreen;