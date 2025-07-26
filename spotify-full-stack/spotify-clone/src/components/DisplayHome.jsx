{/*import React from 'react'
import Navbar from './Navbar'
// import { albumsData } from '../assets/assets'
import AlbumItem from './AlbumItem'
// import { songsData } from '../assets/assets'
import SongItem from './SongItem'
import { useContext } from 'react'
import { PlayerContext } from '../context/PlayerContext'

const DisplayHome = () => {

  const { songsData,albumsData } = useContext(PlayerContext);

  return (
    <>
     <Navbar />
     <div className='mb-4'>
      <h1 className='my-5 font-bold text-2xl'>Featured Charts</h1>
      <div className='flex overflow-auto'>
          {albumsData.map((item,index)=>(<AlbumItem key={index} name={item.name} desc={item.desc} id={item._id} image={item.image}/>))}
      </div>
     </div>
     <div className='mb-4'>
      <h1 className='my-5 font-bold text-2xl'>Today's biggest hits</h1>
      <div className='flex overflow-auto'>
          {songsData.map((item,index)=>(<SongItem key={index} name={item.name} desc={item.desc} id={item._id} image={item.image} />))}
      </div>
     </div>
    </>
  )
}

export default DisplayHome */}
{/*
import React, { useContext } from 'react';
import Navbar from './Navbar';
import AlbumItem from './AlbumItem';
import SongItem from './SongItem';
import MoodRecommender from './MoodRecommender'; // 🆕 Imported mood recommender
import { PlayerContext } from '../context/PlayerContext';

const DisplayHome = () => {
  const { songsData, albumsData } = useContext(PlayerContext);

  // 🆕 Get mood from localStorage
  const mood = localStorage.getItem("mood");

  // 🆕 Define mood-to-albumID mapping (replace with real IDs from your albums)
  const moodToAlbumId = {
    happy: '6885281b69573bab998eeb36',
    sad: '6885286269573bab998eeb39',
    energetic: '6885288069573bab998eeb3c',
    calm: '68851f2369573bab998eeb1d',
  };

  const selectedAlbumId = moodToAlbumId[mood];

  // 🆕 Filter songs based on mood's album ID
  const filteredSongs = selectedAlbumId
    ? songsData.filter(song => song.album === selectedAlbumId)
    : songsData;

  return (
    <>
      <Navbar />

      <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>Featured Charts</h1>
        <div className='flex overflow-auto'>
          {albumsData.map((item, index) => (
            <AlbumItem
              key={index}
              name={item.name}
              desc={item.desc}
              id={item._id}
              image={item.image}
            />
          ))}
        </div>
      </div>

      
      <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>
          {mood ? `Songs for your mood: ${mood}` : "Today's biggest hits"}
        </h1>
        <div className='flex overflow-auto'>
          {filteredSongs.map((item, index) => (
            <SongItem
              key={index}
              name={item.name}
              desc={item.desc}
              id={item._id}
              image={item.image}
            />
          ))}
        </div>
      </div>

      {
      <div className='mb-10'>
        <MoodRecommender />
      </div>
    </>
  );
};

export default DisplayHome; 
*/}

import React, { useContext } from 'react';
import Navbar from './Navbar';
import AlbumItem from './AlbumItem';
import SongItem from './SongItem';
import MoodRecommender from './MoodRecommender'; // 🆕 Imported mood recommender
import { PlayerContext } from '../context/PlayerContext';

const DisplayHome = () => {
  const { songsData, albumsData } = useContext(PlayerContext);

  // 🆕 Get mood from localStorage
  const mood = localStorage.getItem("mood");

  // 🆕 Define mood-to-albumID mapping (replace with real IDs from your albums)
  const moodToAlbumId = {
    happy: '6885281b69573bab998eeb36',
    sad: '6885286269573bab998eeb39',
    energetic: '6885288069573bab998eeb3c',
    calm: '68851f2369573bab998eeb1d',
  };

  const selectedAlbumId = moodToAlbumId[mood];

  // 🆕 Filter songs based on mood's album ID
  const filteredSongs = selectedAlbumId
    ? songsData.filter(song => song.album === selectedAlbumId)
    : songsData;

  return (
    <>
      <Navbar />

      {/* 🆕 Mood recommender section comes first */}
      <div className='mb-10'>
        <MoodRecommender />
      </div>

      {/* 🔁 Mood-based or default song section */}
      <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>
          {mood ? `Songs for your mood: ${mood}` : "Today's biggest hits"}
        </h1>
        <div className='flex overflow-auto'>
          {filteredSongs.map((item, index) => (
            <SongItem
              key={index}
              name={item.name}
              desc={item.desc}
              id={item._id}
              image={item.image}
            />
          ))}
        </div>
      </div>

      {/* Featured Charts */}
      <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>Featured Charts</h1>
        <div className='flex overflow-auto'>
          {albumsData.map((item, index) => (
            <AlbumItem
              key={index}
              name={item.name}
              desc={item.desc}
              id={item._id}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DisplayHome;
