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
