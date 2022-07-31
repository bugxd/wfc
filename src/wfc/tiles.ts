import { Tiles } from "../types";

export const CELL_SIZE = 60;

export const tiles: Tiles = [
  // {
  //   svg: `<rect x="0" y="0" width="60" height="60" style="fill:rgb(255,255,255);" />`,
  //   north: "aaa",
  //   east: "aaa",
  //   south: "aaa",
  //   west: "aaa"
  // },
  {
    svg: `<rect x="20" y="0" width="20" height="60" style="fill:rgb(0,0,0);" /><rect x="0" y="20" width="60" height="20" style="fill:rgb(0,0,0);" />`,
    north: "aba",
    east: "aba",
    south: "aba",
    west: "aba"
  },
  {
    svg: `<rect x="0" y="20" width="60" height="20" style="fill:rgb(0,0,0);" />`,
    north: "aaa",
    east: "aba",
    south: "aaa",
    west: "aba"
  },
  {
    svg: `<rect x="20" y="0" width="20" height="60" style="fill:rgb(0,0,0);" />`,
    north: "aba",
    east: "aaa",
    south: "aba",
    west: "aaa"
  },
  {
    svg: `<rect x="0" y="00" width="60" height="20" style="fill:rgb(0,0,0);" />`,
    north: "bbb",
    east: "baa",
    south: "aaa",
    west: "baa"
  },
  {
    svg: `<rect x="40" y="0" width="20" height="60" style="fill:rgb(0,0,0);" />`,
    north: "aab",
    east: "bbb",
    south: "aab",
    west: "aaa"
  },
  {
    svg: `<rect x="0" y="40" width="60" height="20" style="fill:rgb(0,0,0);" />`,
    north: "aaa",
    east: "aab",
    south: "bbb",
    west: "aab"
  },
  {
    svg: `<rect x="0" y="0" width="20" height="60" style="fill:rgb(0,0,0);" />`,
    north: "baa",
    east: "aaa",
    south: "baa",
    west: "bbb"
  },
  {
    svg: `<rect x="20" y="0" width="20" height="20" style="fill:rgb(0,0,0);" />`,
    north: "aba",
    east: "aaa",
    south: "aaa",
    west: "aaa"
  },
  {
    svg: `<rect x="40" y="20" width="20" height="20" style="fill:rgb(0,0,0);" />`,
    north: "aaa",
    east: "aba",
    south: "aaa",
    west: "aaa"
  },
  {
    svg: `<rect x="20" y="40" width="20" height="20" style="fill:rgb(0,0,0);" />`,
    north: "aaa",
    east: "aaa",
    south: "aba",
    west: "aaa"
  },
  {
    svg: `<rect x="0" y="20" width="20" height="20" style="fill:rgb(0,0,0);" />`,
    north: "aaa",
    east: "aaa",
    south: "aaa",
    west: "aba"
  },
  {
    svg: `<rect x="0" y="0" width="20" height="20" style="fill:rgb(0,0,0);" />`,
    north: "baa",
    east: "aaa",
    south: "aaa",
    west: "baa"
  },
  {
    svg: `<rect x="40" y="0" width="20" height="20" style="fill:rgb(0,0,0);" />`,
    north: "aab",
    east: "baa",
    south: "aaa",
    west: "aaa"
  },
  {
    svg: `<rect x="40" y="40" width="20" height="20" style="fill:rgb(0,0,0);" />`,
    north: "aaa",
    east: "aab",
    south: "aab",
    west: "aaa"
  },
  {
    svg: `<rect x="0" y="40" width="20" height="20" style="fill:rgb(0,0,0);" />`,
    north: "aaa",
    east: "aaa",
    south: "baa",
    west: "aab"
  },
  {
    svg: `<rect x="0" y="0" width="40" height="20" style="fill:rgb(0,0,0);" />`,
    north: "bba",
    east: "aaa",
    south: "aaa",
    west: "baa"
  },
  {
    svg: `<rect x="40" y="0" width="20" height="40" style="fill:rgb(0,0,0);" />`,
    north: "aab",
    east: "bba",
    south: "aaa",
    west: "aaa"
  },
  {
    svg: `<rect x="20" y="40" width="40" height="20" style="fill:rgb(0,0,0);" />`,
    north: "aaa",
    east: "aab",
    south: "abb",
    west: "aaa"
  },
  {
    svg: `<rect x="0" y="20" width="20" height="40" style="fill:rgb(0,0,0);" />`,
    north: "aaa",
    east: "aab",
    south: "baa",
    west: "abb"
  },
  {
    svg: `<rect x="20" y="0" width="40" height="20" style="fill:rgb(0,0,0);" />`,
    north: "abb",
    east: "baa",
    south: "aaa",
    west: "aaa"
  },
  {
    svg: `<rect x="40" y="20" width="20" height="40" style="fill:rgb(0,0,0);" />`,
    north: "aaa",
    east: "abb",
    south: "aab",
    west: "aaa"
  },
  {
    svg: `<rect x="0" y="40" width="40" height="20" style="fill:rgb(0,0,0);" />`,
    north: "aaa",
    east: "aaa",
    south: "bba",
    west: "aab"
  },
  {
    svg: `<rect x="0" y="0" width="20" height="40" style="fill:rgb(0,0,0);" />`,
    north: "baa",
    east: "aaa",
    south: "aaa",
    west: "bba"
  },
  {
    svg: `<rect x="20" y="0" width="20" height="20" style="fill:rgb(0,0,0);" /><rect x="20" y="20" width="40" height="20" style="fill:rgb(0,0,0);" />`,
    north: "aba",
    east: "aba",
    south: "aaa",
    west: "aaa"
  },
  {
    svg: `<rect x="20" y="40" width="20" height="20" style="fill:rgb(0,0,0);" /><rect x="20" y="20" width="40" height="20" style="fill:rgb(0,0,0);" />`,
    north: "aaa",
    east: "aba",
    south: "aba",
    west: "aaa"
  },
  {
    svg: `<rect x="20" y="40" width="20" height="20" style="fill:rgb(0,0,0);" /><rect x="0" y="20" width="40" height="20" style="fill:rgb(0,0,0);" />`,
    north: "aaa",
    east: "aaa",
    south: "aba",
    west: "aba"
  },
  {
    svg: `<rect x="20" y="0" width="20" height="20" style="fill:rgb(0,0,0);" /><rect x="0" y="20" width="40" height="20" style="fill:rgb(0,0,0);" />`,
    north: "aba",
    east: "aaa",
    south: "aaa",
    west: "aba"
  },
  {
    svg: `<rect x="20" y="0" width="20" height="40" style="fill:rgb(0,0,0);" /><rect x="0" y="40" width="60" height="20" style="fill:rgb(0,0,0);" />`,
    north: "aba",
    east: "aab",
    south: "bbb",
    west: "aab"
  },
  {
    svg: `<rect x="00" y="0" width="20" height="60" style="fill:rgb(0,0,0);" /><rect x="20" y="20" width="40" height="20" style="fill:rgb(0,0,0);" />`,
    north: "baa",
    east: "aba",
    south: "baa",
    west: "bbb"
  },
  {
    svg: `<rect x="20" y="20" width="20" height="40" style="fill:rgb(0,0,0);" /><rect x="0" y="0" width="60" height="20" style="fill:rgb(0,0,0);" />`,
    north: "bbb",
    east: "baa",
    south: "aba",
    west: "baa"
  },
  {
    svg: `<rect x="40" y="0" width="20" height="60" style="fill:rgb(0,0,0);" /><rect x="0" y="20" width="40" height="20" style="fill:rgb(0,0,0);" />`,
    north: "aab",
    east: "bbb",
    south: "aab",
    west: "aba"
  },
];

