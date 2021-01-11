import React, { useEffect, useState } from "react";

const HomePage = () => {
  const baseURL = "https://hacker-news.firebaseio.com/v0/";
  const storyURL = `${baseURL}/item/`;

  const [topStories, setTopStories] = useState([]);
  console.log(topStories);
  useEffect(() => {
    const stories = fetch(
      "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty?limit=10"
    )
      .then((response) => response.json())
      .then(async (result) => {
        const promises = result
          // .slice(0, 10)
          .map((id) =>
            fetch(
              `https://hacker-news.firebaseio.com/v0/item/${id}.json`
            ).then((response) => response.json())
          );
        const stories = await Promise.all(promises);
        setTopStories(stories);
      });
  }, []);

  const storyContainer = (story) => {
    return (
      <a href={story.url} target="_blank">
        <div className="card">{story.title}</div>
        {story.type}
      </a>
    );
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div
        style={{
          width: "400px",
          height: "80px",
          backgroundColor: "red",
          marginTop: "30px",
          justifyContent: "center",
          padding: "10px",
          fontWeight: 600,
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <text
          style={{
            height: "30px",
            alignContet: "center",
            justifyContent: "center",
          }}
        >
          Welcome to HackerNews
        </text>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {topStories.map((story) => {
          return storyContainer(story);
        })}
      </div>
    </div>
  );
};

export default HomePage;
