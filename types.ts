
export interface WeddingData {
  groom: string;
  groomFull: string;
  groomParents: string;
  bride: string;
  brideFull: string;
  brideParents: string;
  date: string;
  timeAkad: string;
  timeResepsi: string;
  locationName: string;
  locationAddress: string;
  googleMapsUrl: string;
  storyTitle: string;
  storyContent: string;
  musicUrl: string;
  isMusicEnabled: boolean;
  gallery: string[];
}

export interface RSVP {
  id: string;
  name: string;
  attendance: 'hadir' | 'tidak_hadir';
  guests: number;
  message: string;
  createdAt: number;
}
