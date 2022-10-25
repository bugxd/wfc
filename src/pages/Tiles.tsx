import { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { TilesContext } from "../App";
import CellDownload from "../components/CellDownload";
import { getPreviewImage } from "../types/tile_preview";

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
        const image = getPreviewImage(state.cellSize, tile.svg, tile.north, tile.east, tile.south, tile.west, tile.rotiationDegree);

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
