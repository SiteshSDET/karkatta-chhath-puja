const STORAGE_KEY = "chhath-puja-2026-members";
const SUPABASE_URL = "https://qxxosdobwekiminhruse.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_QSWu8a0Hity972oLGMcACg_XttGKNCw";
const SHARED_REGISTER_ID = "chhath-puja-2026";
const MEDIA_BUCKET = "karkatta-community";
const BASE_TITLE = "Chhath Puja";
const DEFAULT_HERO_EYEBROW = "A KARKATTA COMMUNITY CELEBRATION";
const DEFAULT_HERO_DESCRIPTION = "Together in devotion. Together in gratitude.\nCelebrating the beauty of Chhath in Karkatta.";
const DEFAULT_HERO_CAPTION = "ARAGHYA · GRATITUDE · TOGETHERNESS";
const ORIGINAL_MEMBERS = [
  ["Sudheep", 501, true, 501],
  ["Anil", 101, true, 101],
  ["Gopi", 200, false, 0],
  ["Ravindra Ravi", 500, true, 500],
  ["Pankaj Vishwakarma", 751, true, 751],
  ["Chova", 200, false, 0],
  ["Ravi", 100, false, 0],
  ["Randhir", 200, false, 0],
  ["Atul", 100, true, 100],
  ["Abhishek", 100, true, 100],
  ["Sudhir", 100, false, 0],
  ["Raju Ranjan", 200, false, 0],
  ["Munilal", 200, false, 0],
  ["Dilip", 200, false, 0],
  ["Rajesh", 100, false, 0],
  ["Vishnu", 100, false, 0],
  ["Shankar (KRT)", 201, true, 201],
  ["Rakesh (KRT)", 100, false, 0],
  ["Harendra (KRT)", 251, true, 251],
  ["Bramha", 200, false, 0],
  ["Vicky", 100, false, 0],
  ["Karan", 100, false, 0],
  ["Kundan", 100, false, 0],
  ["Raushan", 100, false, 0],
  ["Laddu", 100, false, 0],
  ["Nirahua", 100, false, 0],
  ["Roushan", 100, false, 0],
  ["Navin Vishwakarma", 200, false, 0],
  ["Navin Choudhary", 100, false, 0],
  ["Nandlal", 100, true, 100],
  ["Subham", 100, false, 0],
  ["Rahul", 100, false, 0],
  ["Sateshwar PS", 300, true, 300],
  ["Firoz", 301, true, 301],
  ["Natraj", 200, false, 0],
  ["Koril (Surendra)", 200, false, 0],
  ["Chhottu", 200, false, 0],
  ["Kundali", 200, false, 0],
  ["Govinda", 200, false, 0],
  ["Sanjiv", 100, false, 0],
  ["Piyush", 100, false, 0],
  ["Nirahu Brajesh", 100, false, 0],
  ["Loha", 200, false, 0],
  ["Pankaj + Golu", 200, false, 0],
  ["Nitesh Vishwakarma", 100, false, 0],
  ["Pnkaj Mehta (Bunnu)", 100, false, 0],
  ["Mukesh Mehta", 200, false, 0],
  ["Mukesh Mehta (DHR)", 100, false, 0],
  ["Awadhesh Ch", 100, false, 0],
  ["Vishal", 100, false, 0],
  ["Sitesh", 201, true, 201],
  ["Sushil", 200, false, 0],
].map(([name, amount, paid, received], index) => ({
  id: `member-${index + 1}`,
  name,
  amount,
  paid,
  received,
}));

const membersTrigger = document.querySelector("#members-trigger");
const memberSearch = document.querySelector("#member-search");
const publicMemberRows = document.querySelector("#public-member-rows");
const memberCards = document.querySelector("#member-cards");
const editorDialog = document.querySelector("#member-editor");
const editorRows = document.querySelector("#editor-rows");
const editorStatus = document.querySelector("#editor-status");
const loginForm = document.querySelector("#admin-login");
const loginStatus = document.querySelector("#login-status");
const editorContent = document.querySelector("#editor-content");
const closeLoginButton = document.querySelector("#close-login");
const eventYearInput = document.querySelector("#event-year");
const eventTitleInput = document.querySelector("#event-title");
const heroEyebrowInput = document.querySelector("#hero-eyebrow-input");
const heroDescriptionInput = document.querySelector("#hero-description-input");
const heroCaptionInput = document.querySelector("#hero-caption-input");
const heroPhotoInput = document.querySelector("#hero-photo-input");
const chooseHeroPhotoButton = document.querySelector("#choose-hero-photo");
const removeHeroPhotoButton = document.querySelector("#remove-hero-photo");
const addMemberButton = document.querySelector("#add-member");
const saveMembersButton = document.querySelector("#save-members");
const saveEventSettingsButton = document.querySelector("#save-event-settings");
const dropZone = document.querySelector("#drop-zone");
const mediaInput = document.querySelector("#media-input");
const chooseMediaButton = document.querySelector("#choose-media");
const memberPhotoSelect = document.querySelector("#member-photo-select");
const memberPhotoInput = document.querySelector("#member-photo-input");
const chooseMemberPhotoButton = document.querySelector("#choose-member-photo");
const memberPhotoStatus = document.querySelector("#member-photo-status");
const mediaCaptionInput = document.querySelector("#media-caption-input");
const managerSignoutButton = document.querySelector("#manager-signout");
const numberFormat = new Intl.NumberFormat("en-IN");
const BASE_YEAR = 2026;
const loadedRegister = loadRegister();
let members = loadedRegister.members;
let eventYear = loadedRegister.year;
let eventTitle = loadedRegister.title;
let heroEyebrow = loadedRegister.heroEyebrow;
let heroDescription = loadedRegister.heroDescription;
let heroCaption = loadedRegister.heroCaption;
let heroImagePath = loadedRegister.heroImagePath;
let galleryMedia = loadedRegister.galleryMedia;
let editingMembers = [];
let authSession = null;
let mediaAuthorized = false;
let supportsSharedEventTitle = true;
let supportsSharedSiteSettings = true;

function isValidYear(value) {
  return Number.isInteger(value) && value >= 1 && value <= 9999;
}

function isValidMembers(value) {
  return Array.isArray(value) && value.every((member) =>
    member &&
    typeof member.id === "string" &&
    typeof member.name === "string" &&
    Number.isFinite(member.amount) &&
    member.amount >= 0 &&
    typeof member.paid === "boolean" &&
    Number.isFinite(member.received) &&
    member.received >= 0 &&
    (member.photo_path === undefined || member.photo_path === null || typeof member.photo_path === "string")
  );
}

function validGalleryMedia(value) {
  return Array.isArray(value) && value.every((item) =>
    item &&
    typeof item.id === "string" &&
    typeof item.name === "string" &&
    typeof item.path === "string" &&
    typeof item.type === "string" &&
    (item.caption === undefined || typeof item.caption === "string") &&
    (item.type.startsWith("image/") || item.type.startsWith("video/"))
  );
}

