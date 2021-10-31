import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Quote from './Quote'
import { connect } from 'react-redux';
import saveUserInfoReducer from '../../Store/Reducers'
import './Tabs.css'


const defaultValues = {
    quote: ''
}

let useridLocal = window.localStorage.getItem('userid');

const QuotesTab = (props) =>{
const {quotes, expertId, upvotes, downvotes} = props
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
                quote: formValues.quote.trim(),
                rating: 1
            },
            id: expertId,
            userid: useridLocal,
            name: "quotes"            
        }
        console.log(newData)
        if (formValues.quote.length == 0) {
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
                    <input onChange={handleChanges} placeholder="Enter quote here" value={formValues.quote} name="quote"></input>
                    <button>Submit</button>
                </form>
            </div>
                
            {quotes.map(quote => (
                <Quote upvotes={upvotes} downvotes={downvotes} quote={quote} expertId={expertId} />
            ))}

            </div>
        
    )
}

export default QuotesTab;

// const mapStateToProps = state => {
//     return {
//       userinfo: state.saveUserInfoReducer.userinfo.id
//     }
//   }
  
// export default connect(mapStateToProps, {saveUserInfoReducer})(QuotesTab);
