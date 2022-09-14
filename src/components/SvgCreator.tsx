import { useState } from "react";
import { Accordion, Button, Form } from "react-bootstrap";

export interface SvgCreatorProps {
  callback: (add: string) => void;
}

function SvgCreator({ callback }: SvgCreatorProps) {
  return(
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Add Path</Accordion.Header>
        <Accordion.Body>
          <PathCreator callback={callback} />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Add Line</Accordion.Header>
        <Accordion.Body>
          <LineCreator callback={callback} />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Add Rect</Accordion.Header>
        <Accordion.Body>
          <RectCreator callback={callback} />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>Add Circle</Accordion.Header>
        <Accordion.Body>
          <CircleCreator callback={callback} />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}

function PathCreator({ callback }: SvgCreatorProps) {
  const [path, setPath] = useState<string>("");
  const [strokeWidth, setStrokeWidth] = useState<number>(0);

  const handleSubmit = () => {
    callback(`<path d="${path}" stroke="black" stroke-width="${strokeWidth}" fill="none" />`)
  }

  return (
    <>
      <Form.Group className="mb-3" controlId="formPath">
        <Form.Label>Paht</Form.Label>
        <Form.Control type="text" placeholder="Path" value={path} onChange={e => setPath(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formStrokeWidth">
        <Form.Label>Stroke Width</Form.Label>
        <Form.Control type="number" placeholder="Stroke Width" value={strokeWidth} onChange={e => setStrokeWidth(+e.target.value)} />
      </Form.Group>
      <Button variant="primary" onClick={handleSubmit}>
        Add
      </Button>
    </>
  )
}

function LineCreator({ callback }: SvgCreatorProps) {
  const [x1, setX1] = useState<number>(0);
  const [y1, setY1] = useState<number>(0);
  const [x2, setX2] = useState<number>(0);
  const [y2, setY2] = useState<number>(0);
  const [strokeWidth, setStrokeWidth] = useState<number>(0);

  const handleSubmit = () => {
    callback(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="black" stroke-width="${strokeWidth}" />`)
  }

  return (
    <>
      <Form.Group className="mb-3" controlId="formX1">
        <Form.Label>X1</Form.Label>
        <Form.Control type="number" placeholder="X1" value={x1} onChange={e => setX1(+e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formY1">
        <Form.Label>Y1</Form.Label>
        <Form.Control type="number" placeholder="Y1" value={y1} onChange={e => setY1(+e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formX2">
        <Form.Label>X2</Form.Label>
        <Form.Control type="number" placeholder="X2" value={x2} onChange={e => setX2(+e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formY2">
        <Form.Label>Y2</Form.Label>
        <Form.Control type="number" placeholder="Y2" value={y2} onChange={e => setY2(+e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formStrokeWidth">
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
    callback(`<rect x="${x}" y="${y}" width="${width}" height="${height}" stroke="black" fill="none" stroke-width="${strokeWidth}" />`)
  }

  return (
    <>
      <Form.Group className="mb-3" controlId="formX">
        <Form.Label>X</Form.Label>
        <Form.Control type="number" placeholder="X" value={x} onChange={e => setX(+e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formY">
        <Form.Label>Y</Form.Label>
        <Form.Control type="number" placeholder="Y" value={y} onChange={e => setY(+e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formWidth">
        <Form.Label>Width</Form.Label>
        <Form.Control type="number" placeholder="Width" value={width} onChange={e => setWidth(+e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formHeight">
        <Form.Label>Height</Form.Label>
        <Form.Control type="number" placeholder="Height" value={height} onChange={e => setHeight(+e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formStrokeWidth">
        <Form.Label>Stroke Width</Form.Label>
        <Form.Control type="number" placeholder="Stroke Width" value={strokeWidth} onChange={e => setStrokeWidth(+e.target.value)} />
      </Form.Group>
      <Button variant="primary" onClick={handleSubmit}>
        Add
      </Button>
    </>
  )
}

function CircleCreator({ callback }: SvgCreatorProps) {
  const [cx, setCX] = useState<number>(0);
  const [cy, setCY] = useState<number>(0);
  const [r, setR] = useState<number>(0);
  const [strokeWidth, setStrokeWidth] = useState<number>(0);

  const handleSubmit = () => {
    callback(`<circle cx="${cx}" cy="${cy}" r="${r}" stroke="black" stroke-width="${strokeWidth}" fill="black" />`)
  }

  return (
    <>
      <Form.Group className="mb-3" controlId="formCX">
        <Form.Label>CX</Form.Label>
        <Form.Control type="number" placeholder="CX" value={cx} onChange={e => setCX(+e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formCY">
        <Form.Label>CY</Form.Label>
        <Form.Control type="number" placeholder="CY" value={cy} onChange={e => setCY(+e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formR">
        <Form.Label>R</Form.Label>
        <Form.Control type="number" placeholder="R" value={r} onChange={e => setR(+e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formStrokeWidth">
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
