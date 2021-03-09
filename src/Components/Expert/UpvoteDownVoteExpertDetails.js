// import React, {useState, useEffect} from 'react'
// import axios from 'axios'
// import playSolid from '../../Assets/playSolid.svg'

// let useridLocal = window.localStorage.getItem('userid')


// const UpvoteDownVoteExpertDetails = (props) =>{
// // const {article} = props

// const defaultUpvoteInfo = {
//     expertid: expertid,
//     userid: useridLocal,
//     field: 'articles',
//     subfield: 'article',
//     tag: category,
//     votetype: 'upvote'
// }

// const [upvoteInfo, setUpvoteInfo] = useState(defaultUpvoteInfo)

// const upvote = () => {
//     axios.post('http://www.expertstolearnfrom.com/api/vote', upvoteInfo)
//         .then(res => {
//             console.log(res.data);
//         })
// }

// const defaultDownvoteInfo = {
//     expertid: expertid,
//     userid: useridLocal,
//     field: 'categories',
//     subfield: 'category',
//     tag: category,
//     votetype: 'downvote'
// }

// const [downvoteInfo, setDownvoteInfo] = useState(defaultDownvoteInfo)

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