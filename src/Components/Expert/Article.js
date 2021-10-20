import React from 'react'
import UpvoteDownVoteExpertDetails from './UpvoteDownVoteExpertDetails'
import './ExpertDetailsCardStyle.css'

const Article = (props) =>{
const {article, expertId, upvotes} = props


    return(
            <div className="expert-detail-card">
                <div className="left-content">
                    {/* <p className="expert-detail-card-title">{article.articleTitle}</p> */}
                    {/* <a href={article.article} className="expert-detail-card-submitted">{article.article}</a>
                    <br/> */}
                    <a rel="noreferrer" target='_blank' className="expert-detail-title-url" href={article.article}>{article.articleTitle}</a>
                    <p className="expert-detail-card-submitted">Submitted by: {article.submitted}</p>
                </div>

                <div className="expert-detail-voting-rating-wrapper">
                    <UpvoteDownVoteExpertDetails upvotes={upvotes} field="articles" subfield="article" rating={article.rating} id={article._id} expertId={expertId} tag={article.article}/>
                </div>
            </div>
        
    )
}


export default Article