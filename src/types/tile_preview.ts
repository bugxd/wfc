export function getPreviewImage(cellSize: number, svg: string, north: string, east: string, south: string, west: string, degree: number): string {

  /**
   * g = group - all dynamic elements in a Group
   * transform translate - 20 20 offset to be in the middle of the text
   * transform rotate - rotate around the given center point round(cellSize/2) for given degree
   */
  return `<svg viewBox='0 0 ${cellSize+40} ${cellSize+40}' height='${cellSize+40}' width='${cellSize+40}' xmlns='http://www.w3.org/2000/svg'>
    <text x="${Math.round(cellSize/2)}" y="10" class="small">${north}</text>
    <text x="${cellSize+30}" y="${Math.round(cellSize/2)+10}" class="small" style="writing-mode: tb;">${east}</text>
    <text x="${Math.round(cellSize/2)}" y="${cellSize+30}" class="small">${south}</text>
    <text x="10" y="${Math.round(cellSize/2)+10}" class="small" style="writing-mode: tb;">${west}</text>
    <rect x="19" y="19" width="${cellSize+2}" height="${cellSize+2}" style="fill:rgb(255,255,255);stroke:rgb(255,0,0);stroke-width:1" />
    <g x='20' y='20' height='${cellSize}' width='${cellSize}' transform='translate(20, 20) rotate(${degree},${Math.round(cellSize/2)},${Math.round(cellSize/2)})'>
      ${svg}
    </g>
  </svg>`
}
