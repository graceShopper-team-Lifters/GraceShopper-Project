import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from '../../app/store';
import BasicModal from './modal';

// TODO: wire up the trigger logic to pass `open` and `onClose` to the parent components of <AuthForm>
const AuthForm = ({ name, displayName, open, onClose }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const email = evt.target.email.value;
    const password = evt.target.password.value;
    dispatch(authenticate({ username, email, password, method: formName }));
  };

  return (
    <BasicModal open={open} onClose={onClose}>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" required />
        </div>
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="email" required />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" required />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && <div> {error} </div>}
      </form>
    </BasicModal>
  );
};

export default AuthForm;
