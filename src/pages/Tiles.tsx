import { useContext, useEffect, useRef } from "react";
import { Col, Row } from "react-bootstrap";
import { TilesContext } from "../App";
import { CELL_SIZE } from "../wfc/tiles";

function TilesPage() {
  const [state, _] = useContext(TilesContext);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas == null) throw new Error('Could not get canvas');

    const context = canvas.getContext('2d');
    if (context == null) throw new Error('Could not get context');

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.strokeStyle = 'black';

    var x = 0;
    var y = 0;
    state.tiles.forEach((tile, i) => {
      const svg = `<svg viewBox='0 0 ${CELL_SIZE+40} ${CELL_SIZE+40}' height='${CELL_SIZE+40}' width='${CELL_SIZE+40}' xmlns='http://www.w3.org/2000/svg'>
        <text x="10" y="12" class="small">${i}</text>
        <text x="40" y="10" class="small">${tile.north}</text>
        <text x="90" y="40" class="small" style="writing-mode: tb;">${tile.east}</text>
        <text x="40" y="90" class="small">${tile.south}</text>
        <text x="10" y="40" class="small" style="writing-mode: tb;">${tile.west}</text>
        <rect x="19" y="19" width="62" height="62" style="fill:rgb(255,255,255);stroke:rgb(255,0,0);stroke-width:1" />
        <svg viewBox='0 0 ${CELL_SIZE} ${CELL_SIZE}' height='${CELL_SIZE}' width='${CELL_SIZE}' x="20" y="20" xmlns='http://www.w3.org/2000/svg'>
          ${tile.svg}
        </svg>
      </svg>`;

      const img = new Image();
      img.src = `data:image/svg+xml;base64,${window.btoa(svg)}`;

      context.drawImage(img, x,y);

      x+=CELL_SIZE+40;
      if(i%4===3) {y+=CELL_SIZE+40; x=0;}
    });
  }, [canvasRef.current]);

  return (
    <Row>
      <Col>
        <canvas ref={canvasRef} width={ 400 } height={ 800 }/>;
      </Col>
    </Row>
  );
}

export default TilesPage;
