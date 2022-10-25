import { useContext, useEffect, useMemo, useState } from 'react';

import '../styles/CorePage.css';
import { TilesContext } from '../App';
import { TileCell } from '../types';
import Wfc from '../wfc_core/wfc';
import { initAdjacents } from '../wfc_core/adjacents';

function CorePage() {
  const { state } = useContext(TilesContext);
  const width: number = useMemo(() => state.cellSize * state.rows, [state.cellSize, state.rows]);
  const height: number = useMemo(() => state.cellSize * state.cols, [state.cellSize, state.cols]);

  const [grid, setGrid] = useState<TileCell[][]>([]);

  const renderTile  = (cell: TileCell) => {
    const tile = cell.svg ??
    `<rect width="60" height="60" style="fill:rgb(255,255,255);" />
    <text x="30" y="30" class="small">${cell.possible}</text>`;


    const image = `<svg viewBox='0 0 ${state.cellSize} ${state.cellSize}' height='${state.cellSize}' width='${state.cellSize}' xmlns='http://www.w3.org/2000/svg'>
        ${tile}
    </svg>`

    return (
      <img
        width = { state.cellSize }
        height = { state.cellSize }
        src={ `data:image/svg+xml;utf8,${image}`} alt={`cell_${cell.row}_${cell.col}` }/>
    );
  }

  useEffect(() => {
    const wfcCore = new Wfc({
      gridRows: state.rows,
      gridCols: state.cols,
      tiles: state.tiles,
      adjacents: (initAdjacents(state.tiles)),
      frequencies: state.frequencies
    });

    const interval = setInterval(() => {
      if(wfcCore.remainingUncollapsedCells() >0) {
        try{
          const g = wfcCore.nextStep();
          setGrid([...g]);
        } catch(e: unknown) {
          var message = "Error: ";
          if (typeof e === "string") {
              message += e
          } else if (e instanceof Error) {
              message += e.message
              console.error(e.stack);
          }
          alert(message);
        }

      } else {
        alert("Done!");
        clearInterval(interval);
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [state.tiles, state.frequencies, state.cellSize, height, width]);

  return (
    <table>
      <tbody>
        {grid.map((row, i) => {
          return (<tr key={`row_${i}`}>{row.map((cell,j) => (<td key={`row_${i}_cell_${j}`}>{renderTile(cell)}</td>))}</tr>)
        })}
      </tbody>
    </table>
  );
}

export default CorePage;
