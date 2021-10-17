// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useHistory } from 'react-router-dom';
// import * as yup from 'yup'
// import '../../App.css';

// const defaultValues = {
//     name: '',
//     descriptions: {
//         description: '',
//         rating: 1
//     },
//     twitterLink: '',
//     youtubeChannel: '',
//     blog: '',
//     category: '',
// }

// const defaultErrors = {
//     name: '',
//     description: '',
// };

// const defaultCategorySearch = {
//     category: ''
// }

// const schema = yup.object().shape({
//     name: yup.string().required('name is required'),
//     description: yup.string().required('Username is required'),
//     twitterLink: yup.string(),
//     youtubeChannel: yup.string(),
//     blog: yup.string(),
//     category: yup.string(),
// })

// const NewExpert = (props) => {
//     // State
//     const [formValues, setFormValues] = useState(defaultValues);
//     const [savedFormInfo, setSavedFormInfo] = useState([]);
//     const [categorySearch, setCategorySearch] = useState(defaultCategorySearch)
//     const [errors, setErrors] = useState(defaultErrors);
//     const [buttonDisabled, setButtonDisabled] = useState(true)
//     const history = useHistory();

//     // Form functions
//     const handleChanges = (evt) => {
//         const { name, value } = evt.target;
//         validate(name, value);
//         setFormValues({ ...formValues, [name]: value });
//         console.log(formValues)
//     }

//     const submit = (evt) => {
//         evt.preventDefault();
//         // Packages an easy-to-use payload to put onto state
//         const newData = {
//             name: formValues.name.trim(),
//             description: formValues.description.trim(),
//         }
//         // Axios functionality
//         axios.post('https://www.expertstolearnfrom.com/api/NewExpert', newData)
//             .then((res) => {
//                 console.log(res.data);
//             })
//             .catch(err => {
//                 console.log(err);
//             })
//         // Adds new data to state & clears form
//         setSavedFormInfo([...savedFormInfo, newData]);
//         setFormValues(defaultValues);
//         // history.push('/');
//     }

//     const search = (evt) => {
//         evt.preventDefault();
//         console.log(formValues.category)
//         axios.post('https://www.expertstolearnfrom.com/api/categories', categorySearch)
//         .then(res => {
//             console.log(res.data);
//         })
//     }

//     const handleSearchChanges = (evt) => {
//         const { name, value } = evt.target;
//         setCategorySearch({ ...categorySearch, [name]: value });
//     }

//     const validate = (name, value) => {
//         yup
//           .reach(schema, name)
//           .validate(value)
//           .then((valid) => {
//             setErrors({ ...errors, [name]: "" });
//           })
//           .catch((err) => {
//             setErrors({ ...errors, [name]: err.errors[0] });
//           });
//       };

//     useEffect(() => {
//         schema.isValid(formValues).then((valid) => {
//           setButtonDisabled(!valid);
//         });
//       }, [formValues]);

//     return (
//       <div className="new-expert">
//           <h2>Submit a new Expert!</h2>
//           <form onSubmit={search}>
//               <label>Which category would you like to add a new Expert in? * &nbsp;
//                   <input value={categorySearch.category} onChange={handleSearchChanges} placeholder='Search category' name="category" type='text' />
//               </label>
//               <button>Search</button>
//           </form>
//           <form onSubmit={submit}>
//               <label>Name: * &nbsp;
//                   <input value={formValues.name} onChange={handleChanges} placeholder='Enter name' name="name" type='name' />
//               </label>
//               {errors.name.length > 0 ? <p>{errors.name}</p> : null}  
//               <label>Description: * &nbsp;
//                   <input value={formValues.description} onChange={handleChanges} placeholder='Enter description' name="description" />
//               </label>
//               <label>Twitter Handle: &nbsp;
//                   <input value={formValues.twitterLink} onChange={handleChanges} placeholder='Enter twitterLink' name="twitterLink" />
//               </label>
//               <label>YouTube Channel: &nbsp;
//                   <input value={formValues.youtubeChannel} onChange={handleChanges} placeholder='Enter youtubeChannel' name="youtubeChannel" />
//               </label>
//               <label>Blog: &nbsp;
//                   <input value={formValues.blog} onChange={handleChanges} placeholder='Enter blog' name="blog" />
//               </label>
//               <button disabled={buttonDisabled}>Submit</button>
//           </form>
//       </div>
//     );
//   }
  
//   export default NewExpert;