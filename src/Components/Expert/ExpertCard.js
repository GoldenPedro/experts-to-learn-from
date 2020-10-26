import React from 'react';
import playSolid from '../../Assets/playSolid.svg'

function ExpertCard(props) {
    const {expert} = props

    console.log(expert.name)

  return (
    <div className="expert">
        <div className='expert-img-container'>
          <img className='expert-img' src={expert.image} alt='Expert'/>
        </div>
        <div  className='expert-text'>
          <h4 className='expert-name'>{expert.name}</h4>
          <p className='expert-description'>{expert.description}</p>
          <p className='expert-twitter'>{expert.twitterHandle}</p>
        </div>
        
        <div className='expert-category-rating'>
          <div className='expert-category'>
            <p>{Object.keys(expert.categories)[0]}</p>
          </div>
          <div className='expert-voting'>
            <img className='upvote-icon' src={playSolid} alt='upvote' />
            <p className='expert-rating'>{expert.categories[Object.keys(expert.categories)[0]]}</p>
            <img className='downvote-icon' src={playSolid} alt='downvote' />
          </div>
        </div>
    </div>
  );
}

export default ExpertCard;