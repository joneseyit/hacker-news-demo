import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Loader from "react-loader-spinner";

const ShowStory = (props) => {
    const params = useParams();
    const [story, setStory] = useState();
    const [comments, setComments] = useState();

    useEffect (() => {
    const getComments = fetch(
        `https://hacker-news.firebaseio.com/v0/item/${params.storyId}.json` //fetch story
        ).then((response) => response.json() ) 
        .then(async (result) => {
            setStory(result);
            const promises = result.kids.map((id) => 
                fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
                .then( response => response.json()));
            const returnedComments = await Promise.all(promises);
            setComments(returnedComments);
        })
    }, [])


    return (
        !story? <Loader type="Puff" color="#00BFFF" height={100} width={100} /> :
        (<div>
            <div >
                {console.log(comments, "   ================ comments")}
                {story.title}
                {comments? comments[0].text : null}
            </div>
            
        </div>)
    );
}

export default ShowStory;