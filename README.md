# Wedding invitation template

Template name: **Golden Hour**

The invitation design is shared by every couple. Each invitation gets its own
URL and settings in `app/invitations.ts`.

The footer credit and Dearly Instagram link are part of the shared design
template in `templates/invitation.html`.

## Add an invitation

1. Add an entry to `invitations` in `app/invitations.ts`. Use a URL-safe key,
   such as `sara-and-omar`; the invitation will be available at `/sara-and-omar`.
2. Set the couple's names, date and time, venue, map link, and image/audio URLs
   in that entry.
3. Put local media in `public/assests/` (the existing template uses this exact
   folder spelling), then refer to it with a URL such as
   `/assests/sara-and-omar.jpg`. The hall image is currently the reusable
   illustration at `public/assests/venue.svg`.

For example, add another entry beside the existing one and change its key and values:

```ts
"sara-and-omar": {
  groom: "Omar",
  bride: "Sara",
  initials: "O&S",
  dateTime: "2027-04-12T18:00:00+02:00",
  dateDisplay: "12 / 4 / 2027",
  weekday: "Monday",
  time: "6:00 PM",
  venueName: "Your venue",
  venueArea: "Your city",
  venueDescription: "Ceremony & Reception",
  mapUrl: "https://maps.google.com/?q=Your+Venue",
  couplePhotoUrl: "/assests/sara-and-omar.jpg",
  venueImageUrl: "/assests/venue.svg",
  audioUrl: "/assests/zaffa.mp3",
},
```

The root URL redirects to `defaultInvitationSlug`. Change that export to make
another invitation the home page.

## RSVP / guestbook

The guestbook form is intentionally disabled: this template does not currently
collect or store guest details. No database or Supabase setup is needed.
The couple can still be contacted using the venue's map link; the RSVP form can
be connected to a service later if desired.

## Run locally

```sh
npm run dev
```

Before deploying, run `npm run build` and deploy this as a Node.js Next.js app
(Node.js 20.9 or newer). The build creates `public/invitation.css`; the
invitation template no longer loads Tailwind from a CDN.
