import React, { useEffect, useState } from "react";

const HomePage = () => {
  const baseURL = "https://hacker-news.firebaseio.com/v0/";
  const storyURL = `${baseURL}/item/`;

  const [topStories, setTopStories] = useState([]);
  const [filteredStories, setFilteredStories] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);


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
      </a>
    );
  };

  const updateFilteredList = (term) => {
    let sanitizeTerm = term.toLowerCase();
    let newList = topStories.filter(x => x.title.toLowerCase().includes(sanitizeTerm));
    setFilteredStories(newList);
    setSearchTerm(term);
  }

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
          // borderRadius: "10px",
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
      <div marginTop="20px" >
        <input 
          onChange={(e) => {
            setSearchTerm(e.target.value);
            updateFilteredList(e.target.value)
          
          } }
        />
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {(searchTerm.length > 0 ? filteredStories : topStories).map((story) => {
          return storyContainer(story);
        })}
      </div>
    </div>
  );
};

export default HomePage;
