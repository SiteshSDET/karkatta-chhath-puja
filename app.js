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
const publicMemberSearch = document.querySelector("#public-member-search");
const publicMemberRows = document.querySelector("#public-member-rows");
const memberCards = document.querySelector("#member-cards");
const publicRefreshButton = document.querySelector("#public-refresh");
const publicRefreshStatus = document.querySelector("#public-refresh-status");
const managerRefreshButton = document.querySelector("#manager-refresh");
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
const expensePartInput = document.querySelector("#expense-part");
const expenseAmountInput = document.querySelector("#expense-amount");
const expenseDateInput = document.querySelector("#expense-date");
const expenseYearInput = document.querySelector("#expense-year");
const carryForwardInput = document.querySelector("#manager-carry-forward");
const expenseRows = document.querySelector("#expense-rows");
const expenseStatus = document.querySelector("#expense-status");
const saveExpensesButton = document.querySelector("#save-expenses");
const accountsYearFilter = document.querySelector("#accounts-year-filter");
const accountsStatus = document.querySelector("#accounts-status");
const managerSignoutButton = document.querySelector("#manager-signout");
const numberFormat = new Intl.NumberFormat("en-IN");
const BASE_YEAR = 2026;
const DEFAULT_CARRY_FORWARD = 2000;
const loadedRegister = loadRegister();
let members = loadedRegister.members;
let eventYear = loadedRegister.year;
let eventTitle = loadedRegister.title;
let heroEyebrow = loadedRegister.heroEyebrow;
let heroDescription = loadedRegister.heroDescription;
let heroCaption = loadedRegister.heroCaption;
let heroImagePath = loadedRegister.heroImagePath;
let galleryMedia = loadedRegister.galleryMedia;
let financeExpenses = loadedRegister.financeExpenses;
let financeCarryForward = loadedRegister.financeCarryForward;
let editingExpenses = [];
let editingFinanceCarryForward = financeCarryForward;
let editingMembers = [];
let authSession = null;
let mediaAuthorized = false;
let supportsSharedEventTitle = true;
let supportsSharedSiteSettings = true;
let supportsSharedFinance = true;
let sharedLoadSequence = 0;

function isValidYear(value) {
  return Number.isInteger(value) && value >= 1 && value <= 9999;
}

