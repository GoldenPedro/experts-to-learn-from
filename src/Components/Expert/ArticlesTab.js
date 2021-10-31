import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { useParams } from 'react-router'
import Article from './Article'
import { connect } from 'react-redux';
import saveUserInfoReducer from '../../Store/Reducers'

import './Tabs.css'

const defaultValues = {
    articleTitle: '',
    articleLink: ''
}

let useridLocal = window.localStorage.getItem('userid');

const ArticlesTab = (props) =>{
const {articles, expertId, upvotes, downvotes} = props
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
                article: formValues.articleLink.trim(),
                rating: 1,
                articleTitle: formValues.articleTitle.trim()
            },
            id: expertId,
            userid: useridLocal,
            name: "articles",        
        }
        console.log(newData)
        if (formValues.articleLink.length == 0) {
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

    // const detailForm = document.getElementById("detailForm")
    // if (useridLocal.length == 0) {
    //     detailForm.style.display = "none"
    // }
    // Trying to only show this if user if logged in ^^^^^^^^^^^^^^^^^^^^^^^

    useEffect(() => {
        if (useridLocal != null) {
            document.getElementById("detailForm").style.visibility = "visible";
        }
    }, [])

    

    return(
            <div className="">
                <div id="detailForm">
                    <form onSubmit={submit}>
                        <input onChange={handleChanges} placeholder="Enter Title of Article here" value={formValues.articleTitle} name="articleTitle"></input>
                        <input onChange={handleChanges} placeholder="Enter link here" value={formValues.articleLink} name="articleLink"></input>
                        <button>Submit</button>
                    </form>
                </div>
                    
                {articles.map(article => (
                    <Article upvotes={upvotes} downvotes={downvotes} expertId={expertId} article={article} />
                ))}
            </div>
        
    )
}

export default ArticlesTab;

// const mapStateToProps = state => {
//     return {
//       userinfo: state.saveUserInfoReducer.userinfo.id
//     }
//   }
  
// export default connect(mapStateToProps, {saveUserInfoReducer})(ArticlesTab);
