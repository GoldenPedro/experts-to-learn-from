import React from 'react';
import UpvoteDownVoteExpertDetails from './UpvoteDownVoteExpertDetails';
import './ExpertDetailsCardStyle.css'

const OtherLink = (props) =>{
    const {otherLink, expertId} = props


    return(
            <div className="expert-detail-card">
                <div className="left-content">
                    <a href={otherLink.otherLink}>{otherLink.otherLink}</a>
                </div>
                

                <div className="expert-detail-voting-rating-wrapper">
                    <UpvoteDownVoteExpertDetails field="otherLinks" subfield="otherLink" rating={otherLink.rating} id={otherLink._id} expertId={expertId} tag={otherLink.otherLink}/>
                </div>

                
            </div>
        
    )
}


export default OtherLink