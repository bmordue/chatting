const svgNS = "http://www.w3.org/2000/svg";
const svg = document.createElementNS(svgNS, "svg");
svg.setAttribute("width", 450);
svg.setAttribute("height", 300);
document.body.appendChild(svg);

fetch("http://localhost:8000/demographics.json", {
  mode: "same-origin",
  headers: { Origin: "localhost" },
})
  .then((response) => response.json())
  .then((all) => all[0])
  .then((data) => {
    const barWidth = 50;
    const barGap = 10;
    const maxBarHeight = svg.getAttribute("height") - 50;
    const barGroup = document.createElementNS(svgNS, "g");
    const maxSize = Math.max(...data.map((a) => a.size));
    svg.appendChild(barGroup);
    for (let i = 0; i < data.length; i++) {
      const x = i * (barWidth + barGap) + barGap;
      const barHeight = (data[i].size / maxSize) * maxBarHeight;
      const rect = document.createElementNS(svgNS, "rect");
      rect.setAttribute("x", x);
      rect.setAttribute("y", svg.getAttribute("height") - barHeight - 30);
      rect.setAttribute("width", barWidth);
      rect.setAttribute("height", barHeight);
      rect.setAttribute("fill", "blue");
      barGroup.appendChild(rect);
    }
  })
  .catch((error) => console.error(error));
