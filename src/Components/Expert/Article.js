import React from 'react'
import UpvoteDownVoteExpertDetails from './UpvoteDownVoteExpertDetails'
import './ExpertDetailsCardStyle.css'

const Article = (props) =>{
const {article, expertId} = props


    return(
            <div className="expert-detail-card">
                <div className="left-content">
                    <p className="expert-detail-card-title">{article.articleTitle}</p>
                    <a href={article.article} className="expert-detail-card-url">{article.article}</a>
                    <p className="expert-detail-card-url">{article.submitted}</p>
                </div>

                <div className="expert-detail-voting-rating-wrapper">
                    <div className="expert-detail-card-rating">
                        <p>{article.rating}</p>
                    </div>
                    <UpvoteDownVoteExpertDetails field="articles" subfield="article" id={article._id} expertId={expertId} tag={article.article}/>
                </div>
            </div>
        
    )
}


export default Article