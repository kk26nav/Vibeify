import React, { useState, useContext, useEffect } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import AlbumItem from './AlbumItem';
import SongItem from './SongItem';

const MoodRecommender = () => {
  const { albumsData, songsData } = useContext(PlayerContext);
  const [mood, setMood] = useState('');
  const [weather, setWeather] = useState(null);
  const [temperature, setTemperature] = useState(null);

  // Get weather from localStorage (set by WeatherFetcher)
  useEffect(() => {
    const weatherData = localStorage.getItem('weather');
    const tempData = localStorage.getItem('temperature');
    setWeather(weatherData);
    setTemperature(parseFloat(tempData));
  }, []);

  // Enhanced mood-to-album mapping with weather consideration
  const getRecommendedAlbumId = (selectedMood, weatherCondition, temp) => {
    const baseMoodMapping = {
      happy: '6885281b69573bab998eeb36',
      sad: '6885286269573bab998eeb39', 
      energetic: '6885288069573bab998eeb3c',
      calm: '68851f2369573bab998eeb1d',
    };

    // Weather-influenced recommendations
    const weatherInfluence = {
      // Hot weather (>25°C) - prefer energetic/happy
      hot: {
        happy: '6885281b69573bab998eeb36',
        sad: '68851f2369573bab998eeb1d', // calm instead of sad
        energetic: '6885288069573bab998eeb3c',
        calm: '68851f2369573bab998eeb1d',
      },
      // Cold/Rainy weather (<15°C or Clouds/Rain) - prefer calm/sad
      cold: {
        happy: '68851f2369573bab998eeb1d', // calm instead of happy
        sad: '6885286269573bab998eeb39',
        energetic: '6885281b69573bab998eeb36', // happy instead of energetic
        calm: '68851f2369573bab998eeb1d',
      }
    };

    // Determine weather category
    if (temp > 25 || weatherCondition === 'Clear') {
      return weatherInfluence.hot[selectedMood] || baseMoodMapping[selectedMood];
    } else if (temp < 15 || weatherCondition === 'Clouds' || weatherCondition === 'Rain') {
      return weatherInfluence.cold[selectedMood] || baseMoodMapping[selectedMood];
    }

    return baseMoodMapping[selectedMood];
  };

  const albumId = getRecommendedAlbumId(mood, weather, temperature);
  const selectedAlbum = albumsData.find((album) => album._id === albumId);
  const selectedSongs = songsData.filter((song) => song.album === albumId);

  return (
    <div className="p-4">
      {/* Weather Display */}
      {weather && (
        <div className="mb-4 text-sm text-gray-600">
          Current Weather: {weather}, {temperature}°C
        </div>
      )}

      {/* Mood Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-white">
          Mood-Based Recommendations
        </h3>
        <div className="flex gap-2 flex-wrap">
          {['happy', 'sad', 'energetic', 'calm'].map((moodOption) => (
            <button
              key={moodOption}
              onClick={() => setMood(moodOption)}
              className={`px-4 py-2 rounded-full text-sm transition-colors capitalize ${
                mood === moodOption
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {moodOption}
            </button>
          ))}
        </div>
      </div>

      {/* Recommendation Display */}
      {mood && selectedAlbum && (
        <div className="mb-6">
          <h4 className="text-base font-medium mb-3 text-white">
            Perfect for your "{mood}" mood {weather && `in ${weather.toLowerCase()} weather`}:
          </h4>
          <AlbumItem
            image={selectedAlbum.image}
            name={selectedAlbum.name}
            desc={selectedAlbum.desc}
            id={selectedAlbum._id}
          />
        </div>
      )}

      {/* Songs from recommended album */}
      {selectedSongs.length > 0 && (
        <div>
          <h4 className="text-base font-medium mb-3 text-white">
            Songs from this album:
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {selectedSongs.slice(0, 8).map((song) => (
              <SongItem
                key={song._id}
                name={song.name}
                image={song.image}
                desc={song.desc}
                id={song._id}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodRecommender;
