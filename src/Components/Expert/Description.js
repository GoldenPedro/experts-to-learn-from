import React from 'react'
import UpvoteDownVoteExpertDetails from './UpvoteDownVoteExpertDetails';
import './ExpertDetailsCardStyle.css'


const Description = (props) =>{
    const {description, expertId} = props


    return(
            <div className="expert-detail-card">
                <div className="left-content">
                    <p>{description.description}</p>
                </div>
                
                
                <div className="expert-detail-voting-rating-wrapper">
                    <div className="expert-detail-card-rating">
                            <p>{description.rating}</p>
                    </div>

                    <UpvoteDownVoteExpertDetails field="descriptions" subfield="description" id={description._id} expertId={expertId} tag={description.description}/>

                </div>

                  
                
            </div>
        
    )
}


export default Description