# clinerule.md — 本 Repo 前端規範

> 本檔案為 `my-ai` AI 輔助開發系統的**前端規範入口**。
> 編輯 `.vue`、`.ts`、`.html`、`.scss`、`.component.*` 等前端檔案前，AI 會先讀取本檔案。

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
| AI 入口（Claude Code）      | `./my-ai/CLAUDE.md`                 | AI 自動讀取的編碼行為準則 + 引導師路由     |
| AI 入口（Cursor/CodeBuddy） | `./my-ai/AGENTS.md`                 | 同 CLAUDE.md，供其他 Agent 平台            |
| Plan 規格書規範             | `./my-ai/PLAN_SPEC.md`              | Plan 撰寫結構、Phase 順序、I/O 規範        |
| 效能規範                    | `./my-ai/performance-rules.md`      | 大量資料渲染、API 批次呼叫、WebSocket 效能 |
| 測試計畫規範                | `./my-ai/testing/TEST_PLAN_SPEC.md` | 測試計畫撰寫規範                           |
| 測試腳本規範                | `./my-ai/testing/testing-rules.md`  | 測試腳本撰寫規範                           |

---

## 前端框架規範套用

編輯前端檔案前，AI 需依專案框架套用對應規範：

### Vue / Nuxt

- 套用對象：`.vue`、`pages/`、`components/`、`layouts/`、`nuxt.config.*`
- 遵循本檔案中定義的專案規則
- 涉及大量資料渲染、API 批次呼叫或 WebSocket 時，參考 `./my-ai/performance-rules.md`

### Angular

- 套用對象：`.ts`、`.html`、`.scss`、`src/app/`、`angular.json`
- 遵循本檔案中定義的專案規則
- 遵循 Angular Style Guide；使用 `data-testid` 供 E2E；避免 inline style
- 涉及大量資料渲染、API 批次呼叫或 WebSocket 時，參考 `./my-ai/performance-rules.md`

---

## AI 編碼行為準則

來自 `./my-ai/CLAUDE.md` / `./my-ai/AGENTS.md`，核心四原則：

1. **編碼前先想清楚** — 列假設、查 `documents.md`、不確定先問
2. **簡潔優先** — 只實作請求範圍，不預留未要求的抽象或功能
3. **精準修改** — 每行 diff 須能追溯到請求；不順手重構或改格式
4. **目標驅動** — 將任務轉為可驗證目標（測試通過、`@pr-review` pass 等）

---

## Code 修改前 Branch Gate

修改任何 code 前必須確認目前分支：

1. 取得目前分支：`git rev-parse --abbrev-ref HEAD`
2. 若不是 `main`/`master`：已在工作分支，可繼續
3. 若是 `main`/`master`：檢查 local/remote 是否有其他分支
4. 若存在其他分支：**擋下，詢問使用者是否切換**，不得直接修改
5. 若無其他分支：通過，提醒使用者目前在主線

---

## 引導師系統

| 引導師             | 觸發語            | Prompt                                               |
| ------------------ | ----------------- | ---------------------------------------------------- |
| Plan 訪談師        | `@plan-maker`     | `./my-ai/systemprompts/plan-maker-prompt.md`         |
| Plan 執行協調員    | `@plan-executor`  | `./my-ai/systemprompts/plan-executor-prompt.md`      |
| Task Understanding | `@task-helper`    | `./my-ai/systemprompts/task-understanding-prompt.md` |
| PR Review          | `@pr-review`      | `./my-ai/systemprompts/pr-review-prompt.md`          |
| Repo Init          | `@repo-init`      | `./my-ai/systemprompts/repo-init-prompt.md`          |
| Lesson Learned     | `@lesson-learned` | `./my-ai/systemprompts/lesson-learned-prompt.md`     |
| Session Log        | `@session-log`    | `./my-ai/systemprompts/session-log-prompt.md`        |
| Debug Helper       | `@debug-helper`   | `./my-ai/systemprompts/debug-helper-prompt.md`       |
| Perf Review        | `@perf-review`    | `./my-ai/systemprompts/perf-review-prompt.md`        |
| Test Maker         | `@test-maker`     | `./my-ai/systemprompts/test-maker-prompt.md`         |
| AI Tester          | `@ai-tester`      | `./my-ai/systemprompts/ai-tester-prompt.md`          |

---

## 對話記憶（Session Persistence）

- **每次對話結束前**，應使用 `@session-log` 記錄本次對話摘要
- **每次新對話開始時**，必須先讀取 `_sessions/` 目錄中最近 3 筆記錄
- 若 `_sessions/` 不存在或為空，跳過

---

## 專案自訂規則

> 以下請依實際專案需求補充：

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

_本檔案為 `my-ai` 系統的前端規範入口，與 `./my-ai/` submodule 搭配使用_