function loadRegister() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === null) {
      return {
        members: ORIGINAL_MEMBERS.map((member) => ({ ...member })),
        year: BASE_YEAR,
        title: BASE_TITLE,
        heroEyebrow: DEFAULT_HERO_EYEBROW,
        heroDescription: DEFAULT_HERO_DESCRIPTION,
        heroCaption: DEFAULT_HERO_CAPTION,
        heroImagePath: null,
        galleryMedia: [],
      };
    }
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed)) {
      if (!isValidMembers(parsed)) throw new Error("Saved register has an invalid format.");
      return {
        members: parsed,
        year: BASE_YEAR,
        title: BASE_TITLE,
        heroEyebrow: DEFAULT_HERO_EYEBROW,
        heroDescription: DEFAULT_HERO_DESCRIPTION,
        heroCaption: DEFAULT_HERO_CAPTION,
        heroImagePath: null,
        galleryMedia: [],
      };
    }
    if (!parsed || !isValidMembers(parsed.members) || !isValidYear(parsed.year)) {
      throw new Error("Saved register has an invalid format.");
    }
    return {
      ...parsed,
      title: typeof parsed.title === "string" && parsed.title.trim() ? parsed.title : BASE_TITLE,
      heroEyebrow: typeof parsed.heroEyebrow === "string" ? parsed.heroEyebrow : DEFAULT_HERO_EYEBROW,
      heroDescription: typeof parsed.heroDescription === "string" ? parsed.heroDescription : DEFAULT_HERO_DESCRIPTION,
      heroCaption: typeof parsed.heroCaption === "string" ? parsed.heroCaption : DEFAULT_HERO_CAPTION,
      heroImagePath: typeof parsed.heroImagePath === "string" ? parsed.heroImagePath : null,
      galleryMedia: validGalleryMedia(parsed.galleryMedia) ? parsed.galleryMedia : [],
    };
  } catch (error) {
    setSaveStatus("Could not load saved edits; showing the original register.", true);
    return {
      members: ORIGINAL_MEMBERS.map((member) => ({ ...member })),
      year: BASE_YEAR,
      title: BASE_TITLE,
      heroEyebrow: DEFAULT_HERO_EYEBROW,
      heroDescription: DEFAULT_HERO_DESCRIPTION,
      heroCaption: DEFAULT_HERO_CAPTION,
      heroImagePath: null,
      galleryMedia: [],
    };
  }
}

function setSaveStatus(message, isError = false) {
  if (!editorContent.hidden) {
    editorStatus.textContent = message;
    editorStatus.classList.toggle("is-error", isError);
  }
}

function saveLocalRegister(value, year, title) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      members: value,
      year,
      title,
      heroEyebrow,
      heroDescription,
      heroCaption,
      heroImagePath,
      galleryMedia,
    }));
    return true;
  } catch (error) {
    return false;
  }
}

async function getApiResult(response) {
  const body = await response.text();
  let result = {};
  if (body) {
    try {
      result = JSON.parse(body);
    } catch {
      result = { message: body };
    }
  }
  if (!response.ok) {
    const message = result.message || result.msg || result.error_description;
    if (message?.toLowerCase().includes("invalid api key")) {
      throw new Error("Supabase rejected the configured publishable key. Copy the Publishable key from Settings → API Keys in the same project as the configured Supabase URL, then replace SUPABASE_PUBLISHABLE_KEY in app.js.");
    }
    throw new Error(message || `Supabase request failed (${response.status}).`);
  }
  return result;
}

function storageObjectUrl(path) {
  const encodedPath = path.split("/").map(encodeURIComponent).join("/");
  return `${SUPABASE_URL}/storage/v1/object/public/${MEDIA_BUCKET}/${encodedPath}`;
}

function storageObjectEndpoint(path) {
  const encodedPath = path.split("/").map(encodeURIComponent).join("/");
  return `${SUPABASE_URL}/storage/v1/object/${MEDIA_BUCKET}/${encodedPath}`;
}

function storageHeaders(contentType = "application/json") {
  if (!authSession || authSession.expires_at <= Date.now() / 1000) {
    authSession = null;
    throw new Error("Admin session expired. Sign in again before managing media.");
  }
  return {
    apikey: SUPABASE_PUBLISHABLE_KEY,
    Authorization: `Bearer ${authSession.access_token}`,
    "Content-Type": contentType,
  };
}

function safeFileName(name) {
  return name.normalize("NFKD").replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "").slice(-100) || "upload";
}

function uniqueStoragePath(folder, file) {
  const uniqueId = globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return `${folder}/${uniqueId}-${safeFileName(file.name)}`;
}

async function uploadStorageFile(file, path, onProgress = () => {}) {
  const headers = storageHeaders();
  if (file.size <= 6 * 1024 * 1024) {
    const response = await fetch(storageObjectEndpoint(path), {
      method: "POST",
      cache: "no-store",
      headers: {
        ...headers,
        "Content-Type": file.type,
        "x-upsert": "false",
      },
      body: file,
    });
    onProgress(file.size, file.size);
    return getApiResult(response);
  }

  const encodeMetadata = (value) => btoa(value);
  const metadata = {
    bucketName: MEDIA_BUCKET,
    objectName: path,
    contentType: file.type,
    cacheControl: "3600",
  };
  const createResponse = await fetch(`${SUPABASE_URL}/storage/v1/upload/resumable`, {
    method: "POST",
    cache: "no-store",
    headers: {
      ...headers,
      "Tus-Resumable": "1.0.0",
      "Upload-Length": String(file.size),
      "Upload-Metadata": Object.entries(metadata)
        .map(([key, value]) => `${key} ${encodeMetadata(value)}`)
        .join(","),
      "x-upsert": "false",
    },
  });
  await getApiResult(createResponse);
  const uploadUrl = createResponse.headers.get("Location");
  if (!uploadUrl) throw new Error("Supabase did not return a resumable upload URL.");

  let offset = 0;
  const chunkSize = 6 * 1024 * 1024;
  while (offset < file.size) {
    const end = Math.min(offset + chunkSize, file.size);
    const response = await fetch(new URL(uploadUrl, `${SUPABASE_URL}/`).href, {
      method: "PATCH",
      cache: "no-store",
      headers: {
        ...headers,
        "Content-Type": "application/offset+octet-stream",
        "Tus-Resumable": "1.0.0",
        "Upload-Offset": String(offset),
      },
      body: file.slice(offset, end),
    });
    await getApiResult(response);
    const reportedOffset = Number(response.headers.get("Upload-Offset"));
    offset = Number.isFinite(reportedOffset) && reportedOffset > offset ? reportedOffset : end;
    onProgress(offset, file.size);
  }
}

async function deleteStorageFile(path) {
  if (!path) return;
  const response = await fetch(`${SUPABASE_URL}/storage/v1/object/${MEDIA_BUCKET}`, {
    method: "DELETE",
    cache: "no-store",
    headers: storageHeaders(),
    body: JSON.stringify({ prefixes: [path] }),
  });
  await getApiResult(response);
}

