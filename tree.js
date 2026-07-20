const fallbackData = [
  { "id": "story01", "title": "Созвездие I", "x": 365, "y": 290 },
  { "id": "story02", "title": "Созвездие II", "x": 465, "y": 205 },
  { "id": "story03", "title": "Созвездие III", "x": 575, "y": 145 },
  { "id": "story04", "title": "Созвездие IV", "x": 685, "y": 145 },
  { "id": "story05", "title": "Созвездие V", "x": 795, "y": 205 },
  { "id": "story06", "title": "Созвездие VI", "x": 895, "y": 300 },
  { "id": "story07", "title": "Созвездие VII", "x": 910, "y": 420 },
  { "id": "story08", "title": "Созвездие VIII", "x": 805, "y": 510 },
  { "id": "story09", "title": "Созвездие IX", "x": 680, "y": 535 },
  { "id": "story10", "title": "Созвездие X", "x": 545, "y": 535 },
  { "id": "story11", "title": "Созвездие XI", "x": 410, "y": 500 },
  { "id": "story12", "title": "Созвездие XII", "x": 305, "y": 410 }
];

async function loadData() {
  try {
    const response = await fetch("./data/constellations.json");
    if (!response.ok) throw new Error("Не удалось загрузить данные");
    return await response.json();
  } catch {
    return fallbackData;
  }
}

function createNode(item) {
  const ns = "http://www.w3.org/2000/svg";
  const group = document.createElementNS(ns, "g");
  group.setAttribute("class", "constellation-node");
  group.setAttribute("tabindex", "0");
  group.setAttribute("role", "link");
  group.setAttribute("aria-label", item.title);
  group.setAttribute("transform", `translate(${item.x} ${item.y})`);

  const circle = document.createElementNS(ns, "circle");
  circle.setAttribute("r", "7");

  const text = document.createElementNS(ns, "text");
  text.setAttribute("y", "-18");
  text.textContent = item.title;

  const open = () => {
    window.location.href = `./stories/${item.id}.html`;
  };

  group.addEventListener("click", open);
  group.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") open();
  });

  group.append(circle, text);
  return group;
}

export async function buildTreeNavigation() {
  const container = document.querySelector("#constellation-nodes");
  if (!container) return;

  const data = await loadData();
  data.forEach((item) => container.appendChild(createNode(item)));
}
