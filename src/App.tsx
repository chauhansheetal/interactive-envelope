import { useState } from 'react';
import type { ViewMode, EnvelopeStyle, Photo } from './types';
import Envelope3D from './components/Envelope3D';
import RemixView from './components/RemixView';

// Sample photos for demo
const SAMPLE_PHOTOS: Photo[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop',
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop',
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=300&fit=crop',
  },
];

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('preview');
  const [envelopeStyle, setEnvelopeStyle] = useState<EnvelopeStyle>('orange');
  const [stamp, setStamp] = useState<{ message: string }>({ message: 'Greetings' });
  const [photos, setPhotos] = useState<Photo[]>(SAMPLE_PHOTOS);

  const handleStampChange = (message: string) => {
    setStamp({ message });
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      {viewMode === 'preview' ? (
        <Envelope3D
          style={envelopeStyle}
          photos={photos}
          stamp={stamp}
          onRemixClick={() => setViewMode('remix')}
        />
      ) : (
        <RemixView
          envelopeStyle={envelopeStyle}
          onEnvelopeStyleChange={setEnvelopeStyle}
          stamp={stamp}
          onStampChange={handleStampChange}
          photos={photos}
          onPhotosChange={setPhotos}
          onBack={() => setViewMode('preview')}
        />
      )}
    </div>
  );
}

export default App;
