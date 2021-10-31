import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { connect } from 'react-redux';
import saveUserInfoReducer from '../../Store/Reducers'
import playSolid from '../../Assets/playSolid.svg'
import './UpvoteDownVoteExpertDetails.css'


let useridLocal = window.localStorage.getItem('userid')

const UpvoteDownVoteExpertDetails = (props) =>{
const {category, rating, id, field, subfield, tag, expertId, upvotes, downvotes} = props

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
    if (upvotes.some(element => element.id === id) === false) {
        axios.post('https://www.expertstolearnfrom.com/api/vote', upvoteInfo)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
                alert("Please login to upvote/downvote")
            })
    event.target.nextSibling.innerText = Number(event.target.nextSibling.innerText) + 1;
    } else {
        console.log('its already upvoted')
    }
}

console.log('==> upvotes: ' + JSON.stringify(upvotes))

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
        if (downvotes.some(element => element.id === id) === false) {
        axios.post('https://www.expertstolearnfrom.com/api/vote', downvoteInfo)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
                alert("Please login to upvote/downvote")
            })

        event.target.previousSibling.innerText = Number(event.target.previousSibling.innerText) - 1;
    } else {
        console.log('its already downvoted')
    }
}

const checkUpvotes = () => {
    if (upvotes) {
        // console.log(upvotes)
        if (upvotes.find(element => element.id === id)) {
            console.log("upvoted")
            // apply color to arrow
            return (<img className='upvote-icon-details-neutral upvote-icon-details-upvoted' onClick={upvote} src={playSolid} alt='upvote' />)
        } else {
            console.log("downvoted HERE")
            return (<img className='upvote-icon-details-neutral' onClick={upvote} src={playSolid} alt='downvote' />)
        }
    }
}

const checkDownvotes = () => { 
    if (downvotes) {
        console.log('===> downvotes:    ' + downvotes)
        if (downvotes.find(element => element.id === id)) {
            return (<img className='downvote-icon-details-neutral downvote-icon-details-downvoted' onClick={downvote} src={playSolid} alt='downvote' />)
        } else {
            console.log("downvoted HERE")
            return (<img className='downvote-icon-details-neutral' onClick={downvote} src={playSolid} alt='downvote' />)
        }
    }
}

    return(
            <div className="expert-detail-voting">
                {/* <img className='upvote-icon-details' onClick={upvote} src={playSolid} alt='upvote' /> */}
                
                {/* <img className='downvote-icon-details' onClick={downvote} src={playSolid} alt='downvote' /> */}
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
  
export default connect(mapStateToProps, {saveUserInfoReducer})(UpvoteDownVoteExpertDetails);