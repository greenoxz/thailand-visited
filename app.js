const MAP_WIDTH = 720;
const MAP_HEIGHT = 980;
const STORAGE_KEY = "thailand-visited-provinces";
const EXPORT_THEME_STORAGE_KEY = "thailand-visited-export-theme";
const EXPORT_RATIO_STORAGE_KEY = "thailand-visited-export-ratio";
const FONT_STACK = "'LINE Seed Sans TH', 'Segoe UI', Tahoma, sans-serif";
const TOTAL_THAILAND_AREA = 513120;

const MAP_THEMES = {
  sunset: {
    name: "สีหลัก",
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
  babyblue: {
    name: "สีฟ้าอ่อน",
    brand: "#0284c7",
    brandDark: "#0369a1",
    bg: "#ffffff",
    ink: "#0f172a",
    muted: "#475569",
    line: "#7dd3fc",
    paper: "#f0f9ff",
    visited: "#0284c7",
    unvisited: "#bae6fd",
    hover: "#38bdf8"
  },
  cottoncandy: {
    name: "สีชมพูอ่อน",
    brand: "#db2777",
    brandDark: "#9d174d",
    bg: "#ffffff",
    ink: "#831843",
    muted: "#9d174d",
    line: "#f472b6",
    paper: "#fdf2f8",
    visited: "#db2777",
    unvisited: "#fbcfe8",
    hover: "#f472b6"
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
  exportRatio: localStorage.getItem(EXPORT_RATIO_STORAGE_KEY) || "1:1",
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
const showVisitedButton = document.querySelector("#showVisitedButton");
const showUnvisitedButton = document.querySelector("#showUnvisitedButton");
const zoomInButton = document.querySelector("#zoomInButton");
const zoomOutButton = document.querySelector("#zoomOutButton");
const zoomResetButton = document.querySelector("#zoomResetButton");

const shareModal = document.querySelector("#shareModal");
const closeShareModal = document.querySelector("#closeShareModal");
const exportThemeCards = document.querySelectorAll(".export-theme-card");
const ratioBtns = document.querySelectorAll(".ratio-btn");
const sharePreviewCanvas = document.querySelector("#sharePreviewCanvas");
const downloadShareImageButton = document.querySelector("#downloadShareImageButton");

const resetModal = document.querySelector("#resetModal");
const closeResetModal = document.querySelector("#closeResetModal");
const cancelResetButton = document.querySelector("#cancelResetButton");
const confirmResetButton = document.querySelector("#confirmResetButton");

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

  ratioBtns.forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.ratio === state.exportRatio);
  });

  if (!sharePreviewCanvas) return;

  const is916 = state.exportRatio === "9:16";
  const canvasWidth = 1080;
  const canvasHeight = is916 ? 1920 : 1080;

  sharePreviewCanvas.width = canvasWidth;
  sharePreviewCanvas.height = canvasHeight;

  const box = sharePreviewCanvas.parentElement;
  if (box) {
    box.setAttribute("data-ratio", state.exportRatio);
  }

  const ctx = sharePreviewCanvas.getContext("2d");
  const visited = getVisitedFeatures();
  const percent = Math.round((visited.length / 77) * 100);
  const theme = MAP_THEMES[themeKey] || MAP_THEMES.sunset;

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.fillStyle = theme.bg;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  if (is916) {
    drawExportHeader916(ctx, visited.length, percent, theme);
    drawExportMap916(ctx, theme);
    drawExportLegend916(ctx, theme);
    drawExportList916(ctx, visited, theme);
    drawExportFooter916(ctx, theme);
  } else {
    drawExportHeader(ctx, visited.length, percent, theme);
    drawExportMap(ctx, theme);
    drawExportLegend(ctx, theme);
    drawExportList(ctx, visited, theme);
    drawExportUrl(ctx, theme);
    drawExportCredit(ctx, theme);
  }
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

ratioBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    state.exportRatio = btn.dataset.ratio;
    localStorage.setItem(EXPORT_RATIO_STORAGE_KEY, btn.dataset.ratio);
    updateSharePreview(state.exportTheme);
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
  if (event.pointerType === "mouse" && event.button !== 0) return;
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
  const threshold = event.pointerType === "touch" ? 10 : 5;
  if (Math.hypot(deltaX, deltaY) > threshold) {
    state.pan.moved = true;
    state.suppressNextClick = true;
  }
  const scaleX = state.mapViewBox.width / Math.max(map.clientWidth, 1);
  const scaleY = state.mapViewBox.height / Math.max(map.clientHeight, 1);
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


    downloadBlob(blob, "thailand-visited.png");
    closeShareModalFunc();
  } catch (error) {
    console.error(error);
  } finally {
    if (downloadShareImageButton) {
      downloadShareImageButton.disabled = false;
      downloadShareImageButton.innerHTML = '<i class="fa-solid fa-download" aria-hidden="true"></i><span>ดาวน์โหลดภาพนี้</span>';
    }
  }
}

function createShareImage() {
  const is916 = state.exportRatio === "9:16";
  const canvasWidth = 1080;
  const canvasHeight = is916 ? 1920 : 1080;
  const canvas = document.createElement("canvas");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext("2d");
  const visited = getVisitedFeatures();
  const percent = Math.round((visited.length / 77) * 100);
  const theme = MAP_THEMES[state.exportTheme] || MAP_THEMES.sunset;

  ctx.fillStyle = theme.bg;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  if (is916) {
    drawExportHeader916(ctx, visited.length, percent, theme);
    drawExportMap916(ctx, theme);
    drawExportLegend916(ctx, theme);
    drawExportList916(ctx, visited, theme);
    drawExportFooter916(ctx, theme);
  } else {
    drawExportHeader(ctx, visited.length, percent, theme);
    drawExportMap(ctx, theme);
    drawExportLegend(ctx, theme);
    drawExportList(ctx, visited, theme);
    drawExportUrl(ctx, theme);
    drawExportCredit(ctx, theme);
  }

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

const USER_QR_MATRIX = [
  [1,1,1,1,1,1,1,0,1,0,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,1,0,1,1,0,0,1,1,0,0,0,0,1,0,0,0,0,0,1],
  [1,0,1,1,1,0,1,0,1,1,0,1,0,0,1,1,0,0,1,0,1,1,1,0,1],
  [1,0,1,1,1,0,1,0,1,1,1,1,1,1,1,1,0,0,1,0,1,1,1,0,1],
  [1,0,1,1,1,0,1,0,0,1,0,1,0,0,1,1,1,0,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,1,0,1,1,1,0,0,1,0,0,1,0,1,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
  [0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0],
  [1,1,0,0,1,1,1,0,0,0,1,0,1,0,1,1,0,0,0,1,0,1,1,1,1],
  [0,0,0,1,1,1,0,1,1,0,0,1,0,0,1,1,1,0,0,0,1,1,0,1,0],
  [1,1,1,1,0,0,1,0,0,1,1,1,1,1,1,1,1,1,0,0,0,1,1,0,0],
  [1,0,0,1,1,1,0,0,0,1,0,1,1,0,0,0,1,0,0,1,1,0,1,1,0],
  [1,0,1,0,1,0,1,0,0,0,0,1,1,0,0,0,1,1,1,1,0,1,1,1,1],
  [1,0,0,0,0,0,0,0,1,0,1,1,0,0,1,1,1,0,0,0,1,0,0,1,0],
  [0,0,1,0,1,0,1,0,0,0,1,1,1,0,0,1,0,1,0,1,1,1,1,0,0],
  [0,0,1,0,0,0,0,0,0,0,0,0,1,0,1,1,0,1,1,1,1,0,1,1,0],
  [1,1,0,0,1,1,1,1,0,0,1,1,1,0,0,0,1,1,1,1,1,1,1,0,0],
  [0,0,0,0,0,0,0,0,1,1,1,1,1,0,1,0,1,0,0,0,1,0,0,0,0],
  [1,1,1,1,1,1,1,0,0,1,1,1,0,1,1,0,1,0,1,0,1,0,0,0,0],
  [1,0,0,0,0,0,1,0,1,0,0,1,0,0,0,0,1,0,0,0,1,1,1,1,1],
  [1,0,1,1,1,0,1,0,1,0,0,1,1,0,1,0,1,1,1,1,1,1,1,1,0],
  [1,0,1,1,1,0,1,0,0,0,1,1,0,0,1,0,0,0,1,1,0,0,1,1,1],
  [1,0,1,1,1,0,1,0,0,1,0,1,0,1,1,0,1,1,1,0,0,1,0,1,0],
  [1,0,0,0,0,0,1,0,1,0,1,1,1,0,0,0,0,0,1,1,1,1,1,1,0],
  [1,1,1,1,1,1,1,0,1,1,0,0,0,0,0,1,0,0,0,0,0,0,1,1,1]
];

function drawQRCode(ctx, text, x, y, size, theme) {
  const count = USER_QR_MATRIX.length;
  const padding = 6;
  const innerSize = size - padding * 2;
  const cellSize = innerSize / count;

  ctx.save();
  ctx.fillStyle = "#ffffff";
  roundRect(ctx, x, y, size, size, 8);
  ctx.fill();

  ctx.fillStyle = "#111111";
  for (let r = 0; r < count; r++) {
    for (let c = 0; c < count; c++) {
      if (USER_QR_MATRIX[r][c] === 1) {
        const px = x + padding + c * cellSize;
        const py = y + padding + r * cellSize;
        ctx.fillRect(px, py, cellSize + 0.35, cellSize + 0.35);
      }
    }
  }
  ctx.restore();
}

function drawExportUrl(ctx, theme) {
  ctx.fillStyle = theme.muted;
  ctx.font = `600 18px ${FONT_STACK}`;
  ctx.textAlign = "right";
  ctx.fillText("lab.termtem.in.th/maps", 1026, 1040);
  ctx.textAlign = "start";
}

function drawExportCredit(ctx, theme) {
  ctx.fillStyle = theme.muted;
  ctx.font = `500 14px ${FONT_STACK}`;
  ctx.textAlign = "left";
  ctx.fillText("Map Vector: github.com/BorntoDev/Thailand-Map-Vector", 54, 1040);
  ctx.textAlign = "start";
}

function drawExportHeader(ctx, count, percent, theme) {
  // QR code removed

  ctx.fillStyle = theme.brandDark;
  ctx.font = `700 28px ${FONT_STACK}`;
  ctx.fillText("Thailand Visited", 54, 68);

  ctx.fillStyle = theme.ink;
  ctx.font = `800 54px ${FONT_STACK}`;
  ctx.fillText(`ไปมาแล้ว ${count} จังหวัด`, 54, 126);

  ctx.fillStyle = theme.muted;
  ctx.font = `700 24px ${FONT_STACK}`;
  ctx.fillText(`คิดเป็น ${percent}% จาก 77 จังหวัด`, 54, 164);
}

function drawExportMap(ctx, theme) {
  const bounds = getBounds(state.features);
  const project = createProjector(bounds);
  const mapBox = { x: 30, y: 170, width: 520, height: 800 };
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
    ctx.lineWidth = 1.8;
    ctx.fill(path);
    ctx.stroke(path);
  });

  ctx.restore();
}

