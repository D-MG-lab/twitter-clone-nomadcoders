import React from 'react';
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from 'fbase';

const Home = () => {
  const [nweet, setNweet] = useState('');
  const onSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'nweets'), {
      text: nweet,
      createdAt: Date.now(),
    });
    setNweet('');
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNweet(value);
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type='text'
          placeholder="what's on your mind?"
          maxLength={120}
        ></input>
        <input type='submit' value='Nweet' />
      </form>
    </>
  );
};

export default Home;
