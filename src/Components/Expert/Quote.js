import React from 'react'
import UpvoteDownVoteExpertDetails from './UpvoteDownVoteExpertDetails';
import './ExpertDetailsCardStyle.css'

import playSolid from '../../Assets/playSolid.svg'

const Quote = (props) =>{
    const {quote, expertId} = props


    return(
            <div className="expert-detail-card">
                <div className="left-content">
                    <p>{quote.quote}</p>
                </div>
                
                    <div className="expert-detail-voting-rating-wrapper">
                        <div className="expert-detail-card-rating">
                            <p>{quote.rating}</p>
                        </div>
                        <UpvoteDownVoteExpertDetails field="quotes" subfield="quote" id={quote._id} expertId={expertId} tag={quote.quote}/>
                    </div>
            </div>
        
    )
}


export default Quote