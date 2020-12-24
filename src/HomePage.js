import React, { useEffect, useState } from "react";

const HomePage = () => {
  const baseURL = "https://hacker-news.firebaseio.com/v0/";
  const storyURL = `${baseURL}/item/`;

  const [storyIds, setStoryIds] = useState([]);
  const [topStories, setTopStories] = useState([]);
  const [storyDetails, setStoryDetails] = useState([]);

  useEffect(() => {
      const stories = fetch(
        "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
      )
        .then((response) => response.json())
        .then(async (result) => {
          setStoryIds(result.slice(0, 10))
          const promises = 
          result.slice(0, 10)
          .map(id =>
            fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
              response => response.json()
            )
          );
        const stories = await Promise.all(promises);
        setTopStories(stories);
        console.log(stories);
        });
      
    
    // const getTopStoryDetails =  
    // fetch(`https://hacker-news.firebaseio.com/v0/item/${topStory}.json?print=pretty`)
    //     .then(result => setStoryDetails(result))
    //     .then(console.log(storyDetails, "======================="))
  }, []);




  return (
      <div>
        <ul>
            {
                topStories.map( story => {
                  return  <li>{story.title} </li>
                })
            }

        </ul>
    </div>

  )
};

export default HomePage;
