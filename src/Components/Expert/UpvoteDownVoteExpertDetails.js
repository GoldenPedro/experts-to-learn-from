// import React, {useState, useEffect} from 'react'
// import axios from 'axios'
// import { Link, useHistory } from 'react-router-dom'
// import { useParams } from 'react-router'

// import playSolid from '../../Assets/playSolid.svg'


// const UpvoteDownVoteExpertDetails = (props) =>{
// // const {article} = props

// const upvote = () => {
//     axios.post('http://www.expertstolearnfrom.com/api/vote', upvoteInfo)
//         .then(res => {
//             console.log(res.data);
//         })
// }

// const downvote = () => {
//     axios.post('http://www.expertstolearnfrom.com/api/vote', downvoteInfo)
//         .then(res => {
//             console.log(res.data);
//         })
// }

//     return(
//             <div className="expert-detail-voting">
//                     <div className='expert-detail-voting'>
//                         <img className='upvote-icon' onClick={upvote} src={playSolid} alt='upvote' />
//                         <img className='downvote-icon' onClick={downvote} src={playSolid} alt='downvote' />
//                     </div>
//             </div>
        
//     )
// }


// export default UpvoteDownVoteExpertDetails