function sanitizeMemberName(value) {
  return value.replace(/[^\p{L}\p{M}\s.'’-]/gu, "").replace(/\s+/g, " ");
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
    (item.year === undefined || (isValidYear(item.year) && item.year >= BASE_YEAR)) &&
    (item.type.startsWith("image/") || item.type.startsWith("video/"))
  );
}

function validFinanceExpenses(value) {
  return Array.isArray(value) && value.every((expense) =>
    expense &&
    typeof expense.id === "string" &&
    typeof expense.part === "string" &&
    expense.part.trim().length > 0 &&
    Number.isFinite(expense.amount) &&
    expense.amount > 0 &&
    typeof expense.date === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(expense.date) &&
    isValidYear(expense.year) &&
    expense.year >= BASE_YEAR
  );
}

function validCarryForward(value) {
  return Number.isFinite(value) && value >= 0;
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
        financeExpenses: [],
        financeCarryForward: DEFAULT_CARRY_FORWARD,
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
        financeExpenses: [],
        financeCarryForward: DEFAULT_CARRY_FORWARD,
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
      financeExpenses: validFinanceExpenses(parsed.financeExpenses) ? parsed.financeExpenses : [],
      financeCarryForward: validCarryForward(parsed.financeCarryForward) ? parsed.financeCarryForward : DEFAULT_CARRY_FORWARD,
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
      financeExpenses: [],
      financeCarryForward: DEFAULT_CARRY_FORWARD,
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
      financeExpenses,
      financeCarryForward,
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

async function loadSharedRegister(useLegacySchema = false, requestId = null, statusTarget = null, includeFinance = true) {
  if (requestId === null) requestId = ++sharedLoadSequence;
  const legacyOnly = useLegacySchema === "legacy";
  const select = legacyOnly
    ? "members,event_year"
    : useLegacySchema
      ? "members,event_year,event_title"
      : `members,event_year,event_title,hero_eyebrow,hero_description,hero_caption,hero_image_path,gallery_media${includeFinance ? ",finance_expenses,finance_carry_forward" : ""}`;
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
    if (requestId !== sharedLoadSequence) return false;
    if (rows.length === 0) {
      setSaveStatus("No shared register saved yet. Sign in as admin to initialize it.");
      if (statusTarget) {
        statusTarget.textContent = "No shared register is saved in Supabase; the displayed data may be local or sample data.";
        statusTarget.classList.add("is-error");
      }
      return false;
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
      !validGalleryMedia(register.gallery_media) ||
      (includeFinance && (!validFinanceExpenses(register.finance_expenses) || !validCarryForward(register.finance_carry_forward)))
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
    financeExpenses = useLegacySchema || !includeFinance ? [] : register.finance_expenses;
    if (includeFinance) financeCarryForward = register.finance_carry_forward;
    supportsSharedFinance = !useLegacySchema && !legacyOnly && includeFinance;
    saveLocalRegister(members, eventYear, eventTitle);
    applyEventSettings();
    renderPublicRegister();
    populateMemberPhotoSelect();
    renderGalleryMedia();
    renderAccounts();
    renderManagerExpenses();
    if (!editorDialog.open) renderEditor();
    setSaveStatus("Shared register loaded");
    if (statusTarget) {
      statusTarget.textContent = `Latest shared data loaded at ${new Date().toLocaleTimeString()}.`;
      statusTarget.classList.remove("is-error");
    }
    return true;
  } catch (error) {
    if (requestId !== sharedLoadSequence) return false;
    if (!useLegacySchema && !legacyOnly && includeFinance && /finance_expenses|finance_carry_forward/i.test(error.message || "")) {
      supportsSharedFinance = false;
      return loadSharedRegister(false, requestId, statusTarget, false);
    }
    if (!useLegacySchema && !legacyOnly && /hero_eyebrow|hero_description|hero_caption|hero_image_path|gallery_media/i.test(error.message || "")) {
      supportsSharedSiteSettings = false;
      return loadSharedRegister(true, requestId, statusTarget);
    }
    if (useLegacySchema !== "legacy" && /event_title/i.test(error.message || "")) {
      supportsSharedEventTitle = false;
      return loadSharedRegister("legacy", requestId, statusTarget);
    }
    setSaveStatus(`Shared register unavailable: ${error.message}`, true);
    if (statusTarget) {
      statusTarget.textContent = `Refresh failed: ${error.message}`;
      statusTarget.classList.add("is-error");
    }
    return false;
  }
}

publicRefreshButton.addEventListener("click", async () => {
  publicRefreshButton.disabled = true;
  publicRefreshStatus.textContent = "Loading the latest shared data…";
  publicRefreshStatus.classList.remove("is-error");
  try {
    await loadSharedRegister(false, null, publicRefreshStatus);
  } finally {
    publicRefreshButton.disabled = false;
  }
});

managerRefreshButton.addEventListener("click", async () => {
  if (!authSession || authSession.expires_at <= Date.now() / 1000) {
    editorStatus.textContent = "Your admin session has expired. Sign in again before refreshing admin data.";
    editorStatus.classList.add("is-error");
    return;
  }
  const hasUnsavedChanges = editorStatus.textContent.includes("Unsaved changes") ||
    JSON.stringify(editingExpenses) !== JSON.stringify(financeExpenses) ||
    editingFinanceCarryForward !== financeCarryForward ||
    eventTitleInput.value.trim() !== eventTitle ||
    Number(eventYearInput.value) !== eventYear ||
    heroEyebrowInput.value !== heroEyebrow ||
    heroDescriptionInput.value !== heroDescription ||
    heroCaptionInput.value !== heroCaption;
  if (hasUnsavedChanges && !window.confirm("Discard your unsaved changes and load the latest shared data?")) return;
  managerRefreshButton.disabled = true;
  editorStatus.textContent = "Loading the latest shared data…";
  editorStatus.classList.remove("is-error");
  try {
    const loaded = await loadSharedRegister();
    if (loaded) {
      prepareEditor();
      editorStatus.textContent = `Latest shared data loaded at ${new Date().toLocaleTimeString()}.`;
      editorStatus.classList.remove("is-error");
    }
  } finally {
    managerRefreshButton.disabled = false;
  }
});

async function saveSharedRegister(
  value,
  year,
  title,
  includeTitle = supportsSharedEventTitle,
  includeSiteSettings = supportsSharedSiteSettings,
  requireSiteSettings = false,
  includeFinance = supportsSharedFinance,
  requireFinance = false
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
      ...(includeFinance ? { finance_expenses: financeExpenses } : {}),
      ...(includeFinance ? { finance_carry_forward: financeCarryForward } : {}),
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
      return saveSharedRegister(value, year, title, false, includeSiteSettings, requireSiteSettings, includeFinance, requireFinance);
    }
    if (includeFinance && /finance_expenses|finance_carry_forward/i.test(error.message || "")) {
      supportsSharedFinance = false;
      if (requireFinance) {
        throw new Error("Run the updated supabase-setup.sql to enable shared Hisab.");
      }
      return saveSharedRegister(value, year, title, includeTitle, includeSiteSettings, requireSiteSettings, false, false);
    }
    if (includeSiteSettings && /hero_eyebrow|hero_description|hero_caption|hero_image_path|gallery_media/i.test(error.message || "")) {
      supportsSharedSiteSettings = false;
      if (requireSiteSettings) {
        throw new Error("Run the updated supabase-setup.sql to enable shared banner and gallery management.");
      }
      return saveSharedRegister(value, year, title, includeTitle, false, false, includeFinance, requireFinance);
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

function renderPublicMemberRows(data = members) {
  const fragment = document.createDocumentFragment();
  const filter = publicMemberSearch.value.trim().toLocaleLowerCase();
  const matchingMembers = data
    .map((member, index) => ({ member, index }))
    .filter(({ member }) => member.name.toLocaleLowerCase().includes(filter));
  matchingMembers.forEach(({ member, index }) => {
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
      if (cellIndex === 3) {
        cell.className = member.paid ? "paid-state is-paid" : "paid-state";
        const status = document.createElement("span");
        status.textContent = value;
        cell.append(status);
      } else {
        cell.textContent = value;
      }
      row.append(cell);
    });
    const detailsCell = document.createElement("td");
    detailsCell.className = "public-member-details-cell";
    const detailsButton = document.createElement("button");
    detailsButton.type = "button";
    detailsButton.className = "public-member-details-toggle";
    detailsButton.setAttribute("aria-expanded", "false");
    detailsButton.setAttribute("aria-label", `View contribution details for ${member.name}`);
    detailsButton.textContent = "View contribution";
    detailsCell.append(detailsButton);
    row.append(detailsCell);
    fragment.append(row);
  });
  if (matchingMembers.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 6;
    cell.textContent = "No members match your search.";
    row.append(cell);
    fragment.append(row);
  }
  publicMemberRows.replaceChildren(fragment);
}

publicMemberRows.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;
  const button = event.target.closest(".public-member-details-toggle");
  if (!button) return;
  const row = button.closest("tr");
  if (!row) return;
  const expanded = button.getAttribute("aria-expanded") !== "true";
  row.classList.toggle("is-expanded", expanded);
  button.setAttribute("aria-expanded", String(expanded));
  button.textContent = expanded ? "Hide contribution" : "View contribution";
  button.setAttribute(
    "aria-label",
    `${expanded ? "Hide" : "View"} contribution details for ${row.cells[1].textContent}`,
  );
});