function drawExportHeader916(ctx, count, percent, theme) {
  // QR code removed

  ctx.fillStyle = theme.brandDark;
  ctx.font = `700 32px ${FONT_STACK}`;
  ctx.fillText("Thailand Visited", 64, 82);

  ctx.fillStyle = theme.ink;
  ctx.font = `800 62px ${FONT_STACK}`;
  ctx.fillText(`ไปมาแล้ว ${count} จังหวัด`, 64, 148);

  ctx.fillStyle = theme.muted;
  ctx.font = `700 26px ${FONT_STACK}`;
  ctx.fillText(`คิดเป็น ${percent}% จาก 77 จังหวัด`, 64, 192);
}

function drawExportMap916(ctx, theme) {
  const bounds = getBounds(state.features);
  const project = createProjector(bounds);
  const mapBox = { x: 20, y: 200, width: 1040, height: 1550 };
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
    ctx.lineWidth = 2.0;
    ctx.fill(path);
    ctx.stroke(path);
  });

  ctx.restore();
}

function drawExportLegend916(ctx, theme) {
  const x = 380;
  const y = 1750;
  ctx.font = `800 24px ${FONT_STACK}`;
  drawLegendItem(ctx, x, y, theme.visited, "ไปมาแล้ว", theme);
  drawLegendItem(ctx, x + 180, y, theme.unvisited, "ยังไม่ไป", theme);
}

