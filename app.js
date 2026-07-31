const MAP_WIDTH = 720;
const MAP_HEIGHT = 980;
const STORAGE_KEY = "thailand-visited-provinces";
const FONT_STACK = "'LINE Seed Sans TH', 'Segoe UI', Tahoma, sans-serif";

const provinceNames = {
  "Amnat Charoen": "อำนาจเจริญ",
  "Ang Thong": "อ่างทอง",
  "Bangkok Metropolis": "กรุงเทพมหานคร",
  "Bueng Kan": "บึงกาฬ",
  "Buri Ram": "บุรีรัมย์",
  Chachoengsao: "ฉะเชิงเทรา",
  "Chai Nat": "ชัยนาท",
  Chaiyaphum: "ชัยภูมิ",
  Chanthaburi: "จันทบุรี",
  "Chiang Mai": "เชียงใหม่",
  "Chiang Rai": "เชียงราย",
  "Chon Buri": "ชลบุรี",
  Chumphon: "ชุมพร",
  Kalasin: "กาฬสินธุ์",
  "Kamphaeng Phet": "กำแพงเพชร",
  Kanchanaburi: "กาญจนบุรี",
  "Khon Kaen": "ขอนแก่น",
  Krabi: "กระบี่",
  Lampang: "ลำปาง",
  Lamphun: "ลำพูน",
  Loei: "เลย",
  "Lop Buri": "ลพบุรี",
  "Mae Hong Son": "แม่ฮ่องสอน",
  "Maha Sarakham": "มหาสารคาม",
  Mukdahan: "มุกดาหาร",
  "Nakhon Nayok": "นครนายก",
  "Nakhon Pathom": "นครปฐม",
  "Nakhon Phanom": "นครพนม",
  "Nakhon Ratchasima": "นครราชสีมา",
  "Nakhon Sawan": "นครสวรรค์",
  "Nakhon Si Thammarat": "นครศรีธรรมราช",
  Nan: "น่าน",
  Narathiwat: "นราธิวาส",
  "Nong Bua Lam Phu": "หนองบัวลำภู",
  "Nong Khai": "หนองคาย",
  Nonthaburi: "นนทบุรี",
  "Pathum Thani": "ปทุมธานี",
  Pattani: "ปัตตานี",
  Phangnga: "พังงา",
  Phatthalung: "พัทลุง",
  Phayao: "พะเยา",
  Phetchabun: "เพชรบูรณ์",
  Phetchaburi: "เพชรบุรี",
  Phichit: "พิจิตร",
  Phitsanulok: "พิษณุโลก",
  "Phra Nakhon Si Ayutthaya": "พระนครศรีอยุธยา",
  Phrae: "แพร่",
  Phuket: "ภูเก็ต",
  "Prachin Buri": "ปราจีนบุรี",
  "Prachuap Khiri Khan": "ประจวบคีรีขันธ์",
  Ranong: "ระนอง",
  Ratchaburi: "ราชบุรี",
  Rayong: "ระยอง",
  "Roi Et": "ร้อยเอ็ด",
  "Sa Kaeo": "สระแก้ว",
  "Sakon Nakhon": "สกลนคร",
  "Samut Prakan": "สมุทรปราการ",
  "Samut Sakhon": "สมุทรสาคร",
  "Samut Songkhram": "สมุทรสงคราม",
  Saraburi: "สระบุรี",
  Satun: "สตูล",
  "Si Sa Ket": "ศรีสะเกษ",
  "Sing Buri": "สิงห์บุรี",
  Songkhla: "สงขลา",
  Sukhothai: "สุโขทัย",
  "Suphan Buri": "สุพรรณบุรี",
  "Surat Thani": "สุราษฎร์ธานี",
  Surin: "สุรินทร์",
  Tak: "ตาก",
  Trang: "ตรัง",
  Trat: "ตราด",
  "Ubon Ratchathani": "อุบลราชธานี",
  "Udon Thani": "อุดรธานี",
  "Uthai Thani": "อุทัยธานี",
  Uttaradit: "อุตรดิตถ์",
  Yala: "ยะลา",
  Yasothon: "ยโสธร"
};

