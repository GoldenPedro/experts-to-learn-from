import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { useParams } from 'react-router'
import { connect } from 'react-redux';
import saveUserInfoReducer from '../../Store/Reducers'
import playSolid from '../../Assets/playSolid.svg'




const defaultDownvoteInfo = {
    expertid: '',
    userid: '',
    field: '',
    subfield: '',
    tag: '',
    votetype: 'downvote'
}

const UpvoteDownVoteExpert = (props) =>{
const {expertid, category, userinfo} = props

const [downvoteInfo, setDownvoteInfo] = useState(defaultDownvoteInfo)

const defaultUpvoteInfo = {
    expertid: expertid,
    userid: '5fea7082425082362f95672a',
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
}

const downvote = () => {
    axios.post('http://www.expertstolearnfrom.com/api/vote', downvoteInfo)
        .then(res => {
            console.log(res.data);
        })
}

    return(
            <div className="expert-detail-voting">
                    <div className='expert-detail-voting'>
                        <img className='upvote-icon' onClick={upvote} src={playSolid} alt='upvote' />
                        <img className='downvote-icon' onClick={downvote} src={playSolid} alt='downvote' />
                    </div>
            </div>
        
    )
}


const mapStateToProps = state => {
    return {
      userinfo: state.saveUserInfoReducer.userinfo.id
    }
  }
  
export default connect(mapStateToProps, {saveUserInfoReducer})(UpvoteDownVoteExpert);