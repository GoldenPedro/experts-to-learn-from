import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Description from './Description'
import { connect } from 'react-redux';
import saveUserInfoReducer from '../../Store/Reducers'
import './Tabs.css'

const defaultValues = {
    descriptionText: ''
}

let useridLocal = window.localStorage.getItem('userid');

const DescriptionsTab = (props) =>{
const {descriptions, expertId, userinfo} = props
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
                description: formValues.descriptionText.trim(),
                rating: 1
            },
            id: expertId,
            userid: useridLocal,
            name: "descriptions"            
        }
        console.log(newData)
        if (formValues.descriptionText.length == 0) {
            alert("Input cannot be empty")
        } else {
            // Axios functionality
            axios.post('http://www.expertstolearnfrom.com/api/addexpertdetails/', newData)
                .then((res) => {
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        // Adds new data to state & clears form
        setSavedFormInfo([...savedFormInfo, newData]);
        setFormValues(defaultValues);
        // history.push('/');
    }

    useEffect(() => {
        if (useridLocal != null) {
            document.getElementById("detailForm").style.visibility = "visible";
        }
    }, [])


    return(
            <div className="">
                <div id="detailForm">
                    <form onSubmit={submit}>
                        <input onChange={handleChanges} placeholder="Enter description here" value={formValues.descriptionText} name="descriptionText"></input>
                        <button>Submit</button>
                    </form>
                </div>
                    
                {descriptions.map(description => (
                    <Description description={description} expertId={expertId} />
                ))}
            </div>
        
    )
}

export default DescriptionsTab

// const mapStateToProps = state => {
//     return {
//       userinfo: state.saveUserInfoReducer.userinfo.id
//     }
//   }
  
// export default connect(mapStateToProps, {saveUserInfoReducer})(DescriptionsTab);
