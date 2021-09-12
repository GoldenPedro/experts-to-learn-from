import React from 'react'
import UpvoteDownVoteExpertDetails from './UpvoteDownVoteExpertDetails';
import './ExpertDetailsCardStyle.css'

const Tweet = (props) =>{
    const {tweet, expertId} = props


    return(
            <div className="expert-detail-card">
                <div className="left-content">
                    <a href={tweet.tweet} className="expert-detail-card-url">{tweet.tweet}</a>
                    <p className="expert-detail-card-submitted">Submitted by: {tweet.submitted}</p>
                </div>

                <div className="expert-detail-voting-rating-wrapper">
                    <UpvoteDownVoteExpertDetails field="tweets" subfield="tweet" rating={tweet.rating} id={tweet._id} expertId={expertId} tag={tweet.tweet}/>
                </div>

                
            </div>
        
    )
}


export default Tweet