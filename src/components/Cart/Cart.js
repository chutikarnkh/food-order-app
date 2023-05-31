import React, { useContext, useState } from 'react';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';
import useHttp from '../../hooks/use-http';

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);
  const { error, sendRequest: sendOrder } = useHttp();

  const totalAmount = `฿${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    sendOrder({
      url: 'https://react-http-9779b-default-rtdb.asia-southeast1.firebasedatabase.app/order.json',
      method: 'POST',
      body: {
        user: userData,
        orderedItems: cartCtx.items
      }
    });

    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartClasses = `${classes['cart-items']} ${isCheckout ? classes['with-checkout'] : ''}`;

  const cartItems = (
    <ul className={cartClasses}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button
        onClick={props.onClose}
      >
        Close
      </button>
      {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>
  );


  const cartModalContent = (
    <div>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
      {!isCheckout && modalActions}
    </div>
  );

  const submittingModalContent = <p>Sending order data...</p>;
  const submittedModalContent = (
    <React.Fragment>
      <p className={error ? classes.invalid : ''}>
        {error ? error : 'Successfully sent the order!'}
      </p>
      <div className={classes.actions}>
        <button
          className={classes.button}
          onClick={props.onClose}
        >
          Close
        </button>
      </div >
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && submittingModalContent}
      {!isSubmitting && didSubmit && submittedModalContent}
    </Modal>
  );
};

export default Cart;
