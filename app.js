const STORAGE_KEY = "chhath-puja-2026-members";
const SUPABASE_URL = "https://qxxosdobwekiminhruse.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_QSWu8a0Hity972oLGMcACg_XttGKNCw";
const SHARED_REGISTER_ID = "chhath-puja-2026";
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
const editorDialog = document.querySelector("#member-editor");
const editorRows = document.querySelector("#editor-rows");
const editorStatus = document.querySelector("#editor-status");
const loginForm = document.querySelector("#admin-login");
const loginStatus = document.querySelector("#login-status");
const editorContent = document.querySelector("#editor-content");
const closeLoginButton = document.querySelector("#close-login");
const eventYearInput = document.querySelector("#event-year");
const addMemberButton = document.querySelector("#add-member");
const saveMembersButton = document.querySelector("#save-members");
const dropZone = document.querySelector("#drop-zone");
const mediaInput = document.querySelector("#media-input");
const chooseMediaButton = document.querySelector("#choose-media");
const managerSignoutButton = document.querySelector("#manager-signout");
const numberFormat = new Intl.NumberFormat("en-IN");
const BASE_YEAR = 2026;
const loadedRegister = loadRegister();
let members = loadedRegister.members;
let eventYear = loadedRegister.year;
let editingMembers = [];
let authSession = null;
let mediaAuthorized = false;

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
    member.received >= 0
  );
}

function loadRegister() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === null) {
      return { members: ORIGINAL_MEMBERS.map((member) => ({ ...member })), year: BASE_YEAR };
    }
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed)) {
      if (!isValidMembers(parsed)) throw new Error("Saved register has an invalid format.");
      return { members: parsed, year: BASE_YEAR };
    }
    if (!parsed || !isValidMembers(parsed.members) || !isValidYear(parsed.year)) {
      throw new Error("Saved register has an invalid format.");
    }
    return parsed;
  } catch (error) {
    setSaveStatus("Could not load saved edits; showing the original register.", true);
    return { members: ORIGINAL_MEMBERS.map((member) => ({ ...member })), year: BASE_YEAR };
  }
}

function setSaveStatus(message, isError = false) {
  if (!editorContent.hidden) {
    editorStatus.textContent = message;
    editorStatus.classList.toggle("is-error", isError);
  }
}

function saveLocalRegister(value, year) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ members: value, year }));
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