async function loadSharedRegister(useLegacySchema = false) {
  const legacyOnly = useLegacySchema === "legacy";
  const select = legacyOnly
    ? "members,event_year"
    : useLegacySchema
      ? "members,event_year,event_title"
      : "members,event_year,event_title,hero_eyebrow,hero_description,hero_caption,hero_image_path,gallery_media";
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/shared_register?id=eq.${encodeURIComponent(SHARED_REGISTER_ID)}&select=${select}`,
      {
        cache: "no-store",
        headers: {
          apikey: SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
        },
      }
    );
    const rows = await getApiResult(response);
    if (!Array.isArray(rows) || rows.length > 1) {
      throw new Error("The shared register response is invalid.");
    }
    if (rows.length === 0) {
      setSaveStatus("No shared register saved yet. Sign in as admin to initialize it.");
      return true;
    }
    const register = rows[0];
    if (!isValidMembers(register.members) || !isValidYear(register.event_year)) {
      throw new Error("The shared register data is invalid.");
    }
    if (!legacyOnly && (typeof register.event_title !== "string" || !register.event_title.trim())) {
      throw new Error("The shared event title is invalid.");
    }
    if (!useLegacySchema && (
      typeof register.hero_eyebrow !== "string" ||
      typeof register.hero_description !== "string" ||
      typeof register.hero_caption !== "string" ||
      (register.hero_image_path !== null && typeof register.hero_image_path !== "string") ||
      !validGalleryMedia(register.gallery_media)
    )) {
      throw new Error("The shared site settings are invalid. Run the updated Supabase setup SQL.");
    }
    members = register.members;
    eventYear = register.event_year;
    eventTitle = legacyOnly ? BASE_TITLE : register.event_title;
    supportsSharedEventTitle = !legacyOnly;
    supportsSharedSiteSettings = !useLegacySchema;
    heroEyebrow = useLegacySchema ? DEFAULT_HERO_EYEBROW : register.hero_eyebrow;
    heroDescription = useLegacySchema ? DEFAULT_HERO_DESCRIPTION : register.hero_description;
    heroCaption = useLegacySchema ? DEFAULT_HERO_CAPTION : register.hero_caption;
    heroImagePath = useLegacySchema ? null : register.hero_image_path;
    galleryMedia = useLegacySchema ? [] : register.gallery_media;
    saveLocalRegister(members, eventYear, eventTitle);
    applyEventSettings();
    renderPublicRegister();
    populateMemberPhotoSelect();
    renderGalleryMedia();
    renderEditor();
    setSaveStatus("Shared register loaded");
    return true;
  } catch (error) {
    if (!useLegacySchema && !legacyOnly && /hero_eyebrow|hero_description|hero_caption|hero_image_path|gallery_media/i.test(error.message || "")) {
      supportsSharedSiteSettings = false;
      return loadSharedRegister(true);
    }
    if (useLegacySchema !== "legacy" && /event_title/i.test(error.message || "")) {
      supportsSharedEventTitle = false;
      return loadSharedRegister("legacy");
    }
    setSaveStatus(`Shared register unavailable: ${error.message}`, true);
    return false;
  }
}

async function saveSharedRegister(
  value,
  year,
  title,
  includeTitle = supportsSharedEventTitle,
  includeSiteSettings = supportsSharedSiteSettings,
  requireSiteSettings = false
) {
  if (!authSession || authSession.expires_at <= Date.now() / 1000) {
    authSession = null;
    throw new Error("Admin session expired. Close this window and sign in again.");
  }
  if (!includeTitle && title !== eventTitle) {
    throw new Error("Run the updated supabase-setup.sql to enable shared title editing.");
  }
  const response = await fetch(`${SUPABASE_URL}/rest/v1/shared_register?on_conflict=id`, {
    method: "POST",
    cache: "no-store",
    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY,
      Authorization: `Bearer ${authSession.access_token}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify({
      id: SHARED_REGISTER_ID,
      members: value,
      event_year: year,
      ...(includeTitle ? { event_title: title } : {}),
      ...(includeSiteSettings ? {
        hero_eyebrow: heroEyebrow,
        hero_description: heroDescription,
        hero_caption: heroCaption,
        hero_image_path: heroImagePath,
        gallery_media: galleryMedia,
      } : {}),
    }),
  });
  try {
    await getApiResult(response);
  } catch (error) {
    if (includeTitle && error.message?.toLowerCase().includes("event_title")) {
      supportsSharedEventTitle = false;
      if (title !== eventTitle) {
        throw new Error("Run the updated supabase-setup.sql to enable shared title editing.");
      }
      return saveSharedRegister(value, year, title, false, includeSiteSettings, requireSiteSettings);
    }
    if (includeSiteSettings && /hero_eyebrow|hero_description|hero_caption|hero_image_path|gallery_media/i.test(error.message || "")) {
      supportsSharedSiteSettings = false;
      if (requireSiteSettings) {
        throw new Error("Run the updated supabase-setup.sql to enable shared banner and gallery management.");
      }
      return saveSharedRegister(value, year, title, includeTitle, false, false);
    }
    throw error;
  }
}

function createInput(member, field, type, className) {
  const input = document.createElement("input");
  input.className = `member-input ${className}`;
  input.dataset.field = field;
  input.dataset.memberId = member.id;
  input.setAttribute("aria-label", field === "name" ? "Member name" : field === "amount" ? "Pledged amount in rupees" : "Received amount in rupees");
  input.type = type;
  if (type === "number") {
    input.min = "0";
    input.step = "any";
    input.inputMode = "decimal";
    input.value = String(member[field]);
    input.required = true;
  } else {
    input.value = member[field];
  }
  return input;
}

function renderEditor() {
  const fragment = document.createDocumentFragment();
  const filter = memberSearch.value.trim().toLocaleLowerCase();
  editingMembers.forEach((member, index) => {
    if (!member.name.toLocaleLowerCase().includes(filter)) return;
    const row = document.createElement("tr");
    const indexCell = document.createElement("td");
    indexCell.dataset.label = "No.";
    indexCell.textContent = String(index + 1);
    row.append(indexCell);

    const nameCell = document.createElement("td");
    nameCell.dataset.label = "Member";
    nameCell.append(createInput(member, "name", "text", "name-input"));
    row.append(nameCell);

    const amountCell = document.createElement("td");
    amountCell.dataset.label = "Pledged (₹)";
    amountCell.append(createInput(member, "amount", "number", "amount-input"));
    row.append(amountCell);

    const paidCell = document.createElement("td");
    paidCell.dataset.label = "Paid";
    paidCell.className = "paid-cell";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "paid-checkbox";
    checkbox.checked = member.paid;
    checkbox.dataset.field = "paid";
    checkbox.dataset.memberId = member.id;
    checkbox.setAttribute("aria-label", `Mark ${member.name} as paid`);
    paidCell.append(checkbox);
    row.append(paidCell);

    const receivedCell = document.createElement("td");
    receivedCell.dataset.label = "Received (₹)";
    receivedCell.append(createInput(member, "received", "number", "amount-input"));
    row.append(receivedCell);

    const removeCell = document.createElement("td");
    removeCell.className = "remove-cell";
    removeCell.dataset.label = "Remove";
    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "remove-row";
    removeButton.dataset.removeId = member.id;
    removeButton.setAttribute("aria-label", `Remove ${member.name}`);
    removeButton.textContent = "×";
    removeCell.append(removeButton);
    row.append(removeCell);
    fragment.append(row);
  });
  editorRows.replaceChildren(fragment);
  renderEditorTotals();
  updateRegisterSummary();
}

function renderPublicRegister(data = members, year = eventYear, title = eventTitle) {
  const fragment = document.createDocumentFragment();
  const pledged = data.reduce((total, member) => total + member.amount, 0);
  const received = data.reduce((total, member) => total + member.received, 0);
  data.forEach((member, index) => {
    const row = document.createElement("tr");
    const values = [
      String(index + 1),
      member.name,
      numberFormat.format(member.amount),
      member.paid ? "Paid" : "Pending",
      numberFormat.format(member.received),
    ];
    const labels = ["No.", "Member", "Pledged (₹)", "Paid", "Received (₹)"];
    values.forEach((value, cellIndex) => {
      const cell = document.createElement("td");
      cell.dataset.label = labels[cellIndex];
      cell.textContent = value;
      if (cellIndex === 3) cell.className = member.paid ? "paid-state is-paid" : "paid-state";
      row.append(cell);
    });
    fragment.append(row);
  });
  publicMemberRows.replaceChildren(fragment);
  document.querySelector("#public-register-title").textContent = `${title} members register · ${year}`;
  document.querySelector("#public-member-total").textContent = numberFormat.format(data.length);
  document.querySelector("#public-pledged-total").textContent = `₹${numberFormat.format(pledged)}`;
  document.querySelector("#public-received-total").textContent = `₹${numberFormat.format(received)}`;
  document.querySelector("#public-carry-forward-label").textContent = `${year - 1} carry-forward`;
  document.querySelector("#public-carry-forward-note").textContent = `not included in ${year} totals`;
  document.querySelector("#public-table-pledged").textContent = `₹${numberFormat.format(pledged)}`;
  document.querySelector("#public-table-received").textContent = `₹${numberFormat.format(received)}`;
  renderMemberCards(data);
}

function memberInitials(name) {
  return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0] || "").join("").toLocaleUpperCase() || "?";
}

