import React from 'react';
import UpvoteDownVoteExpertDetails from './UpvoteDownVoteExpertDetails';
import './ExpertDetailsCardStyle.css'


const YoutubeChannel = (props) =>{
    const {youtubeChannel, expertId, upvotes, downvotes} = props


    return(
            <div className="expert-detail-card">
                <div className="left-content">
                    <a rel="noreferrer" target='_blank' className="expert-detail-card-url" href={youtubeChannel.youtubeChannel}>{youtubeChannel.youtubeChannel}</a>
                    <p className="expert-detail-card-submitted">Submitted by: {youtubeChannel.submitted}</p>
                </div>
                
               

                <div className="expert-detail-voting-rating-wrapper">
                    <UpvoteDownVoteExpertDetails upvotes={upvotes} downvotes={downvotes} field="youtubeChannels" subfield="youtubeChannel" rating={youtubeChannel.rating} id={youtubeChannel._id} expertId={expertId} tag={youtubeChannel.youtubeChannel}/>
                </div>

                
            </div>
        
    )
}


export default YoutubeChannel