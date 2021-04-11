import React, {useState} from 'react'
import axios from 'axios'
import YoutubeChannel from './YoutubeChannel'
import { connect } from 'react-redux';
import saveUserInfoReducer from '../../Store/Reducers'

const defaultValues = {
    youtubeChannelLink: ''
}

let useridLocal = window.localStorage.getItem('userid');

const YoutubeChannelsTab = (props) =>{
const {youtubeChannels, expertId, userinfo} = props
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
                youtubeChannel: formValues.youtubeChannelLink.trim(),
                rating: 1
            },
            id: expertId,
            userid: useridLocal,
            name: "youtubeChannels"            
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
                    <input onChange={handleChanges} placeholder="Enter link here" value={formValues.youtubeChannelLink} name="youtubeChannelLink"></input>
                    <button>Submit</button>
                </form>
            </div>
                
            {youtubeChannels.map(youtubeChannel => (
                <YoutubeChannel youtubeChannel={youtubeChannel} expertId={expertId} />
            ))}

            </div>
        
    )
}

export default YoutubeChannelsTab;

// const mapStateToProps = state => {
//     return {
//       userinfo: state.saveUserInfoReducer.userinfo.id
//     }
//   }
  
// export default connect(mapStateToProps, {saveUserInfoReducer})(YoutubeChannelsTab);