export type WeddingInvitationConfig = {
  groom: string;
  bride: string;
  initials: string;
  dateTime: string;
  dateDisplay: string;
  weekday: string;
  time: string;
  venueName: string;
  venueArea: string;
  venueDescription: string;
  mapUrl: string;
  couplePhotoUrl: string;
  venueImageUrl: string;
  audioUrl: string;
};

export const defaultInvitationSlug = "lina-adam";

export const invitations: Record<string, WeddingInvitationConfig> = {
  [defaultInvitationSlug]: {
    groom: "Lina",
    bride: "Adam",
    initials: "L&A",
    dateTime: "2027-05-15T18:00:00+03:00",
    dateDisplay: "15 / 5 / 2027",
    weekday: "Saturday",
    time: "7:00 PM",
    venueName: "Moonlit Garden Hall",
    venueArea: "Willow Grove",
    venueDescription: "Willow Grove Celebration Hall",
    mapUrl: "https://maps.google.com/?q=Moonlit+Garden+Hall+Willow+Grove",
    couplePhotoUrl: "/assets/groom%26bride.jpg",
    venueImageUrl: "/assests/venue.svg",
    audioUrl: "/assests/zaffa.mp3",
  },
};
