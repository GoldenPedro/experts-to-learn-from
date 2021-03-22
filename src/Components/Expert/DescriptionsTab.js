import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Description from './Description'
import { connect } from 'react-redux';
import saveUserInfoReducer from '../../Store/Reducers'

const defaultValues = {
    descriptions: ''
}

const DescriptionsTab = (props) =>{
const {descriptions, id, userinfo} = props
const [formValues, setFormValues] = useState(defaultValues);
const [savedFormInfo, setSavedFormInfo] = useState([]);


    // Form functions
    const handleChanges = (evt) => {
        const { name, value } = evt.target;
        setFormValues({ ...formValues, [name]: value });
        console.log(formValues)
    }

    const submit = (evt) => {
        evt.preventDefault();
        // Packages an easy-to-use payload to put onto state
        var newData = {
            value: {
                description: formValues.descriptionLink.trim(),
                rating: 1
            },
            id: id,
            userid: userinfo,
            name: "descriptions"            
        }
        console.log(newData)
        // Axios functionality
        axios.post('http://www.expertstolearnfrom.com/api/addexpertdetails/', newData)
            .then((res) => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
        // Adds new data to state & clears form
        setSavedFormInfo([...savedFormInfo, newData]);
        setFormValues(defaultValues);
        // history.push('/');
    }


    return(
            <div className="">
                <div>
                    <form onSubmit={submit}>
                        <input onChange={handleChanges} placeholder="Enter link here" value={formValues.descriptions} name="descriptions"></input>
                        <button>Submit</button>
                    </form>
                </div>
                    
                {descriptions.map(description => (
                    <Description description={description} />
                ))}
            </div>
        
    )
}

const mapStateToProps = state => {
    return {
      userinfo: state.saveUserInfoReducer.userinfo.id
    }
  }
  
export default connect(mapStateToProps, {saveUserInfoReducer})(DescriptionsTab);
