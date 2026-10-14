/* =====================================================================
   THEME + PUZZLE CONFIG  — edit this file to re-skin the whole site.
   Everything personal (names, colours, words, clues, footer) lives here.
   The game pages only read from window.THEME.
   ===================================================================== */
window.THEME = {
  brand: {
    name: "Maggie & David",
    letter: "♥",                              // shown in the logo square
    tagline: "Daily puzzles, made just for you",
    footer: "Made for Maggie"
  },

  // Leaderboard: the player always finishes `margin` seconds behind the rival,
  // except on the photo-finish game, where it is `cs` hundredths of a second.
  players: { you: "Maggie", rival: "David", margin: 1, photoFinish: { game: "wend", cs: 1 },
              photos: { you: "assets/maggie.jpg", rival: "assets/david.jpg" } },      // profile pictures

  colors: {
    accent: "#c73e6b",
    accentDark: "#8e2147",
    accentSoft: "#fdeaf0",
    bg: "#f8f2ef",
    card: "#ffffff",
    text: "#2a1a20",
    muted: "#7a6670",
    line: "#ecdfe2",
    good: "#2e7d4f",
    goodSoft: "#e1f3e8",
    bad: "#b3261e",
    badSoft: "#fde7e5"
  },

  // Order here = order on the hub and the "Next game" chain. The LAST game is where the photo finish happens.
  games: [
    { id: "queens",    name: "Queens",      file: "queens.html",    tag: "Crown each region",
      how: ["Place one crown in every row, column and colour region.", "Crowns can't touch, not even diagonally.", "Tap once for ✕, twice for a crown."] },
    { id: "crossclimb",name: "Crossclimb",  file: "crossclimb.html",tag: "Climb the word ladder",
      how: ["Solve each clue to fill the ladder.", "Then reorder the middle words so each one differs from the next by a single letter.", "Tap two middle rows to swap them."] },
    { id: "pinpoint",  name: "Pinpoint",    file: "pinpoint.html",  tag: "Guess the category",
      how: ["Five words share a common link.", "Guess the category. Every wrong guess reveals another word.", "Fewer clues used means a better score."] },
    { id: "tango",     name: "Tango",       file: "tango.html",     tag: "Pair up hearts and stars",
      how: ["Fill the grid with hearts and stars.", "No more than two of the same icon in a row or column.", "Each row and column has equal hearts and stars.", "= means the same icon, × means different."] },
    { id: "zip",       name: "Zip",         file: "zip.html",       tag: "Connect the dots in order",
      how: ["Draw one continuous path starting at 1.", "Pass through the numbers in order.", "Fill every square on the grid.", "Drag back along your path to undo."] },
    { id: "sudoku",    name: "Maxi Sudoku", file: "sudoku.html",    tag: "Twelve symbols, one answer",
      how: ["Fill the 12×12 grid with 1–9 and A, B, C.", "Each row, column and 3×4 box must contain every symbol once."] },
    { id: "patches",   name: "Patches",     file: "patches.html",   tag: "Divide the grid into shapes",
      how: ["Drag to draw rectangles that cover the whole grid.", "Each rectangle contains exactly one clue.", "The clue shows its area and shape: square, wide or tall.", "Tap a rectangle to remove it."] },
    { id: "wend",      name: "Wend",        file: "wend.html",      tag: "Weave words through a heart",
      how: ["Drag through touching letters to spell the hidden words.", "Letters connect up, down, left or right. No diagonals.", "Every letter in the heart belongs to exactly one word."] }
  ],

  puzzles: {
    /* ---------- QUEENS: region ids 0-7 (index into queensColors) ---------- */
    queensColors: ["#f9c6d0", "#ffd9b8", "#f2a9c0", "#e6cdf2", "#fbe6a9", "#cfe8dc", "#f7b5a8", "#d9d3ea"],
    queens: {
      regions: [
        [3,3,3,3,0,0,0,1],
        [3,3,3,3,4,4,1,1],
        [3,3,2,2,4,4,4,1],
        [3,3,3,3,4,4,4,4],
        [7,3,3,3,4,4,4,4],
        [7,7,5,6,4,4,4,4],
        [7,7,6,6,6,4,4,4],
        [7,6,6,6,4,4,4,4]
      ]
    },

    /* ---------- TANGO: 0 = heart, 1 = star ---------- */
    tango: {
      givens: [[5,1,1],[4,4,1],[1,0,1],[0,0,0],[2,5,1],[3,1,1],[5,5,0],[3,4,0]],   // [row, col, value]
      cons: [[4,2,4,3,"x"],[1,1,2,1,"x"],[3,3,4,3,"x"],[3,4,4,4,"x"],[1,0,2,0,"x"],
             [1,4,2,4,"x"],[1,3,1,4,"="],[4,3,5,3,"x"],[0,1,1,1,"="],[2,0,3,0,"x"]]   // [r1,c1,r2,c2,type]
    },

    /* ---------- ZIP ---------- */
    zip: {
      size: 6,
      numbers: [[2,5,1],[5,5,2],[3,3,3],[5,2,4],[5,0,5],[2,0,6],[1,1,7],[1,5,8]]       // [row, col, number]
    },

    /* ---------- MAXI SUDOKU: 12x12, symbols 1-9 then A B C (10, 11, 12); boxes 3 rows x 4 cols ---------- */
    sudoku: {
      puzzle: [
        [0,7,6,0,11,8,2,5,1,10,0,0],
        [10,0,0,1,6,7,0,9,0,0,11,0],
        [0,0,0,2,4,0,0,10,0,0,6,0],
        [12,0,0,0,0,0,0,0,11,1,0,0],
        [0,0,8,0,3,10,0,0,4,0,7,0],
        [0,0,3,0,0,0,4,0,0,2,0,5],
        [8,0,0,5,0,0,10,0,9,0,2,6],
        [0,6,2,0,0,0,0,0,10,0,0,0],
        [0,4,12,10,2,0,9,7,5,0,0,0],
        [0,0,0,0,0,0,0,0,0,4,0,12],
        [4,0,9,0,0,2,7,6,0,0,10,0],
        [11,1,10,8,0,12,0,4,7,6,0,0]
      ]
    },

    /* ---------- PATCHES: 8x8; solving it colours a heart. ----------
       clues = [row, col, area, shape] (shape: sq | wide | tall)
       heart = "X" marks the cells that light up as the heart once solved. */
    patchesColors: {
      play: ["#f9d3dc", "#fde3c8", "#e9dcf5", "#d7ece2", "#fbefc4", "#f6c9c0", "#dfe3f7"],
      heart: "#e0456f",
      off: "#f7eaee"
    },
    patches: {
      size: 8,
      heart: ["........", ".XX..XX.", "XXXXXXXX", "XXXXXXXX", ".XXXXXX.", "..XXXX..", "...XX...", "........"],
      clues: [[0,0,2,"tall"],[0,2,3,"wide"],[0,4,3,"wide"],[0,7,2,"tall"],[4,1,4,"tall"],[1,2,3,"tall"],[1,4,2,"wide"],
              [3,5,8,"tall"],[2,0,2,"tall"],[3,4,4,"sq"],[2,7,1,"sq"],[3,7,1,"sq"],[6,0,4,"tall"],[5,4,6,"wide"],
              [4,7,4,"tall"],[5,1,3,"tall"],[5,5,1,"sq"],[5,6,3,"tall"],[6,2,2,"tall"],[6,4,2,"wide"],[7,5,2,"tall"],[7,3,2,"wide"]]
    },

    /* ---------- WEND: heart-shaped board ("." = no cell). Every letter is used by exactly one word. ---------- */
    wend: {
      theme: "Maggie's favorite things",
      grid: [".MPON.RSON.",
             "BILEE.EESLH",
             "GNIPUEMPAUS",
             ".EPPZLNGRG.",
             ".ELUZEIGEN.",
             "..SGNAJRE..",
             "...GLIGN...",
             "...NAHLO...",
             ".....Z....."],
      words: ["EMERSON", "ZHANGLIANG", "ONEUPPUZZLE", "LONGJINGGREENGRAPESLUSH", "SLEEPING", "BIMPLE"],
      colors: ["#f7b2c4", "#fbd38d", "#c3b1e1", "#a8d8c9", "#f29fb5", "#b5d3f3"]
    },

    /* ---------- CROSSCLIMB: each word is one letter away from the next (first and last stay in place) ---------- */
    crossclimb: {
      ladder: [
        { word: "WALK", clue: "Our favorite activity to do with someone else" },
        { word: "TALK", clue: "Our favorite activity" },
        { word: "TALL", clue: "David is more ____ than Maggie!" },
        { word: "CALL", clue: "What we always do on FaceTime" },
        { word: "MALL", clue: "Where we end up the most" }
      ]
    },

    /* ---------- PINPOINT: add more rounds here if you like; one round = one puzzle.
       A guess is right if it equals `answer` or an `accept` entry, or CONTAINS any `contains` fragment. ---------- */
    pinpoint: [
      { words: ["Napa", "Rice cake", "Flat noodle", "King oyster mushroom", "Bone broth (mild)"],
        answer: "Maggie's Zhangliang hot pot order",
        accept: ["maggies zhangliang hot pot order", "maggies zhangliang order", "maggies zhangliang hot pot", "maggies hot pot order", "maggies hot pot", "maggies order"],
        contains: ["zhangliang", "hot pot", "hotpot"] }
    ]
  }
};
