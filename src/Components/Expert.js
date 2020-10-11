import React from 'react';

function Expert(props) {
    const {expert} = props

    console.log(expert.name)

  return (
    <div className="expert">
        <p>{expert.name}</p>
        <p>{expert.twitterHandle}</p>
        <p>{expert.rating}</p>
        <p>{expert.description}</p>
    </div>
  );
}

export default Expert;