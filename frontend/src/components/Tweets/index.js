import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as tweetActions from "../../store/tweets";

function Tweets() {
    const dispatch = useDispatch();
    const tweets = useSelector((state) => Object.values(state.tweets));
    const [tweet, setTweet] = useState('')

    useEffect(() => {
        dispatch(tweetActions.getAllTweets())
    }, [dispatch])

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(tweetActions.postTweet(tweet))
        setTweet('')
    }

    // [] Create a form
    // [] Dispatch a thunk
    // [] Thunk does the fetch POST request
    // [] Backend creates the Tweet
    // [] Thunk dispatches a addTweet action
    // [] Tweet reducer updates the store

    return (
        <>
        <h1>hey</h1>
        <form onSubmit={handleSubmit}>
            <input type='text' value={tweet} onChange={e => setTweet(e.target.value)} name="tweet"/>
            <button type='submit'>Tweet!</button>
        </form>
        {
            tweets.map(tweet => (tweet.message))
        }
        </>
    )
}

export default Tweets