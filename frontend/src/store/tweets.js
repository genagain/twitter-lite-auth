import { fetch } from "./csrf";

const ADD_TWEETS = 'tweets/addTweets';

const SET_TWEETS = 'tweets/setTweets';

const setTweets = (tweets) => ({
    type: SET_TWEETS,
    payload: tweets
});

const addTweet = (tweet) => ({
    type: ADD_TWEETS,
    payload: tweet
});

export const getAllTweets = () => async (dispatch) => {
    const res = await fetch('/api/tweets')

    const json = res.data
    const tweets = json.tweets
    let normalizedTweets = {}
    for (let i = 0; i < tweets.length; i++) {
        const tweet = tweets[i]
        normalizedTweets[tweet.id] = tweet
    }

    dispatch(setTweets(normalizedTweets))
}

export const postTweet = tweet => async dispatch => {
    const res = await fetch('/api/tweets', {
        method: 'POST',
        body: JSON.stringify({message: tweet})
    })
    const newTweet= res.data.tweet
    dispatch(addTweet(newTweet)) 
}

const initialState = { };

function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case SET_TWEETS:
            newState = Object.assign({}, state, action.payload );
            return newState;
        case ADD_TWEETS:
            const tweet = action.payload
            const tweetId = tweet.id
            newState = Object.assign({}, state, { tweetId: tweet })
            return newState
        default:
            return state;
    }
}

export default reducer;
