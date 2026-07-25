# LakiWin 營運工作分派與進度追蹤頁面

這是一份「長期維護」的營運管理頁面，用來記錄每個營運項目的負責人、工作內容與目前進度。
發布到 GitHub Pages 後會有一個「固定網址」，之後只要更新資料並上傳，網址不變、頁面自動更新。

> 這份說明是寫給**非工程人員**看的，照著步驟操作即可，不需要會寫程式。

---

## 1. 專案用途

- 集中管理 LakiWin 各營運項目的**負責人／角色分工**與**目前進度**。
- 資料集中在一個檔案（`data.js`），不用在一堆網頁標籤裡找內容。
- 透過 GitHub Pages 產生「固定公開網址」，方便團隊隨時查看、列印成 PDF。

---

## 2. 檔案結構

| 檔案 | 用途 | 你需要動它嗎？ |
|------|------|----------------|
| `index.html` | 頁面骨架（GitHub Pages 入口） | 幾乎不用 |
| `styles.css` | 全部視覺樣式（顏色、字體、版面） | 想調整外觀時才動 |
| **`data.js`** | **工作分派與進度資料（唯一資料來源）** | **✅ 平常只改這個** |
| `app.js` | 讀取 `data.js` 並把內容畫到頁面 | 不用動 |
| `README.md` | 本說明文件 | 需要時更新 |
| `.nojekyll` | 讓 GitHub Pages 原樣發布（技術用，勿刪） | 不用動 |
| `工作分配進度.html` | 原始來源檔備份（保留，不刪不改） | 不用動 |

**平常維護，你只需要打開並修改 `data.js` 這一個檔案。**

---

## 3. 如何新增一個營運項目

打開 `data.js`，在 `TASKS = [ ... ]` 的清單裡，複製一整段 `{ ... }`（從 `{` 到 `},`），
貼在最後一項後面，再把內容改成新項目。範例：

```js
  {
    category: "代理渠道 ＞ 新渠道",          // 營運項目名稱
    type: "新渠道類型",                      // 類型（會顯示成藍色小標籤）
    description: "這個項目的具體工作內容",     // 具體工作
    owners: { names: ["某某某"] },           // 負責人（見第 4 點）
    progress: { status: "尚待填寫", description: "", updatedAt: "" }
  },
```

注意事項：
- 每一段 `{ ... }` 後面要有逗號 `,`。
- 文字要用「半形雙引號」`"` 包起來。
- 想標成「重點項目」（左側綠色線＋淺色底），在項目裡加一行 `focus: true,`（可參考 GCash 那一項）。

---

## 4. 如何修改負責人

在該項目的 `owners` 欄位修改。有兩種寫法：

**（A）沒有角色區分**——直接列出姓名（多人會自動用「、」相連）：

```js
    owners: { names: ["陳立恩", "黃士懿"] },
```

**（B）有角色區分**——用 `roles`，每個人有「角色」和「姓名」：

```js
    owners: {
      roles: [
        { role: "主要", name: "蕭楨憶" },
        { role: "輔助", name: "劉郡庭" }
      ]
    },
```

- 角色名稱可自由填寫。常見有：`主要`、`輔助`、`主要維運`、`產品設計`。
- 角色標籤顏色會自動判斷：含「主要」→深藍、含「產品」→綠色、其他→灰色。

---

## 5. 如何更新目前進度

在該項目的 `progress` 欄位修改，總共三個部分：

```js
    progress: {
      status: "進行中",                       // 進度狀態（見第 6 點）
      description: "已完成廠商初步洽談，等待報價。", // 進度說明（可留空）
      updatedAt: "2026.07.21"                 // 最後更新日期（可留空）
    }
```

- `status`：狀態徽章，會依狀態顯示不同顏色。
- `description`：進度說明文字，留空會顯示灰色「尚待填寫」。
- `updatedAt`：最後更新日期，留空就不顯示。建議每次更新都填上，方便追蹤。

---

## 6. 進度狀態可使用哪些值

`status` 只能填以下其中一個（請完全照著打，含全形字）：

| 狀態值 | 意義 | 顏色 |
|--------|------|------|
| `尚待填寫` | 預設，還沒有人回報進度 | 灰 |
| `尚未開始` | 已規劃但還沒動工 | 淺灰藍 |
| `規劃中` | 正在規劃 | 藍 |
| `進行中` | 執行中 | 青綠 |
| `待確認` | 等待對方／主管確認 | 琥珀 |
| `暫停` | 暫時停止 | 暗紅 |
| `已完成` | 已完成 | 綠 |

> 若填了清單以外的文字，徽章會以灰色的「尚待填寫」樣式顯示，所以請務必照上表填寫。

---

## 7. 如何在本機預覽

**最簡單**：直接用瀏覽器打開 `index.html`（雙擊即可）。
本專案刻意使用 `data.js`（而非需要伺服器的 `data.json`），所以**不需要架伺服器**也能預覽。

如果想用網址方式預覽（更接近正式環境），可在資料夾中執行：

```bash
python3 -m http.server 8000
```

然後在瀏覽器打開 `http://localhost:8000/`。

---

## 8. 如何 Commit／Push（把修改上傳到 GitHub）

改完 `data.js` 後，在專案資料夾打開終端機，依序執行：

```bash
git add .
git commit -m "更新進度：KOL 合作改為進行中"   # 訊息可自由描述這次改了什麼
git push
```

> 第一次使用前，需要先完成第 9 點的「初次設定」。之後每次更新都只跑上面三行即可。

---

## 9. GitHub Pages 如何部署

