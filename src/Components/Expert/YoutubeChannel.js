import React from 'react';
import UpvoteDownVoteExpertDetails from './UpvoteDownVoteExpertDetails';
import './ExpertDetailsCardStyle.css'


const YoutubeChannel = (props) =>{
    const {youtubeChannel, expertId} = props


    return(
            <div className="expert-detail-card">
                <div className="left-content">
                    <a href={youtubeChannel.youtubeChannel}>{youtubeChannel.youtubeChannel}</a>
                </div>
                
               

                <div className="expert-detail-voting-rating-wrapper">
                    <UpvoteDownVoteExpertDetails field="youtubeChannels" subfield="youtubeChannel" rating={youtubeChannel.rating} id={youtubeChannel._id} expertId={expertId} tag={youtubeChannel.youtubeChannel}/>
                </div>

                
            </div>
        
    )
}


export default YoutubeChannel