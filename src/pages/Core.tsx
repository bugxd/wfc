import { useContext, useEffect, useMemo, useState } from 'react';

import '../styles/CorePage.css';
import { TilesContext } from '../App';
import { TileCell } from '../types';
import Wfc from '../wfc_core/wfc';
import { initAdjacents } from '../wfc_core/adjacents';

function CorePage() {
  const { state } = useContext(TilesContext);
  const width: number = useMemo(() => state.cellSize * state.cols, [state.cellSize, state.cols]);
  const height: number = useMemo(() => state.cellSize * state.rows, [state.cellSize, state.rows]);

  const [grid, setGrid] = useState<TileCell[][]>([]);

  const renderSvgCell = (cell: TileCell) => {
    const y = cell.row * state.cellSize;
    const x = cell.col * state.cellSize;
    const offset = Math.round(state.cellSize/2);

    return `<g x='${x}' y='${y}' height='${state.cellSize}' width='${state.cellSize}' transform='translate(${x}, ${y}) rotate(${cell.rotateDegree},${offset},${offset})'>
      ${cell.svg}
    </g>`
  }

  const renderSvg = (grid: TileCell[][]) => {
    const svg = `<svg viewBox='0 0 ${width} ${height}' height='${width}' width='${height}' xmlns='http://www.w3.org/2000/svg'>
      ${grid.map(row => {
        return row.map(cell => {return renderSvgCell(cell)})
      })}
    </svg>`

    return (
      <img
        width = { width }
        height = { height }
        src={ `data:image/svg+xml;utf8,${svg}`} alt={`svg`}/>
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
  }, [state.rows, state.cols, state.tiles, state.frequencies, state.cellSize, height, width]);

  return (
    <>
      {renderSvg(grid)}
    </>
  );
}

export default CorePage;