function renderPublicRegister(data = members, year = eventYear, title = eventTitle) {
  const pledged = data.reduce((total, member) => total + member.amount, 0);
  const received = data.reduce((total, member) => total + member.received, 0);
  renderPublicMemberRows(data);
  document.querySelector("#public-register-title").textContent = `${title} members register ${year}`;
  document.querySelector("#public-member-total").textContent = numberFormat.format(data.length);
  document.querySelector("#public-pledged-total").textContent = `₹${numberFormat.format(pledged)}`;
  document.querySelector("#public-received-total").textContent = `₹${numberFormat.format(received)}`;
  document.querySelector("#public-carry-forward-label").textContent = "Last Year Carry Forward";
  document.querySelector("#public-carry-forward-amount").textContent = `₹${numberFormat.format(financeCarryForward)}`;
  document.querySelector("#public-carry-forward-note").textContent = `included in ${year} Hisab balance`;
  document.querySelector("#public-table-pledged").textContent = `₹${numberFormat.format(pledged)}`;
  document.querySelector("#public-table-received").textContent = `₹${numberFormat.format(received)}`;
  renderMemberCards(data);
  renderAccounts();
}

function getReceivedTotal(data = members) {
  return data.reduce((total, member) => total + member.received, 0);
}

function renderAccounts() {
  const years = [...new Set([eventYear, ...financeExpenses.map((expense) => expense.year)])]
    .sort((left, right) => right - left);
  const selectedYear = Number(accountsYearFilter.value) || eventYear;
  accountsYearFilter.replaceChildren(...years.map((year) => new Option(String(year), String(year))));
  accountsYearFilter.value = years.includes(selectedYear) ? String(selectedYear) : String(eventYear);
  const year = Number(accountsYearFilter.value);
  const selectedExpenses = financeExpenses.filter((expense) => expense.year === year);
  const expenditure = selectedExpenses.reduce((total, expense) => total + expense.amount, 0);
  const hasRegisterCollection = year === eventYear;
  const collected = hasRegisterCollection ? getReceivedTotal() : null;
  const carryForward = hasRegisterCollection ? financeCarryForward : null;
  const balance = collected === null ? null : collected + carryForward - expenditure;
  document.querySelector("#accounts-year").textContent = String(year);
  document.querySelector("#accounts-carry-forward-year-label").textContent = "Last Year Carry Forward";
  document.querySelector("#account-carry-forward").textContent = carryForward === null ? "—" : `₹${numberFormat.format(carryForward)}`;
  document.querySelector("#account-collected").textContent = collected === null ? "—" : `₹${numberFormat.format(collected)}`;
  document.querySelector("#account-expenditure").textContent = `₹${numberFormat.format(expenditure)}`;
  document.querySelector("#account-balance").textContent = balance === null ? "—" : `₹${numberFormat.format(balance)}`;
  document.querySelector("#account-balance").classList.toggle("is-negative", balance !== null && balance < 0);
  document.querySelector("#public-expense-total").textContent = `₹${numberFormat.format(expenditure)}`;
  const fragment = document.createDocumentFragment();
  [...selectedExpenses].sort((left, right) => right.date.localeCompare(left.date)).forEach((expense) => {
    const row = document.createElement("tr");
    const dateCell = document.createElement("td");
    dateCell.dataset.label = "Date";
    const dateValue = document.createElement("span");
    dateValue.className = "accounts-value accounts-date-value";
    dateValue.textContent = new Date(`${expense.date}T00:00:00`).toLocaleDateString();
    dateCell.append(dateValue);
    const partCell = document.createElement("td");
    partCell.dataset.label = "Expenditure on";
    const partValue = document.createElement("span");
    partValue.className = "accounts-value";
    partValue.textContent = expense.part;
    partCell.append(partValue);
    const amountCell = document.createElement("td");
    amountCell.dataset.label = "Amount (₹)";
    const amountValue = document.createElement("span");
    amountValue.className = "accounts-value accounts-amount-value";
    amountValue.textContent = numberFormat.format(expense.amount);
    amountCell.append(amountValue);
    row.append(dateCell, partCell, amountCell);
    fragment.append(row);
  });
  document.querySelector("#public-expense-rows").replaceChildren(fragment);
  document.querySelector("#public-expense-empty").hidden = selectedExpenses.length > 0;
  document.querySelector("#accounts-section .section-description").textContent = hasRegisterCollection
    ? `Balance includes the ${year - 1} carry-forward, member receipts, and recorded expenditures.`
    : `Member collections are available for the current ${eventYear} register only.`;
  if (!supportsSharedFinance) {
    accountsStatus.textContent = "Shared Hisab data needs the latest Supabase setup. Run supabase-setup.sql to enable this section.";
    accountsStatus.classList.add("is-error");
  } else {
    accountsStatus.textContent = "";
    accountsStatus.classList.remove("is-error");
  }
}

