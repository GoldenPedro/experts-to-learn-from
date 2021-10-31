import React from 'react';
import UpvoteDownVoteExpertDetails from './UpvoteDownVoteExpertDetails';
import './ExpertDetailsCardStyle.css'

const OtherLink = (props) =>{
    const {otherLink, expertId, upvotes, downvotes} = props


    return(
            <div className="expert-detail-card">
                <div className="left-content">
                    <a rel="noreferrer" target='_blank' className="expert-detail-card-url" href={otherLink.otherLink}>{otherLink.otherLink}</a>
                    <p className="expert-detail-card-submitted">Submitted by: {otherLink.submitted}</p>
                </div>
                

                <div className="expert-detail-voting-rating-wrapper">
                    <UpvoteDownVoteExpertDetails upvotes={upvotes} downvotes={downvotes} field="otherLinks" subfield="otherLink" rating={otherLink.rating} id={otherLink._id} expertId={expertId} tag={otherLink.otherLink}/>
                </div>

                
            </div>
        
    )
}


export default OtherLink