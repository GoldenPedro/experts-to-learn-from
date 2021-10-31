import React, {useState, useEffect} from 'react'
import axios from 'axios'
import BookRecommendation from './BookRecommendation'
import { connect } from 'react-redux';
import saveUserInfoReducer from '../../Store/Reducers'
import './Tabs.css'

const defaultValues = {
    bookRecommendation: '',
    author: '',
    amazonLink: ''
}

let useridLocal = window.localStorage.getItem('userid');

const BookRecommendationsTab = (props) =>{
const {bookRecommendations, expertId, upvotes, downvotes} = props
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
                author: formValues.author.trim(),
                rating: 1,
                amazonLink: formValues.amazonLink.trim()
            },
            id: expertId,
            userid: useridLocal,
            name: "bookRecommendations"            
        }
        console.log(newData)
        if (formValues.bookRecommendation.length == 0) {
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
                    <input onChange={handleChanges} placeholder="Enter book title here" value={formValues.bookRecommendation} name="bookRecommendation"></input>
                    <input onChange={handleChanges} placeholder="Enter book author here" value={formValues.author} name="author"></input>
                    <input onChange={handleChanges} placeholder="Enter amazon link here" value={formValues.amazonLink} name="amazonLink"></input>
                    <button>Submit</button>
                </form>
            </div>
                
            {bookRecommendations.map(bookRecommendation => (
                <BookRecommendation upvotes={upvotes} downvotes={downvotes} bookRecommendation={bookRecommendation} expertId={expertId} />
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