accountsYearFilter.addEventListener("change", renderAccounts);
document.querySelector("#accounts-details-toggle").addEventListener("click", (event) => {
  const button = event.currentTarget;
  const details = document.querySelector("#accounts-details");
  const expanded = button.getAttribute("aria-expanded") !== "true";
  button.setAttribute("aria-expanded", String(expanded));
  details.hidden = !expanded;
  button.textContent = expanded ? "Hide expenditure details" : "View expenditure details";
});

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
    const name = document.createElement("strong");
    name.textContent = member.name || "New member";
    copy.append(name);
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
  renderAccounts();
  renderManagerExpenseTotals();
}

function renderManagerExpenseTotals() {
  const collected = getReceivedTotal(editingMembers);
  const carryForward = validCarryForward(editingFinanceCarryForward) ? editingFinanceCarryForward : 0;
  const expenditure = editingExpenses
    .filter((expense) => expense.year === eventYear)
    .reduce((total, expense) => total + expense.amount, 0);
  document.querySelector("#manager-account-collected").textContent = `₹${numberFormat.format(collected)}`;
  document.querySelector("#manager-account-carry-forward").textContent = `₹${numberFormat.format(carryForward)}`;
  document.querySelector("#manager-account-expenditure").textContent = `₹${numberFormat.format(expenditure)}`;
  document.querySelector("#manager-account-year-label").textContent = `in ${eventYear}`;
  document.querySelector("#manager-carry-forward-label").textContent = "Last Year Carry Forward (₹)";
  document.querySelector("#manager-carry-forward-summary-label").textContent = "Last Year Carry Forward";
  document.querySelector("#manager-account-balance").textContent = `₹${numberFormat.format(collected + carryForward - expenditure)}`;
}

function renderManagerExpenses() {
  const fragment = document.createDocumentFragment();
  [...editingExpenses].sort((left, right) => right.date.localeCompare(left.date)).forEach((expense) => {
    const row = document.createElement("tr");
    row.dataset.expenseId = expense.id;
    [
      ["date", "date", expense.date],
      ["part", "text", expense.part],
      ["amount", "number", String(expense.amount)],
      ["year", "number", String(expense.year)],
    ].forEach(([field, type, value]) => {
      const cell = document.createElement("td");
      cell.dataset.label = field === "date" ? "Date" : field === "part" ? "Expenditure on" : field === "amount" ? "Amount (₹)" : "Year";
      const input = document.createElement("input");
      input.className = `expense-input expense-${field}`;
      input.type = type;
      input.value = value;
      input.dataset.expenseField = field;
      input.setAttribute("aria-label", cell.dataset.label);
      if (field === "part") input.maxLength = 120;
      if (field === "amount") {
        input.min = "0.01";
        input.step = "0.01";
        input.inputMode = "decimal";
      }
      if (field === "year") {
        input.min = String(BASE_YEAR);
        input.max = "9999";
        input.step = "1";
        input.inputMode = "numeric";
      }
      input.required = true;
      cell.append(input);
      row.append(cell);
    });
    const removeCell = document.createElement("td");
    removeCell.className = "expense-remove-cell";
    removeCell.dataset.label = "Remove";
    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "remove-row";
    removeButton.dataset.removeExpense = expense.id;
    removeButton.setAttribute("aria-label", `Remove expense ${expense.part}`);
    removeButton.textContent = "×";
    removeCell.append(removeButton);
    row.append(removeCell);
    fragment.append(row);
  });
  expenseRows.replaceChildren(fragment);
  renderManagerExpenseTotals();
}

