import React, { useEffect, useState, useMemo, useContext } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import DarkModeContext from './DarkModeContext';

const HomePage = () => {
  const baseURL = "https://hacker-news.firebaseio.com/v0/";

  const [topStories, setTopStories] = useState([]);
  // const [filteredStories, setFilteredStories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [storyType, setStoryType] = useState("");

  //memorizing function - dependency array
  const filteredStories = useMemo(() => {
    if (!searchTerm && !storyType) return topStories;

    if (!storyType)
      return topStories.filter((story) =>
        story.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

    if (!searchTerm)
      return topStories.filter((story) => story.type === storyType);

    return topStories.filter((story) => {
      return (
        story.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (storyType ? story.type === storyType : true)
      );
    });
  }, [searchTerm, topStories, storyType]);

  useEffect(() => {
    const stories = fetch(
      "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty?"
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
      <a href={story?.url} target="_blank" style={{ textDecoration: "none" }}>
        <div className={`card ${!!darkMode? "darkModeBackground" : "lightModeBackground"}`}>
          <div>
            {story?.title}
            <span className="story-tag"> {story?.type}</span>
          </div>
          <div>
            <Link to={`/${story?.id}`}>See Comments</Link>
          </div>
        </div>
      </a>
    );
  };

  const { darkMode } = useContext(DarkModeContext);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >

      <div marginTop="20px">
        <text>Search by title: </text>
        <input
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          className="general-search-bar"
        />
        <label for="storyType">Choose a story type: </label>

        <select
          name="storyType"
          id="storyType"
          onChange={(e) => setStoryType(e.target.value)}
          className="story-type-search-bar"
        >
          <option value="">Choose a value </option>
          <option value="job">Job</option>
          <option value="story">Story</option>
          <option value="comment">Comment</option>
          <option value="poll">Poll</option>
        </select>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {filteredStories.length === 0 ? (
          <Loader type="Puff" color="#00BFFF" height={100} width={100} />
        ) : (
          filteredStories.map((story) => {
            return storyContainer(story);
          })
        )}
      </div>
    </div>
  );
};

export default HomePage;
