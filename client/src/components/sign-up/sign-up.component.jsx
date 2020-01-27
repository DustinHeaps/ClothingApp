import React, { useState } from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { toast } from 'react-toastify';

import { signUpStart } from '../../redux/user/user.actions';

import { SignUpContainer, Title } from './sign-up.styles';

const SignUp = ({signUpStart}) => {
  const [userCredentials, setCredentials] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const { displayName, email, password, confirmPassword } = userCredentials;


 const handleSubmit = async event => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("passwords don't match");
      return;
    }

    signUpStart({ displayName, email, password });

  };

 const handleChange = event => {
    const { name, value } = event.target;

    setCredentials({...userCredentials, [name]: value });
  };

    return (
      <SignUpContainer>
        <Title>I do not have a account</Title>
        <span>Sign up with your email and password</span>
        <form className="sign-up-form" onSubmit={handleSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            onChange={handleChange}
            label="Display Name"
            required
          />
          <FormInput type="email" name="email" value={email} onChange={handleChange} label="Email" required />
          <FormInput
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            label="Password"
            required
          />
          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            label="Confirm Password"
            required
          />
          <CustomButton type="submit">SIGN UP</CustomButton>
        </form>
      </SignUpContainer>
    );
  }


export default connect(
  null,
  { signUpStart: userData => signUpStart(userData) }
)(SignUp);
