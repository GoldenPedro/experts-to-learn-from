import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { connect } from 'react-redux';
import saveUserInfoReducer from '../../Store/Reducers'
import playSolid from '../../Assets/playSolid.svg'
import './UpvoteDownVoteExpertDetails.css'


let useridLocal = window.localStorage.getItem('userid')

const UpvoteDownVoteExpertDetails = (props) =>{
const {category, rating, id, field, subfield, tag, expertId, upvotes} = props

const defaultUpvoteInfo = {
    userid: useridLocal,
    field: field,
    subfield: subfield,
    tag: tag,
    expertid: expertId,
    expertdetailid: id,
    votetype: 'upvote'
}

const [upvoteInfo, setUpvoteInfo] = useState(defaultUpvoteInfo)

const upvote = (event) => {
    console.log(upvoteInfo)
    axios.post('https://www.expertstolearnfrom.com/api/vote', upvoteInfo)
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
    userid: useridLocal,
    field: field,
    subfield: subfield,
    tag: tag,
    expertid: expertId,
    expertdetailid: id,
    votetype: 'downvote'
}

const [downvoteInfo, setDownvoteInfo] = useState(defaultDownvoteInfo)

const downvote = (event) => {
    console.log(downvoteInfo)
    axios.post('https://www.expertstolearnfrom.com/api/vote', downvoteInfo)
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
            alert("Please login to upvote/downvote")
        })
    event.target.previousSibling.innerText = Number(event.target.previousSibling.innerText) - 1;
}

const checkUpvotes = () => {
    
    
    if (upvotes) {
        console.log(upvotes)
        if (upvotes.find(element => element.id === expertId)) {
            console.log("upvoted")
            // apply color to arrow
            return (<img className='upvote-icon-neutral upvote-icon-upvoted' onClick={upvote} src={playSolid} alt='upvote' />)
        } else {
            console.log("downvoted HERE")
            return (<img className='upvote-icon-neutral' onClick={upvote} src={playSolid} alt='downvote' />)
        }
    }
}

    return(
            <div className="expert-detail-voting">
                <img className='upvote-icon-details' onClick={upvote} src={playSolid} alt='upvote' />
                <p>{rating}</p>
                <img className='downvote-icon-details' onClick={downvote} src={playSolid} alt='downvote' />
            </div>
        
    )
}


const mapStateToProps = state => {
    return {
      userinfo: state.saveUserInfoReducer.userinfo.id
    }
  }
  
export default connect(mapStateToProps, {saveUserInfoReducer})(UpvoteDownVoteExpertDetails);