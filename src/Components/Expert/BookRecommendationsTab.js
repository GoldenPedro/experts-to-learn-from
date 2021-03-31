import React, {useState} from 'react'
import axios from 'axios'
import BookRecommendation from './BookRecommendation'
import { connect } from 'react-redux';
import saveUserInfoReducer from '../../Store/Reducers'


const defaultValues = {
    bookRecommendation: ''
}

let useridLocal = window.localStorage.getItem('userid');

const BookRecommendationsTab = (props) =>{
const {bookRecommendations, expertId, userinfo} = props
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
                bookRecommendation: formValues.bookRecommendation.trim(),
                rating: 1
            },
            id: expertId,
            userid: useridLocal,
            name: "bookRecommendations"            
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
                    <input onChange={handleChanges} placeholder="Enter link here" value={formValues.bookRecommendation} name="bookRecommendation"></input>
                    <button>Submit</button>
                </form>
            </div>
                
            {bookRecommendations.map(bookRecommendation => (
                <BookRecommendation bookRecommendation={bookRecommendation} expertId={expertId} />
            ))}

            </div>
        
    )
}

export default BookRecommendationsTab;

// const mapStateToProps = state => {
//     return {
//       userinfo: state.saveUserInfoReducer.userinfo.id
//     }
//   }
  
// export default connect(mapStateToProps, {saveUserInfoReducer})(BookRecommendationsTab);
