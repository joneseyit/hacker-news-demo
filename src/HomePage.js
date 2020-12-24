import React, { useEffect, useState } from "react";

const HomePage = () => {
  const baseURL = "https://hacker-news.firebaseio.com/v0/";
  const storyURL = `${baseURL}/item/`;

  const [topStories, setTopStories] = useState([]);

  useEffect(() => {
      const stories = fetch(
        "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
      )
        .then((response) => response.json())
        .then(async (result) => {
          const promises = 
          result.slice(0, 10)
          .map(id =>
            fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
              response => response.json()
            )
          );
        const stories = await Promise.all(promises);
        setTopStories(stories);
        });
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
