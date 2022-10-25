import { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { TilesContext } from "../App";
import { calcAdjacent } from "../wfc_core/adjacents";

function TilePage() {
  const { id } = useParams();
  const { state } = useContext(TilesContext);

  const {north, east, south, west} = calcAdjacent(state.tiles, state.tiles[+(id ?? 0)]);

  const renderTile  = (id:number) => {
    const tile = state.tiles[id];

    const image = `<svg viewBox='0 0 ${state.cellSize+40} ${state.cellSize+40}' height='${state.cellSize+40}' width='${state.cellSize+40}' xmlns='http://www.w3.org/2000/svg'>
      <text x="${Math.round(state.cellSize/2)}" y="10" class="small">${north}</text>
      <text x="${state.cellSize+30}" y="${Math.round(state.cellSize/2)}" class="small" style="writing-mode: tb;">${east}</text>
      <text x="${Math.round(state.cellSize/2)}" y="${state.cellSize+30}" class="small">${south}</text>
      <text x="10" y="${Math.round(state.cellSize/2)}" class="small" style="writing-mode: tb;">${west}</text>
      <rect x="19" y="19" width="${state.cellSize+2}" height="${state.cellSize+2}" style="fill:rgb(255,255,255);stroke:rgb(255,0,0);stroke-width:1" />
      <svg viewBox='0 0 ${state.cellSize} ${state.cellSize}' height='${state.cellSize}' width='${state.cellSize}' x="20" y="20" xmlns='http://www.w3.org/2000/svg'>
        ${tile.svg}
      </svg>
    </svg>`

    return (
      <img
        width = { state.cellSize+40 }
        height = { state.cellSize+40 }
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