const state = {
  features: [],
  mapViewBox: { x: 0, y: 0, width: MAP_WIDTH, height: MAP_HEIGHT },
  pan: null,
  suppressNextClick: false,
  visited: new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")),
  search: ""
};

const map = document.querySelector("#thailandMap");
const list = document.querySelector("#provinceList");
const search = document.querySelector("#provinceSearch");
const visitedCount = document.querySelector("#visitedCount");
const progressPercent = document.querySelector("#progressPercent");
const progressBar = document.querySelector("#progressBar");
const activeProvince = document.querySelector("#activeProvince");
const activeStatus = document.querySelector("#activeStatus");
const resetButton = document.querySelector("#resetButton");
const shareButton = document.querySelector("#shareButton");
const zoomInButton = document.querySelector("#zoomInButton");
const zoomOutButton = document.querySelector("#zoomOutButton");
const zoomResetButton = document.querySelector("#zoomResetButton");

init();

async function init() {
  try {
    const response = await fetch("data/thailand.json");
    const geojson = await response.json();
    state.features = geojson.features.sort((a, b) => {
      return getThaiName(a).localeCompare(getThaiName(b), "th");
    });
    renderMap();
    applyMapViewBox();
    renderList();
    updateSummary();
  } catch (error) {
    map.innerHTML = `<text x="32" y="64">โหลดแผนที่ไม่สำเร็จ</text>`;
    console.error(error);
  }
}

function renderMap() {
  const bounds = getBounds(state.features);
  const project = createProjector(bounds);
  const fragment = document.createDocumentFragment();

  state.features.forEach((feature) => {
    const province = feature.properties.NAME_1;
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", geometryToPath(feature.geometry, project));
    path.setAttribute("class", getProvinceClass(province));
    path.setAttribute("tabindex", "0");
    path.setAttribute("role", "button");
    path.setAttribute("aria-label", `${getThaiName(feature)} ${state.visited.has(province) ? "เคยไปแล้ว" : "ยังไม่เคยไป"}`);
    path.dataset.province = province;

    path.addEventListener("click", () => toggleProvince(province));
    path.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleProvince(province);
      }
    });
    path.addEventListener("mouseenter", () => showActiveProvince(province));
    path.addEventListener("focus", () => showActiveProvince(province));

    fragment.appendChild(path);
  });

  map.replaceChildren(fragment);
}

function renderList() {
  const query = state.search.trim().toLowerCase();
  const filtered = state.features.filter((feature) => {
    const en = feature.properties.NAME_1.toLowerCase();
    const th = getThaiName(feature).toLowerCase();
    return en.includes(query) || th.includes(query);
  });

  list.replaceChildren(
    ...filtered.map((feature) => {
      const province = feature.properties.NAME_1;
      const item = document.createElement("li");
      const button = document.createElement("button");
      button.type = "button";
      button.className = `province-toggle${state.visited.has(province) ? " is-visited" : ""}`;
      button.innerHTML = `
        <span class="checkmark">✓</span>
        <span class="province-name">
          <strong>${getThaiName(feature)}</strong>
          <span>${province}</span>
        </span>
      `;
      button.addEventListener("click", () => toggleProvince(province));
      item.appendChild(button);
      return item;
    })
  );
}

function toggleProvince(province) {
  if (state.visited.has(province)) {
    state.visited.delete(province);
  } else {
    state.visited.add(province);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify([...state.visited]));
  updateProvinceStyles();
  renderList();
  updateSummary();
  showActiveProvince(province);
}

function updateProvinceStyles() {
  map.querySelectorAll(".province").forEach((path) => {
    path.setAttribute("class", getProvinceClass(path.dataset.province));
    path.setAttribute("aria-label", `${getThaiNameByEnglish(path.dataset.province)} ${state.visited.has(path.dataset.province) ? "เคยไปแล้ว" : "ยังไม่เคยไป"}`);
  });
}

function updateSummary() {
  const count = state.visited.size;
  const percent = Math.round((count / 77) * 100);
  visitedCount.textContent = count;
  progressPercent.textContent = `${percent}%`;
  progressBar.style.width = `${percent}%`;
}

function showActiveProvince(province) {
  activeProvince.textContent = getThaiNameByEnglish(province);
  activeStatus.textContent = state.visited.has(province) ? "เคยไปแล้ว" : "ยังไม่เคยไป";
}

