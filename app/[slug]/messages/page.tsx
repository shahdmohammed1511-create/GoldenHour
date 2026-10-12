import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { invitations } from "../../invitations";
import PrintButton from "../../messages/print-button";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(invitations).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const invitation = invitations[slug];

  if (!invitation) {
    return {};
  }

  return {
    title: `Guest Messages | ${invitation.groom} & ${invitation.bride}`,
    description: `Wedding wishes and messages for ${invitation.groom} and ${invitation.bride}.`,
  };
}

const messages = [
  {
    name: "Mariam Khaled",
    relation: "Bride's friend",
    text: "Lina & Adam, congratulations to the most wonderful couple! May your days be filled with love, laughter, and a lifetime of being each other's greatest joy. Love you both!",
  },
  {
    name: "Omar & Nada",
    relation: "Friends of the couple",
    text: "Here's to the beginning of your most beautiful story. Wishing you a lifetime of kindness, happiness, and wonderful adventures together. Congratulations from the bottom of our hearts!",
  },
  {
    name: "Aunt Salwa",
    relation: "Bride's family",
    text: "My dear Lina & Adam, my heart could not be happier for you today. May your home always be filled with warmth, peace, and the kind of love that grows more beautiful with every passing year.",
  },
  {
    name: "Youssef Mahmoud",
    relation: "Groom's friend",
    text: "Congratulations, my friend! Wishing you both a lifetime of laughter, unforgettable memories, and days that keep getting better. So happy to celebrate this new chapter with you.",
  },
  {
    name: "Sarah Ahmed",
    relation: "Bride's colleague",
    text: "Lina, I couldn't be happier for you! May your home be a place of comfort, laughter, and endless love. Wishing you both all the beautiful things your hearts deserve.",
  },
  {
    name: "Grandma Fatima",
    relation: "Family",
    text: "May you always bring one another happiness, my darlings. May your home be guided by love and kindness, and may every step you take together be blessed. With all my love.",
  },
];

const rsvpResponses = [
  { name: "Mariam Khaled", status: "attending" },
  { name: "Omar & Nada", status: "attending" },
  { name: "Aunt Salwa", status: "unable" },
  { name: "Youssef Mahmoud", status: "attending" },
  { name: "Sarah Ahmed", status: "attending" },
  { name: "Grandma Fatima", status: "unable" },
] as const;

export default async function MessagesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const invitation = invitations[slug];
  if (!invitation) {
    notFound();
  }
  const weddingDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(invitation.dateTime));
  const attendingGuests = rsvpResponses.filter(
    (response) => response.status === "attending",
  );
  const unableToAttendGuests = rsvpResponses.filter(
    (response) => response.status === "unable",
  );

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Allura&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Montserrat:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />
      <main className="guestbook-page" lang="en">
        <div className="guestbook-toolbar">
          <a className="guestbook-back" href={`/${slug}`}>
            <span aria-hidden="true">←</span> Back to invitation
          </a>
          <PrintButton />
        </div>

        <header className="guestbook-heading">
          <p className="guestbook-eyebrow">
            {invitation.groom} &amp; {invitation.bride}
          </p>
          <div className="guestbook-flourish" aria-hidden="true">✦</div>
          <h1>Words from the Heart</h1>
          <p className="guestbook-intro">
            A collection of love, laughter, and lovely wishes.
          </p>
          <p className="guestbook-date">{invitation.weekday} · {weddingDate}</p>
        </header>

        <section className="guestbook-rsvp" aria-labelledby="guestbook-rsvp-title">
          <header className="guestbook-rsvp-heading">
            <p>Guest attendance</p>
            <h2 id="guestbook-rsvp-title">RSVP Summary</h2>
            <span>Sample RSVP responses</span>
          </header>

          <div className="guestbook-rsvp-totals">
            <div className="guestbook-rsvp-total">
              <strong>{rsvpResponses.length}</strong>
              <span>Total Responses</span>
            </div>
            <div className="guestbook-rsvp-total">
              <strong>{attendingGuests.length}</strong>
              <span>Attending</span>
            </div>
            <div className="guestbook-rsvp-total">
              <strong>{unableToAttendGuests.length}</strong>
              <span>Unable to Attend</span>
            </div>
          </div>

          <div className="guestbook-rsvp-lists">
            <section className="guestbook-rsvp-list guestbook-rsvp-attending">
              <h3><span aria-hidden="true">✓</span> Attending</h3>
              <ul>
                {attendingGuests.map((guest) => <li key={guest.name}>{guest.name}</li>)}
              </ul>
            </section>
            <section className="guestbook-rsvp-list guestbook-rsvp-unable">
              <h3><span aria-hidden="true">—</span> Unable to Attend</h3>
              <ul>
                {unableToAttendGuests.map((guest) => <li key={guest.name}>{guest.name}</li>)}
              </ul>
            </section>
          </div>
        </section>

        <section className="guestbook-grid" aria-label="Messages and wishes from our guests">
          {messages.map((message, index) => (
            <article className="guest-message" key={message.name}>
              <div className="guest-message-ornament" aria-hidden="true">
                <span />
                <span>✦</span>
                <span />
              </div>
              <span className="guest-message-number">
                Message {String(index + 1).padStart(2, "0")}
              </span>
              <p className="guest-message-text">&ldquo;{message.text}&rdquo;</p>
              <div className="guest-message-footer">
                <div className="guest-message-author">
                  <h2>{message.name}</h2>
                  <p>{message.relation}</p>
                </div>
                <svg
                  className="guest-message-heart"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
                </svg>
              </div>
            </article>
          ))}
        </section>

        <footer className="guestbook-footer">
          <span className="guestbook-signoff">With love,</span>
          <span className="guestbook-couple">{invitation.groom} &amp; {invitation.bride}</span>
          <span className="guestbook-footer-flourish" aria-hidden="true">✦</span>
        </footer>
      </main>
    </>
  );
}
