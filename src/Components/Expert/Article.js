import React from 'react'
import UpvoteDownVoteExpertDetails from './UpvoteDownVoteExpertDetails'
import './ExpertDetailsCardStyle.css'

const Article = (props) =>{
const {article, expertId} = props


    return(
            <div className="expert-detail-card">
                <div className="left-content">
                    <p className="expert-detail-card-title">{article.articleTitle}</p>
                    <p className="expert-detail-card-url">{article.article}</p>
                </div>

                <div className="expert-detail-voting-rating-wrapper">
                    <p>{article.rating}</p>
                    <UpvoteDownVoteExpertDetails field="articles" subfield="article" id={article._id} expertId={expertId} tag={article.article}/>
                </div>
            </div>
        
    )
}


export default Article