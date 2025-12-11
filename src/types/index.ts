export interface Photo {
  id: string;
  url: string;
  file?: File;
  filter?: string;
}

export type EnvelopeStyle = 'orange' | 'blue' | 'pink' | 'green' | 'purple' | 'red';

export interface EnvelopeConfig {
  style: EnvelopeStyle;
  stamp?: {
    message: string; // max 3 words
  };
}

export type ViewMode = 'preview' | 'remix';

export type SelectionMode = 'cover' | 'photos';

export interface AppState {
  viewMode: ViewMode;
  selectionMode: SelectionMode;
  envelopeConfig: EnvelopeConfig;
  photos: Photo[];
  customStyleImage?: string;
}

export interface StyleFilter {
  id: string;
  name: string;
  thumbnail?: string;
}
