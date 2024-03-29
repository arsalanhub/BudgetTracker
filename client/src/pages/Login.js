import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { loginURL } from '../urls';
import 'react-toastify/dist/ReactToastify.css';
import CircularBackdrop from '../components/utils/CircularBackdrop';
import { toastOptions } from '../utils/common';

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: '', password: '' });
  const [backdrop, setBackdrop] = useState(false);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === '') {
      toast.error('Email and Password is required.', toastOptions);
      return false;
    } else if (password === '') {
      toast.error('Email and Password is required.', toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    setBackdrop(true);
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginURL, {
        username,
        password,
      });
      setBackdrop(false);
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        await localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/dashboard');
      }
    }
  };

  return (
    <>
      {backdrop && <CircularBackdrop />}
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <h1>Budget Tracker</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Log In</button>
          <span>
            Don't have an account ? <Link to="/register">Create One.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #3f3f3f;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4826b9;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4826b9;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4826b9;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4826b9;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
