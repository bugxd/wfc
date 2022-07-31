import { Col, Row } from "react-bootstrap";
import Canvas from "../components/Canvas";
import { drawTiles } from "../wfc/tiles";

function TilesPage() {

  return (
    <Row>
      <Col>
        <Canvas
          draw= { drawTiles }
          width={ 400 }
          height={ 800 }
          update={ 0 }
        />
      </Col>
    </Row>
  );
}

export default TilesPage;
