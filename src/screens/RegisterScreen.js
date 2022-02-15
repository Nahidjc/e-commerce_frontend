import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Bars } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { login, register } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';

const RegisterScreen = () => {
    const [message, setMessage] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    let location = useLocation();
    let params = useParams();
    const dispatch = useDispatch();
    const history = useNavigate();
    const redirect = location.search ? location.search.split('=')[1] : '/';
    const userRegister = useSelector(state => state.userRegister);
    const { error, loading, userInfo } = userRegister;

    useEffect(() => {
        if (userInfo) {
            history(redirect);
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match")
        } else {
            dispatch(register(name, email, password));
        }


    }

    return (
        <FormContainer>
            <h1>Registration</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <div className="d-flex justify-content-center align-items-center " style={{ height: '80vh' }}> <Bars color="#00BFFF" height={80} width={80} /></div>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}

                        placeholder='Enter Your Name'

                    >

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        required
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
                        required
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}

                        placeholder='Password'

                    >

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}

                        placeholder='Confirm Password'

                    >

                    </Form.Control>
                </Form.Group>
                <br />
                <Button type='submit' variant="primary">Sign Up</Button>
            </Form>
            <Row>
                <Col>
                    Have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} >Login </Link>
                </Col>
            </Row>
        </FormContainer>
    );
};
export default RegisterScreen;