export const drawTiles = (ctx: CanvasRenderingContext2D) => {
  ctx.strokeStyle = 'black';

  var x = 0;
  var y = 0;
  tiles.forEach((tile, i) => {
    const extendSvg = `<svg viewBox='0 0 ${CELL_SIZE+40} ${CELL_SIZE+40}' height='${CELL_SIZE+40}' width='${CELL_SIZE+40}' xmlns='http://www.w3.org/2000/svg'>
      <text x="10" y="12" class="small">${i}</text>
      <text x="40" y="10" class="small">${tile.north}</text>
      <text x="90" y="40" class="small" style="writing-mode: tb;">${tile.east}</text>
      <text x="40" y="90" class="small">${tile.south}</text>
      <text x="10" y="40" class="small" style="writing-mode: tb;">${tile.west}</text>
      <rect x="19" y="19" width="62" height="62" style="fill:rgb(255,255,255);stroke:rgb(255,0,0);stroke-width:1" />
      <svg viewBox='0 0 ${CELL_SIZE} ${CELL_SIZE}' height='${CELL_SIZE}' width='${CELL_SIZE}' x="20" y="20" xmlns='http://www.w3.org/2000/svg'>
        ${tile.svg}
      </svg>
    </svg>`;

    const finalImage = new Image();
    finalImage.src = `data:image/svg+xml;base64,${window.btoa(extendSvg)}`;

    ctx.drawImage(finalImage, x,y);

    x+=CELL_SIZE+40;
    if(i%4===3) {y+=CELL_SIZE+40; x=0;}
  });
};
