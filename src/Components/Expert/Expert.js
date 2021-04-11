import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { useParams } from 'react-router'
import ArticlesTab from './ArticlesTab'
import TweetsTab from './TweetsTab'
import VideosTab from './VideosTab'
import QuotesTab from './QuotesTab'
import BookRecommendationsTab from './BookRecommendationsTab'
import TwitterLinksTab from './TwitterLinksTab'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import DescriptionsTab from './DescriptionsTab'
import YoutubeChannelsTab from './YoutubeChannelsTab'
import OtherLinksTab from './OtherLinksTab'


const Expert = (props) =>{
    const [experts, setExperts] = useState([])
    const { id } = useParams()

    useEffect(() => {
        axios.get(`http://www.expertstolearnfrom.com/api/getexpert/${id}`)
          .then((res) => {
            setExperts(res.data)
            
          })
      }, []);

      setTimeout(function(){console.log(experts) }, 2000);
      if (!experts.descriptions) {
        return <span>Loading...</span>
      }

    return(
            <div className="expert-component">  
              <div className='expert-info-container'>
                <h2 className="expert-component-name">{experts.name}</h2>
                <p>Description: {experts.descriptions[0].description}</p>
                <p>Twitter: {experts.twitterLinks[0].twitterLink}</p>
                <p>YouTube Channel: {experts.youtubeChannels[0].youtubeChannel}</p>
              </div>
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
                      <VideosTab videos={experts.videos} expertId={experts._id} />
                    </TabPanel>
                    <TabPanel>
                      <QuotesTab quotes={experts.quotes} expertId={experts._id} />
                    </TabPanel>
                    <TabPanel>
                      <BookRecommendationsTab bookRecommendations={experts.bookRecommendations} expertId={experts._id} />
                    </TabPanel>
                    <TabPanel>
                      <DescriptionsTab descriptions={experts.descriptions} expertId={experts._id} />
                    </TabPanel>
                    <TabPanel>
                      <TwitterLinksTab twitterLinks={experts.twitterLinks} expertId={experts._id} />
                    </TabPanel>
                    <TabPanel>
                      <YoutubeChannelsTab youtubeChannels={experts.youtubeChannels} expertId={experts._id} />
                    </TabPanel>
                    <TabPanel>
                      <OtherLinksTab otherLinks={experts.otherLinks} expertId={experts._id} />
                    </TabPanel>
                  </Tabs>
                </div>
            </div>
        
    )
}


export default Expert