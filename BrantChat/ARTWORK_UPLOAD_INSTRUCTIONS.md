# Crew Artwork Upload Instructions

## How to Upload Your Crew Artwork

1. **Place your artwork files** in the `public/gifs/` directory with these exact names:
   - `crew-artwork-1.gif` (your first design example)
   - `crew-artwork-2.gif` (your second design example)

## File Structure Should Look Like:
```
public/
  gifs/
    crew-artwork-1.gif     (required - your first design example)
    crew-artwork-2.gif     (required - your second design example)
```

## How It Works:
- When the AI mentions "Crew", "brand", or "design" in any response, your artwork will automatically appear
- The artwork displays in a clean 2-column grid layout
- Each image has a caption and the bottom shows "Examples of Brant's design work that saved Crew $110K+ in design costs"
- The images are responsive and look great on all devices

## Supported Formats:
- **GIF** (recommended) - animated or static, works everywhere
- **PNG** - high quality, good for detailed designs
- **JPG** - smaller file size, good for photos
- **WebP** - modern format, excellent compression

## Design Features:
- **Responsive Grid**: 1 column on mobile, 2 columns on desktop
- **Professional Styling**: Rounded corners, shadows, clean layout
- **Auto-sizing**: Images scale appropriately for the chat interface
- **Accessibility**: Proper alt text for screen readers

## Trigger Words:
The artwork will automatically appear when the AI mentions:
- "Crew" (company name)
- "brand" (branding work)
- "design" (design work)

## Next Steps:
1. Upload your artwork files to `public/gifs/crew-artwork-1.gif` and `public/gifs/crew-artwork-2.gif`
2. Deploy to Vercel with `vercel --prod`
3. Test by asking about your work at Crew or design experience

The system is already set up to automatically detect Crew/design mentions and display your artwork!
