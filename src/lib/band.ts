import type { BrandIcon } from "@/lib/brand-icons";

// Links taken from the band's own site (noflagpatriots.com/linktree).
// Their Apple Music link points at Apple's generic landing page, not an
// artist profile, so it is left out until a real artist URL exists.

export const OFFICIAL_SITE = "https://www.noflagpatriots.com";

export const SPOTIFY_ALBUM_ID = "0XJxiefRCP9VlMo3mKviKB"; // Dolphins and Earthquakes

export const listenLinks: { name: string; icon: BrandIcon; href: string }[] = [
  { name: "Spotify", icon: "spotify", href: "https://open.spotify.com/artist/5nP4sYDTtqRYISVJsbv6FZ" },
  // Dolphins and Earthquakes (the linktree's YouTube Music link is the older self-titled album).
  { name: "YouTube Music", icon: "youtubeMusic", href: "https://music.youtube.com/playlist?list=OLAK5uy_lHU8aq2Hga3aL2SZWPL87LNNl2wUcqrQY" },
  { name: "Amazon Music", icon: "amazonMusic", href: "https://music.amazon.de/artists/B09DFPML2P/no-flag-patriots" },
  { name: "Deezer", icon: "deezer", href: "https://www.deezer.com/us/artist/143205762" },
  { name: "Bandcamp", icon: "bandcamp", href: "https://noflagpatriots.bandcamp.com" },
];

export const socialLinks: { name: string; icon: BrandIcon; href: string }[] = [
  { name: "Instagram", icon: "instagram", href: "https://www.instagram.com/noflagpatriots" },
  { name: "TikTok", icon: "tiktok", href: "https://www.tiktok.com/@noflagpatriots" },
  { name: "YouTube", icon: "youtube", href: "https://www.youtube.com/channel/UCSzfguVwFUHS4fWbfWqNPrw" },
  { name: "Facebook", icon: "facebook", href: "https://www.facebook.com/noflagpatriots" },
  { name: "X", icon: "x", href: "https://www.twitter.com/noflagpatriots" },
];
