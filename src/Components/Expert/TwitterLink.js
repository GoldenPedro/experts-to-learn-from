import React from 'react';
import UpvoteDownVoteExpertDetails from './UpvoteDownVoteExpertDetails';
import './ExpertDetailsCardStyle.css'


const TwitterLink = (props) =>{
    const {twitterLink, expertId} = props


    return(
            <div className="expert-detail-card">
                <div className="left-content">
                    <a href={`https://twitter.com/${twitterLink.twitterLink}`}>@{twitterLink.twitterLink}</a>
                </div>
            

                <div className="expert-detail-voting-rating-wrapper">
                    <div className="expert-detail-card-rating">
                            <p>{twitterLink.rating}</p>
                    </div>
                    <UpvoteDownVoteExpertDetails field="twitterLinks" subfield="twitterLink" id={twitterLink._id} expertId={expertId} tag={twitterLink.twitterLink}/>
                </div>

                
            </div>
        
    )
}


export default TwitterLink