### 初次設定（只需做一次）

1. 到 GitHub 網站建立一個新的 Repository（例如命名 `lakiwin-ops`）。
2. 在專案資料夾把本機內容連上這個 Repository（把下面的網址換成你的）：

   ```bash
   git remote add origin https://github.com/<你的帳號>/<repo名稱>.git
   git branch -M main
   git push -u origin main
   ```

3. 打開該 Repository 的 **Settings ➜ Pages**。
4. 在 **Build and deployment** 的 **Source** 選 **Deploy from a branch**。
5. **Branch** 選 `main`、資料夾選 `/ (root)`，按 **Save**。
6. 等待約 1～3 分鐘，頁面上方會出現你的固定網址。

> 本專案是純靜態網站，全部使用相對路徑，相容 GitHub Project Pages 的子路徑
> （例如 `https://<帳號>.github.io/<repo>/`），重新整理不會 404，也不需要 GitHub Actions。

### 之後每次更新

只要改 `data.js` → `git add . && git commit -m "..." && git push`，
GitHub Pages 會自動重新發布，**網址不變**。

---

## 10. 固定網址位於哪裡

部署成功後，固定網址會是：

```
https://<你的 GitHub 帳號>.github.io/<repo 名稱>/
```

實際網址會顯示在該 Repository 的 **Settings ➜ Pages** 頁面最上方。
**（請把這個網址記錄在這裡，方便團隊查閱）**：

- 正式網址：`https://joannebuildai.github.io/lakiwin-operation/`

---

## 11. 更新後多久會反映到正式頁面

- `git push` 之後，GitHub Pages 通常在 **1～3 分鐘**內完成更新（尖峰時偶爾到 5～10 分鐘）。
- 若沒看到更新，請**強制重新整理**瀏覽器（Mac：`Cmd + Shift + R`；Windows：`Ctrl + F5`）清掉快取。

---

## 12. 常見錯誤及排查方式

| 症狀 | 可能原因 | 解決方式 |
|------|----------|----------|
| 打開頁面整片空白、沒有表格 | `data.js` 有語法錯誤（少了逗號或引號） | 檢查最近改動：每段 `{ }` 後要有 `,`，文字要用 `"` 成對包住 |
| 某項目只顯示一半／整段跑掉 | 引號或括號沒有成對 | 對照第 3 點範例格式，補回缺漏的符號 |
| 進度徽章變成灰色「尚待填寫」 | `status` 填了清單以外的文字 | 照第 6 點的表格，填寫**完全一致**的狀態值 |
| 姓名或角色沒出現 | `owners` 格式寫錯 | 對照第 4 點的 (A)/(B) 兩種寫法 |
| GitHub Pages 顯示 404 | Pages 尚未設定或還在建置中 | 確認第 9 點的 Source／Branch 設定；等 1～3 分鐘後再試 |
| 改了卻沒更新 | 瀏覽器快取或 Pages 尚在發布 | 強制重新整理（`Cmd/Ctrl + Shift + R`）；稍等幾分鐘 |
| 中文變成亂碼 | 檔案編碼問題 | 存檔時請用 UTF-8 編碼（一般編輯器預設即是） |

---

## 附註：重要限制（請勿更動）

- **不要**改用瀏覽器 `contenteditable` 或 `localStorage` 當正式資料——那樣重整就消失、且每台裝置看到的不一樣。
  正式資料唯一來源就是 `data.js`。
- 若未來想做「直接在網頁上編輯並永久保存」，需要額外的後端／資料庫與登入機制，
  請先與工程人員討論（會涉及權限、資安與維護成本），不要自行加入。

---

## 13. 換一台電腦，如何恢復「自動推送」（換機設定）

> 資料都存在 GitHub，網站與網址永遠不變。換電腦只是要在新電腦上「重新放一次鑰匙」。
> Claude Code 的對話紀錄存在舊電腦本機，通常不會跟到新電腦，所以照這份步驟重做即可。

**固定資訊（不會變）**
- Repository：`https://github.com/JoannebuildAI/lakiwin-operation`
- 正式網址：`https://joannebuildai.github.io/lakiwin-operation/`
- GitHub 帳號：`JoannebuildAI`

**新電腦一次性設定（做完就能請 Claude Code 自動推送）**

1. 安裝 Claude Code，用同一個 Anthropic 帳號登入。
2. 打開「終端機」，把專案抓下來（會建立 `~/Desktop/lakiwin-operation` 資料夾）：
   ```
   cd ~/Desktop
   git clone https://github.com/JoannebuildAI/lakiwin-operation.git
   ```
   （若跳出要安裝「命令列工具（Command Line Tools）」，按安裝，裝完再執行一次。）
3. 準備 GitHub Token：可沿用舊的（沒過期的話），或到 `https://github.com/settings/tokens`
   重新 Generate new token (classic) → 勾 `repo` → 產生後複製。
4. 在終端機把 Token 存進這台電腦（把 你的TOKEN 換成實際的 ghp_...）：
   ```
   printf "protocol=https\nhost=github.com\nusername=JoannebuildAI\npassword=你的TOKEN\n\n" | git credential approve
   ```
   沒有訊息就是成功。
5. 之後在 Claude Code 打開 `~/Desktop/lakiwin-operation` 這個資料夾，直接請它更新內容即可，
   它就會自動 commit + push，網站 1～3 分鐘內更新。

**臨時應急（任何裝置、免設定）**
- 只要有瀏覽器，到 GitHub 打開 `data.js` → 鉛筆✏️編輯 → Commit，網站一樣會更新。
