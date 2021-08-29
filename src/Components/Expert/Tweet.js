import React from 'react';
import UpvoteDownVoteExpertDetails from './UpvoteDownVoteExpertDetails';
import './ExpertDetailsCardStyle.css'

import playSolid from '../../Assets/playSolid.svg'

const Tweet = (props) =>{
    const {tweet, expertId} = props


    return(
            <div className="expert-detail-card">
                <div className="left-content">
                    <a href={tweet.tweet} className="expert-detail-card-url">{tweet.tweet}</a>
                </div>
                
                
               

                <div className="expert-detail-voting-rating-wrapper">
                    <UpvoteDownVoteExpertDetails field="tweets" subfield="tweet" rating={tweet.rating} id={tweet._id} expertId={expertId} tag={tweet.tweet}/>
                </div>

                
            </div>
        
    )
}


export default Tweet