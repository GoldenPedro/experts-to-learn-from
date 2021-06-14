import React from 'react';
import UpvoteDownVoteExpertDetails from './UpvoteDownVoteExpertDetails';
import './ExpertDetailsCardStyle.css'


const TwitterLink = (props) =>{
    const {twitterLink, expertId} = props


    return(
            <div className="expert-detail-card">
                <div className="left-content">
                    <p>{twitterLink.twitterLink}</p>
                </div>
                
                
               

                <div className="expert-detail-voting-rating-wrapper">
                    <p>{twitterLink.rating}</p>
                    <UpvoteDownVoteExpertDetails field="twitterLinks" subfield="twitterLink" id={twitterLink._id} expertId={expertId} tag={twitterLink.twitterLink}/>
                </div>

                
            </div>
        
    )
}


export default TwitterLink