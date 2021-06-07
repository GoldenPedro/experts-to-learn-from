import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup'
import './ExpertDetailsForm.css'

// const defaultValues = {
//     name: '',
//     description: '',
//     twitterLink: '',
//     youtubeChannel: '',
//     blog: '',
//     category: '',
// }

// let submitData = {
//     name: '',
//     descriptions: {
//         description: '',
//         rating: 1
//     },
//     twitterLinks: {
//         twitterLink: '',
//         rating: 1
//     },
//     youtubeChannels: {
//         youtubeChannel: '',
//         rating: 1
//     },
//     blogs: {
//         blog: '',
//         rating: 1
//     },
//     categories: {
//         category: '',
//         rating: 1
//     },
// }



// const defaultErrors = {
//     name: '',
//     description: '',
// };


// const schema = yup.object().shape({
//     name: yup.string().required('name is required'),
//     description: yup.string().required('Username is required'),
//     twitterLink: yup.string(),
//     youtubeChannel: yup.string(),
//     blog: yup.string(),
//     category: yup.string(),
// })

const NewExpert = (props) => {
    // State
    // const [formValues, setFormValues] = useState(defaultValues);
    const [savedFormInfo, setSavedFormInfo] = useState([]);
    // const [errors, setErrors] = useState(defaultErrors);
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const history = useHistory();
    const {handleChange, nextStep, prevStep, values, submit} = props

    // Form functions
    // const handleChanges = (evt) => {
    //     const { name, value } = evt.target;
    //     validate(name, value);
    //     setFormValues({ ...formValues, [name]: value });
    //     console.log(formValues)
    // }

//   const submit = (evt) => {
//     evt.preventDefault();
//     // Packages an easy-to-use payload to put onto state
//     const newData = {...submitData, descriptions: {description: values.description}}
//     // Axios functionality
//     axios.post('http://www.expertstolearnfrom.com/api/NewExpert', newData)
//         .then((res) => {
//             console.log(res.data);
//         })
//         .catch(err => {
//             console.log(err);
//         })
    // Adds new data to state & clears form
    // setSavedFormInfo([...savedFormInfo, newData]);
    // setFormValues(defaultValues);
    // history.push('/');
// }

    // const validate = (name, value) => {
    //     yup
    //       .reach(schema, name)
    //       .validate(value)
    //       .then((valid) => {
    //         setErrors({ ...errors, [name]: "" });
    //       })
    //       .catch((err) => {
    //         setErrors({ ...errors, [name]: err.errors[0] });
    //       });
    //   };

    // useEffect(() => {
    //     schema.isValid(formValues).then((valid) => {
    //       setButtonDisabled(!valid);
    //     });
    //   }, [formValues]);

    // const validate = () => {
    //     if (values.name == null && values.description == null) {
    //         setButtonDisabled(true);
    //         console.log("setButtonDisabled = true")
    //     } else {
    //         console.log("setButtonDisabled = false")
    //     }
    // }

    return (
      <div className="new-expert">
          <h2>Submit a new Expert!</h2>
          <form className="expert-details-form" onSubmit={submit}>
              <p>Name: *</p>
                  <input value={values.name} onChange={handleChange('name')} minLength="1" maxlength="70" placeholder='Enter name' name="name" type='name' />
              
              {/* {errors.name.length > 0 ? <p>{errors.name}</p> : null}   */}
              <p>Description: *</p>
                  <textarea value={values.description} onChange={handleChange('description')} minLength="10" maxlength="200" placeholder='Enter description' name="description" />
              
              <p>Twitter Handle:</p>
                  <input value={values.twitterLink} onChange={handleChange('twitterLink')} placeholder='Enter twitterLink' name="twitterLink" />
              
              <p>YouTube Channel:</p>
                  <input value={values.youtubeChannel} onChange={handleChange('youtubeChannel')} placeholder='Enter youtubeChannel' name="youtubeChannel" />
              
              <p>Blog:</p>
                  <input value={values.blog} onChange={handleChange('blog')} placeholder='Enter blog' name="blog" />
              
              <button
            //    disabled={buttonDisabled}
            >
                  Submit</button>
          </form>
      </div>
    );
  }
  
  export default NewExpert;