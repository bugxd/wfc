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
  SET_CELLSIZE = 'SET_CELLSIZE'
}

type TielsActionPayload = {
  [TilesActionTypes.REPLACE_ALL] : {
    tiles: Tile[];
  };
  [TilesActionTypes.ADD] : {
    tile: Tile;
  };
  [TilesActionTypes.DELETE]: {
    index: number;
  };
  [TilesActionTypes.SET_CELLSIZE]: {
    cellSize: number;
  };
}

// An interface for our actions
export type TilesAction = ActionMap<TielsActionPayload>[keyof ActionMap<TielsActionPayload>];

// An interface for our state
export interface TilesState {
  cellSize: number;
  tiles: Tile[];
}

export const initialTilesState: TilesState = {
  cellSize: 0,
  tiles: [],
}

// Our reducer function that uses a switch statement to handle our actions
export function tilesReducer(state: TilesState, action: TilesAction): TilesState {
  const { type, payload } = action;
  switch (type) {
    case TilesActionTypes.REPLACE_ALL:
      return {
        ...state,
        tiles: payload.tiles
      };
    case TilesActionTypes.ADD:
      return {
        ...state,
        tiles: [...state.tiles, payload.tile]
      };
    case TilesActionTypes.DELETE:
      return {
        ...state,
        tiles: [...state.tiles.slice(payload.index)]
      };
    case TilesActionTypes.SET_CELLSIZE:
      return {
        ...state,
        cellSize: payload.cellSize
      };
    default:
      return state;
  }
}
