# Archway Video Upload Instructions

## How to Upload Your Archway Video

1. **Place your video file** in the `public/videos/` directory with the name `archway-project.mp4`
2. **Optional**: Add a poster image as `archway-poster.jpg` for the video thumbnail
3. **Optional**: Add a WebM version as `archway-project.webm` for better browser compatibility

## File Structure Should Look Like:
```
public/
  videos/
    archway-project.mp4     (required - your main video file)
    archway-poster.jpg      (optional - video thumbnail)
    archway-project.webm    (optional - WebM version for better compatibility)
```

## How It Works:
- When the AI mentions "archway" in any response, the video will automatically appear below the text
- The video will have controls so users can play/pause/seek
- It will be responsive and look great on all devices
- No external links needed - everything is self-contained

## Supported Video Formats:
- **MP4** (recommended) - works on all modern browsers
- **WebM** (optional) - better compression, works on Chrome/Firefox
- **Poster image** (optional) - JPG/PNG thumbnail shown before video plays

## Next Steps:
1. Upload your video file to `public/videos/archway-project.mp4`
2. Deploy to Vercel with `vercel --prod`
3. Test by asking about the archway project in the chat

The system is already set up to automatically detect "archway" mentions and embed the video!
