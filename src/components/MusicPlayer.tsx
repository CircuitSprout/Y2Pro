import React, { useState, useRef, useEffect, useCallback } from 'react';
import { PlaylistLinkedList, type Song } from '../utils/PlaylistLinkedList';
import digitalLoveAudio from '../assets/audio/digital-love.mp3';
import './MusicPlayer.css';


const sampleSongs: Song[] = [
  {
    id: '1',
    title: 'Digital Love',
    artist: 'Daft Punk',
    duration: 0, // Will be set automatically when audio loads
    audioUrl: digitalLoveAudio,
    coverArt: '🎵'
  },
  {
    id: '2',
    title: 'Neon Nights',
    artist: 'Cyber Princess',
    duration: 198,
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', // placeholder
    coverArt: '💿'
  },
  {
    id: '3',
    title: 'Holographic Heart',
    artist: 'Tech Angel',
    duration: 312,
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', 
    coverArt: '💖'
  },
  {
    id: '4',
    title: 'Chrome Dreams',
    artist: 'Silver Starlet',
    duration: 267,
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', 
    coverArt: '✨'
  }
];

const MusicPlayer: React.FC = () => {
  const [playlist] = useState(() => {
    const list = new PlaylistLinkedList();
    sampleSongs.forEach(song => list.addSong(song));
    return list;
  });

  const [currentSong, setCurrentSong] = useState<Song | null>(playlist.getCurrentSong());
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  // Effect to automatically detect and set duration when audio loads
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    const handleLoadedMetadata = () => {
      const realDuration = audio.duration;
      if (realDuration && currentSong.duration === 0) {
        // Update the song duration in the playlist
        const updatedSong = { ...currentSong, duration: realDuration };
        playlist.updateSong(currentSong.id, updatedSong);
        setCurrentSong(updatedSong);
      }
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    
    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [currentSong, playlist]);

  const handleNext = useCallback(() => {
    const nextSong = playlist.getNext();
    if (nextSong) {
      setCurrentSong(nextSong);
      setCurrentTime(0);
      if (isPlaying && audioRef.current) {
        audioRef.current.play();
      }
    }
  }, [playlist, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('ended', handleNext);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('ended', handleNext);
    };
  }, [handleNext]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    const prevSong = playlist.getPrevious();
    if (prevSong) {
      setCurrentSong(prevSong);
      setCurrentTime(0);
      if (isPlaying && audioRef.current) {
        audioRef.current.play();
      }
    }
  };

  const handleSongSelect = (songId: string) => {
    const selectedSong = playlist.setCurrentSong(songId);
    if (selectedSong) {
      setCurrentSong(selectedSong);
      setCurrentTime(0);
      if (isPlaying && audioRef.current) {
        audioRef.current.play();
      }
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;
    
    const newTime = (parseFloat(e.target.value) / 100) * currentSong.duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const progressPercentage = currentSong ? (currentTime / currentSong.duration) * 100 : 0;

  return (
    <div className="music-player">
      <div className="player-header">
        <h1>Y2Pro</h1>
        <div className="holographic-line"></div>
      </div>

      {currentSong && (
        <audio
          ref={audioRef}
          src={currentSong.audioUrl}
          onLoadedData={() => setCurrentTime(0)}
        />
      )}

      <div className="main-player">
        <div className="current-song-display">
          {currentSong ? (
            <>
              <div className="album-art">
                <div className="art-container">
                  <span className="cover-emoji">{currentSong.coverArt}</span>
                  <div className="holographic-overlay"></div>
                </div>
              </div>
              <div className="song-info">
                <h2 className="song-title">{currentSong.title}</h2>
                <p className="artist-name">{currentSong.artist}</p>
              </div>
            </>
          ) : (
            <div className="no-song">Select a song to play</div>
          )}
        </div>

        <div className="player-controls">
          <button className="control-btn" onClick={handlePrevious}>
            ⏮️ PREV
          </button>
          <button className="play-pause-btn" onClick={handlePlayPause}>
            {isPlaying ? '⏸️ PAUSE' : '▶️ PLAY'}
          </button>
          <button className="control-btn" onClick={handleNext}>
            ⏭️ NEXT
          </button>
        </div>

        {currentSong && (
          <div className="progress-section">
            <div className="time-display">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(currentSong.duration)}</span>
            </div>
            <div className="progress-bar-container">
              <input
                type="range"
                min="0"
                max="100"
                value={progressPercentage}
                onChange={handleProgressChange}
                className="progress-bar"
              />
            </div>
          </div>
        )}

        <div className="volume-control">
          <span className="volume-icon">🔊</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="volume-slider"
          />
        </div>
      </div>

      <div className="playlist-section">
        <h3>Playlist ({playlist.getSize()} songs)</h3>
        <div className="playlist">
          {playlist.getAllSongs().map((song) => (
            <div
              key={song.id}
              className={`playlist-item ${currentSong?.id === song.id ? 'active' : ''}`}
              onClick={() => handleSongSelect(song.id)}
            >
              <span className="song-cover">{song.coverArt}</span>
              <div className="song-details">
                <div className="song-name">{song.title}</div>
                <div className="artist">{song.artist}</div>
              </div>
              <div className="song-duration">{formatTime(song.duration)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
