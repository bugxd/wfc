import { useContext, useEffect, useMemo, useState } from 'react';
import Cell from '../wfc/cell';
import WFCCore from '../wfc/WFCCore';

import '../styles/CorePage.css';
import { TilesContext } from '../App';

const GRID_COUNT: number = 10;

function CorePage() {
  const { state } = useContext(TilesContext);
  const width: number = useMemo(() => state.cellSize * GRID_COUNT, [state.cellSize]);
  const height: number = useMemo(() => state.cellSize * GRID_COUNT, [state.cellSize]);

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


    const image = `<svg viewBox='0 0 ${state.cellSize} ${state.cellSize}' height='${state.cellSize}' width='${state.cellSize}' xmlns='http://www.w3.org/2000/svg'>
        ${tile}
    </svg>`

    return (
      <img
        width = { state.cellSize }
        height = { state.cellSize }
        src={ `data:image/svg+xml;utf8,${image}`} alt={`cell_${cell.id}` }/>
    );
  }

  useEffect(() => {
    const wfcCore = new WFCCore(state.tiles, state.frequencies, width, height, GRID_COUNT, state.cellSize);

    const interval = setInterval(() => {
      if(wfcCore.remainingUncollapsedCells >0) {
        try{
          const g = wfcCore.nextStep();
          setGrid([...mapGrid(g)]);
        } catch(e: unknown) {
          var message = "Error: ";
          if (typeof e === "string") {
              message += e
          } else if (e instanceof Error) {
              message += e.message
          }
          alert(message);
        }

      } else {
        alert("Done!");
        clearInterval(interval);
      }
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [state.tiles, state.cellSize, height, width]);

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
