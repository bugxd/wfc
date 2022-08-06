import { useContext } from "react";
import { TilesContext } from "../App";

function CellDownload() {
  const { state } = useContext(TilesContext);

  const exportData = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(state.tiles)
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
