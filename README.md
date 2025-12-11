# Interactive 3D Envelope

An interactive 3D envelope experience with photo customization capabilities, inspired by [Attio's Offsite](https://offsite.attio.com/).

## Features

### 🎨 3D Envelope Animation
- **Hover Interaction**: Envelope flips forward when hovered
- **Photos Spilling Out**: Beautiful animated photos emerge from the envelope on hover
- **Smooth Transitions**: Spring-based animations for natural movement

### ✨ Customization Options

#### Envelope Cover
- **6 Envelope Styles**: Choose from Orange, Blue, Pink, Green, Purple, or Red
- **Custom Stamps**: Add a personalized message (max 3 words) displayed as a red post stamp
- **Real-time Preview**: See changes instantly in the 3D view

#### Photos
- **Upload Photos**: Add up to 5 photos from your device
- **Multiple Layouts**: View photos in three different arrangements:
  - **Stack**: Layered cards with interactive selection
  - **Roll**: Horizontal scrolling gallery
  - **Grid**: Organized grid layout
- **Style Filters**: Apply preset filters or upload custom style images:
  - None
  - Vintage
  - Vibrant
  - Film Noir
  - Pastel Dream
  - Warm Sunset
  - Cool Tones
  - Custom Style (upload your own reference image)

## Technology Stack

- **React 18** with TypeScript
- **Three.js** + **React Three Fiber** for 3D rendering
- **@react-three/drei** for 3D helpers
- **@react-spring/three** for 3D animations
- **Framer Motion** for UI animations
- **Tailwind CSS** for styling
- **Vite** for fast development and building

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Usage

### Preview Mode
1. **Hover over the envelope** to see the 3D flip animation and photos spilling out
2. **Click "Remix"** button to enter customization mode

### Remix Mode
1. **Select Mode**: Choose between "Cover" or "Photos" to customize different aspects
2. **Customize Cover**:
   - Click on envelope style swatches to change colors
   - Enter a custom stamp message (max 3 words) and click "Apply Stamp"
3. **Customize Photos**:
   - Upload photos (max 5) using the file picker
   - Click on a photo to select it
   - Apply filters from the preset options
   - Upload a custom style image for style transfer
   - Switch between Stack, Roll, and Grid layouts
4. **Click "← Back"** to return to preview mode with your changes

## Project Structure

```
src/
├── components/
│   ├── Envelope3D.tsx        # Main 3D envelope component with animations
│   ├── PhotoStack.tsx         # Photo display with multiple layout modes
│   ├── ControlPanel.tsx       # Customization controls sidebar
│   └── RemixView.tsx          # Remix/edit view combining components
├── types/
│   └── index.ts               # TypeScript type definitions
├── App.tsx                    # Main application component
├── main.tsx                   # Application entry point
└── index.css                  # Global styles with Tailwind
```

## Key Components

### Envelope3D
The main 3D envelope component featuring:
- Envelope body and flap meshes
- Animated flap rotation on hover
- Custom stamp rendering with 3D text
- Photos spilling out animation with staggered delays

### PhotoStack
Displays photos in three different layouts:
- **Stack**: Interactive layered cards with offset and rotation
- **Roll**: Horizontal scrolling gallery with hover scaling
- **Grid**: Responsive grid with scale animations

### ControlPanel
Comprehensive customization interface:
- Mode selection (Cover/Photos)
- Envelope style picker with color swatches
- Stamp text input with validation
- Photo upload and management
- Filter application system

### RemixView
The editing interface that:
- Combines PhotoStack and ControlPanel
- Provides layout mode switching
- Handles all customization logic
- Manages filter application and custom style uploads

## Style Transfer Integration

The application includes placeholder integration for style transfer using **nano banan pro**. When a user selects a custom style filter and uploads a reference image, the system is designed to:

1. Accept the style reference image
2. Send it to the nano banan pro API
3. Apply the style transfer to selected photos
4. Update the photo with the styled version

*Note: Full API integration is ready for nano banan pro connection.*

## Future Enhancements

- [ ] Implement actual nano banan pro API integration for style transfer
- [ ] Add more envelope designs and patterns
- [ ] Support for animated photos/GIFs
- [ ] Export functionality to download customized envelope
- [ ] Social sharing capabilities
- [ ] More layout modes (carousel, masonry, etc.)
- [ ] Advanced 3D effects (shadows, reflections)

## Browser Compatibility

This application uses modern web technologies and works best in:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

WebGL support is required for 3D rendering.

## License

MIT

## Credits

Inspired by [Attio's Offsite Interactive Experience](https://offsite.attio.com/)
