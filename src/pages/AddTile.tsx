import { useContext, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { TilesContext } from "../App";
import SvgCreator from "../components/SvgCreator";
import { TilesActionTypes } from "../store/tilesStore";

function AddTilePage() {
  const { state, dispatch } = useContext(TilesContext);
  const [svg, setSvg] = useState<string[]>([]);
  const [north, setNorth] = useState<string>("");
  const [east, setEast] = useState<string>("");
  const [south, setSouth] = useState<string>("");
  const [west, setWest] = useState<string>("");

  const handleAddSvg = (add: string) => {
    setSvg([...svg, add]);
  }

  const handleDeleteSvg = (index: number) => {
    setSvg([...svg.slice(index)]);
  }

  const handleSubmit = () => {
    dispatch({
      type: TilesActionTypes.ADD,
      payload: {tile: {
        svg: svg.join(""),
        north: north,
        east: east,
        south: south,
        west: west,
      }}
    });
  }

  const preview  = () => {
    const image = `<svg viewBox='0 0 ${state.cellSize+40} ${state.cellSize+40}' height='${state.cellSize+40}' width='${state.cellSize+40}' xmlns='http://www.w3.org/2000/svg'>
      <text x="40" y="10" class="small">${north}</text>
      <text x="90" y="40" class="small" style="writing-mode: tb;">${east}</text>
      <text x="40" y="90" class="small">${south}</text>
      <text x="10" y="40" class="small" style="writing-mode: tb;">${west}</text>
      <rect x="19" y="19" width="62" height="62" style="fill:rgb(255,255,255);stroke:rgb(255,0,0);stroke-width:1" />
      <svg viewBox='0 0 ${state.cellSize} ${state.cellSize}' height='${state.cellSize}' width='${state.cellSize}' x="20" y="20" xmlns='http://www.w3.org/2000/svg'>
        ${svg.join()}
      </svg>
    </svg>`

    return (
      <img
        width = { state.cellSize+40 }
        height = { state.cellSize+40 }
        src={ `data:image/svg+xml;utf8,${image}`} alt={`tile_preview` }/>
    );
  }

  return(
    <>
    <Row><Col>{preview()}</Col></Row>
    {svg.map((x, i) => (
      <Row>
        <Col xs={10}><pre style={{fontSize: 10}}><code>{x}</code></pre></Col>
        <Col><Button variant="danger" onClick={() => handleDeleteSvg(i)} >Delete</Button></Col>
      </Row>
    ))}
    <Row>
      <Col>
        <SvgCreator callback={handleAddSvg}/>
      </Col>
    </Row>
    <Row>
      <Col>
        <Form.Group className="mb-3" controlId="formBasicNorth">
          <Form.Label>North</Form.Label>
          <Form.Control type="text" placeholder="North" value={north} onChange={e => setNorth(e.target.value)} />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group className="mb-3" controlId="formBasicEast">
          <Form.Label>East</Form.Label>
          <Form.Control type="text" placeholder="East" value={east} onChange={e => setEast(e.target.value)} />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group className="mb-3" controlId="formBasicSouth">
          <Form.Label>South</Form.Label>
          <Form.Control type="text" placeholder="South" value={south} onChange={e => setSouth(e.target.value)} />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group className="mb-3" controlId="formBasicWest">
          <Form.Label>West</Form.Label>
          <Form.Control type="text" placeholder="West" value={west} onChange={e => setWest(e.target.value)} />
        </Form.Group>
      </Col>
    </Row>
    <Row>
      <Col>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Col>
    </Row>
    </>
  );
}

export default AddTilePage;
