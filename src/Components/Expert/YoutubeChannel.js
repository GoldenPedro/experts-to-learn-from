import React from 'react';
import UpvoteDownVoteExpertDetails from './UpvoteDownVoteExpertDetails';

import playSolid from '../../Assets/playSolid.svg'

const YoutubeChannel = (props) =>{
    const {youtubeChannel, expertId} = props


    return(
            <div className="expert-detail-card">
                
                <p>{youtubeChannel.youtubeChannel}</p>
               

                <div className="expert-detail-voting-rating-wrapper">
                    <p>{youtubeChannel.rating}</p>
                    <UpvoteDownVoteExpertDetails field="youtubeChannels" subfield="youtubeChannel" id={youtubeChannel._id} expertId={expertId} tag={youtubeChannel.youtubeChannel}/>
                </div>

                
            </div>
        
    )
}


export default YoutubeChannel