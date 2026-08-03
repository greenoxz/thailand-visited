const MAP_WIDTH = 720;
const MAP_HEIGHT = 980;
const STORAGE_KEY = "thailand-visited-provinces";
const EXPORT_THEME_STORAGE_KEY = "thailand-visited-export-theme";
const FONT_STACK = "'LINE Seed Sans TH', 'Segoe UI', Tahoma, sans-serif";
const TOTAL_THAILAND_AREA = 513120;

const MAP_THEMES = {
  sunset: {
    name: "Warm Sunset",
    brand: "#e95f3d",
    brandDark: "#b83f27",
    bg: "#f6f2eb",
    ink: "#26211d",
    muted: "#756d64",
    line: "#dacfc2",
    paper: "#fffaf3",
    visited: "#e95f3d",
    unvisited: "#f1dcc9",
    hover: "#3f8c7a"
  },
  emerald: {
    name: "Forest Emerald",
    brand: "#2d6a4f",
    brandDark: "#1b4332",
    bg: "#f0f7f4",
    ink: "#1b2a26",
    muted: "#5c756e",
    line: "#c8dfd5",
    paper: "#f7fcf9",
    visited: "#2d6a4f",
    unvisited: "#d8f3dc",
    hover: "#d97706"
  },
  ocean: {
    name: "Ocean Blue",
    brand: "#1d3557",
    brandDark: "#0f2139",
    bg: "#f1faee",
    ink: "#13253a",
    muted: "#457b9d",
    line: "#a8dadc",
    paper: "#f8fdff",
    visited: "#1d3557",
    unvisited: "#cbdadb",
    hover: "#e63946"
  },
  midnight: {
    name: "Midnight Dark",
    brand: "#ff6b6b",
    brandDark: "#e05656",
    bg: "#181b20",
    ink: "#f1f3f5",
    muted: "#909296",
    line: "#2c3038",
    paper: "#21252b",
    visited: "#ff6b6b",
    unvisited: "#343a40",
    hover: "#4ecdc4"
  },
  sakura: {
    name: "Sakura Pink",
    brand: "#e63946",
    brandDark: "#b82431",
    bg: "#fff5f5",
    ink: "#331a1e",
    muted: "#9e6b73",
    line: "#f7cad0",
    paper: "#fffafb",
    visited: "#e63946",
    unvisited: "#ffccd5",
    hover: "#457b9d"
  }
};

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

const provinceAreas = {
  "Amnat Charoen": 3161, "Ang Thong": 968, "Bangkok Metropolis": 1569, "Bueng Kan": 4305,
  "Buri Ram": 10323, "Chachoengsao": 5351, "Chai Nat": 2470, "Chaiyaphum": 12778,
  "Chanthaburi": 6338, "Chiang Mai": 20107, "Chiang Rai": 11678, "Chon Buri": 4363,
  "Chumphon": 6009, "Kalasin": 6947, "Kamphaeng Phet": 8607, "Kanchanaburi": 19483,
  "Khon Kaen": 10886, "Krabi": 4709, "Lampang": 12534, "Lamphun": 4506,
  "Loei": 11425, "Lop Buri": 6200, "Mae Hong Son": 12681, "Maha Sarakham": 5291,
  "Mukdahan": 4340, "Nakhon Nayok": 2122, "Nakhon Pathom": 2168, "Nakhon Phanom": 5512,
  "Nakhon Ratchasima": 20494, "Nakhon Sawan": 9598, "Nakhon Si Thammarat": 9943,
  "Nan": 11472, "Narathiwat": 4475, "Nong Bua Lam Phu": 3859, "Nong Khai": 3027,
  "Nonthaburi": 622, "Pathum Thani": 1526, "Pattani": 1940, "Phangnga": 4171,
  "Phatthalung": 3424, "Phayao": 6335, "Phetchabun": 12668, "Phetchaburi": 6225,
  "Phichit": 4531, "Phitsanulok": 10816, "Phra Nakhon Si Ayutthaya": 2557, "Phrae": 6539,
  "Phuket": 543, "Prachin Buri": 4762, "Prachuap Khiri Khan": 6368, "Ranong": 3298,
  "Ratchaburi": 5196, "Rayong": 3552, "Roi Et": 8299, "Sa Kaeo": 7195,
  "Sakon Nakhon": 9606, "Samut Prakan": 1004, "Samut Sakhon": 872, "Samut Songkhram": 417,
  "Saraburi": 3576, "Satun": 2479, "Si Sa Ket": 8840, "Sing Buri": 822,
  "Songkhla": 7394, "Sukhothai": 6596, "Suphan Buri": 5358, "Surat Thani": 12891,
  "Surin": 8124, "Tak": 16407, "Trang": 4918, "Trat": 2819,
  "Ubon Ratchathani": 16107, "Udon Thani": 11730, "Uthai Thani": 6730, "Uttaradit": 7839,
  "Yala": 4521, "Yasothon": 4162
};

