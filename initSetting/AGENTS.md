# Antigravity 前端規範入口 (基於 clinerule.md)

> **[核心 AI 指令]**
> 作為 Antigravity AI 助理，你在開始執行任何任務前，必須**優先發動讀取檔案工具**，閱讀並嚴格遵守下列索引檔案：
> 👉 `my-ai/AGENTS.md`

---

## 專案資訊

| 項目     | 值                                         |
| -------- | ------------------------------------------ |
| 專案類型 | 前端（Frontend）                           |
| 框架     | （請依實際專案填寫：Vue / Nuxt / Angular） |
| 規範倉庫 | `./my-ai/`（submodule）                    |

---

## my-ai 規範索引

本 repo 使用 `my-ai/` 作為 AI 輔助開發規範的子模組。以下為關鍵參考檔案：

| 類型                        | 路徑                                | 說明                                       |
| --------------------------- | ----------------------------------- | ------------------------------------------ |
| **AI 總入口（必須讀取）**     | `my-ai/AGENTS.md`                   | 專案完整規範、行為準則、框架設定與引導師系統 |
| AI 行為準則 (Claude)         | `my-ai/CLAUDE.md`                   | 核心四原則等 AI 行為準則                   |
| Plan 規格書規範             | `my-ai/PLAN_SPEC.md`                | Plan 撰寫結構、Phase 順序、I/O 規範        |
| 效能規範                    | `my-ai/performance-rules.md`        | 大量資料渲染、API 批次呼叫、WebSocket 效能 |
| 測試計畫規範                | `my-ai/testing/TEST_PLAN_SPEC.md`   | 測試計畫撰寫規範                           |
| 測試腳本規範                | `my-ai/testing/testing-rules.md`    | 測試腳本撰寫規範                           |

---

## 專案自訂規則

> 以下為專案級別的客製化設定：

# 1. 語言與溝通風格

- 請一律使用「繁體中文 (Traditional Chinese)」進行對話與程式碼註解。

<!--
### 命名慣例
- 元件檔案：PascalCase（如 `UserList.component.ts`）
- 服務檔案：kebab-case（如 `user-api.service.ts`）
- ...

### 目錄結構
- ...

### UI 框架 / 元件庫
- ...

### API 串接規範
- ...

### 狀態管理
- ...
-->

---

_本檔案將放置於專案根目錄下的 `AGENTS.md`，作為 Antigravity 自動載入的第一入口。_
