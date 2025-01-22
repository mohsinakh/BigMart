import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";
import cartContext from "../context/cartContext";
import orderContext from "../context/orderContext";
import "./css/PlaceOrder.css"; // Import your custom CSS file

const PlaceOrder = () => {
  const navigate = useNavigate();

  const cartcontext = useContext(cartContext);
  const ordercontext = useContext(orderContext);

  const { getCartProducts, cartProducts } = cartcontext;
  const { placeOrder } = ordercontext;

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        await getCartProducts();
      } catch (error) {
        console.error(error);
      }
    };
    fetchCartData();
    // eslint-disable-next-line
  }, []);

  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    address: "",
    city: "",
    street: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prevShippingInfo) => ({
      ...prevShippingInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        products: cartProducts.map((cartProduct) => ({
          product: cartProduct.product._id,
          quantity: cartProduct.quantity,
        })),
        shippingAddress: {
          fullName: shippingInfo.fullName,
          address: shippingInfo.address,
          city: shippingInfo.city,
          state: shippingInfo.state,
          street: shippingInfo.street,
          postalCode: shippingInfo.postalCode,
          country: shippingInfo.country,
        },
        totalAmount: calculateTotalAmount(),
      };

      const orderPlaced = await placeOrder(orderData);

      if (orderPlaced) {
        // Order placed successfully
        navigate("/confirmation");
        window.scroll(0, 0);
      } else {
        // Handle order placement failure
        console.log("Failed to place order.");
      }
      
    } catch (error) {
      console.error(error);
    }
  };

  const calculateTotalAmount = () => {
    return cartProducts.reduce(
      (accumulator, cartProduct) =>
        accumulator + cartProduct.product.price.regular * cartProduct.quantity,
      0
    );
  };

  const totalAmount = calculateTotalAmount() || 0;

  return (
    <div className="background">
      <Row className="justify-content-center align-items-center ">
        <Col xs={12} md={8} lg={6}>
          <div className="place-order-container mt-4">
            <h2 className="mb-4">Place Your Order</h2>
            {totalAmount && <h3>Total - {totalAmount}</h3>}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="fullName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="fullName"
                  value={shippingInfo.fullName}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={shippingInfo.city}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="postalCode">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  type="text"
                  name="postalCode"
                  value={shippingInfo.postalCode}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  name="country"
                  value={shippingInfo.country}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="street">
                <Form.Label>Street Address</Form.Label>
                <Form.Control
                  type="text"
                  name="street"
                  value={shippingInfo.street}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="state">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  value={shippingInfo.state}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Button
                type="submit"
                variant="primary"
                className="btn btn-primary mt-4"
              >
                Place Order
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PlaceOrder;
