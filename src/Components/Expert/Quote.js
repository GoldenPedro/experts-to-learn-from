import React from 'react'
import UpvoteDownVoteExpertDetails from './UpvoteDownVoteExpertDetails';
import './ExpertDetailsCardStyle.css'

const Quote = (props) =>{
    const {quote, expertId} = props


    return(
            <div className="expert-detail-card">
                <div className="left-content">
                    <p>{quote.quote}</p>
                    <p className="expert-detail-card-submitted">Submitted by: {quote.submitted}</p>
                </div>
                
                    <div className="expert-detail-voting-rating-wrapper">
                        <UpvoteDownVoteExpertDetails field="quotes" subfield="quote" rating={quote.rating} id={quote._id} expertId={expertId} tag={quote.quote}/>
                    </div>
            </div>
        
    )
}


export default Quote