function drawExportInsights916(ctx, theme) {
  const insights = getTravelInsights();
  const boxX = 54;
  const boxY = 1220;
  const boxW = 972;
  const boxH = 160;

  ctx.fillStyle = theme.paper;
  roundRect(ctx, boxX, boxY, boxW, boxH, 16);
  ctx.fill();
  ctx.strokeStyle = theme.line;
  ctx.lineWidth = 1.4;
  ctx.stroke();

  ctx.fillStyle = theme.brandDark;
  ctx.font = `800 21px ${FONT_STACK}`;
  ctx.fillText("สถิติเชิงลึก (Travel Insights)", boxX + 24, boxY + 34);

  ctx.font = `600 16px ${FONT_STACK}`;
  ctx.fillStyle = theme.muted;
  ctx.fillText("เหนือสุด:", boxX + 24, boxY + 70);
  ctx.fillText("ใต้สุด:", boxX + 260, boxY + 70);
  ctx.fillText("ตะวันออกสุด:", boxX + 500, boxY + 70);
  ctx.fillText("ตะวันตกสุด:", boxX + 750, boxY + 70);

  ctx.fillStyle = theme.ink;
  ctx.font = `700 16px ${FONT_STACK}`;
  ctx.fillText(insights.north, boxX + 96, boxY + 70);
  ctx.fillText(insights.south, boxX + 312, boxY + 70);
  ctx.fillText(insights.east, boxX + 600, boxY + 70);
  ctx.fillText(insights.west, boxX + 834, boxY + 70);

  ctx.strokeStyle = theme.line;
  ctx.beginPath();
  ctx.moveTo(boxX + 24, boxY + 104);
  ctx.lineTo(boxX + boxW - 24, boxY + 104);
  ctx.stroke();

  ctx.fillStyle = theme.muted;
  ctx.font = `600 16px ${FONT_STACK}`;
  ctx.fillText("พื้นที่สะสม:", boxX + 24, boxY + 136);

  ctx.fillStyle = theme.brandDark;
  ctx.font = `800 17px ${FONT_STACK}`;
  ctx.fillText(`${insights.totalArea} กม.² (${insights.areaPercent}% ของประเทศไทย)`, boxX + 116, boxY + 136);
}

function drawExportList916(ctx, visited, theme) {
  const names = visited.map(getThaiName);
  if (!names.length) return;

  const zones = [
    { x: 560, y: 900, w: 220, h: 800 }, // Gulf of Thailand (Left col)
    { x: 800, y: 900, w: 220, h: 800 }, // Gulf of Thailand (Right col)
  ];

  let fontSize = 28;
  let lineHeight = fontSize * 1.5;
  let itemsPerZone = [];

  while (fontSize > 12) {
    lineHeight = fontSize + 12;
    itemsPerZone = zones.map(z => Math.floor(z.h / lineHeight));
    const totalCapacity = itemsPerZone.reduce((a, b) => a + b, 0);
    if (totalCapacity >= names.length) {
      break;
    }
    fontSize -= 2;
  }

  ctx.fillStyle = theme.ink;
  ctx.font = `700 ${fontSize}px ${FONT_STACK}`;

  let nameIndex = 0;
  for (let i = 0; i < zones.length; i++) {
    const zone = zones[i];
    const capacity = itemsPerZone[i];
    for (let r = 0; r < capacity; r++) {
      if (nameIndex >= names.length) break;
      const name = names[nameIndex];
      const textX = zone.x;
      const textY = zone.y + (r * lineHeight) + fontSize;
      
      ctx.fillStyle = theme.visited;
      ctx.fillText("•", textX, textY);
      ctx.fillStyle = theme.ink;
      fitText(ctx, name, textX + 16, textY, zone.w - 20);
      nameIndex++;
    }
  }
}