function renderMemberCards(data = members) {
  const fragment = document.createDocumentFragment();
  data.forEach((member, index) => {
    const card = document.createElement("article");
    card.className = "member-card";
    const frame = document.createElement("div");
    frame.className = "member-photo-frame";
    frame.style.background = `linear-gradient(145deg, ${["#f2d9b8, #c67d50 55%, #773c3d", "#e7d6b7, #a77753 55%, #513847", "#f0d7b0, #b45c4d 55%, #65394b", "#e8d6c3, #bd8c53 55%, #4b5360"][index % 4]})`;
    const photoUrl = member.photo_path ? storageObjectUrl(member.photo_path) : null;
    if (photoUrl) {
      const photo = document.createElement("img");
      photo.src = photoUrl;
      photo.alt = `${member.name || "Member"} photo`;
      frame.append(photo);
    } else {
      const initials = document.createElement("span");
      initials.className = "member-initials";
      initials.textContent = memberInitials(member.name);
      frame.append(initials);
      const mark = document.createElement("span");
      mark.className = "member-photo-mark";
      mark.setAttribute("aria-hidden", "true");
      mark.textContent = "+";
      frame.append(mark);
    }
    const copy = document.createElement("div");
    copy.className = "member-card-copy";
    const number = document.createElement("small");
    number.textContent = `MEMBER PHOTO ${String(index + 1).padStart(2, "0")}`;
    const name = document.createElement("strong");
    name.textContent = member.name || "New member";
    copy.append(number, name);
    card.append(frame, copy);
    fragment.append(card);
  });
  memberCards.replaceChildren(fragment);
}

function populateMemberPhotoSelect() {
  const selectedMemberId = memberPhotoSelect.value;
  const options = members.map((member, index) => {
    const option = document.createElement("option");
    option.value = member.id;
    option.textContent = `${String(index + 1).padStart(2, "0")} · ${member.name || "New member"}`;
    return option;
  });
  memberPhotoSelect.replaceChildren(...options);
  if (members.some((member) => member.id === selectedMemberId)) {
    memberPhotoSelect.value = selectedMemberId;
  }
  renderManagerMemberPhotos();
  updateSelectedMemberPhotoControls();
}

function renderManagerMemberPhotos() {
  const list = document.querySelector("#manager-member-photo-list");
  const fragment = document.createDocumentFragment();
  members.forEach((member) => {
    const item = document.createElement("div");
    item.className = "manager-member-photo-item";
    const url = member.photo_path ? storageObjectUrl(member.photo_path) : null;
    const thumb = document.createElement("div");
    thumb.className = "manager-member-photo-thumb";
    if (url) {
      const image = document.createElement("img");
      image.src = url;
      image.alt = "";
      thumb.append(image);
      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "manager-photo-delete";
      remove.textContent = "×";
      remove.disabled = !mediaAuthorized;
      remove.setAttribute("aria-label", `Delete photo for ${member.name}`);
      remove.addEventListener("click", () => removeMemberPhoto(member));
      thumb.append(remove);
    } else {
      const placeholder = document.createElement("span");
      placeholder.className = "manager-member-photo-placeholder";
      placeholder.textContent = memberInitials(member.name);
      thumb.append(placeholder);
    }
    item.append(thumb);
    const name = document.createElement("strong");
    name.textContent = member.name || "New member";
    item.append(name);
    fragment.append(item);
  });
  list.replaceChildren(fragment);
}

function updateSelectedMemberPhotoControls() {
  const member = members.find((item) => item.id === memberPhotoSelect.value);
  const hasPhoto = Boolean(member?.photo_path);
  const signedIn = mediaAuthorized && authSession && authSession.expires_at > Date.now() / 1000;
  chooseMemberPhotoButton.disabled = !signedIn || !member;
  chooseMemberPhotoButton.textContent = hasPhoto ? "Replace member photo" : "Add member photo";
}

async function removeMemberPhoto(member) {
  if (!member?.photo_path || !mediaAuthorized) return;
  const photoPath = member.photo_path;
  const updatedMembers = members.map((item) => {
    if (item.id !== member.id) return { ...item };
    const updated = { ...item };
    delete updated.photo_path;
    return updated;
  });
  memberPhotoStatus.textContent = `Deleting ${member.name}'s photo…`;
  memberPhotoStatus.classList.remove("is-error");
  try {
    await saveSharedRegister(updatedMembers, eventYear, eventTitle);
    members = updatedMembers;
    editingMembers = editingMembers.map((item) => {
      if (item.id !== member.id) return item;
      const updated = { ...item };
      delete updated.photo_path;
      return updated;
    });
    saveLocalRegister(members, eventYear, eventTitle);
    renderMemberCards();
    renderManagerMemberPhotos();
    updateSelectedMemberPhotoControls();
  } catch (error) {
    memberPhotoStatus.textContent = error.message || "Unable to delete the member photo.";
    memberPhotoStatus.classList.add("is-error");
    updateSelectedMemberPhotoControls();
    return;
  }
  try {
    await deleteStorageFile(photoPath);
    memberPhotoStatus.textContent = `Photo deleted for ${member.name}.`;
  } catch (error) {
    memberPhotoStatus.textContent = `Photo removed from the page, but the stored file could not be deleted: ${error.message}`;
    memberPhotoStatus.classList.add("is-error");
  }
}

function updateRegisterSummary() {
  const pledged = editingMembers.reduce((total, member) => total + member.amount, 0);
  const received = editingMembers.reduce((total, member) => total + member.received, 0);
  document.querySelector("#member-total").textContent = numberFormat.format(editingMembers.length);
  document.querySelector("#pledged-total").textContent = `₹${numberFormat.format(pledged)}`;
  document.querySelector("#received-total").textContent = `₹${numberFormat.format(received)}`;
}

function applyEventSettings() {
  document.querySelector("#page-title").textContent = `${eventTitle} ${eventYear} · Karkatta`;
  document.querySelector('meta[name="description"]').content = `The Karkatta ${eventTitle} ${eventYear} community page, photo gallery and member contribution register.`;
  document.querySelector(".brand").setAttribute("aria-label", `${eventTitle} Karkatta home`);
  document.querySelector("#brand-event-title").textContent = eventTitle;
  document.querySelector("#brand-event-year").textContent = `KARKATTA · ${eventYear}`;
  document.querySelector("#hero-eyebrow").textContent = heroEyebrow;
  document.querySelector("#hero-description").textContent = heroDescription;
  document.querySelector("#hero-caption").textContent = heroCaption;
  document.querySelector("#hero-event-title").textContent = eventTitle;
  document.querySelector("#hero-year").textContent = String(eventYear);
  document.querySelector("#hero-event-label").textContent = eventTitle;
  document.querySelector("#hero-event-year").textContent = String(eventYear);
  document.querySelector("#register-panel-title").textContent = `${eventTitle} members register · ${eventYear}`;
  document.querySelector("#carry-forward-label").textContent = `${eventYear - 1} carry-forward`;
  document.querySelector("#carry-forward-note").textContent = `not included in ${eventYear} totals`;
  document.querySelector(".register-footnote").textContent = `Source: attached ${eventTitle} ${eventYear} register. The ${eventYear - 1} fund balance is shown separately.`;
  document.querySelector("#footer-event-year").textContent = `${eventTitle.toUpperCase()} · ${eventYear}`;
  eventTitleInput.value = eventTitle;
  eventYearInput.value = String(eventYear);
  heroEyebrowInput.value = heroEyebrow;
  heroDescriptionInput.value = heroDescription;
  heroCaptionInput.value = heroCaption;
  const heroImage = document.querySelector("#hero-background-image");
  heroImage.hidden = !heroImagePath;
  if (heroImagePath) heroImage.src = storageObjectUrl(heroImagePath);
  else heroImage.removeAttribute("src");
  removeHeroPhotoButton.disabled = !heroImagePath || !mediaAuthorized;
}

