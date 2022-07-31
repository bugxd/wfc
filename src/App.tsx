import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Canvas from './components/Canvas';
import Cell from './wfc/cell';
import { CELL_SIZE, drawTiles } from './wfc/tiles';
import WFCCore from './wfc/WFCCore';

const GRID_COUNT: number = 10;
const width: number = CELL_SIZE * GRID_COUNT;
const height: number = CELL_SIZE * GRID_COUNT;

var grid: Cell[] = [];

const drawGrid = (ctx: CanvasRenderingContext2D) => {
  ctx.strokeStyle = 'black';

  grid.forEach(cell => {
    const tile = cell.tileSvg ??
    `<rect width="60" height="60" style="fill:rgb(255,255,255);" />
    <text x="30" y="30" class="small">${cell.possible.length}</text>`;

    const bs = `<svg viewBox='0 0 ${CELL_SIZE} ${CELL_SIZE}' height='${CELL_SIZE}' width='${CELL_SIZE}' xmlns='http://www.w3.org/2000/svg'>${tile}</svg>`;
    const image = new Image();
    image.src = `data:image/svg+xml;base64,${window.btoa(bs)}`;

    ctx.drawImage(image, cell.x, cell.y);
  });
}

function App() {
  const [update, setUpdate] = useState<number>(0);

  useEffect(() => {
    const runWFC = async () => {
      const wfcCore = new WFCCore(width, height, GRID_COUNT, CELL_SIZE);
      while(wfcCore.remainingUncollapsedCells >0) {
        grid = wfcCore.nextStep();
        console.log(grid);
        setUpdate((prevValue) => prevValue + 1);
        //debugger;
        //await new Promise(r => setTimeout(r, 2000));
      }

      console.log("done");
      console.log([...grid]);
      setUpdate((prevValue) => prevValue + 1);
    }

    runWFC();
  }, []);

  return (
    <div className="App">
      <Container>
      <Row>
        <Col>Update: { update }</Col>
      </Row>
        <Row>
          <Col>
            <Canvas
              draw= { drawGrid }
              width={ width }
              height={ height }
              update={ update }
            />
          </Col>
        </Row>
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
      </Container>
    </div>
  );
}

export default App;