function drawExportFooter916(ctx, theme) {
  ctx.fillStyle = theme.muted;
  ctx.font = `500 15px ${FONT_STACK}`;
  ctx.textAlign = "left";
  ctx.fillText("Map Vector: github.com/BorntoDev/Thailand-Map-Vector", 64, 1875);
  ctx.textAlign = "right";
  ctx.font = `600 18px ${FONT_STACK}`;
  ctx.fillText("lab.termtem.in.th/maps", 1016, 1875);
  ctx.textAlign = "start";
}

function drawExportLegend(ctx, theme) {
  const x = 60;
  const y = 980;
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
  const boxX = 540;
  const boxY = 830;
  const boxW = 506;
  const boxH = 180;

  ctx.fillStyle = theme.paper;
  roundRect(ctx, boxX, boxY, boxW, boxH, 16);
  ctx.fill();
  ctx.strokeStyle = theme.line;
  ctx.lineWidth = 1.4;
  ctx.stroke();

  ctx.fillStyle = theme.brandDark;
  ctx.font = `800 19px ${FONT_STACK}`;
  ctx.fillText("สถิติเชิงลึก (Travel Insights)", boxX + 20, boxY + 32);

  ctx.font = `600 15px ${FONT_STACK}`;
  ctx.fillStyle = theme.muted;
  ctx.fillText("เหนือสุด:", boxX + 20, boxY + 66);
  ctx.fillText("ใต้สุด:", boxX + 250, boxY + 66);
  ctx.fillText("ตะวันออกสุด:", boxX + 20, boxY + 96);
  ctx.fillText("ตะวันตกสุด:", boxX + 250, boxY + 96);

  ctx.fillStyle = theme.ink;
  ctx.font = `700 15px ${FONT_STACK}`;
  ctx.fillText(insights.north, boxX + 90, boxY + 66);
  ctx.fillText(insights.south, boxX + 302, boxY + 66);
  ctx.fillText(insights.east, boxX + 118, boxY + 96);
  ctx.fillText(insights.west, boxX + 332, boxY + 96);

  ctx.strokeStyle = theme.line;
  ctx.beginPath();
  ctx.moveTo(boxX + 20, boxY + 118);
  ctx.lineTo(boxX + boxW - 20, boxY + 118);
  ctx.stroke();

  ctx.fillStyle = theme.muted;
  ctx.font = `600 15px ${FONT_STACK}`;
  ctx.fillText("พื้นที่สะสม:", boxX + 20, boxY + 152);

  ctx.fillStyle = theme.brandDark;
  ctx.font = `800 16px ${FONT_STACK}`;
  ctx.fillText(`${insights.totalArea} กม.² (${insights.areaPercent}% ของประเทศ)`, boxX + 104, boxY + 152);
}

