import { useContext } from "react";
import { TilesContext } from "../App";
import { DataFile } from "../types";

function CellDownload() {
  const { state } = useContext(TilesContext);

  const exportData = () => {
    const dataContent: DataFile = {
      tiles: state.tiles,
      frequencies: state.frequencies,
      cellSize: state.cellSize,
    }

    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(dataContent)
    )}`;

    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";

    link.click();
  };


  return (
    <button type="button" onClick={exportData}>
      Export Data
    </button>
  )
}

export default CellDownload;
