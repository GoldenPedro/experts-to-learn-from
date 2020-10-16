import React, { useState } from 'react';
import Expert from './Expert/Expert'

const expertsArray = [
  {
    id : 1,
    name: 'Kai Wong',
    image: 'https://www.nicepng.com/png/detail/7-78595_asian-businessman-png-professional-man-images-png.png',
    categories: {
      'photography': 51,
      'filmmaking': 45,
    },
    twitterHandle: '@kaimanwong',
    blog: '',
    youtubeChannel: '',
    bookRecommendations: '',
    tweets: '',
    quotes: '',
    description: 'Photographer that worked for DigitalRevTV and has a YouTube channel talking about photography and photo gear',
  },
  {
    id : 2,
    name: 'David Perell',
    image: '',
    categories: {
      'writing': 78,
    },
    twitterHandle: '@david_perell',
    blog: '',
    youtubeChannel: '',
    bookRecommendations: '',
    tweets: '',
    quotes: '',
    description: 'Online writing guy teaching people how to write on the internet',
  },
  {
    id : 1,
    name: 'Kai Wong',
    image: '',
    categories: {
      'photography': 51,
    },
    twitterHandle: '@kaimanwong',
    blog: '',
    youtubeChannel: '',
    bookRecommendations: '',
    tweets: '',
    quotes: '',
    description: 'Photographer that worked for DigitalRevTV and has a YouTube channel talking about photography and photo gear',
  },
  {
    id : 2,
    name: 'David Perell',
    image: '',
    categories: {
      'writing': 78,
    },
    twitterHandle: '@david_perell',
    blog: '',
    youtubeChannel: '',
    bookRecommendations: '',
    tweets: '',
    quotes: '',
    description: 'Online writing guy teaching people how to write on the internet',
  },
  {
    id : 1,
    name: 'Kai Wong',
    image: '',
    categories: {
      'photography': 51,
    },
    twitterHandle: '@kaimanwong',
    blog: '',
    youtubeChannel: '',
    bookRecommendations: '',
    tweets: '',
    quotes: '',
    description: 'Photographer that worked for DigitalRevTV and has a YouTube channel talking about photography and photo gear',
  },
  {
    id : 2,
    name: 'David Perell',
    image: '',
    categories: {
      'writing': 78,
    },
    twitterHandle: '@david_perell',
    blog: '',
    youtubeChannel: '',
    bookRecommendations: '',
    tweets: '',
    quotes: '',
    description: 'Online writing guy teaching people how to write on the internet',
  },
  
]

function Dashboard() {
  const [ experts, setExperts ] = useState(expertsArray)

  return (
    <div className="dashboard">
        <h1>Experts To Learn From</h1>
        {experts.map(expert => (
          <Expert expert={expert} key={expert.id} />
        ))}
    </div>
  );
}

export default Dashboard;