function drawExportList(ctx, visited, theme) {
  const names = visited.map(getThaiName);
  if (!names.length) return;

  const zones = [
    { x: 560, y: 200, w: 230, h: 800 },
    { x: 810, y: 200, w: 230, h: 800 }
  ];

  let fontSize = 24;
  let lineHeight = fontSize * 1.5;
  let itemsPerZone = [];

  while (fontSize > 10) {
    lineHeight = fontSize + 10;
    itemsPerZone = zones.map(z => Math.floor(z.h / lineHeight));
    const totalCapacity = itemsPerZone.reduce((a, b) => a + b, 0);
    if (totalCapacity >= names.length) {
      break;
    }
    fontSize -= 1;
  }

  ctx.fillStyle = theme.ink;
  ctx.font = `700 ${fontSize}px ${FONT_STACK}`;

  let nameIndex = 0;
  for (let i = 0; i < zones.length; i++) {
    const zone = zones[i];
    const capacity = itemsPerZone[i];
    for (let r = 0; r < capacity; r++) {
      if (nameIndex >= names.length) break;
      const name = names[nameIndex];
      const textX = zone.x;
      const textY = zone.y + (r * lineHeight) + fontSize;
      
      ctx.fillStyle = theme.visited;
      ctx.fillText("•", textX, textY);
      ctx.fillStyle = theme.ink;
      fitText(ctx, name, textX + 16, textY, zone.w - 20);
      nameIndex++;
    }
  }
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

function executeReset() {
  state.visited.clear();
  localStorage.removeItem(STORAGE_KEY);
  updateProvinceStyles();
  renderList();
  updateSummary();
  updateInsights();
  activeProvince.textContent = "เลือกจังหวัดบนแผนที่";
  activeStatus.textContent = "กดที่จังหวัดเพื่อเปลี่ยนสถานะ";
}

resetButton.addEventListener("click", () => {
  if (!state.visited.size) return;
  if (resetModal) {
    resetModal.classList.add("is-open");
    resetModal.setAttribute("aria-hidden", "false");
  } else if (window.confirm("คุณต้องการล้างข้อมูลจังหวัดที่เคยไปทั้งหมดใช่หรือไม่?")) {
    executeReset();
  }
});

if (resetModal) {
  const closeReset = () => {
    resetModal.classList.remove("is-open");
    resetModal.setAttribute("aria-hidden", "true");
  };
  
  if (closeResetModal) closeResetModal.addEventListener("click", closeReset);
  if (cancelResetButton) cancelResetButton.addEventListener("click", closeReset);
  
  resetModal.addEventListener("click", (e) => {
    if (e.target === resetModal) closeReset();
  });
  
  if (confirmResetButton) {
    confirmResetButton.addEventListener("click", () => {
      executeReset();
      closeReset();
    });
  }
}

if (shareButton) shareButton.addEventListener("click", openShareModal);
if (downloadShareImageButton) downloadShareImageButton.addEventListener("click", handleDownloadShareImage);

function handleMapWheel(event) {
  event.preventDefault();
  const zoomFactor = event.deltaY < 0 ? 0.85 : 1.18;
  const rect = map.getBoundingClientRect();
  const mouseX = ((event.clientX - rect.left) / Math.max(rect.width, 1)) * state.mapViewBox.width + state.mapViewBox.x;
  const mouseY = ((event.clientY - rect.top) / Math.max(rect.height, 1)) * state.mapViewBox.height + state.mapViewBox.y;

  const nextWidth = clamp(state.mapViewBox.width * zoomFactor, MAP_WIDTH / 4, MAP_WIDTH);
  const nextHeight = clamp(state.mapViewBox.height * zoomFactor, MAP_HEIGHT / 4, MAP_HEIGHT);

  const ratioX = (mouseX - state.mapViewBox.x) / state.mapViewBox.width;
  const ratioY = (mouseY - state.mapViewBox.y) / state.mapViewBox.height;

  state.mapViewBox = clampViewBox({
    x: mouseX - ratioX * nextWidth,
    y: mouseY - ratioY * nextHeight,
    width: nextWidth,
    height: nextHeight
  });

  applyMapViewBox();
}

zoomInButton.addEventListener("click", () => zoomMap(0.78));
zoomOutButton.addEventListener("click", () => zoomMap(1.28));
zoomResetButton.addEventListener("click", resetMapZoom);

map.addEventListener("pointerdown", startMapPan);
map.addEventListener("pointermove", moveMapPan);
map.addEventListener("pointerup", endMapPan);
map.addEventListener("pointercancel", endMapPan);
map.addEventListener("wheel", handleMapWheel, { passive: false });
map.addEventListener("click", (event) => {
  if (state.suppressNextClick) {
    event.preventDefault();
    event.stopImmediatePropagation();
    state.suppressNextClick = false;
  }
}, true);

// Cookie Consent Logic
const cookieConsent = document.querySelector("#cookieConsent");
const acceptCookieButton = document.querySelector("#acceptCookie");
const COOKIE_STORAGE_KEY = "thailand-visited-cookie-accepted";

if (cookieConsent && acceptCookieButton) {
  const isCookieAccepted = localStorage.getItem(COOKIE_STORAGE_KEY);
  if (!isCookieAccepted) {
    // Show banner after a short delay for smooth entry
    setTimeout(() => {
      cookieConsent.classList.add("is-visible");
      cookieConsent.setAttribute("aria-hidden", "false");
    }, 1000);
  }

  acceptCookieButton.addEventListener("click", () => {
    localStorage.setItem(COOKIE_STORAGE_KEY, "true");
    cookieConsent.classList.remove("is-visible");
    cookieConsent.setAttribute("aria-hidden", "true");
  });
}