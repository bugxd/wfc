import { useState } from "react";
import { Accordion, Button, Form } from "react-bootstrap";

export interface SvgCreatorProps {
  callback: (add: string) => void;
}

// <line x1="0" y1="0" x2="200" y2="200" style="stroke:rgb(255,0,0);stroke-width:2" />

function SvgCreator({ callback }: SvgCreatorProps) {
  return(
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Add Line</Accordion.Header>
        <Accordion.Body>
          <LineCreator callback={callback} />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Add Rect</Accordion.Header>
        <Accordion.Body>
          <RectCreator callback={callback} />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}

function LineCreator({ callback }: SvgCreatorProps) {
  const [x1, setX1] = useState<number>(0);
  const [y1, setY1] = useState<number>(0);
  const [x2, setX2] = useState<number>(0);
  const [y2, setY2] = useState<number>(0);
  const [strokeWidth, setStrokeWidth] = useState<number>(0);

  const handleSubmit = () => {
    callback(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" style="stroke:rgb(255,0,0);stroke-width:${strokeWidth}" />`)
  }

  return (
    <>
      <Form.Group className="mb-3" controlId="formBasicWest">
        <Form.Label>X1</Form.Label>
        <Form.Control type="number" placeholder="X1" value={x1} onChange={e => setX1(+e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicWest">
        <Form.Label>Y1</Form.Label>
        <Form.Control type="number" placeholder="Y1" value={y1} onChange={e => setY1(+e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicWest">
        <Form.Label>X2</Form.Label>
        <Form.Control type="number" placeholder="X2" value={x2} onChange={e => setX2(+e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicWest">
        <Form.Label>Y2</Form.Label>
        <Form.Control type="number" placeholder="Y2" value={y2} onChange={e => setY2(+e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicWest">
        <Form.Label>Stroke Width</Form.Label>
        <Form.Control type="number" placeholder="Stroke Width" value={strokeWidth} onChange={e => setStrokeWidth(+e.target.value)} />
      </Form.Group>
      <Button variant="primary" onClick={handleSubmit}>
        Add
      </Button>
    </>
  )
}

function RectCreator({ callback }: SvgCreatorProps) {
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [strokeWidth, setStrokeWidth] = useState<number>(0);

  const handleSubmit = () => {
    callback(`<rect x="${x}" y="${y}" width="${width}" height="${height}" style="fill:rgb(0,0,255) stroke:rgb(255,0,0);stroke-width:${strokeWidth}" />`)
  }

  return (
    <>
      <Form.Group className="mb-3" controlId="formBasicWest">
        <Form.Label>X</Form.Label>
        <Form.Control type="number" placeholder="X" value={x} onChange={e => setX(+e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicWest">
        <Form.Label>Y</Form.Label>
        <Form.Control type="number" placeholder="Y" value={y} onChange={e => setY(+e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicWest">
        <Form.Label>Width</Form.Label>
        <Form.Control type="number" placeholder="Width" value={width} onChange={e => setWidth(+e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicWest">
        <Form.Label>Height</Form.Label>
        <Form.Control type="number" placeholder="Height" value={height} onChange={e => setHeight(+e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicWest">
        <Form.Label>Stroke Width</Form.Label>
        <Form.Control type="number" placeholder="Stroke Width" value={strokeWidth} onChange={e => setStrokeWidth(+e.target.value)} />
      </Form.Group>
      <Button variant="primary" onClick={handleSubmit}>
        Add
      </Button>
    </>
  )
}

export default SvgCreator
