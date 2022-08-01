import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { TilesContext } from "../App";
import { TielsActionKind } from "../store/tilesStore";

function AddTilePage() {
  const [_, dispatch] = useContext(TilesContext);
  const [svg, setSvg] = useState<string>("");
  const [north, setNorth] = useState<string>("");
  const [east, setEast] = useState<string>("");
  const [south, setSouth] = useState<string>("");
  const [west, setWest] = useState<string>("");

  const handleSubmit = () => {
    dispatch({
      type: TielsActionKind.ADD,
      payload: {
        svg: svg,
        north: north,
        east: east,
        south: south,
        west: west,
      }
    });
  }

  return(
    <>
      <Form.Group className="mb-3" controlId="formBasicSvg">
        <Form.Label>SVG</Form.Label>
        <Form.Control type="text" placeholder="SVG" value={svg} onChange={e => setSvg(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicNorth">
        <Form.Label>North</Form.Label>
        <Form.Control type="text" placeholder="North" value={north} onChange={e => setNorth(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEast">
        <Form.Label>East</Form.Label>
        <Form.Control type="text" placeholder="East" value={east} onChange={e => setEast(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicSouth">
        <Form.Label>South</Form.Label>
        <Form.Control type="text" placeholder="South" value={south} onChange={e => setSouth(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicWest">
        <Form.Label>West</Form.Label>
        <Form.Control type="text" placeholder="West" value={west} onChange={e => setWest(e.target.value)} />
      </Form.Group>
      <Button variant="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </>
  );
}

export default AddTilePage;
