import React from 'react';
import useInput from '../../hooks/use-input';
import classes from './Checkout.module.css';

const Checkout = props => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInput(value => value.trim() !== '');

  const {
    value: enteredAddress,
    isValid: enteredAddressIsValid,
    hasError: addressInputHasError,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
  } = useInput(value => value.trim() !== '');

  let formIsValid = false;

  if (enteredNameIsValid && enteredAddressIsValid) {
    formIsValid = true;
  }

  const confirmHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      address: enteredAddress
    });
  };

  const nameControlClasses = `${classes.control} ${nameInputHasError ? classes.invalid : ''}`;
  const addressControlClasses = `${classes.control} ${addressInputHasError ? classes.invalid : ''}`;


  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          value={enteredName}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler} />
        {nameInputHasError && (
          <p>Please enter a valid name!</p>
        )}
      </div>
      <div className={addressControlClasses}>
        <label htmlFor='address'>Address</label>
        <input
          type='text'
          id='address'
          value={enteredAddress}
          onChange={addressChangeHandler}
          onBlur={addressBlurHandler}
        />
        {addressInputHasError && (
          <p>Please enter a valid address!</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>Cancel</button>
        <button className={classes.submit} disabled={!formIsValid}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;