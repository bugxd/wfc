import { useContext, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { TilesContext } from "../App";
import CellDropZone from "../components/CellDropZone";
import { TilesActionTypes } from "../store/tilesStore";
import { Tile } from "../types";

function HomePage() {
  const { state, dispatch } = useContext(TilesContext);
  const [size, setSize] = useState<number>(state.cellSize);

  const handleSize = (size: number) => {
    setSize(size);
    dispatch({
      type: TilesActionTypes.SET_CELLSIZE,
      payload:{cellSize: size}
    })
  }

  const handleDrop = (content: string | ArrayBuffer | null ) => {
    console.log("type: "+ (typeof content));
    if(!content) {
      console.log("empty file?");
      return;
    }
    if(typeof content === "string"){
      console.log("string");
      console.log(content);
      const tiles = JSON.parse(content) as Tile[];
      dispatch({type: TilesActionTypes.REPLACE_ALL, payload: {tiles: tiles}});
    }
    if(content instanceof ArrayBuffer){
      console.log("ArrayBuffer");
    }
  }

  return (
    <>
      <Row>
        <Col>
          Cell Size: <input type="number" value={size} onChange={e => handleSize(+e.target.value)} />
        </Col>
      </Row>
      <Row>
        <Col>
          Upload Tiles (.json)
        </Col>
      </Row>
      <Row>
        <Col>
          <CellDropZone handleDrop={handleDrop}/>
        </Col>
      </Row>
    </>
  );
}

export default HomePage;
