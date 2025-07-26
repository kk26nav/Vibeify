import React, { useState, useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import AlbumItem from './AlbumItem';
import SongItem from './SongItem';

const MoodRecommender = () => {
  const { albumsData, songsData } = useContext(PlayerContext);

  const [mood, setMood] = useState('');
  
  const moodToAlbumId = {
    happy: '6885281b69573bab998eeb36',
    sad: '6885286269573bab998eeb39',
    energetic: '6885288069573bab998eeb3c',
    calm: '68851f2369573bab998eeb1d',
  };

  const albumId = moodToAlbumId[mood];

  const selectedAlbum = albumsData.find((album) => album._id === albumId);
  const selectedSongs = songsData.filter((song) => song.album === albumId);

  return (
    <div>
      <h2 className="font-semibold text-xl mb-3">Mood-Based Recommendations</h2>

      <div className="flex gap-3 mb-4">
        {Object.keys(moodToAlbumId).map((m) => (
          <button
            key={m}
            onClick={() => setMood(m)}
            className={`px-4 py-2 rounded-full text-white ${mood === m ? 'bg-green-700' : 'bg-gray-600'}`}
          >
            {m}
          </button>
        ))}
      </div>

      {selectedAlbum && (
        <>
          <h3 className="font-bold text-lg mb-2">Album for "{mood}" mood:</h3>
          <AlbumItem
            name={selectedAlbum.name}
            desc={selectedAlbum.desc}
            id={selectedAlbum._id}
            image={selectedAlbum.image}
          />
        </>
      )}

      {selectedSongs.length > 0 && (
        <div className="mt-4">
          <h3 className="font-bold text-lg mb-2">Songs in this mood:</h3>
          <div className="flex overflow-auto">
            {selectedSongs.map((song, index) => (
              <SongItem
                key={index}
                name={song.name}
                desc={song.desc}
                id={song._id}
                image={song.image}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodRecommender;
