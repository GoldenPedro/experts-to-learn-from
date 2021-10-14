import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { connect } from 'react-redux';
import saveUserInfoReducer from '../../Store/Reducers'
import playSolid from '../../Assets/playSolid.svg'
import './UpvoteDownVoteExpert.css'


let useridLocal = window.localStorage.getItem('userid')

const UpvoteDownVoteExpert = (props) =>{
const {expertid, category, rating, upvotes, userinfo, downvotes} = props

const defaultUpvoteInfo = {
    expertid: expertid,
    userid: useridLocal,
    field: 'categories',
    subfield: 'category',
    tag: category,
    votetype: 'upvote'
}

const [upvoteInfo, setUpvoteInfo] = useState(defaultUpvoteInfo)

const upvote = (event) => {
    console.log(upvoteInfo)
    axios.post('http://www.expertstolearnfrom.com/api/vote', upvoteInfo)
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
            alert("Please login to upvote/downvote")
        })    
    event.target.nextSibling.innerText = Number(event.target.nextSibling.innerText) + 1;
}

const defaultDownvoteInfo = {
    expertid: expertid,
    userid: useridLocal,
    field: 'categories',
    subfield: 'category',
    tag: category,
    votetype: 'downvote'
}

const [downvoteInfo, setDownvoteInfo] = useState(defaultDownvoteInfo)

const downvote = (event) => {
    console.log(downvoteInfo)
    axios.post('http://www.expertstolearnfrom.com/api/vote', downvoteInfo)
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
            alert("Please login to upvote/downvote")
        })
    // event.target.previousSibling.innerText = Number(event.target.previousSibling.innerText) - 1;

}

const checkUpvotes = () => {
    console.log(upvotes)
    console.log(downvotes)
    
    if (upvotes) {
        if (upvotes.find(element => element.id === expertid)) {
            console.log("upvoted")
            // apply color to arrow
            return (<img className='upvote-icon-neutral upvote-icon-upvoted' onClick={upvote} src={playSolid} alt='upvote' />)
        } else {
            console.log("downvoted HERE")
            return (<img className='upvote-icon-neutral' onClick={upvote} src={playSolid} alt='downvote' />)
        }
    }
}

const checkDownvotes = () => { 
    if (upvotes) {
        if (downvotes.find(element => element.id === expertid)) {
            return (<img className='downvote-icon-neutral downvote-icon-downvoted' onClick={downvote} src={playSolid} alt='downvote' />)
        } else {
            console.log("downvoted HERE")
            return (<img className='downvote-icon-neutral' onClick={downvote} src={playSolid} alt='downvote' />)
        }
    }
}

    return(
            <div className="expert-card-voting">
                {checkUpvotes()}
                <p>{rating}</p>
                {checkDownvotes()}
            </div>
    )
}


const mapStateToProps = state => {
    return {
      userinfo: state.saveUserInfoReducer.userinfo.id
    }
  }
  
export default connect(mapStateToProps, {saveUserInfoReducer})(UpvoteDownVoteExpert);