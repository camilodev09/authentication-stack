'use client'

import useSWR from 'swr';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import LogoutButton from '../components/LogoutButton';


//const fetcher = (url) => fetch(url).then((res) => res.json());

const ProfileComponent = () => {
  const { username } = useContext(UserContext);
 // const { data: user, error } = useSWR('', fetcher);

 

  return (
    <div>
      <h1 className='border center'>FCC Advanced Node and Express Profile</h1>
      <h2 className='center' id='welcome'>
        Welcome, {username} mamita. Trust & Segutity. We are the best solution. 
      </h2>
      <LogoutButton />
    </div>
  );
};

export default ProfileComponent;
