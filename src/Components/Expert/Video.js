import React, {useState, useEffect} from 'react'
import UpvoteDownVoteExpertDetails from './UpvoteDownVoteExpertDetails';

import playSolid from '../../Assets/playSolid.svg'

const Video = (props) =>{
    const {video, expertId} = props


    return(
            <div className="expert-detail-card">
                
                <p>{video.video}</p>
                <p>{video.rating}</p>
                <UpvoteDownVoteExpertDetails field="videos" subfield="video" id={video._id} expertId={expertId} tag={video.video}/>         
            </div>
        
    )
}


export default Video