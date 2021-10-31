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
import './Expert.css'


const Expert = (props) =>{
    const [experts, setExperts] = useState([])
    const { id } = useParams()
    const [upvotes, setUpvotes] = useState()
    const [downvotes, setDownvotes] = useState()
    let useridLocal = window.localStorage.getItem('userid')

    useEffect(() => {
        axios.get(`https://www.expertstolearnfrom.com/api/getexpert/${id}`)
          .then((res) => {
            setExperts(res.data)
            console.log(experts)
          })

        axios.get(`https://www.expertstolearnfrom.com/api/uservotes/${useridLocal}`)
          .then(res => {
            // setUservotes(res.data)
            setUpvotes(res.data.upvotes);
            setDownvotes(res.data.downvotes)
          })

      }, []);

      // console.log('==> upvotes: ' + JSON.stringify(upvotes))


      if (!experts.descriptions) {
        return <span>Loading...</span>
      }

    return(
            <div className="expert-component">  
              <div className='expert-info-container'>
                <h2 className="expert-component-name">{experts.name}</h2>
                <p>Description: {experts.descriptions[0].description}</p>
                
                {
                  experts.twitterLinks.length > 0 &&
                  <p>Twitter: <a rel="noreferrer" target='_blank' href={`https://twitter.com/${experts.twitterLinks[0].twitterLink}`}>@{experts.twitterLinks[0].twitterLink}</a></p>
                }  

                {
                  experts.youtubeChannels.length > 0  &&
                    <p>YouTube Channel: <a rel="noreferrer" target='_blank' href={experts.youtubeChannels[0].youtubeChannel}>{experts.youtubeChannels[0].youtubeChannel}</a></p> 
                }
                
                <p>Last Updated: {new Date(experts.updatedAt).toLocaleDateString('en-US')}</p>
                <p>Submitted by: {experts.submitted} on {new Date(experts.createdAt).toLocaleDateString('en-US')}</p>
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
                      <ArticlesTab upvotes={upvotes} downvotes={downvotes} articles={experts.articles} expertId={experts._id}/>
                    </TabPanel>
                    <TabPanel>
                      <TweetsTab upvotes={upvotes} downvotes={downvotes} tweets={experts.tweets} expertId={experts._id} />
                    </TabPanel>
                    <TabPanel>
                      <VideosTab upvotes={upvotes} downvotes={downvotes} videos={experts.videos} expertId={experts._id} />
                    </TabPanel>
                    <TabPanel>
                      <QuotesTab upvotes={upvotes} downvotes={downvotes} quotes={experts.quotes} expertId={experts._id} />
                    </TabPanel>
                    <TabPanel>
                      <BookRecommendationsTab upvotes={upvotes} downvotes={downvotes} bookRecommendations={experts.bookRecommendations} expertId={experts._id} />
                    </TabPanel>
                    <TabPanel>
                      <DescriptionsTab upvotes={upvotes} downvotes={downvotes} descriptions={experts.descriptions} expertId={experts._id} />
                    </TabPanel>
                    <TabPanel>
                      <TwitterLinksTab upvotes={upvotes} downvotes={downvotes} twitterLinks={experts.twitterLinks} expertId={experts._id} />
                    </TabPanel>
                    <TabPanel>
                      <YoutubeChannelsTab upvotes={upvotes} downvotes={downvotes} youtubeChannels={experts.youtubeChannels} expertId={experts._id} />
                    </TabPanel>
                    <TabPanel>
                      <OtherLinksTab upvotes={upvotes} downvotes={downvotes} otherLinks={experts.otherLinks} expertId={experts._id} />
                    </TabPanel>
                  </Tabs>
                </div>
            </div>
        
    )
}


export default Expert