import { Tile } from "../types";


//https://dev.to/elisealcala/react-context-with-usereducer-and-typescript-4obm


// An enum with all the types of actions to use in our reducer
export enum TielsActionKind {
  ADD = 'ADD',
}

// An interface for our actions
export interface TilesAction {
  type: TielsActionKind;
  payload: Tile;
}

// An interface for our state
export interface TilesState {
  tiles: Tile[];
}

// Our reducer function that uses a switch statement to handle our actions
export function tilesReducer(state: TilesState, action: TilesAction) {
  const { type, payload } = action;
  switch (type) {
    case TielsActionKind.ADD:
      return {
        ...state,
        tiles: [...state.tiles, payload]
      };
    default:
      return state;
  }
}
