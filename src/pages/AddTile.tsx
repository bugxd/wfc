import { useContext, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { TilesContext } from "../App";
import SvgCreator from "../components/SvgCreator";
import { TilesActionTypes } from "../store/tilesStore";
import { getPreviewImage } from "../types/tile_preview";
import { makeTileUid } from "../utils/data_file_utils";

function AddTilePage() {
  const { state, dispatch } = useContext(TilesContext);
  const [svg, setSvg] = useState<string[]>([]);
  const [north, setNorth] = useState<string>("");
  const [east, setEast] = useState<string>("");
  const [south, setSouth] = useState<string>("");
  const [west, setWest] = useState<string>("");
  const [frequency, setFrequency] = useState<number>(1);
  const [degreeNinety, setDegreeNinety] = useState<boolean>(true);
  const [degreeHundredeighty, setDegreeHundredeighty] = useState<boolean>(true);
  const [degreeTwohundredseventy, setDegreeTwohundredseventy] = useState<boolean>(true);

  const handleAddSvg = (add: string) => {
    setSvg([...svg, add]);
  }

  const handleDeleteSvg = (index: number) => {
    setSvg([...svg.slice(0, index),...svg.slice(index+1)]);
  }

  const handleSubmit = () => {
    const uid = makeTileUid();

    dispatch({
      type: TilesActionTypes.ADD,
      payload: {
        tile: {
          svg: svg.join(""),
          north: north,
          east: east,
          south: south,
          west: west,
          rotiationDegree: 0,
          uid: uid,
        },
        frequency: frequency
      }
    });

    if(degreeNinety) {
      dispatch({
        type: TilesActionTypes.ADD,
        payload: {
          tile: {
            svg: svg.join(""),
            north: west,
            east: north,
            south: east,
            west: south,
            rotiationDegree: 90,
            uid: uid,
          },
          frequency: frequency
        }
      });
    }
    if(degreeHundredeighty){
      dispatch({
        type: TilesActionTypes.ADD,
        payload: {
          tile: {
            svg: svg.join(""),
            north: south,
            east: west,
            south: north,
            west: east,
            rotiationDegree: 180,
            uid: uid,
          },
          frequency: frequency
        }
      });
    }
    if(degreeTwohundredseventy) {
      dispatch({
        type: TilesActionTypes.ADD,
        payload: {
          tile: {
            svg: svg.join(""),
            north: east,
            east: south,
            south: west,
            west: north,
            rotiationDegree: 270,
            uid: uid,
          },
          frequency: frequency
        }
      });
    }

    setSvg([]);
    setNorth("");
    setEast("");
    setSouth("");
    setWest("");
    setFrequency(1);
    setDegreeNinety(true);
    setDegreeHundredeighty(true);
    setDegreeTwohundredseventy(true);

    alert("Saved");
  }

  const preview = () => {
    const image = getPreviewImage(state.cellSize, svg.join(), north, east, south, west, 0)

    return (
      <img
        width = { state.cellSize+40 }
        height = { state.cellSize+40 }
        src={ `data:image/svg+xml;utf8,${image}`} alt={`tile_preview` }/>
    );
  }

  const preview90 = () => {
    const image = getPreviewImage(state.cellSize, svg.join(), west, north, east, south, 90)

    return (
      <img
        width = { state.cellSize+40 }
        height = { state.cellSize+40 }
        src={ `data:image/svg+xml;utf8,${image}`} alt={`tile_preview` }/>
    );
  }

  const preview180 = () => {
    const image = getPreviewImage(state.cellSize, svg.join(), south, west, north, east, 180)

    return (
      <img
        width = { state.cellSize+40 }
        height = { state.cellSize+40 }
        src={ `data:image/svg+xml;utf8,${image}`} alt={`tile_preview` }/>
    );
  }

  const preview270 = () => {
    const image = getPreviewImage(state.cellSize, svg.join(), east, south, west, north, 270)

    return (
      <img
        width = { state.cellSize+40 }
        height = { state.cellSize+40 }
        src={ `data:image/svg+xml;utf8,${image}`} alt={`tile_preview` }/>
    );
  }

  return(
    <>
    <Row>
      <Col>{ preview() }</Col>
      { degreeNinety && (<Col>90 { preview90() }</Col>) }
      { degreeHundredeighty && (<Col> 180 { preview180() }</Col>) }
      { degreeTwohundredseventy && <Col>270 { preview270() }</Col> }
    </Row>
    {svg.map((x, i) => (
      <Row key={`svg_elems_${i}`}>
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
        <Form.Group className="mb-3" controlId="formDegree90">
          <Form.Check type="checkbox" label="90 degree" checked={degreeNinety} onChange={e => setDegreeNinety(e.target.checked)}/>
        </Form.Group>
      </Col>
      <Col>
        <Form.Group className="mb-3" controlId="formDegree180">
          <Form.Check type="checkbox" label="180 degree" checked={degreeHundredeighty} onChange={e => setDegreeHundredeighty(e.target.checked)}/>
        </Form.Group>
      </Col>
      <Col>
        <Form.Group className="mb-3" controlId="formDegree270">
          <Form.Check type="checkbox" label="270 degree" checked={degreeTwohundredseventy} onChange={e => setDegreeTwohundredseventy(e.target.checked)}/>
        </Form.Group>
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
      <Col>
        <Form.Group className="mb-3" controlId="formFreuency">
          <Form.Label>Frequency</Form.Label>
          <Form.Control type="number" placeholder="Frequency" value={frequency} onChange={e => setFrequency(+e.target.value)} />
        </Form.Group>
      </Col>
    <Row>
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