function openEditor() {
  const signedIn = authSession && authSession.expires_at > Date.now() / 1000;
  mediaAuthorized = Boolean(signedIn);
  mediaInput.disabled = !mediaAuthorized;
  chooseMediaButton.disabled = !mediaAuthorized;
  memberPhotoInput.disabled = !mediaAuthorized;
  chooseMemberPhotoButton.disabled = !mediaAuthorized;
  heroPhotoInput.disabled = !mediaAuthorized;
  chooseHeroPhotoButton.disabled = !mediaAuthorized;
  removeHeroPhotoButton.disabled = !mediaAuthorized || !heroImagePath;
  updateSelectedMemberPhotoControls();
  loginForm.hidden = Boolean(signedIn);
  editorContent.hidden = !signedIn;
  loginStatus.textContent = "";
  if (signedIn) prepareEditor();
  editorDialog.showModal();
  requestAnimationFrame(fitManagerDialogToViewport);
}

function fitManagerDialogToViewport() {
  if (!editorDialog.open || window.matchMedia("(min-width: 701px)").matches) return;
  const viewport = window.visualViewport;
  if (!viewport) return;
  const top = Math.max(8, viewport.offsetTop + 8);
  const bottom = Math.max(8, window.innerHeight - viewport.offsetTop - viewport.height + 8);
  editorDialog.style.top = `${top}px`;
  editorDialog.style.bottom = `${bottom}px`;
}

window.visualViewport?.addEventListener("resize", fitManagerDialogToViewport);
window.visualViewport?.addEventListener("scroll", fitManagerDialogToViewport);
editorDialog.addEventListener("close", () => {
  editorDialog.style.removeProperty("top");
  editorDialog.style.removeProperty("bottom");
});
loginForm.querySelectorAll("input").forEach((input) => {
  input.addEventListener("focus", () => {
    window.setTimeout(() => input.scrollIntoView({ block: "nearest", behavior: "smooth" }), 150);
  });
});

function prepareEditor() {
  editingMembers = members.map((member) => ({ ...member }));
  applyEventSettings();
  renderEditor();
  editorStatus.textContent = "Changes are not saved until you select Save.";
  editorStatus.classList.remove("is-error");
  editorContent.hidden = false;
  loginForm.hidden = true;
}

membersTrigger.addEventListener("click", () => {
  openEditor();
});

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const submitButton = loginForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  loginStatus.textContent = "Signing in…";
  loginStatus.classList.remove("is-error");
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 30_000);
  try {
    const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
      method: "POST",
      cache: "no-store",
      signal: controller.signal,
      headers: {
        apikey: SUPABASE_PUBLISHABLE_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: document.querySelector("#admin-email").value.trim(),
        password: document.querySelector("#admin-password").value,
      }),
    });
    window.clearTimeout(timeout);
    const responseText = await response.text();
    let result;
    try {
      result = JSON.parse(responseText);
    } catch {
      throw new Error("Supabase returned an unreadable sign-in response. Check the project URL and publishable key.");
    }
    if (!response.ok) {
      const message = result.msg || result.message || result.error_description || result.error || "Sign-in failed.";
      if (message.toLowerCase().includes("invalid api key")) {
        throw new Error("Supabase rejected the configured publishable key. Copy the Publishable key from Settings → API Keys in the same project as the configured Supabase URL, then replace SUPABASE_PUBLISHABLE_KEY in app.js.");
      }
      throw new Error(message);
    }
    if (result.user?.app_metadata?.register_admin !== true) {
      throw new Error("This account is not authorized for Manager. In Supabase, set app_metadata.register_admin to true for this user, then sign out and sign in again.");
    }
    authSession = {
      access_token: result.access_token,
      expires_at: result.expires_at || Math.floor(Date.now() / 1000) + result.expires_in,
    };
    mediaAuthorized = true;
    mediaInput.disabled = false;
    chooseMediaButton.disabled = false;
    memberPhotoInput.disabled = false;
    chooseMemberPhotoButton.disabled = false;
    updateSelectedMemberPhotoControls();
    heroPhotoInput.disabled = false;
    chooseHeroPhotoButton.disabled = false;
    removeHeroPhotoButton.disabled = !heroImagePath;
    updateSelectedMemberPhotoControls();
    const loaded = await loadSharedRegister();
    prepareEditor();
    if (!loaded) {
      editorStatus.textContent = "Signed in, but the shared register could not be loaded. Check Supabase table setup and permissions before saving.";
      editorStatus.classList.add("is-error");
    }
    loginForm.reset();
    loginStatus.textContent = "";
  } catch (error) {
    loginStatus.textContent = error.name === "AbortError"
      ? "Sign-in timed out. Check your mobile connection and try again."
      : error.message || "Unable to sign in.";
    loginStatus.classList.add("is-error");
  } finally {
    window.clearTimeout(timeout);
    submitButton.disabled = false;
  }
});

editorRows.addEventListener("input", (event) => {
  const target = event.target;
  const member = editingMembers.find((item) => item.id === target.dataset.memberId);
  if (!member || !target.dataset.field) return;
  const field = target.dataset.field;
  if (field === "name") {
    member.name = target.value;
  } else {
    editorStatus.textContent = "Unsaved changes";
    editorStatus.classList.remove("is-error");
    if (target.validity.badInput || !target.validity.valid) {
      return;
    }
    const value = Number(target.value);
    if (!Number.isFinite(value) || value < 0) {
      return;
    }
    member[field] = value;
  }
  editorStatus.textContent = "Unsaved changes";
  editorStatus.classList.remove("is-error");
  renderEditorTotals();
  updateRegisterSummary();
});

function renderEditorTotals() {
  const pledged = editingMembers.reduce((total, member) => total + member.amount, 0);
  const received = editingMembers.reduce((total, member) => total + member.received, 0);
  document.querySelector("#editor-pledged").textContent = `₹${numberFormat.format(pledged)}`;
  document.querySelector("#editor-received").textContent = `₹${numberFormat.format(received)}`;
}

editorRows.addEventListener("change", (event) => {
  const target = event.target;
  if (target.type !== "checkbox") return;
  const member = editingMembers.find((item) => item.id === target.dataset.memberId);
  if (!member) return;
  member.paid = target.checked;
  editorStatus.textContent = "Unsaved changes";
  editorStatus.classList.remove("is-error");
});

editorRows.addEventListener("click", (event) => {
  const button = event.target.closest("[data-remove-id]");
  if (!button) return;
  editingMembers = editingMembers.filter((member) => member.id !== button.dataset.removeId);
  renderEditor();
  editorStatus.textContent = "Unsaved changes";
});

memberSearch.addEventListener("input", renderEditor);

