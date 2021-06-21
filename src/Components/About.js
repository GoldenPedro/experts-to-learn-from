import React from 'react';
import "./About.css"

const About = (props) =>{


    return(
            <div className="about-container">
                <div className="about-title">
                    <h1>What is Experts To Learn From?</h1>
                </div>
                
                <h2>Problem:</h2>
                <p>I want to learn a new subject but I don't know who are the best people to learn from or what are the most recommended books to read.</p>

                <h2>Solution:</h2>
                <p>Experts To Learn From is a site where users can browse/submit experts in different categories and rank them by rating in order to find the best people to learn from in a given subject. </p>

                <p>If you want to know the best person to learn from about online writing,  just click on the "online writing" category and the site lists user-submitted experts ordered by a rating given to them by users themselves.</p>

                <p>Every expert has information about them like book recommendations, blog posts, tweets, videos, and they are all sorted by their rating so it's easier to get the information you're looking for </p>
                <br />

                <div>
                    <h2>This site was made by:</h2>
                    <div className="developer-container">
                        <div className="developer">
                            <img className="about-profile-image" src="https://avatars.githubusercontent.com/u/28662425?v=4" />
                            <p>Pedro Casuso</p>
                            <a href="https://pedrocasuso.com">pedrocasuso.com</a>
                            <a href="https://github.com/GoldenPedro">https://github.com/GoldenPedro</a>
                        </div>
                        <div className="developer">
                            <img className="about-profile-image" src="https://avatars.githubusercontent.com/u/37386321?v=4" />
                            <p>Alejandro Garcia</p>
                            <a href="https://argarcia.me/">argarcia.me</a>
                            <a href="https://github.com/Alegar917">https://github.com/Alegar917</a>
                        </div>
                    </div>
                    
                </div>
                
            </div>
        
    )
}


export default About