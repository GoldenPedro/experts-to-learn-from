import React, {useState, useEffect} from 'react'
import axios from 'axios'
import OtherLink from './OtherLink'
import { connect } from 'react-redux';
import saveUserInfoReducer from '../../Store/Reducers'

import './Tabs.css'

const defaultValues = {
    otherLink: ''
}

let useridLocal = window.localStorage.getItem('userid');

const OtherLinksTab = (props) =>{
const {otherLinks, expertId, upvotes, downvotes} = props
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
                otherLink: formValues.otherLink.trim(),
                rating: 1
            },
            id: expertId,
            userid: useridLocal,
            name: "otherLinks"            
        }
        console.log(newData)
        if (formValues.otherLink.length == 0) {
            alert("Input cannot be empty")
        } else {
            // Axios functionality
            axios.post('https://www.expertstolearnfrom.com/api/addexpertdetails/', newData)
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
            <div>
            
            <div id="detailForm">
                <form onSubmit={submit}>
                    <input onChange={handleChanges} placeholder="Enter link here" value={formValues.otherLink} name="otherLink"></input>
                    <button>Submit</button>
                </form>
            </div>
                
            {otherLinks.map(otherLink => (
                <OtherLink upvotes={upvotes} downvotes={downvotes} otherLink={otherLink} expertId={expertId} />
            ))}

            </div>
        
    )
}

export default OtherLinksTab;

// const mapStateToProps = state => {
//     return {
//       userinfo: state.saveUserInfoReducer.userinfo.id
//     }
//   }
  
// export default connect(mapStateToProps, {saveUserInfoReducer})(OtherLinksTab);
