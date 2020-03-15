const gridResolution = 8;
const gridSpacing = 5;
const gridItemSize = 10;
const gridSize = gridItemSize + gridSpacing;
const percentage = 0.35;

let gridArray = [];
let lineArray = [];

const nodes: SceneNode[] = [];

const node = figma.createBooleanOperation();

for (let j = 0; j < gridResolution; j++) {
  let row = [];
  for (let i = 0; i < gridResolution; i++) {
    const selectedSpot = Math.random();
    if (selectedSpot >= percentage) {
      row.push(1);
    } else {
      row.push(0);
    }
  }
  gridArray.push(row);
}

for (let j = 0; j < gridArray.length; j++) {
  let tempArray = [];
  for (let i = 0; i < gridArray[j].length; i++) {
    const row = gridArray[j];

    if (
      (i === 0 && row[i] && !row[i + 1]) ||
      (i === row.length - 1 && row[i] && !row[i - 1]) ||
      (row[i] && !row[i - 1] && !row[i + 1])
    ) {
      const circle = figma.createEllipse();
      circle.resize(gridItemSize, gridItemSize);
      circle.x += i * gridSize;
      circle.y += j * gridSize;
      figma.currentPage.appendChild(circle);
      nodes.push(circle);
      node.appendChild(circle);
    }

    if (
      (row[i] && i === 0 && row[i + 1]) ||
      (row[i] && !row[i - 1] && row[i + 1])
    ) {
      tempArray.push({ row: j, column: i });
    }
    if (
      (row[i] && i === row.length - 1 && row[i - 1]) ||
      (row[i] && row[i - 1] && !row[i + 1])
    ) {
      tempArray.push({ row: j, column: i });
      lineArray.push(tempArray);
      tempArray = [];
    }
  }
}

for (let i = 0; i < lineArray.length; i++) {
  const lineLength =
    (lineArray[i][1].column - lineArray[i][0].column + 1) * gridItemSize;
  const line = figma.createLine();
  line.resize(lineLength, 0);
  line.x += lineArray[i][0].column * gridSize;
  line.y += lineArray[i][0].row * gridSize + gridItemSize;
  line.strokeWeight = gridItemSize;
  line.strokeCap = "ROUND";
  figma.currentPage.appendChild(line);
  nodes.push(line);
  node.appendChild(line);
}

node.fills = [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }];

figma.viewport.scrollAndZoomIntoView(nodes);

figma.closePlugin();
