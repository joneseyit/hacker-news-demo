import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Loader from "react-loader-spinner";
import {Link} from "react-router-dom";

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

    const listedComment = (comment) => {
        return (
        <div className="comment" >
            <ul>
                <li style={{textAlign: "left"}} dangerouslySetInnerHTML={{__html: comment.text}} />
            </ul>
         
        </div>
        )
    }

    return (
        !story? <Loader type="Puff" color="#00BFFF" height={100} width={100} /> :
        (<div>
            <Link to="/" >
                <div>{"<<"} Back</div>
            </Link>
            <div className="storyTitle">
                
                {story.title}
            </div>
                {comments? comments.map((comment) => {return listedComment(comment)}) : "This story has no comments yet..."}
            
        </div>)
    );
}

export default ShowStory;