const state = {
  features: [],
  mapViewBox: { x: 0, y: 0, width: MAP_WIDTH, height: MAP_HEIGHT },
  pan: null,
  pointers: new Map(),
  pinch: null,
  suppressNextClick: false,
  listMode: "unvisited",
  visited: new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")),
  exportTheme: localStorage.getItem(EXPORT_THEME_STORAGE_KEY) || "sunset",
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
const sidebarShareButton = document.querySelector("#sidebarShareButton");
const showVisitedButton = document.querySelector("#showVisitedButton");
const showUnvisitedButton = document.querySelector("#showUnvisitedButton");
const zoomInButton = document.querySelector("#zoomInButton");
const zoomOutButton = document.querySelector("#zoomOutButton");
const zoomResetButton = document.querySelector("#zoomResetButton");

const shareModal = document.querySelector("#shareModal");
const closeShareModal = document.querySelector("#closeShareModal");
const exportThemeCards = document.querySelectorAll(".export-theme-card");
const sharePreviewCanvas = document.querySelector("#sharePreviewCanvas");
const downloadShareImageButton = document.querySelector("#downloadShareImageButton");

init();

async function init() {
  try {
    const response = await fetch("/data/thailand.json");
    const geojson = await response.json();

    state.features = geojson.features.sort((a, b) => {
      return getThaiName(a).localeCompare(getThaiName(b), "th");
    });

    state.features.forEach((feature) => {
      let minLng = Infinity, minLat = Infinity, maxLng = -Infinity, maxLat = -Infinity;
      walkCoordinates(feature.geometry.coordinates, ([lng, lat]) => {
        minLng = Math.min(minLng, lng);
        maxLng = Math.max(maxLng, lng);
        minLat = Math.min(minLat, lat);
        maxLat = Math.max(maxLat, lat);
      });
      feature.bounds = { minLng, maxLng, minLat, maxLat };
    });

    renderMap();
    applyMapViewBox();
    renderList();
    updateSummary();
    updateInsights();
  } catch (error) {
    map.innerHTML = `<text x="32" y="64">โหลดแผนที่ไม่สำเร็จ</text>`;
    console.error(error);
  }
}

function updateSharePreview(themeKey) {
  state.exportTheme = themeKey;
  localStorage.setItem(EXPORT_THEME_STORAGE_KEY, themeKey);

  exportThemeCards.forEach((card) => {
    card.classList.toggle("is-active", card.dataset.theme === themeKey);
  });

  if (!sharePreviewCanvas) return;
  const ctx = sharePreviewCanvas.getContext("2d");
  const visited = getVisitedFeatures();
  const percent = Math.round((visited.length / 77) * 100);
  const theme = MAP_THEMES[themeKey] || MAP_THEMES.sunset;

  ctx.clearRect(0, 0, 1080, 1080);
  ctx.fillStyle = theme.bg;
  ctx.fillRect(0, 0, 1080, 1080);

  drawExportHeader(ctx, visited.length, percent, theme);
  drawExportMap(ctx, theme);
  drawExportLegend(ctx, theme);
  drawExportInsights(ctx, theme);
  drawExportList(ctx, visited, theme);
  drawExportUrl(ctx, theme);
  drawExportCredit(ctx, theme);
}

function openShareModal() {
  updateSharePreview(state.exportTheme);
  shareModal.classList.add("is-open");
  shareModal.setAttribute("aria-hidden", "false");
}

function closeShareModalFunc() {
  shareModal.classList.remove("is-open");
  shareModal.setAttribute("aria-hidden", "true");
}

exportThemeCards.forEach((card) => {
  card.addEventListener("click", () => {
    updateSharePreview(card.dataset.theme);
  });
});

closeShareModal.addEventListener("click", closeShareModalFunc);
shareModal.addEventListener("click", (event) => {
  if (event.target === shareModal) {
    closeShareModalFunc();
  }
});

function getVisitedFeatures() {
  return state.features.filter((feature) => state.visited.has(feature.properties.NAME_1));
}

function getTravelInsights() {
  const visitedFeatures = getVisitedFeatures();
  if (!visitedFeatures.length) {
    return {
      north: "-",
      south: "-",
      east: "-",
      west: "-",
      totalArea: 0,
      areaPercent: 0
    };
  }

  let north = visitedFeatures[0];
  let south = visitedFeatures[0];
  let east = visitedFeatures[0];
  let west = visitedFeatures[0];
  let totalArea = 0;

  visitedFeatures.forEach((feature) => {
    const name = feature.properties.NAME_1;
    totalArea += provinceAreas[name] || 0;

    if (feature.bounds.maxLat > north.bounds.maxLat) north = feature;
    if (feature.bounds.minLat < south.bounds.minLat) south = feature;
    if (feature.bounds.maxLng > east.bounds.maxLng) east = feature;
    if (feature.bounds.minLng < west.bounds.minLng) west = feature;
  });

  const areaPercent = Math.round((totalArea / TOTAL_THAILAND_AREA) * 1000) / 10;

  return {
    north: getThaiName(north),
    south: getThaiName(south),
    east: getThaiName(east),
    west: getThaiName(west),
    totalArea: totalArea.toLocaleString("th-TH"),
    areaPercent
  };
}

function updateInsights() {
  const insights = getTravelInsights();
  const insightNorth = document.querySelector("#insightNorth");
  const insightSouth = document.querySelector("#insightSouth");
  const insightEast = document.querySelector("#insightEast");
  const insightWest = document.querySelector("#insightWest");
  const insightArea = document.querySelector("#insightArea");

  if (insightNorth) insightNorth.textContent = insights.north;
  if (insightSouth) insightSouth.textContent = insights.south;
  if (insightEast) insightEast.textContent = insights.east;
  if (insightWest) insightWest.textContent = insights.west;
  if (insightArea) insightArea.textContent = `${insights.totalArea} กม.² (${insights.areaPercent}%)`;
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
    const province = feature.properties.NAME_1;
    const isVisited = state.visited.has(province);
    const matchesMode = state.listMode === "visited" ? isVisited : !isVisited;
    const en = province.toLowerCase();
    const th = getThaiName(feature).toLowerCase();
    return matchesMode && (en.includes(query) || th.includes(query));
  });

  if (!filtered.length) {
    const item = document.createElement("li");
    item.className = "province-empty";
    item.textContent = state.listMode === "visited" ? "ยังไม่ได้เลือกจังหวัดที่เคยไป" : "ไปครบทุกจังหวัดแล้ว";
    list.replaceChildren(item);
    return;
  }

  list.replaceChildren(
    ...filtered.map((feature) => {
      const province = feature.properties.NAME_1;
      const item = document.createElement("li");
      const button = document.createElement("button");
      const checkmark = document.createElement("span");
      const nameWrap = document.createElement("span");
      const thaiName = document.createElement("strong");
      const englishName = document.createElement("span");

      button.type = "button";
      button.className = "province-toggle" + (state.visited.has(province) ? " is-visited" : "");
      checkmark.className = "checkmark";
      checkmark.textContent = "✓";
      nameWrap.className = "province-name";
      thaiName.textContent = getThaiName(feature);
      englishName.textContent = province;

      nameWrap.append(thaiName, englishName);
      button.append(checkmark, nameWrap);
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
  updateInsights();
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
  progressPercent.textContent = percent + "%";
  progressBar.style.width = percent + "%";
}

function updateListModeControls() {
  const isVisitedMode = state.listMode === "visited";
  showVisitedButton.classList.toggle("is-active", isVisitedMode);
  showUnvisitedButton.classList.toggle("is-active", !isVisitedMode);
  showVisitedButton.setAttribute("aria-pressed", String(isVisitedMode));
  showUnvisitedButton.setAttribute("aria-pressed", String(!isVisitedMode));
}

function setListMode(mode) {
  state.listMode = mode;
  updateListModeControls();
  renderList();
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

function zoomMapToCenter(factor, initialViewBox) {
  const nextWidth = clamp(initialViewBox.width * factor, MAP_WIDTH / 4, MAP_WIDTH);
  const nextHeight = clamp(initialViewBox.height * factor, MAP_HEIGHT / 4, MAP_HEIGHT);
  const centerX = initialViewBox.x + initialViewBox.width / 2;
  const centerY = initialViewBox.y + initialViewBox.height / 2;
  state.mapViewBox = clampViewBox({
    x: centerX - nextWidth / 2,
    y: centerY - nextHeight / 2,
    width: nextWidth,
    height: nextHeight
  });
  applyMapViewBox();
}

function startMapPan(event) {
  if (event.button !== 0) return;
  state.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
  const pointers = [...state.pointers.values()];
  if (pointers.length === 2) {
    state.pan = null;
    state.pinch = { distance: getPointerDistance(pointers[0], pointers[1]), viewBox: { ...state.mapViewBox }, moved: false };
    return;
  }
  if (pointers.length > 2) return;
  state.pan = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, startViewBox: { ...state.mapViewBox }, moved: false };
}

function moveMapPan(event) {
  if (!state.pointers.has(event.pointerId)) return;
  state.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
  const pointers = [...state.pointers.values()];
  if (state.pinch && pointers.length >= 2) {
    const distance = getPointerDistance(pointers[0], pointers[1]);
    const factor = state.pinch.distance / Math.max(distance, 1);
    zoomMapToCenter(factor, state.pinch.viewBox);
    state.pinch.moved = true;
    state.suppressNextClick = true;
    return;
  }
  if (!state.pan || state.pan.pointerId !== event.pointerId) return;
  const deltaX = event.clientX - state.pan.startX;
  const deltaY = event.clientY - state.pan.startY;
  if (Math.hypot(deltaX, deltaY) > 5) {
    state.pan.moved = true;
    state.suppressNextClick = true;
  }
  const scaleX = state.mapViewBox.width / map.clientWidth;
  const scaleY = state.mapViewBox.height / map.clientHeight;
  state.mapViewBox = clampViewBox({
    x: state.pan.startViewBox.x - deltaX * scaleX,
    y: state.pan.startViewBox.y - deltaY * scaleY,
    width: state.mapViewBox.width,
    height: state.mapViewBox.height
  });
  applyMapViewBox();
}

function endMapPan(event) {
  state.pointers.delete(event.pointerId);
  if (state.pointers.size < 2) {
    state.pinch = null;
  }
  if (state.pan && state.pan.pointerId === event.pointerId) {
    if (state.pan.moved) {
      state.suppressNextClick = true;
    }
    state.pan = null;
  }
}

function getPointerDistance(p1, p2) {
  return Math.hypot(p2.x - p1.x, p2.y - p1.y);
}

async function handleDownloadShareImage() {
  try {
    if (downloadShareImageButton) {
      downloadShareImageButton.disabled = true;
      downloadShareImageButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i><span>กำลังสร้างภาพ...</span>';
    }

    const blob = await createShareImage();

    if (typeof File !== "undefined" && navigator.canShare && navigator.share) {
      const file = new File([blob], "thailand-visited.png", { type: "image/png" });
      if (navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "Thailand Visited Map",
          text: getShareText()
        });
        closeShareModalFunc();
        return;
      }
    }

    downloadBlob(blob, "thailand-visited.png");
    closeShareModalFunc();
  } catch (error) {
    console.error(error);
  } finally {
    if (downloadShareImageButton) {
      downloadShareImageButton.disabled = false;
      downloadShareImageButton.innerHTML = '<i class="fa-solid fa-download"></i><span>ดาวน์โหลด / แชร์ภาพนี้</span>';
    }
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
  const theme = MAP_THEMES[state.exportTheme] || MAP_THEMES.sunset;

  ctx.fillStyle = theme.bg;
  ctx.fillRect(0, 0, size, size);

  drawExportHeader(ctx, visited.length, percent, theme);
  drawExportMap(ctx, theme);
  drawExportLegend(ctx, theme);
  drawExportInsights(ctx, theme);
  drawExportList(ctx, visited, theme);
  drawExportUrl(ctx, theme);
  drawExportCredit(ctx, theme);

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

function drawExportUrl(ctx, theme) {
  ctx.fillStyle = theme.muted;
  ctx.font = `600 18px ${FONT_STACK}`;
  ctx.textAlign = "center";
  ctx.fillText("lab.termtem.in.th/maps", 540, 1042);
  ctx.textAlign = "start";
}

function drawExportCredit(ctx, theme) {
  ctx.fillStyle = theme.muted;
  ctx.font = `500 14px ${FONT_STACK}`;
  ctx.textAlign = "left";
  ctx.fillText("Map Vector: github.com/BorntoDev/Thailand-Map-Vector", 54, 1042);
  ctx.textAlign = "start";
}

function drawExportHeader(ctx, count, percent, theme) {
  ctx.fillStyle = theme.brandDark;
  ctx.font = `700 28px ${FONT_STACK}`;
  ctx.fillText("Thailand Visited", 64, 72);

  ctx.fillStyle = theme.ink;
  ctx.font = `800 54px ${FONT_STACK}`;
  ctx.fillText(`ไปมาแล้ว ${count} จังหวัด`, 64, 134);

  ctx.fillStyle = theme.muted;
  ctx.font = `700 24px ${FONT_STACK}`;
  ctx.fillText(`คิดเป็น ${percent}% จาก 77 จังหวัด`, 64, 174);
}

function drawExportMap(ctx, theme) {
  const bounds = getBounds(state.features);
  const project = createProjector(bounds);
  const mapBox = { x: 54, y: 194, width: 420, height: 600 };
  const scale = Math.min(mapBox.width / MAP_WIDTH, mapBox.height / MAP_HEIGHT);
  const offsetX = mapBox.x + (mapBox.width - MAP_WIDTH * scale) / 2;
  const offsetY = mapBox.y + (mapBox.height - MAP_HEIGHT * scale) / 2;

  ctx.save();
  ctx.translate(offsetX, offsetY);
  ctx.scale(scale, scale);

  state.features.forEach((feature) => {
    const province = feature.properties.NAME_1;
    const path = new Path2D(geometryToPath(feature.geometry, project));
    ctx.fillStyle = state.visited.has(province) ? theme.visited : theme.unvisited;
    ctx.strokeStyle = theme.paper;
    ctx.lineWidth = 1.7;
    ctx.fill(path);
    ctx.stroke(path);
  });

  ctx.restore();
}

function drawExportLegend(ctx, theme) {
  const x = 74;
  const y = 812;
  ctx.font = `800 20px ${FONT_STACK}`;
  drawLegendItem(ctx, x, y, theme.visited, "ไปมาแล้ว", theme);
  drawLegendItem(ctx, x + 160, y, theme.unvisited, "ยังไม่ไป", theme);
}

function drawLegendItem(ctx, x, y, color, label, theme) {
  ctx.fillStyle = color;
  roundRect(ctx, x, y - 18, 22, 22, 5);
  ctx.fill();
  ctx.strokeStyle = theme.paper;
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = theme.ink;
  ctx.fillText(label, x + 32, y);
}

function drawExportInsights(ctx, theme) {
  const insights = getTravelInsights();
  const boxX = 54;
  const boxY = 832;
  const boxW = 420;
  const boxH = 154;

  ctx.fillStyle = theme.paper;
  roundRect(ctx, boxX, boxY, boxW, boxH, 14);
  ctx.fill();
  ctx.strokeStyle = theme.line;
  ctx.lineWidth = 1.2;
  ctx.stroke();

  ctx.fillStyle = theme.brandDark;
  ctx.font = `800 19px ${FONT_STACK}`;
  ctx.fillText("สถิติเชิงลึก (Insights)", boxX + 16, boxY + 30);

  ctx.font = `600 15px ${FONT_STACK}`;
  ctx.fillStyle = theme.muted;
  ctx.fillText("เหนือสุด:", boxX + 16, boxY + 62);
  ctx.fillText("ใต้สุด:", boxX + 224, boxY + 62);
  ctx.fillText("ตะวันออกสุด:", boxX + 16, boxY + 90);
  ctx.fillText("ตะวันตกสุด:", boxX + 224, boxY + 90);

  ctx.fillStyle = theme.ink;
  ctx.font = `700 15px ${FONT_STACK}`;
  ctx.fillText(insights.north, boxX + 88, boxY + 62);
  ctx.fillText(insights.south, boxX + 276, boxY + 62);
  ctx.fillText(insights.east, boxX + 116, boxY + 90);
  ctx.fillText(insights.west, boxX + 308, boxY + 90);

  ctx.strokeStyle = theme.line;
  ctx.beginPath();
  ctx.moveTo(boxX + 16, boxY + 106);
  ctx.lineTo(boxX + boxW - 16, boxY + 106);
  ctx.stroke();

  ctx.fillStyle = theme.muted;
  ctx.font = `600 15px ${FONT_STACK}`;
  ctx.fillText("พื้นที่สะสม:", boxX + 16, boxY + 134);

  ctx.fillStyle = theme.brandDark;
  ctx.font = `800 16px ${FONT_STACK}`;
  ctx.fillText(`${insights.totalArea} กม.² (${insights.areaPercent}%)`, boxX + 104, boxY + 134);
}

function drawExportList(ctx, visited, theme) {
  const cardX = 496;
  const cardY = 194;
  const cardWidth = 530;
  const cardHeight = 792;
  const x = cardX + 28;
  const y = cardY + 54;
  const width = cardWidth - 56;
  const names = visited.map(getThaiName);

  ctx.fillStyle = theme.paper;
  roundRect(ctx, cardX, cardY, cardWidth, cardHeight, 22);
  ctx.fill();
  ctx.strokeStyle = theme.line;
  ctx.lineWidth = 1.4;
  ctx.stroke();

  ctx.fillStyle = theme.ink;
  ctx.font = `800 32px ${FONT_STACK}`;
  ctx.fillText("รายชื่อจังหวัด", x, y);

  if (!names.length) {
    ctx.fillStyle = theme.muted;
    ctx.font = `700 24px ${FONT_STACK}`;
    ctx.fillText("ยังไม่ได้เลือกจังหวัด", x, y + 48);
    return;
  }

  const columns = names.length > 48 ? 3 : 2;
  const rows = Math.ceil(names.length / columns);
  const columnWidth = width / columns;
  const dense = names.length > 34;
  const fontSize = dense ? 18 : 21;
  const availableListHeight = cardHeight - 126;
  const lineHeight = clamp(Math.floor(availableListHeight / Math.max(rows, 1)), dense ? 23 : 30, dense ? 27 : 42);
  ctx.font = `${dense ? 600 : 700} ${fontSize}px ${FONT_STACK}`;

  names.forEach((name, index) => {
    const column = Math.floor(index / rows);
    const row = index % rows;
    const textX = x + column * columnWidth;
    const textY = y + 52 + row * lineHeight;
    ctx.fillStyle = theme.visited;
    ctx.fillText("•", textX, textY);
    ctx.fillStyle = theme.ink;
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

showVisitedButton.addEventListener("click", () => setListMode("visited"));
showUnvisitedButton.addEventListener("click", () => setListMode("unvisited"));

search.addEventListener("input", (event) => {
  state.search = event.target.value;
  renderList();
});

resetButton.addEventListener("click", () => {
  if (!state.visited.size) return;
  state.visited.clear();
  localStorage.removeItem(STORAGE_KEY);
  updateProvinceStyles();
  renderList();
  updateSummary();
  updateInsights();
  activeProvince.textContent = "เลือกจังหวัดบนแผนที่";
  activeStatus.textContent = "กดที่จังหวัดเพื่อเปลี่ยนสถานะ";
});

if (shareButton) shareButton.addEventListener("click", openShareModal);
if (sidebarShareButton) sidebarShareButton.addEventListener("click", openShareModal);
if (downloadShareImageButton) downloadShareImageButton.addEventListener("click", handleDownloadShareImage);

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