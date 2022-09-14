import { useContext, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { TilesContext } from "../App";
import CellDropZone from "../components/CellDropZone";
import { TilesActionTypes } from "../store/tilesStore";
import { DataFile } from "../types";

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
    if(!content) {
      console.log("empty file?");
      return;
    }
    if(typeof content === "string"){
      const dataContent = JSON.parse(content) as DataFile;
      dispatch({type: TilesActionTypes.REPLACE_ALL, payload: {tiles: dataContent.tiles, frequencies: dataContent.frequencies}});
      dispatch({type: TilesActionTypes.SET_CELLSIZE, payload: {cellSize: dataContent.cellSize}});
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
