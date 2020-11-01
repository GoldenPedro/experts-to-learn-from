import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup'
import '../../App.css';

const defaultValues = {
    name: '',
    description: '',
    twitterLink: '',
    youtubeChannel: '',
    blog: '',
    categories: {},
}

const defaultErrors = {
    name: '',
    description: '',
};

const schema = yup.object().shape({
    name: yup.string().required('name is required'),
    description: yup.string().required('Username is required'),
    twitterLink: yup.string(),
    youtubeChannel: yup.string(),
    blog: yup.string(),
    categories: yup.string(),
})

const NewExpert = (props) => {
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
        console.log(formValues)
    }

    const submit = (evt) => {
        evt.preventDefault();
        // Packages an easy-to-use payload to put onto state
        const newData = {
            name: formValues.name.trim(),
            description: formValues.description,
        }
        // Axios functionality
        axios.post('https://reqres.in/api/NewExpert', formValues)
            .then((res) => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
        // Adds new data to state & clears form
        setSavedFormInfo([...savedFormInfo, newData]);
        setFormValues(defaultValues);
        history.push('/');
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
      <div className="new-expert">
          <h2>Submit a new Expert!</h2>
          <form onSubmit={submit}>
              <label>Name: * &nbsp;
                  <input value={formValues.name} onChange={handleChanges} placeholder='Enter name' name="name" type='name' />
              </label>
              {errors.name.length > 0 ? <p>{errors.name}</p> : null}  
              <label>Description: * &nbsp;
                  <input value={formValues.description} onChange={handleChanges} placeholder='Enter description' name="description" />
              </label>
              <label>Twitter Handle: &nbsp;
                  <input value={formValues.twitterLink} onChange={handleChanges} placeholder='Enter twitterLink' name="twitterLink" />
              </label>
              <label>YouTube Channel: &nbsp;
                  <input value={formValues.youtubeChannel} onChange={handleChanges} placeholder='Enter youtubeChannel' name="youtubeChannel" />
              </label>
              <label>Blog: &nbsp;
                  <input value={formValues.blog} onChange={handleChanges} placeholder='Enter blog' name="blog" />
              </label>
              <label>categories: &nbsp;
                  <input value={formValues.categories} onChange={handleChanges} placeholder='Enter categories' name="categories" />
              </label>
              <button disabled={buttonDisabled}>Submit</button>
          </form>
      </div>
    );
  }
  
  export default NewExpert;