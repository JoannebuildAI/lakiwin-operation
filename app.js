/* =========================================================
   LakiWin 營運工作分派表 — 頁面產生程式
   一般維護「不需要」動這個檔案。
   要改資料請改 data.js；要改樣式請改 styles.css。
   這個檔案只負責把 data.js 的資料畫到頁面上。
   ========================================================= */

// 進度狀態 → CSS class 對照表
const STATUS_CLASS = {
  "尚待填寫": "s-pending",
  "尚未開始": "s-notstart",
  "規劃中":   "s-planning",
  "進行中":   "s-doing",
  "待確認":   "s-waiting",
  "暫停":     "s-paused",
  "已完成":   "s-done"
};

// 簡單的 HTML 逃脫，避免資料中的特殊字元破壞版面
function esc(text) {
  return String(text == null ? "" : text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// 角色名稱 → 樣式分類
function roleClass(role) {
  if (role.indexOf("產品") !== -1) return "product";
  if (role.indexOf("主要") !== -1) return "primary";
  return "support";
}

// 產生「負責人／角色」欄位內容
function renderOwners(owners) {
  if (!owners) return "";
  // 有角色區分
  if (Array.isArray(owners.roles) && owners.roles.length) {
    const rows = owners.roles.map(function (r) {
      return '<div class="role ' + roleClass(r.role) + '">' +
             '<span class="role-label">' + esc(r.role) + '</span>' +
             '<span class="owner">' + esc(r.name) + '</span></div>';
    }).join("");
    return '<div class="role-stack">' + rows + '</div>';
  }
  // 無角色區分：多人以「、」相連
  const names = Array.isArray(owners.names) ? owners.names : [];
  return '<span class="owner">' + esc(names.join("、")) + '</span>';
}

// 產生狀態徽章
function renderStatus(status) {
  const label = status || "尚待填寫";
  const cls = STATUS_CLASS[label] || "s-pending";
  return '<span class="status ' + cls + '">' + esc(label) + '</span>';
}

// 產生進度列
function renderProgress(progress) {
  const p = progress || {};
  const desc = p.description;
  let descHtml;
  if (Array.isArray(desc) && desc.length) {
    // 條列式
    descHtml = '<ul class="progress-list">' +
      desc.map(function (d) { return '<li>' + esc(d) + '</li>'; }).join("") +
      '</ul>';
  } else if (desc && String(desc).trim() !== "") {
    // 單行文字
    descHtml = '<span class="progress-desc">' + esc(desc) + '</span>';
  } else {
    // 留空
    descHtml = '<span class="progress-desc empty">尚待填寫</span>';
  }
  const dateHtml = (p.updatedAt && String(p.updatedAt).trim() !== "")
    ? '<span class="progress-date">最後更新：' + esc(p.updatedAt) + '</span>'
    : '';
  return '<tr class="progress-row">' +
         '<td class="progress-label">目前進度</td>' +
         '<td colspan="3"><div class="progress-body">' +
         renderStatus(p.status) + descHtml + dateHtml +
         '</div></td></tr>';
}

// 產生一個項目（項目列 + 進度列）
function renderTask(task) {
  const focusClass = task.focus ? " focus" : "";
  const itemRow =
    '<tr class="item-row' + focusClass + '">' +
    '<td class="path">' + esc(task.category) + '</td>' +
    '<td><span class="type">' + esc(task.type) + '</span></td>' +
    '<td>' + esc(task.description) + '</td>' +
    '<td>' + renderOwners(task.owners) + '</td></tr>';
  return itemRow + renderProgress(task.progress);
}

// 主程式：把資料畫到頁面
function build() {
  // 標題區
  if (typeof META !== "undefined" && META) {
    const eyebrowEl = document.getElementById("eyebrow");
    const titleEl = document.getElementById("title");
    const metaEl = document.getElementById("updated");
    if (eyebrowEl && META.eyebrow) eyebrowEl.textContent = META.eyebrow;
    if (titleEl && META.title) titleEl.textContent = META.title;
    if (metaEl && META.updatedDate) metaEl.textContent = "更新日期｜" + META.updatedDate;
    if (META.title) document.title = META.title;
  }

  // 表格內容
  const tbody = document.getElementById("tbody");
  if (!tbody) return;
  if (typeof TASKS === "undefined" || !Array.isArray(TASKS)) {
    tbody.innerHTML = '<tr><td colspan="4">找不到資料（data.js 未正確載入）。</td></tr>';
    return;
  }
  tbody.innerHTML = TASKS.map(renderTask).join("");
}

document.addEventListener("DOMContentLoaded", build);
