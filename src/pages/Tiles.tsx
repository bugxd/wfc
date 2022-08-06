import { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { TilesContext } from "../App";
import CellDownload from "../components/CellDownload";

function TilesPage() {
  const { state } = useContext(TilesContext);
  const navigate = useNavigate();

  const handleTileClick = (id: number) => {
    navigate(`/tiles/${id}`);
  }

  return (
    <>
    <Row><Col><CellDownload /></Col></Row>
    <Row>
      {state.tiles.map((tile, id) => {
        const image = `<svg viewBox='0 0 ${state.cellSize+40} ${state.cellSize+40}' height='${state.cellSize+40}' width='${state.cellSize+40}' xmlns='http://www.w3.org/2000/svg'>
          <text x="10" y="12" class="small">${id}</text>
          <text x="40" y="10" class="small">${tile.north}</text>
          <text x="90" y="40" class="small" style="writing-mode: tb;">${tile.east}</text>
          <text x="40" y="90" class="small">${tile.south}</text>
          <text x="10" y="40" class="small" style="writing-mode: tb;">${tile.west}</text>
          <rect x="19" y="19" width="62" height="62" style="fill:rgb(255,255,255);stroke:rgb(255,0,0);stroke-width:1" />
          <svg viewBox='0 0 ${state.cellSize} ${state.cellSize}' height='${state.cellSize}' width='${state.cellSize}' x="20" y="20" xmlns='http://www.w3.org/2000/svg'>
            ${tile.svg}
          </svg>
        </svg>`

        return (
          <Col key={`tile_${id}`} onClick={ () => handleTileClick(id) } >
            <img
              width = { state.cellSize+40 }
              height = { state.cellSize+40 }
              src={ `data:image/svg+xml;utf8,${image}`} alt={`tile_${id}` }/>
          </Col>
        );
    })}
    </Row>
    </>
  );
}

export default TilesPage;