function getProvinceClass(province) {
  return `province${state.visited.has(province) ? " visited" : ""}`;
}

function getThaiName(feature) {
  return getThaiNameByEnglish(feature.properties.NAME_1);
}

function getThaiNameByEnglish(name) {
  return provinceNames[name] || name;
}

function getBounds(features) {
  const bounds = {
    minX: Infinity,
    minY: Infinity,
    maxX: -Infinity,
    maxY: -Infinity
  };

  features.forEach((feature) => {
    walkCoordinates(feature.geometry.coordinates, ([x, y]) => {
      bounds.minX = Math.min(bounds.minX, x);
      bounds.minY = Math.min(bounds.minY, y);
      bounds.maxX = Math.max(bounds.maxX, x);
      bounds.maxY = Math.max(bounds.maxY, y);
    });
  });

  return bounds;
}

function createProjector(bounds) {
  const padding = 28;
  const scale = Math.min(
    (MAP_WIDTH - padding * 2) / (bounds.maxX - bounds.minX),
    (MAP_HEIGHT - padding * 2) / (bounds.maxY - bounds.minY)
  );
  const mapWidth = (bounds.maxX - bounds.minX) * scale;
  const mapHeight = (bounds.maxY - bounds.minY) * scale;
  const offsetX = (MAP_WIDTH - mapWidth) / 2;
  const offsetY = (MAP_HEIGHT - mapHeight) / 2;

  return ([x, y]) => [
    offsetX + (x - bounds.minX) * scale,
    MAP_HEIGHT - offsetY - (y - bounds.minY) * scale
  ];
}

function geometryToPath(geometry, project) {
  if (geometry.type === "Polygon") {
    return polygonToPath(geometry.coordinates, project);
  }

  if (geometry.type === "MultiPolygon") {
    return geometry.coordinates.map((polygon) => polygonToPath(polygon, project)).join(" ");
  }

  return "";
}

