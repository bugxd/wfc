import { useContext, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { TilesContext } from "../App";
import CellDropZone from "../components/CellDropZone";
import { TilesActionTypes } from "../store/tilesStore";
import { DataFile } from "../types";

function HomePage() {
  const { state, dispatch } = useContext(TilesContext);
  const [size, setSize] = useState<number>(state.cellSize);
  const [rows, setRows] = useState<number>(state.rows);
  const [cols, setCols] = useState<number>(state.cols);

  const handleSize = (value: number) => {
    setSize(value);
    dispatch({
      type: TilesActionTypes.SET_CELLSIZE,
      payload:{cellSize: value}
    })
  }

  const handleRows = (value: number) => {
    setRows(value);
    dispatch({
      type: TilesActionTypes.SET_ROWS,
      payload:{rows: size}
    })
  }

  const handleCols = (value: number) => {
    setCols(value);
    dispatch({
      type: TilesActionTypes.SET_COLS,
      payload:{cols: value}
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
          Rows: <input type="number" value={rows} onChange={e => handleRows(+e.target.value)} />
        </Col>
        <Col>
          Cols: <input type="number" value={cols} onChange={e => handleCols(+e.target.value)} />
        </Col>
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
