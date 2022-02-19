import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Bars } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { saveShippingAddress } from '../actions/cartActions';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';

const ShippingScreen = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalcode, setPostalcode] = useState(shippingAddress.postalcode);
    const [country, setCountry] = useState(shippingAddress.country);


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalcode, country }))
        history('/payment')

    }

    return (
        <FormContainer>
            <h1>Shipping Address</h1>


            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        type='address'
                        value={address ? address : ''}
                        onChange={(e) => setAddress(e.target.value)}

                        placeholder='Enter Your Address'

                    >

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='city'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        required
                        type='city'
                        value={city ? city : ''}
                        onChange={(e) => setCity(e.target.value)}

                        placeholder='City'

                    >

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='postalcode'>
                    <Form.Label>Postalcode</Form.Label>
                    <Form.Control
                        required
                        type='postalcode'
                        value={postalcode ? postalcode : ''}
                        onChange={(e) => setPostalcode(e.target.value)}

                        placeholder='Postalcode'

                    >

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        required
                        type='country'
                        value={country ? country : ''}
                        onChange={(e) => setCountry(e.target.value)}

                        placeholder='Country'

                    >

                    </Form.Control>
                </Form.Group>
                <br />
                <Button type='submit' variant="primary">Continue</Button>
            </Form>

        </FormContainer>
    );
};

export default ShippingScreen;