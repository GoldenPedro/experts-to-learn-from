import React from 'react';

function Expert(props) {
    const {expert} = props

    console.log(expert.name)

  return (
    <div className="expert">
        <h4 className='expert-name'>{expert.name}</h4>
        <p>{expert.twitterHandle}</p>
        <img src={expert.image} alt='Expert'/>
        <p>{expert.description}</p>
        <p>{Object.keys(expert.categories)[0]}</p>
        <p>{expert.categories[Object.keys(expert.categories)[0]]}</p>
    </div>
  );
}

export default Expert;