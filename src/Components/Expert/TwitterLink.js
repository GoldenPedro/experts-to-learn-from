import React from 'react';
import UpvoteDownVoteExpertDetails from './UpvoteDownVoteExpertDetails';
import './ExpertDetailsCardStyle.css'


const TwitterLink = (props) =>{
    const {twitterLink, expertId, upvotes, downvotes} = props


    return(
            <div className="expert-detail-card">
                <div className="left-content">
                    <a rel="noreferrer" target='_blank' className="expert-detail-card-url" href={`https://twitter.com/${twitterLink.twitterLink}`}>@{twitterLink.twitterLink}</a>
                    <p className="expert-detail-card-submitted">Submitted by: {twitterLink.submitted}</p>
                </div>
            

                <div className="expert-detail-voting-rating-wrapper">
                    <UpvoteDownVoteExpertDetails upvotes={upvotes} downvotes={downvotes} field="twitterLinks" subfield="twitterLink" rating={twitterLink.rating} id={twitterLink._id} expertId={expertId} tag={twitterLink.twitterLink}/>
                </div>

                
            </div>
        
    )
}


export default TwitterLink