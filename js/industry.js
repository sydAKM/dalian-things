const mapWrapper = document.getElementById("mapWrapper");
const mapImage = document.getElementById("mapImage");
const infoPanel = document.getElementById("infoPanel");

let scale = 1;
let posX = 0, posY = 0;
let isDragging = false;
let startX, startY;

// === 缩放 ===
mapWrapper.addEventListener("wheel", (e) => {
  e.preventDefault();
  const zoomSpeed = 0.001;
  const newScale = scale + e.deltaY * -zoomSpeed;
  scale = Math.min(Math.max(0.8, newScale), 3);
  updateTransform();
});

// === 鼠标右键拖动 ===
mapWrapper.addEventListener("mousedown", (e) => {
  if (e.button === 2) { // 右键
    isDragging = true;
    mapWrapper.style.cursor = "grabbing";
    startX = e.clientX - posX;
    startY = e.clientY - posY;
  }
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  posX = e.clientX - startX;
  posY = e.clientY - startY;
  updateTransform();
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  mapWrapper.style.cursor = "grab";
});

// 禁用右键菜单
mapWrapper.addEventListener("contextmenu", (e) => e.preventDefault());

// === 触摸操作（移动 + 缩放） ===
let touchDistance = 0;

mapWrapper.addEventListener("touchstart", (e) => {
  if (e.touches.length === 1) {
    isDragging = true;
    startX = e.touches[0].clientX - posX;
    startY = e.touches[0].clientY - posY;
  } else if (e.touches.length === 2) {
    isDragging = false;
    touchDistance = getTouchDistance(e);
  }
});

mapWrapper.addEventListener("touchmove", (e) => {
  e.preventDefault();
  if (e.touches.length === 1 && isDragging) {
    posX = e.touches[0].clientX - startX;
    posY = e.touches[0].clientY - startY;
    updateTransform();
  } else if (e.touches.length === 2) {
    const newDist = getTouchDistance(e);
    const zoomFactor = newDist / touchDistance;
    scale = Math.min(Math.max(0.8, scale * zoomFactor), 3);
    touchDistance = newDist;
    updateTransform();
  }
});

mapWrapper.addEventListener("touchend", () => {
  isDragging = false;
});

function getTouchDistance(e) {
  const [t1, t2] = e.touches;
  return Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
}

// === 更新地图缩放与位置 ===
function updateTransform() {
  mapWrapper.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
}

// === 点击标记，显示信息 ===
document.querySelectorAll(".marker").forEach(marker => {
  marker.addEventListener("click", () => {
    const name = marker.dataset.name;
    const img = marker.dataset.img;
    const desc = marker.dataset.desc;

    infoPanel.innerHTML = `
      <img src="${img}" alt="${name}">
      <h2>${name}</h2>
      <p>${desc}</p>
    `;
  });
});
