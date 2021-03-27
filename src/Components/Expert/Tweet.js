import React from 'react';
import UpvoteDownVoteExpertDetails from './UpvoteDownVoteExpertDetails';

import playSolid from '../../Assets/playSolid.svg'

const Tweet = (props) =>{
    const {tweet, expertId} = props


    return(
            <div className="expert-detail-card">
                
                <p>{tweet.tweet}</p>
               

                <div className="expert-detail-voting-rating-wrapper">
                    <p>{tweet.rating}</p>
                    <UpvoteDownVoteExpertDetails field="tweets" subfield="tweet" id={tweet._id} expertId={expertId} tag={tweet.tweet}/>
                </div>

                
            </div>
        
    )
}


export default Tweet