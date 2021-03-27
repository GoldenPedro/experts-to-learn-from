import React, {useState, useEffect} from 'react'
import UpvoteDownVoteExpertDetails from './UpvoteDownVoteExpertDetails';

import playSolid from '../../Assets/playSolid.svg'

const Video = (props) =>{
    const {video} = props


    return(
            <div className="expert-detail-card">
                
                <p>{video.video}</p>
                

                <div className="expert-detail-voting-rating-wrapper">
                    <p>{video.rating}</p>
                    <div className='expert-detail-voting'>
                        <img className='upvote-icon' src={playSolid} alt='upvote' />
                        <img className='downvote-icon' src={playSolid} alt='downvote' />
                    </div>
                </div>

                
            </div>
        
    )
}


export default Video