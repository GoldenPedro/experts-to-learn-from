import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup'

const defaultValues = {
    email: '',
    password: '',
    passwordConfirmation: '',
}

const defaultErrors = {
    email: '',
    password: '',
    passwordConfirmation: '',
};

const schema = yup.object().shape({
    email: yup.string().email('Please enter a valid email').required('Email is required'),
    password: yup.string().required('Password is required'),
    passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
})


function Login() {
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

    const submit = (evt) => {
        evt.preventDefault();
        // Packages an easy-to-use payload to put onto state
        const newData = {
            email: formValues.email.trim(),
            password: formValues.password,
            passwordConfirmation: formValues.password,
        }
        // Axios functionality
        axios.post('http://www.expertstolearnfrom.com/api/users', formValues)
        .then((res) => {
            console.log(res.data);
            console.log(res.data.token);
            window.localStorage.setItem('token', res.data.token)
            history.push("/");
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
      <div className="login">
          <form onSubmit={submit}>
              <label>email:
                  <input value={formValues.email} onChange={handleChanges} placeholder='Enter email' name="email" type='text' />
              </label>
              {errors.email.length > 0 ? <p>{errors.email}</p> : null} 
              <label>Password:
                  <input value={formValues.password} onChange={handleChanges} placeholder='Enter password' name="password" type='password' />
                  <input value={formValues.passwordConfirmation} onChange={handleChanges} placeholder='Enter password' name="passwordConfirmation" type='password' />
                  {errors.password.length > 0 ? <p>{errors.password}</p> : null}              
              </label>
              <button disabled={buttonDisabled}>Log in</button>
          </form>
      </div>
    );
  }
  
  export default Login;