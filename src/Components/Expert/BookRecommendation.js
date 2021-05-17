import React from 'react'
import UpvoteDownVoteExpertDetails from './UpvoteDownVoteExpertDetails';

import playSolid from '../../Assets/playSolid.svg'


const BookRecommendation = (props) =>{
    const {bookRecommendation, expertId} = props


    return(
            <div className="expert-detail-card">
                
                <p>{bookRecommendation.bookRecommendation}</p>
                <p>{bookRecommendation.amazonLink}</p>

                    <p>{bookRecommendation.rating}</p>
                    <UpvoteDownVoteExpertDetails field="bookRecommendations" subfield="bookRecommendation" id={bookRecommendation._id} expertId={expertId} tag={bookRecommendation.bookRecommendation}/>
                
            </div>
        
    )
}


export default BookRecommendation