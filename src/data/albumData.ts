// ─────────────────────────────────────────────────────────────────────────────
// ALBUM DATA — edit this file to add / remove cards and photos
// ─────────────────────────────────────────────────────────────────────────────
// HOW TO ADD A NEW CARD:
//   1. Drop your images into /public/album/<folder-name>/
//   2. Add a new entry below following the same pattern
//
// HOW TO ADD MORE PHOTOS TO AN EXISTING CARD:
//   1. Drop the new image into the card's folder in /public/album/
//   2. Add the path to that card's `photos` array below
// ─────────────────────────────────────────────────────────────────────────────

export interface AlbumItem {
  title: string;
  photos: string[]; // paths relative to /public
}

const albumData: AlbumItem[] = [
  {
    title: "Classic Coffee Hamper",
    photos: [
      "/album/coffee1/photo1.png",
      "/album/coffee1/photo2.png",
    ],
  },
  {
    title: "Premium Brew Box",
    photos: [
      "/album/coffee2/photo1.png",
      "/album/coffee2/photo2.png",
    ],
  },
  {
    title: "Wedding Luxury Set",
    photos: [
      "/album/coffee3/photo1.png",
      "/album/coffee3/photo2.png",
    ],
  },
  {
    title: "Festive Celebration Box",
    photos: [
      "/album/coffee4/photo1.png",
      "/album/coffee4/photo2.png",
    ],
  },
  {
    title: "Birthday Delight",
    photos: [
      "/album/coffee5/photo1.png",
      "/album/coffee5/photo2.png",
    ],
  },

];

export default albumData;