function setExpenseStatus(message, isError = false) {
  expenseStatus.textContent = message;
  expenseStatus.classList.toggle("is-error", isError);
}

function applyEventSettings() {
  document.querySelector("#page-title").textContent = `${eventTitle} ${eventYear} Karkatta`;
  document.querySelector('meta[name="description"]').content = `The Karkatta ${eventTitle} ${eventYear} community page, photo gallery and member contribution register.`;
  document.querySelector(".brand").setAttribute("aria-label", `${eventTitle} Karkatta home`);
  document.querySelector("#brand-event-title").textContent = eventTitle;
  document.querySelector("#brand-event-year").textContent = `KARKATTA  ${eventYear}`;
  document.querySelector("#hero-eyebrow").textContent = heroEyebrow;
  document.querySelector("#hero-description").textContent = heroDescription;
  document.querySelector("#hero-caption").textContent = heroCaption;
  document.querySelector("#hero-event-title").textContent = eventTitle;
  document.querySelector("#hero-year").textContent = String(eventYear);
  document.querySelector("#hero-event-label").textContent = eventTitle;
  document.querySelector("#hero-event-year").textContent = String(eventYear);
  document.querySelector("#register-panel-title").textContent = `${eventTitle} members register ${eventYear}`;
  document.querySelector("#carry-forward-label").textContent = "Last Year Carry Forward";
  document.querySelector("#carry-forward-amount").textContent = `₹${numberFormat.format(financeCarryForward)}`;
  document.querySelector("#carry-forward-note").textContent = `included in ${eventYear} Hisab balance`;
  document.querySelector(".register-footnote").textContent = `Source: attached ${eventTitle} ${eventYear} register. The ${eventYear - 1} fund balance is shown separately.`;
  document.querySelector("#footer-event-year").textContent = `${eventTitle.toUpperCase()} ${eventYear}`;
  eventTitleInput.value = eventTitle;
  eventYearInput.value = String(eventYear);
  expenseYearInput.value = String(eventYear);
  carryForwardInput.value = String(editingFinanceCarryForward);
  heroEyebrowInput.value = heroEyebrow;
  heroDescriptionInput.value = heroDescription;
  heroCaptionInput.value = heroCaption;
  const heroImage = document.querySelector("#hero-background-image");
  heroImage.hidden = !heroImagePath;
  if (heroImagePath) heroImage.src = storageObjectUrl(heroImagePath);
  else heroImage.removeAttribute("src");
  removeHeroPhotoButton.disabled = !heroImagePath || !mediaAuthorized;
  renderAccounts();
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
  editingExpenses = financeExpenses.map((expense) => ({ ...expense }));
  editingFinanceCarryForward = financeCarryForward;
  applyEventSettings();
  renderEditor();
  renderManagerExpenses();
  editorStatus.textContent = "Changes are not saved until you select Save.";
  editorStatus.classList.remove("is-error");
  editorDialog.classList.add("is-manager");
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
      throw new Error("This account is not authorized for Admin. In Supabase, set app_metadata.register_admin to true for this user, then sign out and sign in again.");
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
    const rawValue = target.value;
    const cursor = target.selectionStart;
    const sanitizedValue = sanitizeMemberName(rawValue);
    if (sanitizedValue !== rawValue) {
      target.value = sanitizedValue;
      const nextCursor = sanitizeMemberName(rawValue.slice(0, cursor)).length;
      target.setSelectionRange(nextCursor, nextCursor);
    }
    member.name = sanitizedValue;
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
publicMemberSearch.addEventListener("input", () => renderPublicMemberRows());

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

function localDateValue(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

carryForwardInput.addEventListener("input", () => {
  if (carryForwardInput.validity.badInput) return;
  const value = Number(carryForwardInput.value);
  if (!validCarryForward(value)) return;
  editingFinanceCarryForward = value;
  renderManagerExpenseTotals();
  setExpenseStatus("Unsaved Hisab changes.");
});

expenseDateInput.value = localDateValue();
expenseYearInput.value = String(eventYear);
document.querySelector("#add-expense").addEventListener("click", () => {
  const formInputs = [expensePartInput, expenseAmountInput, expenseDateInput, expenseYearInput];
  const invalidInput = formInputs.find((input) => !input.reportValidity());
  if (invalidInput) return;
  const part = expensePartInput.value.trim();
  const amount = Number(expenseAmountInput.value);
  const year = Number(expenseYearInput.value);
  if (!part || !Number.isFinite(amount) || amount <= 0 || !Number.isInteger(year) || year < BASE_YEAR || year > 9999) {
    setExpenseStatus("Enter a description, valid amount, date, and year.", true);
    return;
  }
  editingExpenses.push({
    id: `expense-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    part,
    amount,
    date: expenseDateInput.value,
    year,
  });
  expensePartInput.value = "";
  expenseAmountInput.value = "";
  expenseDateInput.value = localDateValue();
  expenseYearInput.value = String(eventYear);
  renderManagerExpenses();
  setExpenseStatus("Unsaved expenditure changes.");
});

expenseRows.addEventListener("input", (event) => {
  const input = event.target;
  const field = input.dataset.expenseField;
  const expense = editingExpenses.find((item) => item.id === input.closest("[data-expense-id]")?.dataset.expenseId);
  if (!expense || !field || input.validity.badInput || !input.validity.valid) return;
  if (field === "amount" || field === "year") {
    const value = Number(input.value);
    if (!Number.isFinite(value)) return;
    expense[field] = field === "year" ? Math.trunc(value) : value;
  } else {
    expense[field] = input.value.trim();
  }
  renderManagerExpenseTotals();
  setExpenseStatus("Unsaved expenditure changes.");
});

expenseRows.addEventListener("change", (event) => {
  const input = event.target;
  const field = input.dataset.expenseField;
  const expense = editingExpenses.find((item) => item.id === input.closest("[data-expense-id]")?.dataset.expenseId);
  if (!expense || !field) return;
  if (field === "amount" || field === "year") {
    const value = Number(input.value);
    if (!Number.isFinite(value)) return;
    expense[field] = field === "year" ? Math.trunc(value) : value;
  } else {
    expense[field] = input.value.trim();
  }
  renderManagerExpenses();
  setExpenseStatus("Unsaved expenditure changes.");
});

expenseRows.addEventListener("click", (event) => {
  const button = event.target.closest("[data-remove-expense]");
  if (!button) return;
  editingExpenses = editingExpenses.filter((expense) => expense.id !== button.dataset.removeExpense);
  renderManagerExpenses();
  setExpenseStatus("Unsaved expenditure changes.");
});

saveExpensesButton.addEventListener("click", async () => {
  if (!carryForwardInput.reportValidity()) {
    setExpenseStatus("Enter a valid carry-forward amount of zero or more.", true);
    return;
  }
  const nextCarryForward = Number(carryForwardInput.value);
  if (!validCarryForward(nextCarryForward)) {
    setExpenseStatus("Enter a valid carry-forward amount of zero or more.", true);
    return;
  }
  const invalidInput = expenseRows.querySelector(":invalid");
  if (invalidInput) {
    invalidInput.reportValidity();
    setExpenseStatus("Correct the highlighted expenditure details before saving.", true);
    return;
  }
  if (!supportsSharedFinance) {
    setExpenseStatus("Run the updated supabase-setup.sql before saving shared hisab data.", true);
    return;
  }
  if (!validFinanceExpenses(editingExpenses)) {
    setExpenseStatus("Each expenditure needs a description, positive amount, date, and year from 2026 onward.", true);
    return;
  }
  saveExpensesButton.disabled = true;
  setExpenseStatus("Saving shared Hisab…");
  const previousExpenses = financeExpenses;
  const previousCarryForward = financeCarryForward;
  financeExpenses = editingExpenses.map((expense) => ({ ...expense }));
  financeCarryForward = nextCarryForward;
  try {
    await saveSharedRegister(members, eventYear, eventTitle, supportsSharedEventTitle, supportsSharedSiteSettings, false, true, true);
  } catch (error) {
    financeExpenses = previousExpenses;
    financeCarryForward = previousCarryForward;
    setExpenseStatus(error.message || "Unable to save expenditures.", true);
    return;
  } finally {
    saveExpensesButton.disabled = false;
  }
  saveLocalRegister(members, eventYear, eventTitle);
  renderPublicRegister();
  renderAccounts();
  renderManagerExpenses();
  setExpenseStatus("Hisab and carry-forward saved and shared with everyone.");
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
  editorDialog.classList.remove("is-manager");
  loginStatus.textContent = "You have signed out.";
  editingExpenses = [];
  renderManagerExpenses();
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

function buildAccountsPdf(year, title, expenses) {
  const pageWidth = 842;
  const pageHeight = 595;
  const rowsPerPage = 22;
  const currentYearCollection = year === eventYear ? getReceivedTotal() : null;
  const carryForward = year === eventYear ? financeCarryForward : null;
  const expenditure = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const balance = currentYearCollection === null ? null : currentYearCollection + carryForward - expenditure;
  const pageCount = Math.max(1, Math.ceil(expenses.length / rowsPerPage));
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  ];
  const pageRefs = [];
  const text = (value, x, y, size, color = "0.16 0.15 0.14") =>
    `BT /F1 ${size} Tf ${color} rg 1 0 0 1 ${x} ${y} Tm ${pdfText(value)} Tj ET`;
  const rect = (x, y, width, height, color) =>
    `q ${color} rg ${x} ${y} ${width} ${height} re f Q`;

  for (let pageIndex = 0; pageIndex < pageCount; pageIndex += 1) {
    const first = pageIndex * rowsPerPage;
    const pageRows = expenses.slice(first, first + rowsPerPage);
    const commands = [
      rect(0, 0, pageWidth, pageHeight, "0.99 0.98 0.95"),
      rect(0, 562, pageWidth, 33, "0.20 0.36 0.30"),
      text("KARKATTA  |  PALAMU, JHARKHAND", 38, 574, 9, "1 0.96 0.87"),
      text(`${title} HISAB  |  ${year}`, 38, 538, 19, "0.16 0.30 0.24"),
      text(`Collection and expenditure  |  Page ${pageIndex + 1} of ${pageCount}`, 38, 520, 9, "0.42 0.39 0.35"),
    ];
    const summary = [
      ["COLLECTED", currentYearCollection === null ? "Not available" : `INR ${numberFormat.format(currentYearCollection)}`, "0.90 0.95 0.90"],
      [`${year - 1} CARRY-FORWARD`, carryForward === null ? "Not available" : `INR ${numberFormat.format(carryForward)}`, "0.91 0.95 0.90"],
      ["EXPENDITURE", `INR ${numberFormat.format(expenditure)}`, "0.98 0.93 0.85"],
      ["BALANCE", balance === null ? "Not available" : `INR ${numberFormat.format(balance)}`, balance !== null && balance < 0 ? "0.98 0.89 0.87" : "0.91 0.95 0.90"],
      ["EXPENSE ITEMS", String(expenses.length), "0.92 0.90 0.97"],
    ];
    summary.forEach(([label, value, color], index) => {
      const x = 38 + index * 153;
      commands.push(rect(x, 464, 145, 43, color));
      commands.push(text(label, x + 10, 490, 7, "0.38 0.34 0.30"));
      commands.push(text(value, x + 10, 474, 9, "0.16 0.30 0.24"));
    });

    const columns = [38, 142, 640, 804];
    const tableTop = 446;
    const rowHeight = 17;
    commands.push(rect(38, tableTop - 23, 766, 23, "0.20 0.36 0.30"));
    [["DATE", columns[0] + 8], ["EXPENDITURE ON", columns[1] + 8], ["AMOUNT (INR)", columns[2] + 8]]
      .forEach(([label, x]) => commands.push(text(label, x, tableTop - 15, 7, "1 0.97 0.91")));
    pageRows.forEach((expense, rowIndex) => {
      const y = tableTop - 23 - (rowIndex + 1) * rowHeight;
      commands.push(rect(38, y, 766, rowHeight, rowIndex % 2 === 0 ? "1 1 1" : "0.95 0.98 0.95"));
      commands.push(text(new Date(`${expense.date}T00:00:00`).toLocaleDateString(), columns[0] + 8, y + 5, 8));
      commands.push(text(expense.part.slice(0, 72), columns[1] + 8, y + 5, 8));
      commands.push(text(numberFormat.format(expense.amount), columns[2] + 8, y + 5, 8));
      commands.push(`q 0.87 0.84 0.79 RG 0.4 w ${columns[0]} ${y} m ${columns[3]} ${y} l S Q`);
    });
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

function getAccountPdfData() {
  const year = Number(accountsYearFilter.value) || eventYear;
  const expenses = financeExpenses.filter((expense) => expense.year === year);
  return { year, expenses };
}

function accountPdfFileName(year) {
  return `karkatta-hisab-${year}.pdf`;
}

function openAccountsPdf(statusElement) {
  const { year, expenses } = getAccountPdfData();
  const fileName = accountPdfFileName(year);
  const url = URL.createObjectURL(buildAccountsPdf(year, eventTitle, expenses));
  const viewer = window.open(url, "_blank");
  if (!viewer) {
    URL.revokeObjectURL(url);
    downloadAccountsPdf(statusElement);
    return;
  }
  viewer.opener = null;
  window.setTimeout(() => URL.revokeObjectURL(url), 5 * 60 * 1000);
  statusElement.textContent = `Opened ${fileName}. Use the PDF viewer to save or print.`;
}

function downloadAccountsPdf(statusElement) {
  const { year, expenses } = getAccountPdfData();
  const fileName = accountPdfFileName(year);
  const url = URL.createObjectURL(buildAccountsPdf(year, eventTitle, expenses));
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.style.display = "none";
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
  statusElement.textContent = `Downloaded ${fileName}.`;
}

function handlePdfError(statusElement, error) {
  if (statusElement) statusElement.textContent = error.message || "Unable to create the PDF.";
}

const publicPdfStatus = document.querySelector("#public-pdf-status");
document.querySelector("#accounts-refresh").addEventListener("click", async (event) => {
  const button = event.currentTarget;
  button.disabled = true;
  accountsStatus.textContent = "Refreshing collection and expenditure data…";
  accountsStatus.classList.remove("is-error");
  try {
    await loadSharedRegister(false, null, accountsStatus);
  } finally {
    button.disabled = false;
  }
});
document.querySelector("#accounts-view-pdf").addEventListener("click", () => {
  try { openAccountsPdf(accountsStatus); }
  catch (error) { handlePdfError(accountsStatus, error); }
});
document.querySelector("#accounts-download-pdf").addEventListener("click", () => {
  try { downloadAccountsPdf(accountsStatus); }
  catch (error) { handlePdfError(accountsStatus, error); }
});
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
const galleryYearFilter = document.querySelector("#gallery-year-filter");
const galleryCards = document.querySelector("#gallery-cards");
const galleryEmpty = document.querySelector("#gallery-empty");
const mediaUploadYear = document.querySelector("#media-upload-year");
const managerGalleryYearFilter = document.querySelector("#manager-gallery-year-filter");
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
  if (manager) {
    const year = document.createElement("div");
    year.className = "media-year";
    year.textContent = String(item.year || BASE_YEAR);
    card.append(year);
  }
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
  const years = [...new Set([BASE_YEAR, ...galleryMedia.map((item) => item.year || BASE_YEAR)])]
    .sort((left, right) => right - left);
  const currentPublicYear = Number(galleryYearFilter.value) || BASE_YEAR;
  const currentManagerYear = managerGalleryYearFilter.value || "all";
  galleryYearFilter.replaceChildren(...years.map((year) => {
    const option = document.createElement("option");
    option.value = String(year);
    option.textContent = String(year);
    return option;
  }));
  managerGalleryYearFilter.replaceChildren(
    new Option("All years", "all"),
    ...years.map((year) => new Option(String(year), String(year)))
  );
  galleryYearFilter.value = years.includes(currentPublicYear) ? String(currentPublicYear) : String(BASE_YEAR);
  managerGalleryYearFilter.value = years.some((year) => String(year) === currentManagerYear) ? currentManagerYear : "all";
  const selectedYear = Number(galleryYearFilter.value);
  const publicMedia = galleryMedia.filter((item) => (item.year || BASE_YEAR) === selectedYear);
  const managedMedia = galleryMedia.filter((item) =>
    managerGalleryYearFilter.value === "all" || (item.year || BASE_YEAR) === Number(managerGalleryYearFilter.value)
  );
  galleryCards.hidden = selectedYear !== BASE_YEAR;
  mediaGrid.replaceChildren(...publicMedia.map((item) => createMediaCard(item)));
  managerMediaGrid.replaceChildren(...managedMedia.map((item) => createMediaCard(item, true)));
  galleryEmpty.hidden = selectedYear === BASE_YEAR || publicMedia.length > 0;
  galleryEmpty.textContent = `No celebration photos or videos are available for ${selectedYear} yet.`;
}

async function saveManagerSection(button, statusTarget, successMessage) {
  if (!authSession || authSession.expires_at <= Date.now() / 1000) {
    statusTarget.textContent = "Your admin session has expired. Sign in again before saving this section.";
    statusTarget.classList.add("is-error");
    return;
  }
  button.disabled = true;
  statusTarget.textContent = "Saving shared section…";
  statusTarget.classList.remove("is-error");
  try {
    await saveSharedRegister(members, eventYear, eventTitle);
  } catch (error) {
    statusTarget.textContent = error.message || "Unable to save this section.";
    statusTarget.classList.add("is-error");
    return;
  } finally {
    button.disabled = false;
  }
  saveLocalRegister(members, eventYear, eventTitle);
  statusTarget.textContent = successMessage;
}

document.querySelector("#save-member-photos").addEventListener("click", (event) => {
  saveManagerSection(event.currentTarget, memberPhotoStatus, "Member photo changes are saved and shared.");
});
document.querySelector("#save-gallery-media").addEventListener("click", (event) => {
  saveManagerSection(event.currentTarget, mediaStatus, "Gallery changes are saved and shared.");
});

galleryYearFilter.addEventListener("change", renderGalleryMedia);
managerGalleryYearFilter.addEventListener("change", renderGalleryMedia);

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
  const year = Number(mediaUploadYear.value);
  if (!Number.isInteger(year) || year < BASE_YEAR || year > 9999) {
    mediaUploadYear.setCustomValidity(`Enter a year from ${BASE_YEAR} to 9999.`);
    mediaUploadYear.reportValidity();
    mediaUploadYear.setCustomValidity("");
    throw new Error(`Choose a valid gallery year from ${BASE_YEAR} to 9999.`);
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
    const item = { id: path, name: file.name, type: file.type, path, caption, year };
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
loadSharedRegister(false, null, publicRefreshStatus);

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && !editorDialog.open) {
    publicRefreshStatus.textContent = "Checking for the latest shared data…";
    publicRefreshStatus.classList.remove("is-error");
    loadSharedRegister(false, null, publicRefreshStatus);
  }
});
