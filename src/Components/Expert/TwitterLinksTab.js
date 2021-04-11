import React, {useState} from 'react'
import axios from 'axios'
import TwitterLink from './TwitterLink'
import { connect } from 'react-redux';
import saveUserInfoReducer from '../../Store/Reducers'

const defaultValues = {
    twitterLink: ''
}

let useridLocal = window.localStorage.getItem('userid');

const TwitterLinksTab = (props) =>{
const {twitterLinks, expertId} = props
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
                tweet: formValues.twitterLink.trim(),
                rating: 1
            },
            id: expertId,
            userid: useridLocal,
            name: "twitterLinks"            
        }
        console.log(newData)
        if (formValues.twitterLink.length == 0) {
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


    return(
            <div>
            
            <div>
                <form onSubmit={submit}>
                    <input onChange={handleChanges} placeholder="Enter link here" value={formValues.twitterLink} name="twitterLink"></input>
                    <button>Submit</button>
                </form>
            </div>
                
            {twitterLinks.map(twitterLink => (
                <TwitterLink twitterLink={twitterLink} expertId={expertId} />
            ))}

            </div>
        
    )
}

export default TwitterLinksTab

// const mapStateToProps = state => {
//     return {
//       userinfo: state.saveUserInfoReducer.userinfo.id
//     }
//   }
  
// export default connect(mapStateToProps, {saveUserInfoReducer})(TwitterLinksTab);