import { readFile } from "node:fs/promises";
import path from "node:path";
import { invitations } from "../invitations";

export const dynamic = "force-dynamic";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function safeInlineJson(value: unknown) {
  return JSON.stringify(value)
    .replaceAll("<", "\\u003c")
    .replaceAll(">", "\\u003e")
    .replaceAll("&", "\\u0026");
}

function renderInvitation(
  template: string,
  config: (typeof invitations)[string],
  slug: string,
  requestUrl: string,
) {
  const textReplacements = new Map<string, string>([
    ["Lina", config.groom],
    ["Adam", config.bride],
    ["L&amp;A", config.initials],
    ["15 / 5 / 2027", config.dateDisplay],
    ["Saturday", config.weekday],
    ["7:00 PM", config.time],
    ["Moonlit Garden Hall", config.venueName],
    ["Willow Grove Celebration Hall", config.venueDescription],
    ["Willow Grove", config.venueArea],
  ]);
  const textPattern = new RegExp(
    [...textReplacements.keys()]
      .sort((left, right) => right.length - left.length)
      .map((value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|"),
    "g",
  );

  let html = template.replace(textPattern, (source) => {
    const replacement = textReplacements.get(source);
    if (replacement === undefined) {
      throw new Error(`No invitation value is configured for "${source}".`);
    }
    return escapeHtml(replacement);
  });

  const venueImagePattern =
    /<img alt="[^"]*" class="w-full h-full object-cover object-center[^"]*" src="assests\/venue\.svg">/;
  if (!venueImagePattern.test(html)) {
    throw new Error("The invitation template is missing its venue image.");
  }
  html = html.replace(
    venueImagePattern,
    `<img alt="${escapeHtml(`${config.venueName} ${config.venueArea} Venue`)}" class="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" src="${escapeHtml(config.venueImageUrl)}">`,
  );
  const coupleImagePattern =
    /<img alt="[^"]*"(\s+)class="w-full h-full object-cover object-top[^"]*"(\s+)src="[^"]*">/;
  if (!coupleImagePattern.test(html)) {
    throw new Error("The invitation template is missing its couple portrait.");
  }
  html = html.replace(
    coupleImagePattern,
    `<img alt="${escapeHtml(`${config.groom} & ${config.bride}`)}"$1class="w-full h-full object-cover object-top filter brightness-[0.88] contrast-[1.05] transition-transform duration-1000 group-hover:scale-105"$2src="${escapeHtml(config.couplePhotoUrl)}">`,
  );
  const mapUrlPattern =
    /href="https:\/\/maps\.google\.com\/\?q=Moonlit\+Garden\+Hall\+Willow\+Grove"/;
  if (!mapUrlPattern.test(html)) {
    throw new Error("The invitation template is missing its map link.");
  }
  html = html.replace(mapUrlPattern, `href="${escapeHtml(config.mapUrl)}"`);
  const configMarker = "window.weddingConfig = __WEDDING_CONFIG__;";
  if (!html.includes(configMarker)) {
    throw new Error("The invitation template is missing its configuration marker.");
  }
  html = html.replace(
    configMarker,
    `window.weddingConfig = ${safeInlineJson({
      targetDateTime: config.dateTime,
      audioUrl: config.audioUrl,
    })};`,
  );

  const shareTitle = `${config.groom} & ${config.bride} | Wedding Invitation`;
  const shareDescription = `Join ${config.groom} and ${config.bride} on ${config.dateDisplay} at ${config.venueName}, ${config.venueArea}.`;
  const shareImage = new URL(
    `/${encodeURIComponent(slug)}/opengraph-image`,
    requestUrl,
  ).href;
  const socialMetadata = [
    `<meta property="og:type" content="website">`,
    `<meta property="og:title" content="${escapeHtml(shareTitle)}">`,
    `<meta property="og:description" content="${escapeHtml(shareDescription)}">`,
    `<meta property="og:image" content="${escapeHtml(shareImage)}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escapeHtml(shareTitle)}">`,
    `<meta name="twitter:description" content="${escapeHtml(shareDescription)}">`,
    `<meta name="twitter:image" content="${escapeHtml(shareImage)}">`,
  ].join("\n  ");
  if (!html.includes("</head>")) {
    throw new Error("The invitation template is missing its head closing tag.");
  }
  return html.replace("</head>", `  ${socialMetadata}\n</head>`);
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const config = invitations[slug];

  if (!config) {
    return new Response("Invitation not found", { status: 404 });
  }

  const templatePath = path.join(process.cwd(), "templates", "invitation.html");
  const template = await readFile(templatePath, "utf8");

  return new Response(renderInvitation(template, config, slug, request.url), {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
