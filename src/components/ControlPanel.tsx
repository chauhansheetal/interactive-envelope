import { useState } from 'react';
import type { EnvelopeStyle, SelectionMode, Photo, StyleFilter } from '../types';

interface ControlPanelProps {
  selectionMode: SelectionMode;
  onSelectionModeChange: (mode: SelectionMode) => void;
  envelopeStyle: EnvelopeStyle;
  onEnvelopeStyleChange: (style: EnvelopeStyle) => void;
  stamp?: { message: string };
  onStampChange: (message: string) => void;
  photos: Photo[];
  onPhotosChange: (photos: Photo[]) => void;
  onFilterApply: (photoId: string, filterId: string) => void;
  onCustomStyleUpload: (file: File) => void;
}

const ENVELOPE_STYLES: { id: EnvelopeStyle; name: string; color: string }[] = [
  { id: 'orange', name: 'Sunset Orange', color: '#FF8C42' },
  { id: 'blue', name: 'Ocean Blue', color: '#4A90E2' },
  { id: 'pink', name: 'Flamingo Pink', color: '#FF6B9D' },
  { id: 'green', name: 'Mint Green', color: '#6BCF7F' },
  { id: 'purple', name: 'Lavender', color: '#9B6BCE' },
  { id: 'red', name: 'Ruby Red', color: '#E74C3C' },
];

const PRESET_FILTERS: StyleFilter[] = [
  { id: 'none', name: 'None' },
  { id: 'vintage', name: 'Vintage' },
  { id: 'vibrant', name: 'Vibrant' },
  { id: 'noir', name: 'Film Noir' },
  { id: 'pastel', name: 'Pastel Dream' },
  { id: 'warm', name: 'Warm Sunset' },
  { id: 'cool', name: 'Cool Tones' },
  { id: 'custom', name: 'Custom Style' },
];

export default function ControlPanel({
  selectionMode,
  onSelectionModeChange,
  envelopeStyle,
  onEnvelopeStyleChange,
  stamp,
  onStampChange,
  photos,
  onPhotosChange,
  onFilterApply,
  onCustomStyleUpload,
}: ControlPanelProps) {
  const [stampText, setStampText] = useState(stamp?.message || '');
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null);

  const handleStampSubmit = () => {
    const words = stampText.trim().split(/\s+/);
    if (words.length > 3) {
      alert('Maximum 3 words allowed for stamp');
      return;
    }
    onStampChange(stampText);
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newPhotos: Photo[] = [];
    Array.from(files).forEach((file, index) => {
      if (photos.length + newPhotos.length >= 5) {
        alert('Maximum 5 photos allowed');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const photo: Photo = {
          id: `photo-${Date.now()}-${index}`,
          url: e.target?.result as string,
          file,
        };
        newPhotos.push(photo);
        if (newPhotos.length === files.length || photos.length + newPhotos.length >= 5) {
          onPhotosChange([...photos, ...newPhotos]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleCustomStyleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onCustomStyleUpload(file);
    }
  };

  const handleDeletePhoto = (photoId: string) => {
    onPhotosChange(photos.filter((p) => p.id !== photoId));
  };

  return (
    <div className="w-80 h-full bg-white shadow-2xl overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Mode Selection */}
        <div>
          <h3 className="text-lg font-bold mb-3 text-gray-800">Select Mode</h3>
          <div className="flex gap-2">
            <button
              onClick={() => onSelectionModeChange('cover')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                selectionMode === 'cover'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Cover
            </button>
            <button
              onClick={() => onSelectionModeChange('photos')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                selectionMode === 'photos'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Photos
            </button>
          </div>
        </div>

        {/* Cover Customization */}
        {selectionMode === 'cover' && (
          <div className="space-y-6">
            {/* Envelope Style */}
            <div>
              <h3 className="text-lg font-bold mb-3 text-gray-800">Envelope Style</h3>
              <div className="grid grid-cols-3 gap-2">
                {ENVELOPE_STYLES.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => onEnvelopeStyleChange(style.id)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      envelopeStyle === style.id
                        ? 'border-purple-600 shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div
                      className="w-full h-12 rounded mb-1"
                      style={{ backgroundColor: style.color }}
                    />
                    <p className="text-xs text-gray-600 text-center">{style.name}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Stamp Customization */}
            <div>
              <h3 className="text-lg font-bold mb-3 text-gray-800">Custom Stamp</h3>
              <div className="space-y-2">
                <input
                  type="text"
                  value={stampText}
                  onChange={(e) => setStampText(e.target.value)}
                  placeholder="Max 3 words"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  maxLength={30}
                />
                <button
                  onClick={handleStampSubmit}
                  className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Apply Stamp
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Photo Customization */}
        {selectionMode === 'photos' && (
          <div className="space-y-6">
            {/* Photo Upload */}
            <div>
              <h3 className="text-lg font-bold mb-3 text-gray-800">
                Add Photos ({photos.length}/5)
              </h3>
              <label className="block">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  disabled={photos.length >= 5}
                  className="hidden"
                />
                <div
                  className={`w-full py-3 border-2 border-dashed rounded-lg text-center cursor-pointer transition-all ${
                    photos.length >= 5
                      ? 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'border-purple-400 bg-purple-50 text-purple-600 hover:border-purple-600 hover:bg-purple-100'
                  }`}
                >
                  + Upload Photos
                </div>
              </label>
            </div>

            {/* Photo List */}
            {photos.length > 0 && (
              <div>
                <h3 className="text-lg font-bold mb-3 text-gray-800">Your Photos</h3>
                <div className="space-y-2">
                  {photos.map((photo) => (
                    <div
                      key={photo.id}
                      className={`p-2 border rounded-lg cursor-pointer transition-all ${
                        selectedPhotoId === photo.id
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedPhotoId(photo.id)}
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={photo.url}
                          alt="Thumbnail"
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-600 truncate">
                            Photo {photos.indexOf(photo) + 1}
                          </p>
                          {photo.filter && photo.filter !== 'none' && (
                            <p className="text-xs text-purple-600">
                              Filter: {photo.filter}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeletePhoto(photo.id);
                          }}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Filters */}
            {selectedPhotoId && (
              <div>
                <h3 className="text-lg font-bold mb-3 text-gray-800">Apply Filter</h3>
                <div className="grid grid-cols-2 gap-2">
                  {PRESET_FILTERS.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => {
                        if (filter.id === 'custom') {
                          document.getElementById('custom-style-upload')?.click();
                        } else {
                          onFilterApply(selectedPhotoId, filter.id);
                        }
                      }}
                      className="py-2 px-3 border border-gray-300 rounded-lg hover:border-purple-600 hover:bg-purple-50 transition-all text-sm"
                    >
                      {filter.name}
                    </button>
                  ))}
                </div>
                <input
                  id="custom-style-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleCustomStyleUpload}
                  className="hidden"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
