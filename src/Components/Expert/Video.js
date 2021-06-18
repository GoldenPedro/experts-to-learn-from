import React, {useState, useEffect} from 'react'
import UpvoteDownVoteExpertDetails from './UpvoteDownVoteExpertDetails';
import './ExpertDetailsCardStyle.css'

const Video = (props) =>{
    const {video, expertId} = props


    return(
            <div className="expert-detail-card">
                <div className="left-content">
                    <p className="expert-detail-card-url">{video.video}</p>
                </div>
                
                <div className="expert-detail-voting-rating-wrapper">
                    <div className="expert-detail-card-rating">
                        <p>{video.rating}</p>
                    </div>
                    <UpvoteDownVoteExpertDetails field="videos" subfield="video" id={video._id} expertId={expertId} tag={video.video}/>         
                </div>
            </div>
        
    )
}


export default Video