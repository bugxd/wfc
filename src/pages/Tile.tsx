import { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { TilesContext } from "../App";
import { calcAdjacent } from "../wfc/adjacents";
import { CELL_SIZE } from "../wfc/tiles";

function TilePage() {
  const { id } = useParams();
  const [state] = useContext(TilesContext);

  const {north, east, south, west} = calcAdjacent(state.tiles[+(id ?? 0)], +(id ?? 0));

  const renderTile  = (id:number) => {
    const tile = state.tiles[id];

    const image = `<svg viewBox='0 0 ${CELL_SIZE+40} ${CELL_SIZE+40}' height='${CELL_SIZE+40}' width='${CELL_SIZE+40}' xmlns='http://www.w3.org/2000/svg'>
      <text x="10" y="12" class="small">${id}</text>
      <text x="40" y="10" class="small">${tile.north}</text>
      <text x="90" y="40" class="small" style="writing-mode: tb;">${tile.east}</text>
      <text x="40" y="90" class="small">${tile.south}</text>
      <text x="10" y="40" class="small" style="writing-mode: tb;">${tile.west}</text>
      <rect x="19" y="19" width="62" height="62" style="fill:rgb(255,255,255);stroke:rgb(255,0,0);stroke-width:1" />
      <svg viewBox='0 0 ${CELL_SIZE} ${CELL_SIZE}' height='${CELL_SIZE}' width='${CELL_SIZE}' x="20" y="20" xmlns='http://www.w3.org/2000/svg'>
        ${tile.svg}
      </svg>
    </svg>`

    return (
      <img
        width = { CELL_SIZE+40 }
        height = { CELL_SIZE+40 }
        src={ `data:image/svg+xml;utf8,${image}`} alt={`tile_${id}` }/>
    );
  }

  return (
    <>
      <Row>
        <Col>tile id : { id }</Col>
      </Row>
      <Row>
        <Col>{renderTile(+(id ?? 0))}</Col>
      </Row>
      <Row>
        <Col>NORTH</Col>
        {north.map(id => <Col key={`north_${id}`}>{renderTile(id)}</Col>)}
      </Row>
      <Row>
        <Col>EAST</Col>
        {east.map(id => <Col key={`east_${id}`}>{renderTile(id)}</Col>)}
      </Row>
      <Row>
        <Col>SOUTH</Col>
        {south.map(id => <Col key={`south_${id}`}>{renderTile(id)}</Col>)}
      </Row>
      <Row>
        <Col>WEST</Col>
        {west.map(id => <Col key={`west_${id}`}>{renderTile(id)}</Col>)}
      </Row>
    </>
  )
}

export default TilePage;
