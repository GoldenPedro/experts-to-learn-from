import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { connect } from 'react-redux';
import saveUserInfoReducer from '../../Store/Reducers'
import playSolid from '../../Assets/playSolid.svg'
import './UpvoteDownVoteExpert.css'


let useridLocal = window.localStorage.getItem('userid')

const UpvoteDownVoteExpert = (props) =>{
const {expertid, category, rating, userinfo} = props

const defaultUpvoteInfo = {
    expertid: expertid,
    userid: useridLocal,
    field: 'categories',
    subfield: 'category',
    tag: category,
    votetype: 'upvote'
}

const [upvoteInfo, setUpvoteInfo] = useState(defaultUpvoteInfo)

const upvote = () => {
    console.log(upvoteInfo)
    axios.post('http://www.expertstolearnfrom.com/api/vote', upvoteInfo)
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
            alert("Please login to upvote/downvote")
        })
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

const downvote = () => {
    console.log(downvoteInfo)
    axios.post('http://www.expertstolearnfrom.com/api/vote', downvoteInfo)
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
            alert("Please login to upvote/downvote")
        })
}

    return(
            <div className="expert-card-voting">
                <img className='upvote-icon' onClick={upvote} src={playSolid} alt='upvote' />
                <p>{rating}</p>
                <img className='downvote-icon' onClick={downvote} src={playSolid} alt='downvote' />
            </div>
        
    )
}


const mapStateToProps = state => {
    return {
      userinfo: state.saveUserInfoReducer.userinfo.id
    }
  }
  
export default connect(mapStateToProps, {saveUserInfoReducer})(UpvoteDownVoteExpert);