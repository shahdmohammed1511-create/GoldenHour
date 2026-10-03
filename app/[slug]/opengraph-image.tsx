import { ImageResponse } from "next/og";
import { invitations } from "../invitations";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const invitation = invitations[slug];

  if (!invitation) {
    throw new Error(`No invitation is configured for "${slug}".`);
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: "#f5eee2",
          color: "#342c28",
          display: "flex",
          height: "100%",
          overflow: "hidden",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            background: "linear-gradient(145deg, #5a5148 0%, #a77c68 52%, #d6af8b 100%)",
            display: "flex",
            height: "100%",
            position: "absolute",
            right: 0,
            top: 0,
            width: 410,
          }}
        />
        <div
          style={{
            alignItems: "center",
            border: "1px solid #b49365",
            display: "flex",
            height: 568,
            justifyContent: "space-between",
            left: 28,
            padding: "54px 62px",
            position: "absolute",
            top: 30,
            width: 1144,
          }}
        >
          <div
            style={{
              alignItems: "flex-start",
              display: "flex",
              flexDirection: "column",
              width: 710,
            }}
          >
            <div
              style={{
                color: "#987447",
                fontSize: 20,
                letterSpacing: 8,
                marginBottom: 28,
              }}
            >
              YOU ARE INVITED
            </div>
            <div
              style={{
                color: "#392e29",
                display: "flex",
                fontFamily: "Georgia, serif",
                fontSize: 72,
                lineHeight: 1.1,
              }}
            >
              {invitation.groom}
            </div>
            <div
              style={{
                color: "#ae8b5b",
                fontFamily: "Georgia, serif",
                fontSize: 68,
                fontStyle: "italic",
                lineHeight: 1,
                margin: "2px 0",
              }}
            >
              &amp;
            </div>
            <div
              style={{
                color: "#392e29",
                display: "flex",
                fontFamily: "Georgia, serif",
                fontSize: 72,
                lineHeight: 1.1,
              }}
            >
              {invitation.bride}
            </div>
            <div
              style={{
                background: "#b49365",
                height: 1,
                margin: "30px 0 22px",
                width: 90,
              }}
            />
            <div
              style={{
                color: "#5c5149",
                display: "flex",
                fontSize: 25,
                letterSpacing: 3,
              }}
            >
              {invitation.dateDisplay} · {invitation.time}
            </div>
            <div
              style={{
                color: "#766b62",
                display: "flex",
                fontSize: 21,
                marginTop: 12,
              }}
            >
              {invitation.venueName} · {invitation.venueArea}
            </div>
          </div>
          <div
            style={{
              alignItems: "center",
              border: "1px solid rgba(255, 244, 222, .75)",
              borderRadius: 220,
              display: "flex",
              height: 380,
              justifyContent: "center",
              marginRight: 16,
              width: 285,
            }}
          >
            <svg height="340" viewBox="0 0 260 340" width="260">
              <circle cx="130" cy="112" fill="#f3d4a5" opacity=".8" r="69" />
              <path
                d="M27 310V137a103 103 0 0 1 206 0v173"
                fill="none"
                stroke="#f7e8ce"
                strokeWidth="7"
              />
              <path
                d="M53 149c29-5 24-38 53-33 23 4 17-31 45-30 28 1 24 27 48 26"
                fill="none"
                stroke="#d6d0a6"
                strokeLinecap="round"
                strokeWidth="8"
              />
              <g fill="#fff2dd">
                <circle cx="55" cy="141" r="9" />
                <circle cx="96" cy="115" r="10" />
                <circle cx="144" cy="91" r="9" />
                <circle cx="192" cy="115" r="10" />
                <circle cx="219" cy="143" r="8" />
              </g>
              <path
                d="M43 315c0-83 9-129 50-147 42 18 55 64 55 147"
                fill="#faf1df"
                opacity=".98"
              />
              <path
                d="M68 186c0-39 10-60 30-60s31 21 31 60v27c-17 20-45 20-61 0Z"
                fill="#d7a486"
              />
              <path
                d="M60 180c2-40 14-59 38-59 21 0 33 16 36 45-18-3-31-14-41-29-7 19-17 33-33 43Z"
                fill="#574039"
              />
              <g transform="translate(15 0)">
                <path
                  d="M143 315V194c30-8 50 8 62 34 10 21 14 50 14 87"
                  fill="#4b4749"
                />
                <path
                  d="M149 191c0-37 10-57 31-57 22 0 33 20 33 57v23c-18 18-46 18-64 0Z"
                  fill="#c88e70"
                />
                <path
                  d="M142 181c4-37 17-55 38-55 21 0 32 15 36 43-17-4-31-14-40-29-8 18-19 31-34 41Z"
                  fill="#373235"
                />
                <g fill="#47332d">
                  <circle cx="166" cy="191" r="2.5" />
                  <circle cx="188" cy="191" r="2.5" />
                </g>
                <path
                  d="M163 205c5 4 10 4 15 0"
                  fill="none"
                  stroke="#975d52"
                  strokeLinecap="round"
                  strokeWidth="2"
                />
              </g>
              <g fill="#47332d">
                <circle cx="86" cy="187" r="2.5" />
                <circle cx="109" cy="187" r="2.5" />
              </g>
              <path
                d="M91 203c5 4 11 4 16 0"
                fill="none"
                stroke="#975d52"
                strokeLinecap="round"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
        <div
          style={{
            bottom: 35,
            color: "#fff3df",
            fontSize: 13,
            letterSpacing: 4,
            position: "absolute",
            right: 50,
          }}
        >
          WITH LOVE
        </div>
      </div>
    ),
    { ...size },
  );
}
