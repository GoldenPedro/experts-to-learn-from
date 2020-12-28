import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { useParams } from 'react-router'
import BookRecommendation from './BookRecommendation'


const defaultValues = {
    bookRecommendation: ''
}

const BookRecommendationsTab = (props) =>{
const {bookRecommendations, id} = props
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
            id: id,
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
                <BookRecommendation bookRecommendation={bookRecommendation} />
            ))}

            </div>
        
    )
}


export default BookRecommendationsTab