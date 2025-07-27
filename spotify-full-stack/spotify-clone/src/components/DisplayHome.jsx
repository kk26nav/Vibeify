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
{/*
import React, { useContext } from 'react';
import Navbar from './Navbar';
import AlbumItem from './AlbumItem';
import SongItem from './SongItem';
import MoodRecommender from './MoodRecommender';
import WeatherFetcher from './WeatherFetcher';
import { PlayerContext } from '../context/PlayerContext';

const DisplayHome = () => {
  const { songsData, albumsData } = useContext(PlayerContext);

  const mood = localStorage.getItem("mood");
  const weather = localStorage.getItem("weather");

  // 🔁 Mood + Weather recommendation map
  const moodWeatherToAlbumId = {
    happy: {
      Clear: '6885281b69573bab998eeb36',
      Clouds: '6885288069573bab998eeb3c',
      Rain: '6885286269573bab998eeb39',
    },
    sad: {
      Clear: '6885286269573bab998eeb39',
      Clouds: '68851f2369573bab998eeb1d',
      Rain: '68851f2369573bab998eeb1d',
    },
    energetic: {
      Clear: '6885288069573bab998eeb3c',
      Clouds: '6885281b69573bab998eeb36',
      Rain: '6885286269573bab998eeb39',
    },
    calm: {
      Clear: '68851f2369573bab998eeb1d',
      Clouds: '68851f2369573bab998eeb1d',
      Rain: '6885286269573bab998eeb39',
    },
  };

  const moodToAlbumId = {
    happy: '6885281b69573bab998eeb36',
    sad: '6885286269573bab998eeb39',
    energetic: '6885288069573bab998eeb3c',
    calm: '68851f2369573bab998eeb1d',
  };

  // 🧠 Select album ID based on mood + weather or fallback to mood
  const selectedAlbumId = mood && weather
    ? moodWeatherToAlbumId[mood]?.[weather] || moodToAlbumId[mood]
    : moodToAlbumId[mood];

  const filteredSongs = selectedAlbumId
    ? songsData.filter(song => song.album === selectedAlbumId)
    : songsData;

  return (
    <>
      <Navbar />

      
      <div className="px-4">
        <WeatherFetcher />
      </div>

      
      <div className="mb-10 px-4">
        <MoodRecommender />
      </div>

      
      <div className='mb-4 px-4'>
        <h1 className='my-5 font-bold text-2xl'>
          {mood && weather && (
            <>Recommended songs for your mood <span className="text-indigo-600">"{mood}"</span> and weather <span className="text-blue-500">"{weather}"</span></>
          )}
          {mood && !weather && (
            <>Recommended songs for your mood <span className="text-indigo-600">"{mood}"</span></>
          )}
          {!mood && !weather && "Today's biggest hits"}
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

      
      <div className='mb-4 px-4'>
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

export default DisplayHome; */}

import React from 'react'
import Navbar from './Navbar'
import AlbumItem from './AlbumItem'
import SongItem from './SongItem'
import MoodRecommender from './MoodRecommender'
import WeatherFetcher from './WeatherFetcher'
import { useContext } from 'react'
import { PlayerContext } from '../context/PlayerContext'

const DisplayHome = () => {
  const { songsData, albumsData } = useContext(PlayerContext);

  return (
    <>
      <Navbar />
      
      {/* Weather Component - runs in background and displays weather info */}
      <WeatherFetcher />
      
      {/* Mood-based Recommendations with Weather Integration */}
      <MoodRecommender />
      
      {/* Your existing Featured Charts section */}
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl text-white">Featured Charts</h1>
        <div className="flex overflow-auto">
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

      {/* Your existing Today's biggest hits section */}
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl text-white">Today's biggest hits</h1>
        <div className="flex overflow-auto">
          {songsData.map((item, index) => (
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
    </>
  );
};

export default DisplayHome;



