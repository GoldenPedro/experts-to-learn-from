import React, { useState } from 'react';
import Expert from './Expert'

const expertsArray = [
  {
    id : 1,
    name: 'Kai Wong',
    categories: '',
    twitterHandle: '@kaimanwong',
    blog: '',
    youtubeChannel: '',
    bookRecommendations: '',
    tweets: '',
    quotes: '',
    rating: 30,
    description: 'Photographer that worked for DigitalRevTV and has a YouTube channel talking about photography and photo gear',
  },
  {
    id : 2,
    name: 'David Perell',
    twitterHandle: '@david_perell',
    blog: '',
    youtubeChannel: '',
    bookRecommendations: '',
    tweets: '',
    quotes: '',
    rating: 15,
    description: 'Online writing guy teaching people how to write on the internet',
  },
  {
    id : 3,
    name: 'Kai Wong',
    twitterHandle: '',
    blog: '',
    youtubeChannel: '',
    bookRecommendations: '',
    tweets: '',
    quotes: '',
    rating: 0,
    description: '',
  },
  {
    id : 4,
    name: 'Kai Wong',
    twitterHandle: '',
    blog: '',
    youtubeChannel: '',
    bookRecommendations: '',
    tweets: '',
    quotes: '',
    rating: 0,
    description: '',
  },
  {
    id : 5,
    name: 'Kai Wong',
    twitterHandle: '',
    blog: '',
    youtubeChannel: '',
    bookRecommendations: '',
    tweets: '',
    quotes: '',
    rating: 0,
    description: '',
  },
  
]

function Dashboard() {
  const [ experts, setExperts ] = useState(expertsArray)

  return (
    <div className="dashboard">
        {experts.map(expert => (
          <Expert expert={expert} key={expert.id} />
        ))}
    </div>
  );
}

export default Dashboard;
