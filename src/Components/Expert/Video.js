import React from 'react'
import UpvoteDownVoteExpertDetails from './UpvoteDownVoteExpertDetails';
import './ExpertDetailsCardStyle.css'

const Video = (props) =>{
    const {video, expertId, upvotes, downvotes} = props


    return(
            <div className="expert-detail-card">
                <div className="left-content">
                    <a rel="noreferrer" target='_blank' href={video.video} className="expert-detail-card-url">{video.video}</a>
                    <p className="expert-detail-card-submitted">Submitted by: {video.submitted}</p>
                </div>
                
                <div className="expert-detail-voting-rating-wrapper">
                    <UpvoteDownVoteExpertDetails upvotes={upvotes} downvotes={downvotes} field="videos" subfield="video" rating={video.rating} id={video._id} expertId={expertId} tag={video.video}/>         
                </div>
            </div>
        
    )
}


export default Video