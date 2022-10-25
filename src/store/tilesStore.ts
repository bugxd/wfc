import { Tile } from "../types";


//https://dev.to/elisealcala/react-context-with-usereducer-and-typescript-4obm

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      }
};

// An enum with all the types of actions to use in our reducer
export enum TilesActionTypes {
  REPLACE_ALL = 'REPLACE_ALL',
  ADD = 'ADD',
  DELETE = 'DELETE',
  SET_CELLSIZE = 'SET_CELLSIZE',
  SET_ROWS = 'SET_ROWS',
  SET_COLS = 'SET_COLS'
}

type TielsActionPayload = {
  [TilesActionTypes.REPLACE_ALL] : {
    tiles: Tile[];
    frequencies: number[];
  };
  [TilesActionTypes.ADD] : {
    tile: Tile;
    frequency: number;
  };
  [TilesActionTypes.DELETE]: {
    index: number;
  };
  [TilesActionTypes.SET_CELLSIZE]: {
    cellSize: number;
  };
  [TilesActionTypes.SET_ROWS]: {
    rows: number;
  };
  [TilesActionTypes.SET_COLS]: {
    cols: number;
  };
}

// An interface for our actions
export type TilesAction = ActionMap<TielsActionPayload>[keyof ActionMap<TielsActionPayload>];

// An interface for our state
export interface TilesState {
  rows: number;
  cols: number;
  cellSize: number;
  tiles: Tile[];
  frequencies: number[];
}

export const initialTilesState: TilesState = {
  rows: 10,
  cols: 10,
  cellSize: 45,
  tiles: [],
  frequencies: [],
}

// Our reducer function that uses a switch statement to handle our actions
export function tilesReducer(state: TilesState, action: TilesAction): TilesState {
  const { type, payload } = action;
  switch (type) {
    case TilesActionTypes.REPLACE_ALL:
      return {
        ...state,
        tiles: payload.tiles,
        frequencies: payload.frequencies
      };
    case TilesActionTypes.ADD:
      return {
        ...state,
        tiles: [...state.tiles, payload.tile],
        frequencies: [...state.frequencies, payload.frequency]
      };
    case TilesActionTypes.DELETE:
      return {
        ...state,
        tiles: [...state.tiles.slice(payload.index)],
        frequencies: [...state.frequencies.slice(payload.index)],
      };
    case TilesActionTypes.SET_CELLSIZE:
      return {
        ...state,
        cellSize: payload.cellSize
      };
    case TilesActionTypes.SET_ROWS:
      return {
        ...state,
        rows: payload.rows
    };
    case TilesActionTypes.SET_COLS:
      return {
        ...state,
        cols: payload.cols
    };
    default:
      return state;
  }
}
