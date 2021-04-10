import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveUserInfoAction } from '../Store/Actions'
import * as yup from 'yup'
// import '../App.css';

const defaultValues = {
    email: '',
    password: '',
}

const defaultErrors = {
    email: '',
    password: '',
};

const schema = yup.object().shape({
    email: yup.string().email('Must be a valid email').required('Email is required'),
    password: yup.string().required('Password is required'),
    passwordConfirmation: yup.string()
     .oneOf([yup.ref('password'), null], 'Passwords must match')
})

const Login = (props) => {
    // State
    const [formValues, setFormValues] = useState(defaultValues);
    const [savedFormInfo, setSavedFormInfo] = useState([]);
    const [errors, setErrors] = useState(defaultErrors);
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const { saveUserInfoAction } = props
    const history = useHistory();

    const clearLocalStorage = () => {
      window.localStorage.clear();
    }

    // Form functions
    const handleChanges = (evt) => {
        const { name, value } = evt.target;
        validate(name, value);
        setFormValues({ ...formValues, [name]: value });
    }
    

    const submit = (evt) => {
        evt.preventDefault();
        // Packages an easy-to-use payload to put onto state
        const newData = {
            email: formValues.email.trim(),
            password: formValues.password,
        }
        // Axios functionality
        axios.post('http://www.expertstolearnfrom.com/api/login', formValues)
            .then((res) => {
                console.log(res.data);
                clearLocalStorage()
                window.localStorage.setItem('token', res.data.token)
                window.localStorage.setItem('userid', res.data.id)
                window.localStorage.setItem('user', res.data.user)
                saveUserInfoAction(res.data)
                window.location.href="/";
            })
            .catch(err => {
                console.log(err);
                alert(err)
            })
        // Adds new data to state & clears form
        setSavedFormInfo([...savedFormInfo, newData]);
        setFormValues(defaultValues);
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
        <div className="login-container">
            <h2>Log In</h2>
            <form onSubmit={submit} className='input-container'>
              <div className='email-container'>
                <p>Email:</p>
                <input value={formValues.email} onChange={handleChanges} placeholder='example@email.com' name="email" type='email' />
              </div>
              <div className='password-container'>
                <p>Password:</p>
                <input id='password-input' value={formValues.password} onChange={handleChanges} placeholder='password123' name="password" type='password' />
              </div>
              <div className='errors'>
                {errors.email.length > 0 ? <p id='error-text' >{errors.email}</p> : null} 
              </div>
              <button className='login-button' disabled={buttonDisabled}><span>Login</span></button>                
            </form>
        </div>
      );
    }

  const mapStateToProps = state => {
    return {
      userinfo: state.saveUserInfoAction
  }
}
  
  export default connect(mapStateToProps, { saveUserInfoAction })(Login);