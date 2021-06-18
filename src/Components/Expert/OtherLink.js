import React from 'react';
import UpvoteDownVoteExpertDetails from './UpvoteDownVoteExpertDetails';
import './ExpertDetailsCardStyle.css'


import playSolid from '../../Assets/playSolid.svg'

const OtherLink = (props) =>{
    const {otherLink, expertId} = props


    return(
            <div className="expert-detail-card">
                <div className="left-content">
                    <p>{otherLink.otherLink}</p>
                </div>
                

                <div className="expert-detail-voting-rating-wrapper">
                    <div className="expert-detail-card-rating">
                            <p>{otherLink.rating}</p>
                    </div>
                    <UpvoteDownVoteExpertDetails field="otherLinks" subfield="otherLink" id={otherLink._id} expertId={expertId} tag={otherLink.otherLink}/>
                </div>

                
            </div>
        
    )
}


export default OtherLink