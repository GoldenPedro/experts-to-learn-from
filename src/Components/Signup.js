import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup'
import './Signup.css'

const defaultValues = {
    email: '',
    username: '',
    password: '',
    passwordConfirmation: '',
}

const defaultErrors = {
    email: '',
    username: '',
    password: '',
    passwordConfirmation: '',
};

const schema = yup.object().shape({
    email: yup.string().email('Please enter a valid email').required('Email is required'),
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
    passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
})


function Signup() {
    // State
    const [formValues, setFormValues] = useState(defaultValues);
    const [savedFormInfo, setSavedFormInfo] = useState([]);
    const [errors, setErrors] = useState(defaultErrors);
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const history = useHistory();

    // Form functions
    const handleChanges = (evt) => {
        const { name, value } = evt.target;
        validate(name, value);
        setFormValues({ ...formValues, [name]: value });
    }

    const clearLocalStorage = () => {
        window.localStorage.clear();
      }

    const submit = (evt) => {
        evt.preventDefault();
        // Packages an easy-to-use payload to put onto state
        const newData = {
            email: formValues.email.trim(),
            username: formValues.username.trim(),
            password: formValues.password,
            passwordConfirmation: formValues.password,
        }
        // Axios functionality
        axios.post('https://www.expertstolearnfrom.com/api/users', formValues)
        .then((res) => {
            console.log(res.data);
            console.log(res.data.token);
            clearLocalStorage()
            window.localStorage.setItem('token', res.data.token)
            window.localStorage.setItem('userid', res.data.id)
            window.localStorage.setItem('user', res.data.user)
            window.location.href="/";
            }
        ).catch(err => {
            console.log(err);
        })
        // Adds new data to state & clears form
        setSavedFormInfo([...savedFormInfo, newData]);
        setFormValues(defaultValues);
        // history.push("/dashboard");
    }

    const validate = (name, value) => {
        yup
          .reach(schema, name)
          .validate(value)
          .then((valid) => {
            setErrors({ ...errors, [name]: "" });
          })
          .catch((err) => {
            setErrors({ ...errors, [name]: err.errors[0] });
          });
      };

    useEffect(() => {
        schema.isValid(formValues).then((valid) => {
          setButtonDisabled(!valid);
        });
      }, [formValues]);

    return (
      <div className="signup-container">
          <h2>Register</h2>
          <form onSubmit={submit} className='input-container'>
            <div className='email-container'>
                <p>Email:</p>
                <input value={formValues.email} onChange={handleChanges} placeholder='bob@gmail.com' name="email" type='text' />
            </div>
            <div className='username-container'>
                <p>Username: </p>
                <input value={formValues.username} onChange={handleChanges} placeholder='bob123' name="username" type='username' />
            </div>
            <div className='password-container'>
                <p>Password:</p>
                <input value={formValues.password} onChange={handleChanges} placeholder='password' name="password" type='password' />
                <p>Confirm password:</p>
                <input value={formValues.passwordConfirmation} onChange={handleChanges} placeholder='re-type password' name="passwordConfirmation" type='password' />
            </div>
            <div className='errors'>
                {errors.email.length > 0 ? <p>{errors.email}</p> : null} 
                {errors.username.length > 0 ? <p>{errors.username}</p> : null} 
                {errors.password.length > 0 ? <p>{errors.password}</p> : null}              
            </div>
              <button className='signup-button' disabled={buttonDisabled}><span>Sign up</span></button>
          </form>
      </div>
    );
  }
  
  export default Signup;