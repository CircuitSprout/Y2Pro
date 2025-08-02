# 🎵 Audio Files Guide

## Supported Audio Formats
- **MP3** - Most common, good compression
- **WAV** - Uncompressed, high quality
- **OGG** - Good compression, web-friendly
- **M4A** - Apple format, good quality

## How to Add Your Music

1. **Place audio files here** in this `assets/audio/` folder
2. **Import them** in your `MusicPlayer.tsx` file
3. **Update the sampleSongs array** to use the imported files

## Example File Names
```
digital-love.mp3
neon-nights.wav
holographic-heart.mp3
chrome-dreams.mp3
```

## Code Example

When you add real files, update `MusicPlayer.tsx` like this:

```tsx
// Import your audio files
import digitalLoveAudio from '../assets/audio/digital-love.mp3';
import neonNightsAudio from '../assets/audio/neon-nights.wav';
import holographicHeartAudio from '../assets/audio/holographic-heart.mp3';
import chromeDreamsAudio from '../assets/audio/chrome-dreams.mp3';


const sampleSongs: Song[] = [
  {
    id: '1',
    title: 'Digital Love',
    artist: 'Daft Punk',
    duration: 501,
    audioUrl: digitalLoveAudio, 
    coverArt: '🎵'
  },
  {
    id: '2',
    title: 'Neon Nights',
    artist: 'Cyber Princess',
    duration: 198,
    audioUrl: neonNightsAudio,
    coverArt: '💿'
  },

];
```

## File Size Considerations

- **Keep files under 10MB each** for good performance
- **Consider compressing** large files
- **Use MP3 at 128-320 kbps** for good quality/size balance

## Copyright Notice

Make sure you have the rights to use any audio files you add to your project!
