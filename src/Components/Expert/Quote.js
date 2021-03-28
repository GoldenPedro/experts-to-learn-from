import React from 'react'
import UpvoteDownVoteExpertDetails from './UpvoteDownVoteExpertDetails';

import playSolid from '../../Assets/playSolid.svg'

const Quote = (props) =>{
    const {quote, expertId} = props


    return(
            <div className="expert-detail-card">
                
                <p>{quote.quote}</p>
                    <p>{quote.rating}</p>
                    <UpvoteDownVoteExpertDetails field="quotes" subfield="quote" id={quote._id} expertId={expertId} tag={quote.quote}/>
            </div>
        
    )
}


export default Quote