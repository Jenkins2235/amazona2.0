import './App.css';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import {LinkContainer} from 'react-router-bootstrap';
import { useContext } from 'react';
import { Store } from './Store';
import CartScreen from './Screens/CartScreen';
import SignInScreen from './Screens/SignInScreen';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ShippingAddressScreen from './Screens/ShippingAddressScreen';
import SignUpScreen from './Screens/SignUpScreen';
import PaymentMethodScreen from './Screens/PaymentMethodScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import OrderScreen from './Screens/OrderScreen';
import OrderHistoryScreen from './Screens/OrderHistoryScreen';
import ProfileScreen from './Screens/ProfileScreen';

function App() {
  const {state, dispatch: ctxDispatch} = useContext(Store);
  const {cart, userInfo} = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT'});
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  }

  return (
    <BrowserRouter>
    <div className="d-flex flex-column site-container">
      <ToastContainer position="bottom-center" limit={1} />
      <header>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>amazona</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto w-100 justify-content-end">
              <Link to="/cart" className='nav-link'>
                Cart
                {cart.cartItems.length > 0 && (
                  <Badge pill bg="danger">
                    {cart.cartItems.reduce((accumulated, currentItem) => accumulated + currentItem.quantity, 0)}
                  </Badge>
                )}
              </Link>
              {userInfo? (
                <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                  <LinkContainer to="/account">
                    <NavDropdown.Item>Account</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/orderhistory">
                    <NavDropdown.Item>Order History</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <Link className='dropdown-item' to='#signout' onClick={signoutHandler}>Sign Out</Link>
                </NavDropdown>
              ):(
                <Link className="nav-link" to="/signin">
                Sign In 
                </Link>
              )}
            </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <main>
        <Container className="mt-5">
        <Routes>
          <Route path="/product/:slug" element={<ProductScreen />} />
          <Route path="/" element={<HomeScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/signin" element={<SignInScreen />} />
          <Route path="/signup" element={<SignUpScreen />} />
          <Route path="/shipping" element={<ShippingAddressScreen />} />
          <Route path="/payment" element={<PaymentMethodScreen />} />
          <Route path="/placeorder" element={<PlaceOrderScreen />} />
          <Route path="/order/:id" element={<OrderScreen />} />
          <Route path="/orderhistory" element={<OrderHistoryScreen />} />
          <Route path="/account" element={<ProfileScreen />} />


        </Routes>
        </Container>
      </main>

      <footer>
        <div className='text-center'> All rights reserved</div>
      </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
