import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { useParams } from 'react-router'
import ArticlesTab from './ArticlesTab'
import TweetsTab from './TweetsTab'
import VideosTab from './VideosTab'
import QuotesTab from './QuotesTab'
import BookRecommendationsTab from './BookRecommendationsTab'


import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import DescriptionsTab from './DescriptionsTab'


const Expert = (props) =>{
    const [experts, setExperts] = useState([])
    const { id } = useParams()
    // const [articles, setArticles] = useState(false)
    // const [tweets, setTweets] = useState(false)
    // const [videos, setVideos] = useState(false)
    // const [quotes, setQuotes] = useState(false)
    // const [bookRecommendations, setBookRecommendations] = useState(false)

    useEffect(() => {
        axios.get(`http://www.expertstolearnfrom.com/api/getexpert/${id}`)
          .then((res) => {
            setExperts(res.data)
            
          })
      }, []);

      setTimeout(function(){console.log(experts) }, 2000);
      // setTimeout(function(){console.log(experts.descriptions[0]) }, 2000);

      if (!experts.descriptions) {
        return <span>Loading...</span>
      }

    return(
            <div className="expert-component">                
                <h2 className="expert-component-name">{experts.name}</h2>
                <p>Description: {experts.descriptions[0].description}</p>
                <p>Twitter: {experts.twitterLinks[0].twitterLink}</p>
                <p>YouTube Channel: {experts.youtubeChannels[0].youtubeChannel}</p>

                <div className="tabs-component">
                <Tabs>
                    <TabList>
                      <Tab>Articles</Tab>
                      <Tab>Tweets</Tab>
                      <Tab>Videos</Tab>
                      <Tab>Quotes</Tab>
                      <Tab>Book Recommendations</Tab>
                      <Tab>Descriptions</Tab>
                      <Tab>Twitter Accounts</Tab>
                      <Tab>YouTube Channels</Tab>
                      <Tab>Other Links</Tab>
                    </TabList>

                    <TabPanel>
                      <ArticlesTab articles={experts.articles} expertId={experts._id}/>
                    </TabPanel>
                    <TabPanel>
                      <TweetsTab tweets={experts.tweets} expertId={experts._id} />
                    </TabPanel>
                    <TabPanel>
                      <VideosTab videos={experts.videos} id={experts._id} />
                    </TabPanel>
                    <TabPanel>
                      <QuotesTab quotes={experts.quotes} id={experts._id} />
                    </TabPanel>
                    <TabPanel>
                      <DescriptionsTab descriptions={experts.descriptions} id={experts._id} />
                    </TabPanel>
                    <TabPanel>
                      <BookRecommendationsTab bookRecommendations={experts.bookRecommendations} id={experts._id} />
                    </TabPanel>
                    <TabPanel>
                      <BookRecommendationsTab bookRecommendations={experts.bookRecommendations} id={experts._id} />
                    </TabPanel>
                    <TabPanel>
                      <BookRecommendationsTab bookRecommendations={experts.bookRecommendations} id={experts._id} />
                    </TabPanel>
                    <TabPanel>
                      <BookRecommendationsTab bookRecommendations={experts.bookRecommendations} id={experts._id} />
                    </TabPanel>
                  </Tabs>
              </div>

                {/* <div className='tab'>
                  <h3 onClick={() => setArticles(!articles)}>Articles</h3>
                </div>

                <div className='tab'>
                  <h3 onClick={() => setTweets(!tweets)}>Tweets</h3>
                </div>

                <div className='tab'>
                  <h3 onClick={() => setVideos(!videos)}>Videos</h3>
                </div>

                <div className='tab'>
                  <h3 onClick={() => setQuotes(!quotes)}>Quotes</h3>
                </div>
                <div className='tab'>
                  <h3 onClick={() => setBookRecommendations(!bookRecommendations)}>Book Recommendations</h3>
                </div> */}

                {/* <div>
                  { articles ? <ArticlesTab articles={experts.articles} id={experts._id}/> : null }
                  { tweets ? <TweetsTab tweets={experts.tweets} id={experts._id} /> : null }
                  { videos ? <VideosTab videos={experts.videos} id={experts._id} /> : null }
                  { quotes ? <QuotesTab quotes={experts.quotes} id={experts._id} /> : null }
                  { bookRecommendations ? <BookRecommendationsTab bookRecommendations={experts.bookRecommendations} id={experts._id} /> : null }
                </div> */}
                

            </div>
        
    )
}


export default Expert