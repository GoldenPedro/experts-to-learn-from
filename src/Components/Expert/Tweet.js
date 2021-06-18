import React from 'react';
import UpvoteDownVoteExpertDetails from './UpvoteDownVoteExpertDetails';
import './ExpertDetailsCardStyle.css'

import playSolid from '../../Assets/playSolid.svg'

const Tweet = (props) =>{
    const {tweet, expertId} = props


    return(
            <div className="expert-detail-card">
                <div className="left-content">
                    <p className="expert-detail-card-url">{tweet.tweet}</p>
                </div>
                
                
               

                <div className="expert-detail-voting-rating-wrapper">
                    <div className="expert-detail-card-rating">
                        <p>{tweet.rating}</p>
                    </div>
                    <UpvoteDownVoteExpertDetails field="tweets" subfield="tweet" id={tweet._id} expertId={expertId} tag={tweet.tweet}/>
                </div>

                
            </div>
        
    )
}


export default Tweet