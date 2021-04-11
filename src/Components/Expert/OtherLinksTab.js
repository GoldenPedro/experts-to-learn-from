import React, {useState} from 'react'
import axios from 'axios'
import OtherLink from './OtherLink'
import { connect } from 'react-redux';
import saveUserInfoReducer from '../../Store/Reducers'

const defaultValues = {
    otherLink: ''
}

let useridLocal = window.localStorage.getItem('userid');

const OtherLinksTab = (props) =>{
const {otherLinks, expertId, userinfo} = props
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
            <div>
            
            <div>
                <form onSubmit={submit}>
                    <input onChange={handleChanges} placeholder="Enter link here" value={formValues.otherLink} name="otherLink"></input>
                    <button>Submit</button>
                </form>
            </div>
                
            {otherLinks.map(otherLink => (
                <OtherLink otherLink={otherLink} expertId={expertId} />
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
