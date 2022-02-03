import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Bars } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';


const LoginScreen = () => {
    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('');

    let location = useLocation();
    let params = useParams();
    const dispatch = useDispatch();
    const history = useNavigate();
    const redirect = location.search ? location.search.split('=')[1]:'/';
    const userLogin = useSelector(state=>state.userLogin);
    const {error,loading,userInfo}=userLogin;

    useEffect(()=>{
        if(userInfo){
            history(redirect);
        }
    },[history,userInfo,redirect])

    const submitHandler=(e)=>{
      e.preventDefault();
      dispatch(login(email,password));

    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <div className="d-flex justify-content-center align-items-center " style={{ height: '80vh' }}> <Bars color="#00BFFF" height={80} width={80} /></div>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                    type='email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}

                    placeholder='Enter Email'
                    
                    >

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    type='password'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}

                    placeholder='Password'
                    
                    >

                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant="primary">Sign In</Button>
            </Form>
            <Row>
                <Col>
            New Customer? <Link to={redirect ? `/register?redirect=${redirect}`:'/register'} >Register </Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default LoginScreen;