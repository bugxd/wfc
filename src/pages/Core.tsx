import { useEffect, useState } from 'react';
import Cell from '../wfc/cell';
import { CELL_SIZE } from '../wfc/tiles';
import WFCCore from '../wfc/WFCCore';

const GRID_COUNT: number = 10;
const width: number = CELL_SIZE * GRID_COUNT;
const height: number = CELL_SIZE * GRID_COUNT;

function CorePage() {
  const [grid, setGrid] = useState<Cell[][]>([]);

  const mapGrid = (toMap: Cell[]): Cell[][] => {
    let g: Cell [][] = [];

    for (var i = 0; i < GRID_COUNT; i++){
      const start = i * GRID_COUNT;
      const end = start + GRID_COUNT;

      const row = toMap.slice(start, end);

      g.push(row);
    }

    return g;
  }

  const renderTile  = (cell: Cell) => {
    const tile = cell.tileSvg ??
    `<rect width="60" height="60" style="fill:rgb(255,255,255);" />
    <text x="30" y="30" class="small">${cell.possible.length}</text>`;


    const image = `<svg viewBox='0 0 ${CELL_SIZE} ${CELL_SIZE}' height='${CELL_SIZE}' width='${CELL_SIZE}' xmlns='http://www.w3.org/2000/svg'>
        ${tile}
    </svg>`

    return (
      <img
        width = { CELL_SIZE }
        height = { CELL_SIZE }
        src={ `data:image/svg+xml;utf8,${image}`} alt={`cell_${cell.id}` }/>
    );
  }

  useEffect(() => {
    const wfcCore = new WFCCore(width, height, GRID_COUNT, CELL_SIZE);

    const interval = setInterval(() => {
      if(wfcCore.remainingUncollapsedCells >0) {
        const g = wfcCore.nextStep();

        setGrid([...mapGrid(g)]);
      } else {
        alert("Done!");
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <table>
      <tbody>
        {grid.map((row, i) => {
          return (<tr key={`row_${i}`}>{row.map((cell,j ) => (<td key={`row_${i}_cell_${j}`}>{renderTile(cell)}</td>))}</tr>)
        })}
      </tbody>
    </table>
  );
}

export default CorePage;
