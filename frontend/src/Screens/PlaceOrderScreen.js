import React, { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import CheckoutSteps from '../components/CheckoutSteps';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { Store } from '../Store';
import { Link,useNavigate } from 'react-router-dom';

export default function PlaceOrderScreen() {
    const navigate = useNavigate();
    const {state, dispatch: ctxDispatch} = useContext(Store);
    const {cart, userInfo} = state;

    const round2 = (num) => Math.round(num*100 + Number.EPSILON) / 100;
    cart.itemsPrice = round2(cart.cartItems.reduce((accumulated, currentItem) => accumulated+currentItem.quantity * currentItem.price, 0));
    cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(9.99);
    cart.taxPrice = round2(0.115* cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    const placeOrderHandler = async () => {}
        
    useEffect(()=>{
        if (!cart.paymentMethod) {
            navigate('/payment')
        }
    },[cart, navigate])
    return <div>
        <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
        <Helmet>
            <title>Summary</title>
        </Helmet>
        <h1 className="my-3">Preview Order</h1>
        <Row>
            <Col md={8}>
                <Card className="mb-3">
                    <Card.Body>
                        <Card.Title>Shipping</Card.Title>
                        <Card.Text>
                            <strong>Name: </strong> {cart.shippingAddress.fullName} <br/>
                            <strong>Address: </strong> {cart.shippingAddress.address}, 
                            {cart.shippingAddress.city}, {cart.shippingAddress.stateUS}, 
                            {cart.shippingAddress.zip}, {cart.shippingAddress.country}, 
                        </Card.Text>
                        <Link to="/shipping">Edit</Link>
                    </Card.Body>
                </Card>
                <Card className="mb-3">
                    <Card.Body>
                        <Card.Title>Payment</Card.Title>
                        <Card.Text>
                            <strong>Method: </strong> {cart.paymentMethod} <br/>
                        </Card.Text>
                        <Link to="/payment">Edit</Link>
                    </Card.Body>
                </Card>
                <Card className="mb-3">
                    <Card.Body>
                        <Card.Title>Your Cart</Card.Title>
                        <ListGroup variant='flush'>
                            {cart.cartItems.map((item) => (
                                <ListGroup.Item key={item._id}>
                                    <Row className="align-items-center">
                                        <Col md={2}>
                                            <img src={item.image} alt={item.name} className="img-fluid rounded img-thumbnail"></img> {' '}
                                        </Col>
                                        <Col md={4}>
                                            <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={3}><span>Quantity: {item.quantity}</span></Col>
                                        <Col md={3}><span>${item.price}</span></Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                        <Link to="/cart">Edit</Link> {' | '}<Link to="/">Forgot to add something?</Link> 
                    </Card.Body>
                </Card>
            </Col>
            <Col md={4}>
                <Card>
                    <Card.Body>
                        <Card.Title>Order Summary</Card.Title>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Taxes(Estimated)</Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Order Total</Col>
                                    <Col><strong>${cart.totalPrice.toFixed(2)}</strong></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <div className="d-grid">
                                    <Button type="button" onClick={placeOrderHandler} disabled={cart.cartItems.length === 0} >Place Order</Button>
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </div>
}