addMemberButton.addEventListener("click", () => {
  memberSearch.value = "";
  const id = `member-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  editingMembers.push({ id, name: "", amount: 0, paid: false, received: 0 });
  renderEditor();
  editorStatus.textContent = "Unsaved changes";
  const nameInput = editorRows.querySelector(`input[data-member-id="${CSS.escape(id)}"][data-field="name"]`);
  nameInput?.focus();
});

saveMembersButton.addEventListener("click", async () => {
  const invalidInput = editorRows.querySelector(":invalid");
  if (invalidInput) {
    invalidInput.reportValidity();
    editorStatus.textContent = "Correct the highlighted member details before saving.";
    editorStatus.classList.add("is-error");
    return;
  }
  saveMembersButton.disabled = true;
  editorStatus.textContent = "Saving shared register…";
  try {
    await saveSharedRegister(editingMembers, eventYear, eventTitle);
  } catch (error) {
    editorStatus.textContent = error.message || "Unable to save the shared register.";
    editorStatus.classList.add("is-error");
    return;
  } finally {
    saveMembersButton.disabled = false;
  }
  saveLocalRegister(editingMembers, eventYear, eventTitle);
  members = editingMembers.map((member) => ({ ...member }));
  applyEventSettings();
  renderEditor();
  renderPublicRegister();
  populateMemberPhotoSelect();
  editorStatus.textContent = "Changes saved successfully for everyone.";
  editorStatus.classList.remove("is-error");
  setSaveStatus("Shared register updated successfully.");
});

for (const input of [eventTitleInput, eventYearInput, heroEyebrowInput, heroDescriptionInput, heroCaptionInput]) {
  input.addEventListener("input", () => {
    document.querySelector("#settings-status").textContent = "Unsaved site details";
    document.querySelector("#settings-status").classList.remove("is-error");
  });
}

saveEventSettingsButton.addEventListener("click", async () => {
  const title = eventTitleInput.value.trim();
  const year = Number(eventYearInput.value);
  const nextHeroEyebrow = heroEyebrowInput.value.trim();
  const nextHeroDescription = heroDescriptionInput.value.trim();
  const nextHeroCaption = heroCaptionInput.value.trim();
  if (!title || !eventTitleInput.validity.valid) {
    eventTitleInput.reportValidity();
    return;
  }
  if (!isValidYear(year) || !eventYearInput.validity.valid) {
    eventYearInput.reportValidity();
    return;
  }
  if (!nextHeroDescription || !heroDescriptionInput.validity.valid) {
    heroDescriptionInput.reportValidity();
    return;
  }
  if (!heroEyebrowInput.validity.valid || !heroCaptionInput.validity.valid) return;
  saveEventSettingsButton.disabled = true;
  const settingsStatus = document.querySelector("#settings-status");
  settingsStatus.textContent = "Saving site details…";
  settingsStatus.classList.remove("is-error");
  const previousSettings = { heroEyebrow, heroDescription, heroCaption };
  heroEyebrow = nextHeroEyebrow;
  heroDescription = nextHeroDescription;
  heroCaption = nextHeroCaption;
  try {
    await saveSharedRegister(members, year, title, supportsSharedEventTitle, true, true);
  } catch (error) {
    ({ heroEyebrow, heroDescription, heroCaption } = previousSettings);
    settingsStatus.textContent = error.message || "Unable to save site details.";
    settingsStatus.classList.add("is-error");
    applyEventSettings();
    return;
  } finally {
    saveEventSettingsButton.disabled = false;
  }
  eventTitle = title;
  eventYear = year;
  saveLocalRegister(members, eventYear, eventTitle);
  applyEventSettings();
  renderPublicRegister();
  settingsStatus.textContent = "Site details updated across the page.";
});

closeLoginButton.addEventListener("click", () => editorDialog.close());
document.querySelector("#close-manager").addEventListener("click", () => editorDialog.close());
managerSignoutButton.addEventListener("click", () => {
  authSession = null;
  mediaAuthorized = false;
  mediaInput.disabled = true;
  chooseMediaButton.disabled = true;
  memberPhotoInput.disabled = true;
  chooseMemberPhotoButton.disabled = true;
  heroPhotoInput.disabled = true;
  chooseHeroPhotoButton.disabled = true;
  removeHeroPhotoButton.disabled = true;
  loginForm.reset();
  loginForm.hidden = false;
  editorContent.hidden = true;
  loginStatus.textContent = "You have signed out.";
});
document.querySelectorAll("[data-manager-tab]").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll("[data-manager-tab]").forEach((item) => {
      const active = item === tab;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-selected", String(active));
    });
    document.querySelectorAll("[data-manager-panel]").forEach((panel) => {
      panel.hidden = panel.dataset.managerPanel !== tab.dataset.managerTab;
    });
  });
});
editorDialog.addEventListener("close", () => {
  loginForm.reset();
});

function pdfText(value) {
  const ascii = String(value).normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[₹]/g, "INR").replace(/[–—]/g, "-").replace(/[^\x20-\x7E]/g, "");
  return `(${ascii.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)")})`;
}

function buildRegisterPdf(data, year, title) {
  const pageWidth = 842;
  const pageHeight = 595;
  const rowsPerPage = 22;
  const pledged = data.reduce((sum, member) => sum + member.amount, 0);
  const received = data.reduce((sum, member) => sum + member.received, 0);
  const pageCount = Math.max(1, Math.ceil(data.length / rowsPerPage));
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  ];
  const pageRefs = [];
  const number = (value) => numberFormat.format(value);
  const text = (value, x, y, size, color = "0.16 0.15 0.14") =>
    `BT /F1 ${size} Tf ${color} rg 1 0 0 1 ${x} ${y} Tm ${pdfText(value)} Tj ET`;
  const rect = (x, y, width, height, color) =>
    `q ${color} rg ${x} ${y} ${width} ${height} re f Q`;

  for (let pageIndex = 0; pageIndex < pageCount; pageIndex += 1) {
    const first = pageIndex * rowsPerPage;
    const pageRows = data.slice(first, first + rowsPerPage);
    const commands = [
      rect(0, 0, pageWidth, pageHeight, "0.99 0.98 0.95"),
      rect(0, 562, pageWidth, 33, "0.46 0.17 0.15"),
      text("KARKATTA  |  PALAMU, JHARKHAND", 38, 574, 9, "1 0.96 0.87"),
      text(`${title} MEMBERS REGISTER  |  ${year}`, 38, 538, 19, "0.30 0.13 0.12"),
      text(`Community contributions  |  Page ${pageIndex + 1} of ${pageCount}`, 38, 520, 9, "0.42 0.39 0.35"),
    ];
    const summary = [
      ["MEMBERS", number(data.length), "0.98 0.94 0.86"],
      ["TOTAL PLEDGED", `INR ${number(pledged)}`, "0.96 0.91 0.82"],
      ["RECEIVED", `INR ${number(received)}`, "0.91 0.95 0.90"],
      [`${year - 1} CARRY-FORWARD`, "INR 2,000", "0.97 0.92 0.90"],
    ];
    summary.forEach(([label, value], index) => {
      const x = 38 + index * 192;
      commands.push(rect(x, 464, 180, 43, summary[index][2]));
      commands.push(text(label, x + 10, 490, 7, "0.38 0.34 0.30"));
      commands.push(text(value, x + 10, 474, 12, "0.30 0.13 0.12"));
    });

    const columns = [38, 75, 397, 511, 596, 804];
    const tableTop = 446;
    const rowHeight = 16;
    commands.push(rect(38, tableTop - 23, 766, 23, "0.46 0.17 0.15"));
    [
      ["NO.", columns[0] + 8],
      ["MEMBER", columns[1] + 8],
      ["PLEDGED (INR)", columns[2] + 8],
      ["PAID", columns[3] + 8],
      ["RECEIVED (INR)", columns[4] + 8],
    ].forEach(([label, x]) => commands.push(text(label, x, tableTop - 15, 7, "1 0.97 0.91")));

    pageRows.forEach((member, rowIndex) => {
      const y = tableTop - 23 - (rowIndex + 1) * rowHeight;
      commands.push(rect(38, y, 766, rowHeight, rowIndex % 2 === 0 ? "1 1 1" : "1 0.97 0.92"));
      commands.push(text(String(first + rowIndex + 1), columns[0] + 8, y + 5, 8));
      commands.push(text(member.name, columns[1] + 8, y + 5, 8));
      commands.push(text(number(member.amount), columns[2] + 8, y + 5, 8));
      commands.push(text(member.paid ? "Paid" : "Pending", columns[3] + 8, y + 5, 8, member.paid ? "0.24 0.42 0.30" : "0.48 0.37 0.27"));
      commands.push(text(number(member.received), columns[4] + 8, y + 5, 8));
      commands.push(`q 0.87 0.84 0.79 RG 0.4 w ${columns[0]} ${y} m ${columns[5]} ${y} l S Q`);
    });
    if (pageIndex === pageCount - 1) {
      const y = tableTop - 23 - (pageRows.length + 1) * rowHeight;
      commands.push(rect(38, y, 766, rowHeight, "0.94 0.88 0.75"));
      commands.push(text("TOTAL", columns[1] + 8, y + 5, 8));
      commands.push(text(number(pledged), columns[2] + 8, y + 5, 8));
      commands.push(text(number(received), columns[4] + 8, y + 5, 8));
    }

    const content = commands.join("\n");
    const pageObject = 4 + pageIndex * 2;
    const contentObject = pageObject + 1;
    pageRefs.push(`${pageObject} 0 R`);
    objects.push(
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 3 0 R >> >> /Contents ${contentObject} 0 R >>`,
      `<< /Length ${new TextEncoder().encode(content).length} >>\nstream\n${content}\nendstream`,
    );
  }
  objects[1] = `<< /Type /Pages /Kids [${pageRefs.join(" ")}] /Count ${pageCount} >>`;
  let documentText = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(new TextEncoder().encode(documentText).length);
    documentText += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xrefOffset = new TextEncoder().encode(documentText).length;
  documentText += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    documentText += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  documentText += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return new Blob([documentText], { type: "application/pdf" });
}

function registerPdfFileName(title, year) {
  return `${title.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "")}-${year}-register.pdf`;
}

function openRegisterPdf(data = members, year = eventYear, title = eventTitle, statusElement = null) {
  const fileName = registerPdfFileName(title, year);
  const url = URL.createObjectURL(buildRegisterPdf(data, year, title));
  const viewer = window.open(url, "_blank");
  if (!viewer) {
    URL.revokeObjectURL(url);
    downloadRegisterPdf(data, year, title, statusElement);
    return;
  }
  viewer.opener = null;
  window.setTimeout(() => URL.revokeObjectURL(url), 5 * 60 * 1000);
  if (statusElement) statusElement.textContent = `Opened ${fileName}. Use the PDF viewer to save, download, or print.`;
}

function downloadRegisterPdf(data = members, year = eventYear, title = eventTitle, statusElement = null) {
  const fileName = registerPdfFileName(title, year);
  const url = URL.createObjectURL(buildRegisterPdf(data, year, title));
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.style.display = "none";
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
  if (statusElement) statusElement.textContent = `Downloaded ${fileName}.`;
}

function handlePdfError(statusElement, error) {
  if (statusElement) statusElement.textContent = error.message || "Unable to create the PDF.";
}

const publicPdfStatus = document.querySelector("#public-pdf-status");
document.querySelector("#public-view-pdf").addEventListener("click", () => {
  try { openRegisterPdf(members, eventYear, eventTitle, publicPdfStatus); }
  catch (error) { handlePdfError(publicPdfStatus, error); }
});
document.querySelector("#public-download-pdf").addEventListener("click", () => {
  try { downloadRegisterPdf(members, eventYear, eventTitle, publicPdfStatus); }
  catch (error) { handlePdfError(publicPdfStatus, error); }
});
document.querySelector("#manager-view-pdf").addEventListener("click", () => {
  try { openRegisterPdf(editingMembers, eventYear, eventTitle, editorStatus); }
  catch (error) { handlePdfError(editorStatus, error); }
});
document.querySelector("#manager-download-pdf").addEventListener("click", () => {
  try { downloadRegisterPdf(editingMembers, eventYear, eventTitle, editorStatus); }
  catch (error) { handlePdfError(editorStatus, error); }
});

const mediaGrid = document.querySelector("#media-grid");
const mediaStatus = document.querySelector("#media-status");
const managerMediaGrid = document.querySelector("#manager-media-grid");
mediaInput.disabled = true;
memberPhotoInput.disabled = true;
heroPhotoInput.disabled = true;
populateMemberPhotoSelect();

memberPhotoSelect.addEventListener("change", updateSelectedMemberPhotoControls);

chooseMemberPhotoButton.addEventListener("click", () => {
  if (!mediaAuthorized || !authSession || authSession.expires_at <= Date.now() / 1000) {
    memberPhotoStatus.textContent = "Your admin session has expired. Sign in again to manage member photos.";
    memberPhotoStatus.classList.add("is-error");
    return;
  }
  if (!memberPhotoSelect.value) {
    memberPhotoStatus.textContent = "Add a member in the register before choosing a photo.";
    memberPhotoStatus.classList.add("is-error");
    return;
  }
  memberPhotoInput.click();
});

memberPhotoInput.addEventListener("change", async () => {
  const file = memberPhotoInput.files?.[0];
  memberPhotoInput.value = "";
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    memberPhotoStatus.textContent = "Choose an image file for a member photo.";
    memberPhotoStatus.classList.add("is-error");
    return;
  }
  const member = members.find((item) => item.id === memberPhotoSelect.value);
  if (!member) {
    memberPhotoStatus.textContent = "Select a current member before adding a photo.";
    memberPhotoStatus.classList.add("is-error");
    return;
  }
  const oldPath = member.photo_path;
  const newPath = uniqueStoragePath("members", file);
  memberPhotoStatus.textContent = `Uploading photo for ${member.name}…`;
  memberPhotoStatus.classList.remove("is-error");
  try {
    await uploadStorageFile(file, newPath, (sent, total) => {
      memberPhotoStatus.textContent = `Uploading photo for ${member.name}… ${Math.floor(sent / total * 100)}%`;
    });
    const updatedMembers = members.map((item) => item.id === member.id ? { ...item, photo_path: newPath } : { ...item });
    await saveSharedRegister(updatedMembers, eventYear, eventTitle);
    members = updatedMembers;
    editingMembers = editingMembers.map((item) => item.id === member.id ? { ...item, photo_path: newPath } : item);
    saveLocalRegister(members, eventYear, eventTitle);
    renderMemberCards();
    renderManagerMemberPhotos();
    updateSelectedMemberPhotoControls();
    if (oldPath) {
      try {
        await deleteStorageFile(oldPath);
      } catch (error) {
        memberPhotoStatus.textContent = `Photo saved, but the previous file could not be deleted: ${error.message}`;
        memberPhotoStatus.classList.add("is-error");
        return;
      }
    }
    memberPhotoStatus.textContent = `Photo saved for ${member.name} and shared with everyone.`;
  } catch (error) {
    let cleanupError = "";
    try {
      await deleteStorageFile(newPath);
    } catch (cleanup) {
      cleanupError = ` The uploaded file could not be cleaned up: ${cleanup.message}`;
    }
    memberPhotoStatus.textContent = `${error.message || "Unable to save the member photo."}${cleanupError}`;
    memberPhotoStatus.classList.add("is-error");
  }
});

chooseHeroPhotoButton.addEventListener("click", () => {
  if (!mediaAuthorized || !authSession || authSession.expires_at <= Date.now() / 1000) {
    document.querySelector("#settings-status").textContent = "Your admin session has expired. Sign in again to manage the banner photo.";
    document.querySelector("#settings-status").classList.add("is-error");
    return;
  }
  heroPhotoInput.click();
});

heroPhotoInput.addEventListener("change", async () => {
  const file = heroPhotoInput.files?.[0];
  heroPhotoInput.value = "";
  if (!file) return;
  const settingsStatus = document.querySelector("#settings-status");
  if (!file.type.startsWith("image/")) {
    settingsStatus.textContent = "Choose an image file for the banner.";
    settingsStatus.classList.add("is-error");
    return;
  }
  const oldPath = heroImagePath;
  const newPath = uniqueStoragePath("banner", file);
  settingsStatus.textContent = "Uploading banner photo…";
  settingsStatus.classList.remove("is-error");
  try {
    await uploadStorageFile(file, newPath, (sent, total) => {
      settingsStatus.textContent = `Uploading banner photo… ${Math.floor(sent / total * 100)}%`;
    });
    heroImagePath = newPath;
    await saveSharedRegister(members, eventYear, eventTitle, supportsSharedEventTitle, true, true);
    saveLocalRegister(members, eventYear, eventTitle);
    applyEventSettings();
  } catch (error) {
    heroImagePath = oldPath;
    applyEventSettings();
    let cleanupError = "";
    try {
      await deleteStorageFile(newPath);
    } catch (cleanup) {
      cleanupError = ` The uploaded file could not be cleaned up: ${cleanup.message}`;
    }
    settingsStatus.textContent = `${error.message || "Unable to save the banner photo."}${cleanupError}`;
    settingsStatus.classList.add("is-error");
    return;
  }
  if (oldPath) {
    try {
      await deleteStorageFile(oldPath);
    } catch (error) {
      settingsStatus.textContent = `Banner photo saved, but the previous file could not be deleted: ${error.message}`;
      settingsStatus.classList.add("is-error");
      return;
    }
  }
  settingsStatus.textContent = "Banner photo saved and shared. It automatically fits the banner.";
});

removeHeroPhotoButton.addEventListener("click", async () => {
  if (!heroImagePath) return;
  const oldPath = heroImagePath;
  const settingsStatus = document.querySelector("#settings-status");
  removeHeroPhotoButton.disabled = true;
  settingsStatus.textContent = "Removing banner photo…";
  settingsStatus.classList.remove("is-error");
  heroImagePath = null;
  try {
    await saveSharedRegister(members, eventYear, eventTitle, supportsSharedEventTitle, true, true);
    saveLocalRegister(members, eventYear, eventTitle);
    applyEventSettings();
  } catch (error) {
    heroImagePath = oldPath;
    applyEventSettings();
    settingsStatus.textContent = error.message || "Unable to remove the banner photo.";
    settingsStatus.classList.add("is-error");
    return;
  }
  try {
    await deleteStorageFile(oldPath);
    settingsStatus.textContent = "Banner photo removed.";
  } catch (error) {
    settingsStatus.textContent = `Banner photo removed from the page, but the stored file could not be deleted: ${error.message}`;
    settingsStatus.classList.add("is-error");
  }
});

document.querySelector("#choose-media").addEventListener("click", () => {
  if (!mediaAuthorized || !authSession || authSession.expires_at <= Date.now() / 1000) {
    mediaAuthorized = false;
    mediaInput.disabled = true;
    chooseMediaButton.disabled = true;
    mediaStatus.textContent = "Your admin session has expired. Sign in again to manage media.";
    mediaStatus.classList.add("is-error");
    return;
  }
  mediaInput.click();
});
mediaInput.addEventListener("change", () => {
  addMediaFiles(mediaInput.files).catch((error) => {
    mediaStatus.textContent = error.message || "Unable to upload media.";
    mediaStatus.classList.add("is-error");
  });
  mediaInput.value = "";
});

function createMediaCard(item, manager = false) {
  const card = document.createElement("article");
  card.className = "media-card";
  const preview = document.createElement(item.type.startsWith("video/") ? "video" : "img");
  preview.src = storageObjectUrl(item.path);
  if (preview instanceof HTMLVideoElement) {
    preview.controls = true;
    preview.preload = "metadata";
  } else {
    preview.alt = item.name;
  }
  const name = document.createElement("div");
  name.className = "media-name";
  name.textContent = item.caption || item.name;
  card.append(preview, name);
  if (item.caption) {
    const fileName = document.createElement("div");
    fileName.className = "media-file-name";
    fileName.textContent = item.name;
    card.append(fileName);
  }
  if (manager) {
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "media-remove";
    remove.textContent = "×";
    remove.disabled = !mediaAuthorized;
    remove.setAttribute("aria-label", `Delete ${item.name}`);
    remove.addEventListener("click", () => removeGalleryMedia(item));
    card.append(remove);
  }
  return card;
}

function renderGalleryMedia() {
  mediaGrid.replaceChildren(...galleryMedia.map((item) => createMediaCard(item)));
  managerMediaGrid.replaceChildren(...galleryMedia.map((item) => createMediaCard(item, true)));
}

async function removeGalleryMedia(item) {
  if (!supportsSharedSiteSettings) {
    mediaStatus.textContent = "Run the updated supabase-setup.sql before managing shared gallery media.";
    mediaStatus.classList.add("is-error");
    return;
  }
  const previousMedia = galleryMedia;
  galleryMedia = galleryMedia.filter((media) => media.id !== item.id);
  try {
    await saveSharedRegister(members, eventYear, eventTitle);
  } catch (error) {
    galleryMedia = previousMedia;
    mediaStatus.textContent = error.message || "Unable to remove gallery media.";
    mediaStatus.classList.add("is-error");
    renderGalleryMedia();
    return;
  }
  saveLocalRegister(members, eventYear, eventTitle);
  renderGalleryMedia();
  try {
    await deleteStorageFile(item.path);
    mediaStatus.textContent = `${item.name} was removed from the shared gallery.`;
    mediaStatus.classList.remove("is-error");
  } catch (error) {
    mediaStatus.textContent = `Removed from the gallery, but the stored file could not be deleted: ${error.message}`;
    mediaStatus.classList.add("is-error");
  }
}

async function addMediaFiles(files) {
  if (!mediaAuthorized || !authSession || authSession.expires_at <= Date.now() / 1000) {
    throw new Error("Your admin session has expired. Sign in again to manage media.");
  }
  if (!supportsSharedSiteSettings) {
    throw new Error("Run the updated supabase-setup.sql before managing shared gallery media.");
  }
  let added = 0;
  for (const file of files) {
    if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
      mediaStatus.textContent = `Skipped ${file.name}: choose an image or video file.`;
      mediaStatus.classList.add("is-error");
      continue;
    }
    const path = uniqueStoragePath("gallery", file);
    mediaStatus.textContent = `Uploading ${file.name}…`;
    mediaStatus.classList.remove("is-error");
    await uploadStorageFile(file, path, (sent, total) => {
      mediaStatus.textContent = `Uploading ${file.name}… ${Math.floor(sent / total * 100)}%`;
    });
    const caption = mediaCaptionInput.value.trim();
    const item = { id: path, name: file.name, type: file.type, path, caption };
    const previousMedia = galleryMedia;
    galleryMedia = [...galleryMedia, item];
    try {
      await saveSharedRegister(members, eventYear, eventTitle);
    } catch (error) {
      galleryMedia = previousMedia;
      try {
        await deleteStorageFile(path);
      } catch (cleanup) {
        throw new Error(`${error.message} Uploaded file cleanup also failed: ${cleanup.message}`);
      }
      throw error;
    }
    saveLocalRegister(members, eventYear, eventTitle);
    renderGalleryMedia();
    added += 1;
  }
  if (added > 0) {
    mediaStatus.textContent = `${added} ${added === 1 ? "file" : "files"} uploaded and shared with everyone.`;
    mediaStatus.classList.remove("is-error");
  }
}

for (const eventName of ["dragenter", "dragover"]) {
  dropZone.addEventListener(eventName, (event) => {
    event.preventDefault();
    if (!mediaAuthorized || !authSession || authSession.expires_at <= Date.now() / 1000) return;
    dropZone.classList.add("is-dragging");
  });
}

for (const eventName of ["dragleave", "drop"]) {
  dropZone.addEventListener(eventName, (event) => {
    event.preventDefault();
    if (!mediaAuthorized || !authSession || authSession.expires_at <= Date.now() / 1000) return;
    dropZone.classList.remove("is-dragging");
    if (eventName === "drop") addMediaFiles(event.dataTransfer.files).catch((error) => {
      mediaStatus.textContent = error.message || "Unable to upload media.";
      mediaStatus.classList.add("is-error");
    });
  });
}

applyEventSettings();
renderPublicRegister();
renderGalleryMedia();
loadSharedRegister();

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && !editorDialog.open) loadSharedRegister();
});