function polygonToPath(polygon, project) {
  return polygon
    .map((ring) => {
      return ring
        .map((point, index) => {
          const [x, y] = project(point);
          return `${index === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
        })
        .join(" ") + " Z";
    })
    .join(" ");
}

function walkCoordinates(coordinates, callback) {
  if (typeof coordinates[0] === "number") {
    callback(coordinates);
    return;
  }

  coordinates.forEach((child) => walkCoordinates(child, callback));
}


function applyMapViewBox() {
  const { x, y, width, height } = state.mapViewBox;
  map.setAttribute("viewBox", `${x.toFixed(2)} ${y.toFixed(2)} ${width.toFixed(2)} ${height.toFixed(2)}`);
}

function zoomMap(factor) {
  const current = state.mapViewBox;
  const nextWidth = clamp(current.width * factor, MAP_WIDTH / 4, MAP_WIDTH);
  const nextHeight = clamp(current.height * factor, MAP_HEIGHT / 4, MAP_HEIGHT);
  const centerX = current.x + current.width / 2;
  const centerY = current.y + current.height / 2;
  state.mapViewBox = clampViewBox({
    x: centerX - nextWidth / 2,
    y: centerY - nextHeight / 2,
    width: nextWidth,
    height: nextHeight
  });
  applyMapViewBox();
}

function resetMapZoom() {
  state.mapViewBox = { x: 0, y: 0, width: MAP_WIDTH, height: MAP_HEIGHT };
  applyMapViewBox();
}

function clampViewBox(viewBox) {
  const width = clamp(viewBox.width, MAP_WIDTH / 4, MAP_WIDTH);
  const height = clamp(viewBox.height, MAP_HEIGHT / 4, MAP_HEIGHT);
  return {
    x: clamp(viewBox.x, 0, MAP_WIDTH - width),
    y: clamp(viewBox.y, 0, MAP_HEIGHT - height),
    width,
    height
  };
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function startMapPan(event) {
  if (event.button !== 0 || event.target.closest(".map-zoom-controls")) {
    return;
  }

  state.pan = {
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    startViewBox: { ...state.mapViewBox },
    moved: false
  };
  }

function moveMapPan(event) {
  if (!state.pan || state.pan.pointerId !== event.pointerId) {
    return;
  }

  const bounds = map.getBoundingClientRect();
  const dx = event.clientX - state.pan.startX;
  const dy = event.clientY - state.pan.startY;

  if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
    state.pan.moved = true;
    if (!map.hasPointerCapture(event.pointerId)) {
      map.setPointerCapture(event.pointerId);
    }
  }

  if (!state.pan.moved) {
    return;
  }

  const start = state.pan.startViewBox;
  state.mapViewBox = clampViewBox({
    x: start.x - (dx / bounds.width) * start.width,
    y: start.y - (dy / bounds.height) * start.height,
    width: start.width,
    height: start.height
  });
  applyMapViewBox();
}

function endMapPan(event) {
  if (!state.pan || state.pan.pointerId !== event.pointerId) {
    return;
  }

  if (state.pan.moved) {
    state.suppressNextClick = true;
  }

  if (map.hasPointerCapture(event.pointerId)) {
    map.releasePointerCapture(event.pointerId);
  }

  state.pan = null;
}
async function exportShareImage() {
  if (!state.features.length || shareButton.disabled) {
    return;
  }

  shareButton.disabled = true;
  shareButton.textContent = "กำลังสร้าง...";

  try {
    await document.fonts?.ready;
    const blob = await createShareImage();
    downloadBlob(blob, "thailand-visited.png");

    if (typeof File !== "undefined" && navigator.canShare && navigator.share) {
      const file = new File([blob], "thailand-visited.png", { type: "image/png" });
      if (navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "Thailand Visited Map",
          text: getShareText()
        });
      }
    }
  } catch (error) {
    console.error(error);
  } finally {
    shareButton.disabled = false;
    shareButton.textContent = "แชร์ภาพ";
  }
}

function createShareImage() {
  const size = 1080;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  const visited = getVisitedFeatures();
  const percent = Math.round((visited.length / 77) * 100);

  ctx.fillStyle = "#f6f2eb";
  ctx.fillRect(0, 0, size, size);
  drawExportHeader(ctx, visited.length, percent);
  drawExportMap(ctx);
  drawExportLegend(ctx);
  drawExportList(ctx, visited);


  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error("Export failed"));
      }
    }, "image/png", 0.95);
  });
}

function drawExportHeader(ctx, count, percent) {
  ctx.fillStyle = "#b83f27";
  ctx.font = `700 28px ${FONT_STACK}`;
  ctx.fillText("Thailand Visited", 64, 76);

  ctx.fillStyle = "#26211d";
  ctx.font = `800 58px ${FONT_STACK}`;
  ctx.fillText(`ไปมาแล้ว ${count} จังหวัด`, 64, 142);

  ctx.fillStyle = "#756d64";
  ctx.font = `700 26px ${FONT_STACK}`;
  ctx.fillText(`คิดเป็น ${percent}% จาก 77 จังหวัด`, 64, 184);
}

function drawExportMap(ctx) {
  const bounds = getBounds(state.features);
  const project = createProjector(bounds);
  const mapBox = { x: 54, y: 220, width: 430, height: 720 };
  const scale = Math.min(mapBox.width / MAP_WIDTH, mapBox.height / MAP_HEIGHT);
  const offsetX = mapBox.x + (mapBox.width - MAP_WIDTH * scale) / 2;
  const offsetY = mapBox.y + (mapBox.height - MAP_HEIGHT * scale) / 2;

  ctx.save();
  ctx.translate(offsetX, offsetY);
  ctx.scale(scale, scale);

  state.features.forEach((feature) => {
    const province = feature.properties.NAME_1;
    const path = new Path2D(geometryToPath(feature.geometry, project));
    ctx.fillStyle = state.visited.has(province) ? "#e95f3d" : "#f1dcc9";
    ctx.strokeStyle = "#fffaf3";
    ctx.lineWidth = 1.7;
    ctx.fill(path);
    ctx.stroke(path);
  });

  ctx.restore();
}


function drawExportLegend(ctx) {
  const x = 104;
  const y = 910;
  ctx.font = `800 22px ${FONT_STACK}`;
  drawLegendItem(ctx, x, y, "#e95f3d", "ไปมาแล้ว");
  drawLegendItem(ctx, x + 170, y, "#f1dcc9", "ยังไม่ไป");
}

function drawLegendItem(ctx, x, y, color, label) {
  ctx.fillStyle = color;
  roundRect(ctx, x, y - 18, 22, 22, 5);
  ctx.fill();
  ctx.strokeStyle = "#fffaf3";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = "#26211d";
  ctx.fillText(label, x + 32, y);
}
function drawExportList(ctx, visited) {
  const cardX = 496;
  const cardY = 232;
  const cardWidth = 496;
  const cardHeight = 704;
  const x = cardX + 28;
  const y = cardY + 58;
  const width = cardWidth - 56;
  const names = visited.map(getThaiName);

  ctx.fillStyle = "#fffaf3";
  roundRect(ctx, cardX, cardY, cardWidth, cardHeight, 22);
  ctx.fill();
  ctx.strokeStyle = "#dacfc2";
  ctx.lineWidth = 1.4;
  ctx.stroke();

  ctx.fillStyle = "#26211d";
  ctx.font = `800 32px ${FONT_STACK}`;
  ctx.fillText("รายชื่อจังหวัด", x, y);

  if (!names.length) {
    ctx.fillStyle = "#756d64";
    ctx.font = `700 24px ${FONT_STACK}`;
    ctx.fillText("ยังไม่ได้เลือกจังหวัด", x, y + 48);
    return;
  }

  const columns = names.length > 48 ? 3 : 2;
  const rows = Math.ceil(names.length / columns);
  const columnWidth = width / columns;
  const dense = names.length > 34;
  const fontSize = dense ? 18 : 20;
  const lineHeight = dense ? 24 : 28;
  ctx.font = `${dense ? 600 : 700} ${fontSize}px ${FONT_STACK}`;

  names.forEach((name, index) => {
    const column = Math.floor(index / rows);
    const row = index % rows;
    const textX = x + column * columnWidth;
    const textY = y + 52 + row * lineHeight;
    ctx.fillStyle = "#e95f3d";
    ctx.fillText("•", textX, textY);
    ctx.fillStyle = "#26211d";
    fitText(ctx, name, textX + 16, textY, columnWidth - 24);
  });
}
function fitText(ctx, text, x, y, maxWidth) {
  const originalFont = ctx.font;
  const sizeMatch = originalFont.match(/(\d+(?:\.\d+)?)px/);
  const originalSize = sizeMatch ? Number(sizeMatch[1]) : 21;
  let size = originalSize;

  while (size > 14 && ctx.measureText(text).width > maxWidth) {
    size -= 1;
    ctx.font = originalFont.replace(/\d+(?:\.\d+)?px/, `${size}px`);
  }

  ctx.fillText(text, x, y);
  ctx.font = originalFont;
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

function getVisitedFeatures() {
  return state.features.filter((feature) => state.visited.has(feature.properties.NAME_1));
}

function getShareText() {
  const names = getVisitedFeatures().map(getThaiName).join(", ");
  return `ไปมาแล้ว ${state.visited.size} จังหวัด${names ? `: ${names}` : ""}`;
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.rel = "noopener";
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  window.setTimeout(() => {
    link.remove();
    URL.revokeObjectURL(url);
  }, 1000);
}

search.addEventListener("input", (event) => {
  state.search = event.target.value;
  renderList();
});

resetButton.addEventListener("click", () => {
  state.visited.clear();
  localStorage.removeItem(STORAGE_KEY);
  updateProvinceStyles();
  renderList();
  updateSummary();
  activeProvince.textContent = "เลือกจังหวัดบนแผนที่";
  activeStatus.textContent = "กดที่จังหวัดเพื่อเปลี่ยนสถานะ";
});

shareButton.addEventListener("click", exportShareImage);








zoomInButton.addEventListener("click", () => zoomMap(0.78));
zoomOutButton.addEventListener("click", () => zoomMap(1.28));
zoomResetButton.addEventListener("click", resetMapZoom);

map.addEventListener("pointerdown", startMapPan);
map.addEventListener("pointermove", moveMapPan);
map.addEventListener("pointerup", endMapPan);
map.addEventListener("pointercancel", endMapPan);
map.addEventListener("click", (event) => {
  if (state.suppressNextClick) {
    event.preventDefault();
    event.stopImmediatePropagation();
    state.suppressNextClick = false;
  }
}, true);









