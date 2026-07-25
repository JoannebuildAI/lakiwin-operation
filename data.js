/*
 * LakiWin 營運工作分派與進度追蹤 — 唯一資料來源
 * =================================================
 * 這個檔案是整個頁面唯一的資料來源。
 * 要新增項目、修改負責人、或更新進度，都只需要改這個檔案，
 * 然後 commit + push 到 GitHub，GitHub Pages 會自動更新。
 *
 * 詳細操作步驟請看 README.md。
 *
 * ── 進度說明（progress.description）兩種寫法 ──
 *   1. 單行文字：  description: "已與廠商完成初步洽談。"
 *   2. 條列式（多點）：用中括號陣列，每點一個字串
 *        description: [
 *          "【已完成】第一點",
 *          "【待確認】第二點"
 *        ]
 *   留空 "" 會顯示灰色「尚待填寫」。
 *
 * ── 進度狀態（progress.status）只能填以下其中一個文字 ──
 *   尚待填寫   （預設，尚未有人回報進度時使用）
 *   尚未開始
 *   規劃中
 *   進行中
 *   待確認
 *   暫停
 *   已完成
 *
 * ── 負責人（owners）兩種寫法，可混用 ──
 *   1. 沒有角色區分：直接用 names 陣列
 *        { "names": ["王巧玲"] }
 *        { "names": ["陳立恩", "黃士懿"] }
 *   2. 有角色區分：用 roles 陣列，每筆有 role（角色名稱）與 name（姓名）
 *        { "roles": [ { "role": "主要", "name": "蕭楨憶" },
 *                     { "role": "輔助", "name": "劉郡庭" } ] }
 *   角色名稱可自由填寫，常見有：主要、輔助、主要維運、產品設計。
 */

const META = {
  title: "LakiWin 營運指南地圖｜工作分派表",
  eyebrow: "Operations Ownership Map",
  updatedDate: "2026.07.20"
};

const TASKS = [
  {
    category: "玩家遊玩歷程 ＞ 帳號註冊",
    type: "OTP 簡訊",
    description: "OTP 簡訊發送、接收及相關處理",
    owners: { names: ["王巧玲"] },
    progress: { status: "待確認", description: "待確認", updatedAt: "2026.07.21" }
  },
  {
    category: "玩家遊玩歷程 ＞ KYC",
    type: "KYC 合規",
    description: "KYC 流程、驗證要求及 PAGCOR 合規事項",
    owners: { names: ["劉欣枚"] },
    progress: {
      status: "進行中",
      description: [
        "【已完成】KYC 流程已全部確認清楚",
        "【已完成】KYC 相關廠商文件已整理完成",
        "【待確認】完整的 KYC 項目包含哪些",
        "【待確認】最低限度可先開放哪些 KYC 項目",
        "【待確認】是否需要導入 KYC 廠商"
      ],
      updatedAt: "2026.07.21"
    }
  },
  {
    category: "玩家遊玩歷程 ＞ 上下分",
    type: "金流",
    description: "上分、下分及相關金流處理",
    owners: { names: ["陳立恩", "黃士懿"] },
    progress: { status: "尚待填寫", description: "", updatedAt: "" }
  },
  {
    category: "玩家遊玩歷程 ＞ 客服與 CRM",
    type: "客服／CRM",
    description: "客服處理、玩家維繫、召回及 CRM 執行",
    owners: {
      roles: [
        { role: "主要", name: "黃柏翔、何堉詮" },
        { role: "輔助", name: "余胤霆" }
      ]
    },
    progress: { status: "尚待填寫", description: "", updatedAt: "" }
  },
  {
    category: "活動與獎勵",
    type: "活動送審",
    description: "活動方案、獎勵內容及 PAGCOR 送審",
    owners: { names: ["劉欣枚"] },
    progress: { status: "尚待填寫", description: "", updatedAt: "" }
  },
  {
    category: "活動與獎勵",
    type: "推廣合作",
    description: "尋找推廣活動贊助商，以及與遊戲商洽談合作細節",
    owners: {
      roles: [
        { role: "主要", name: "劉欣枚" },
        { role: "輔助", name: "陳立恩" }
      ]
    },
    progress: { status: "尚待填寫", description: "", updatedAt: "" }
  },
  {
    category: "代理渠道 ＞ 網咖",
    type: "網咖渠道",
    description: "網咖洽談、合作執行及營運管理",
    owners: {
      roles: [
        { role: "主要", name: "黃柏翔、何堉詮" },
        { role: "輔助", name: "余胤霆" }
      ]
    },
    progress: { status: "尚待填寫", description: "", updatedAt: "" }
  },
  {
    category: "代理渠道 ＞ Sari-Sari Store",
    type: "Sari-Sari Store 渠道",
    description: "店家拓展、合作執行及營運管理",
    owners: {
      roles: [
        { role: "主要", name: "黃柏翔、何堉詮" },
        { role: "輔助", name: "余胤霆" }
      ]
    },
    progress: { status: "尚待填寫", description: "", updatedAt: "" }
  },
  {
    category: "代理渠道 ＞ KOL／網紅",
    type: "KOL 合作",
    description: "KOL／網紅開發、合作洽談及執行",
    owners: {
      roles: [
        { role: "主要", name: "蕭楨憶" },
        { role: "輔助", name: "劉郡庭" }
      ]
    },
    progress: { status: "尚待填寫", description: "", updatedAt: "" }
  },
  {
    category: "自製遊戲",
    type: "自製遊戲",
    description: "自製遊戲整體規劃、開發、上線及維運",
    owners: { names: ["梁家瑋"] },
    progress: { status: "尚待填寫", description: "", updatedAt: "" }
  },
  {
    category: "法規與合規流程",
    type: "法規與合規",
    description: "PAGCOR 法規、KYC、NDRP、責任博彩、稽核及送審",
    owners: {
      roles: [
        { role: "主要", name: "劉欣枚" },
        { role: "輔助", name: "卓緯倫" }
      ]
    },
    progress: { status: "進行中", description: "已與 Francis 確認完所有稽核項目", updatedAt: "2026.07.26" }
  },
  {
    category: "對帳流程",
    type: "對帳",
    description: "日結、GGR、遊戲商、代理商及金流對帳",
    owners: { names: ["卓緯倫"] },
    progress: { status: "尚待填寫", description: "", updatedAt: "" }
  },
  {
    category: "GCash Casual Game 導流",
    type: "GCash／Casual Game 導流",
    description: "分為兩部分：Casual Game 遊戲產品設計由台中辦公室負責；菲賓辦公室主要負責 GCash 與 GLife 完整生態及相關使用方式的摸索。",
    owners: {
      roles: [
        { role: "主要", name: "梁家瑋" },
        { role: "產品設計", name: "鄭郁儒" }
      ]
    },
    progress: { status: "尚待填寫", description: "", updatedAt: "" }
  }
];
