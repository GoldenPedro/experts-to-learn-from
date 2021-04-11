import React from 'react';
import UpvoteDownVoteExpertDetails from './UpvoteDownVoteExpertDetails';

import playSolid from '../../Assets/playSolid.svg'

const OtherLink = (props) =>{
    const {otherLink, expertId} = props


    return(
            <div className="expert-detail-card">
                
                <p>{otherLink.otherLink}</p>
               

                <div className="expert-detail-voting-rating-wrapper">
                    <p>{otherLink.rating}</p>
                    <UpvoteDownVoteExpertDetails field="otherLinks" subfield="otherLink" id={otherLink._id} expertId={expertId} tag={otherLink.otherLink}/>
                </div>

                
            </div>
        
    )
}


export default OtherLink