async function loadSharedRegister() {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/shared_register?id=eq.${encodeURIComponent(SHARED_REGISTER_ID)}&select=members,event_year`,
      {
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
    members = register.members;
    eventYear = register.event_year;
    saveLocalRegister(members, eventYear);
    applyEventYear();
    renderEditor();
    setSaveStatus("Shared register loaded");
    return true;
  } catch (error) {
    setSaveStatus(`Shared register unavailable: ${error.message}`, true);
    return false;
  }
}

async function saveSharedRegister(value, year) {
  if (!authSession || authSession.expires_at <= Date.now() / 1000) {
    authSession = null;
    throw new Error("Admin session expired. Close this window and sign in again.");
  }
  const response = await fetch(`${SUPABASE_URL}/rest/v1/shared_register?on_conflict=id`, {
    method: "POST",
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
    }),
  });
  await getApiResult(response);
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

function updateRegisterSummary() {
  const pledged = editingMembers.reduce((total, member) => total + member.amount, 0);
  const received = editingMembers.reduce((total, member) => total + member.received, 0);
  document.querySelector("#member-total").textContent = numberFormat.format(editingMembers.length);
  document.querySelector("#pledged-total").textContent = `₹${numberFormat.format(pledged)}`;
  document.querySelector("#received-total").textContent = `₹${numberFormat.format(received)}`;
}

function applyEventYear() {
  document.querySelector("#page-title").textContent = `Chhath Puja ${eventYear} · Karkatta`;
  document.querySelector('meta[name="description"]').content = `The Karkatta Chhath Puja ${eventYear} community page, photo gallery and member contribution register.`;
  document.querySelector("#brand-event-year").textContent = `KARKATTA · ${eventYear}`;
  document.querySelector("#hero-year").textContent = String(eventYear);
  document.querySelector("#hero-event-year").textContent = String(eventYear);
  document.querySelector("#register-panel-title").textContent = `Members register · ${eventYear}`;
  document.querySelector("#carry-forward-label").textContent = `${eventYear - 1} carry-forward`;
  document.querySelector("#carry-forward-note").textContent = `not included in ${eventYear} totals`;
  document.querySelector(".register-footnote").textContent = `Source: attached Chhath Puja ${eventYear} register. The ${eventYear - 1} fund balance is shown separately.`;
  document.querySelector("#footer-event-year").textContent = `CHHATH PUJA · ${eventYear}`;
}

function openEditor() {
  const signedIn = authSession && authSession.expires_at > Date.now() / 1000;
  mediaAuthorized = Boolean(signedIn);
  mediaInput.disabled = !mediaAuthorized;
  chooseMediaButton.disabled = !mediaAuthorized;
  loginForm.hidden = Boolean(signedIn);
  editorContent.hidden = !signedIn;
  loginStatus.textContent = "";
  if (signedIn) prepareEditor();
  editorDialog.showModal();
}

function prepareEditor() {
  editingMembers = members.map((member) => ({ ...member }));
  eventYearInput.value = String(eventYear);
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
  try {
    const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_PUBLISHABLE_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: document.querySelector("#admin-email").value.trim(),
        password: document.querySelector("#admin-password").value,
      }),
    });
    const result = await response.json();
    if (!response.ok) {
      const message = result.msg || result.message || "Sign-in failed.";
      if (message.toLowerCase().includes("invalid api key")) {
        throw new Error("Supabase rejected the configured publishable key. Copy the Publishable key from Settings → API Keys in the same project as the configured Supabase URL, then replace SUPABASE_PUBLISHABLE_KEY in app.js.");
      }
      throw new Error(message);
    }
    if (result.user?.app_metadata?.register_admin !== true) {
      throw new Error("This account is not authorized to edit the shared register.");
    }
    authSession = {
      access_token: result.access_token,
      expires_at: result.expires_at || Math.floor(Date.now() / 1000) + result.expires_in,
    };
    mediaAuthorized = true;
    mediaInput.disabled = false;
    chooseMediaButton.disabled = false;
    const loaded = await loadSharedRegister();
    if (!loaded) {
      authSession = null;
      mediaAuthorized = false;
      mediaInput.disabled = true;
      chooseMediaButton.disabled = true;
      throw new Error("Could not load the shared register. Check the Supabase API key and table setup, then try again.");
    }
    prepareEditor();
    loginForm.reset();
  } catch (error) {
    loginStatus.textContent = error.message || "Unable to sign in.";
    loginStatus.classList.add("is-error");
  } finally {
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

eventYearInput.addEventListener("input", () => {
  editorStatus.textContent = "Unsaved changes";
  editorStatus.classList.remove("is-error");
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
  const invalidInput = editorContent.querySelector(":invalid");
  if (invalidInput) {
    invalidInput.reportValidity();
    editorStatus.textContent = invalidInput === eventYearInput
      ? "Enter a valid celebration year between 1 and 9999."
      : "Correct the highlighted amount before saving.";
    editorStatus.classList.add("is-error");
    return;
  }
  const nextYear = Number(eventYearInput.value);
  if (!isValidYear(nextYear)) {
    eventYearInput.setCustomValidity("Enter a year between 1 and 9999.");
    eventYearInput.reportValidity();
    eventYearInput.setCustomValidity("");
    editorStatus.textContent = "Enter a valid celebration year between 1 and 9999.";
    editorStatus.classList.add("is-error");
    return;
  }
  saveMembersButton.disabled = true;
  editorStatus.textContent = "Saving shared register…";
  try {
    await saveSharedRegister(editingMembers, nextYear);
  } catch (error) {
    editorStatus.textContent = error.message || "Unable to save the shared register.";
    editorStatus.classList.add("is-error");
    return;
  } finally {
    saveMembersButton.disabled = false;
  }
  saveLocalRegister(editingMembers, nextYear);
  members = editingMembers.map((member) => ({ ...member }));
  eventYear = nextYear;
  applyEventYear();
  renderEditor();
  editorStatus.textContent = "Changes saved successfully for everyone.";
  editorStatus.classList.remove("is-error");
  setSaveStatus("Shared register updated successfully.");
});

closeLoginButton.addEventListener("click", () => editorDialog.close());
document.querySelector("#close-manager").addEventListener("click", () => editorDialog.close());
managerSignoutButton.addEventListener("click", () => {
  authSession = null;
  mediaAuthorized = false;
  mediaInput.disabled = true;
  chooseMediaButton.disabled = true;
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

document.querySelector("#export-pdf").addEventListener("click", () => {
  window.print();
});

const mediaGrid = document.querySelector("#media-grid");
const mediaStatus = document.querySelector("#media-status");
const mediaUrls = new Set();
const maxFileSize = 30 * 1024 * 1024;
mediaInput.disabled = true;

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
  addMediaFiles(mediaInput.files);
  mediaInput.value = "";
});

function addMediaFiles(files) {
  if (!mediaAuthorized || !authSession || authSession.expires_at <= Date.now() / 1000) return;
  let added = 0;
  for (const file of files) {
    if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
      mediaStatus.textContent = `Skipped ${file.name}: choose an image or video file.`;
      mediaStatus.classList.add("is-error");
      continue;
    }
    if (file.size > maxFileSize) {
      mediaStatus.textContent = `Skipped ${file.name}: the maximum file size is 30 MB.`;
      mediaStatus.classList.add("is-error");
      continue;
    }
    const url = URL.createObjectURL(file);
    mediaUrls.add(url);
    const card = document.createElement("article");
    card.className = "media-card";
    const preview = document.createElement(file.type.startsWith("video/") ? "video" : "img");
    preview.src = url;
    if (preview instanceof HTMLVideoElement) {
      preview.controls = true;
      preview.preload = "metadata";
    } else {
      preview.alt = file.name;
    }
    const name = document.createElement("div");
    name.className = "media-name";
    name.textContent = file.name;
    card.append(preview, name);
    const managerCard = card.cloneNode(true);
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "media-remove";
    remove.setAttribute("aria-label", `Remove ${file.name}`);
    remove.textContent = "×";
    const removeMedia = () => {
      URL.revokeObjectURL(url);
      mediaUrls.delete(url);
      card.remove();
      managerCard.remove();
      document.querySelector(".gallery-empty").hidden = mediaGrid.children.length > 0;
    };
    remove.addEventListener("click", removeMedia);
    managerCard.append(remove);
    mediaGrid.append(card);
    document.querySelector("#manager-media-grid").append(managerCard);
    document.querySelector(".gallery-empty").hidden = true;
    added += 1;
  }
  if (added > 0) {
    mediaStatus.textContent = `${added} ${added === 1 ? "file" : "files"} added. Previews last for this session only.`;
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
    if (eventName === "drop") addMediaFiles(event.dataTransfer.files);
  });
}

window.addEventListener("beforeunload", () => {
  for (const url of mediaUrls) URL.revokeObjectURL(url);
});

applyEventYear();
loadSharedRegister();

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && !editorDialog.open) loadSharedRegister();
});
