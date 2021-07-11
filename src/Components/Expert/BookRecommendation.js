import React from 'react'
import UpvoteDownVoteExpertDetails from './UpvoteDownVoteExpertDetails';
import './ExpertDetailsCardStyle.css'

const BookRecommendation = (props) =>{
    const {bookRecommendation, expertId} = props


    return(
            <div className="expert-detail-card">
                <div className="left-content">
                    <p>{bookRecommendation.bookRecommendation}</p>
                    <a href={bookRecommendation.amazonLink} >{bookRecommendation.amazonLink}</a>
                </div>
                
                
                <div className="expert-detail-voting-rating-wrapper">
                    <div className="expert-detail-card-rating">
                            <p>{bookRecommendation.rating}</p>
                    </div>
                    <UpvoteDownVoteExpertDetails field="bookRecommendations" subfield="bookRecommendation" id={bookRecommendation._id} expertId={expertId} tag={bookRecommendation.bookRecommendation}/>
                
                </div>


                    
            </div>
        
    )
}


export default BookRecommendation