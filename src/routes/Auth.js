import React, { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth } from 'fbase';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');

  const onChange = (e) => {
    console.log(e.target.name);
    const {
      target: { name, value },
    } = e;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        data = await signInWithEmailAndPassword(auth, email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === 'google') {
      provider = new GoogleAuthProvider();
    }
    const data = await signInWithPopup(auth, provider);
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={onChange}
          required
        />
        <input
          name='password'
          type='password'
          placeholder='password'
          value={password}
          onChange={onChange}
          required
        />
        <input type='submit' value={newAccount ? '회원가입' : '로그인'} />
        {error}
      </form>
      <span onClick={toggleAccount}>{newAccount ? '로그인' : '회원가입'}</span>
      <div>
        <button onClick={onSocialClick} name='google'>
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Auth;
