import React from "react";
import { Segment, Container, Grid, List, Header } from "semantic-ui-react";
import './Footer.css';
const Footer = () => (


    <Segment inverted vertical >
        <Container>
            <Grid divided inverted stackable>
                <Grid.Row>
                    <Grid.Column width={3}>
                        <h3> About </h3>
                        <List >
                            <List.Item >Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, praesentium.</List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <h4 inverted>About Us</h4>
                        <div>
                            <span>Careers</span><br />
                            <span>Our Stores</span><br />
                            <span>Terms & Conditions</span><br />
                            <span>Privacy Policy</span>

                        </div>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <h4 inverted>Customer Care</h4>
                        <div >
                            <span>Help Center</span><br />
                            <span>How to Buy</span><br />
                            <span>Track Your Order</span><br />
                            <span>Corporate & Bulk Purchasing</span>

                        </div>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <h4 inverted>Contact Us</h4>
                        <div>
                            <span>70 Washington Square South, New York, NY 10012, United States</span><br />
                            <span>Email: nahidjc80@gmail.com</span><br />
                            <span>Phone: 01910125428</span>

                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Grid.Column className='text-center mt-4'>
                Copyright &copy; NihaShopBD

            </Grid.Column>
        </Container>
    </Segment>


);


export default Footer;


