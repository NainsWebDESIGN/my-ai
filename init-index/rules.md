## My-AI 規則索引

本 workspace 共用 ma-ai 目錄，所有 AI 引導師、編碼規範、服務文件統一存放於：

> **Aidata Root：** `./my-ai/AGENTS.md`

---

## headroom proxy 說明

1. 本機跑 `headroom proxy`（預設 http://127.0.0.1:8787），Cline 的 Base URL 指向它（OpenAI 相容格式需加 `/v1`）。
2. 若 API 連線失敗（連不上 / 503），先確認 proxy terminal 是否仍執行中。
3. 大型 tool 輸出會被 headroom 壓縮；若內容出現 `<<ccr:hash,type,size>>` 佔位符且需要原文，呼叫 MCP 工具 `headroom_retrieve` 取回。

---

## Token 節省原則（嚴格執行）

### 讀取／輸入

1. **精確讀取** — 嚴禁全域搜尋或遍歷目錄；僅透過 `@檔案路徑` 讀取任務必要檔案。
2. **忽略目錄** — 嚴禁讀取 `.nuxt/`、`.output/`、`node_modules/`、`dist/` 與 lock 檔。
3. **避免重複讀取** — 不要重複讀取已經在上下文中的檔案。
4. **精簡指令** — 執行測試或 Build 時鎖定單一檔案，避免 Terminal 大量 Log 塞滿上下文。

### 輸出

5. **局部輸出** — 只輸出改動／新增的段落（程式碼僅提供變更的函式或 Template 片段），不要重貼完整的程式碼、文件或先前已給過的內容。
6. **先結論後細節** — 回答先給結論，再視需要展開說明。
7. **遵守指定格式** — 使用者指定的輸出格式（例如「只要 diff、不要解釋」）須嚴格遵守。
8. **不重講背景** — 不要重述使用者已提供的背景與需求；不清楚的地方先問，不要自行假設或補充冗長內容。
9. **引用不重貼** — 需要引用既有程式碼／文件時，用檔案路徑或 reference 指出，不要整段貼上。

### 歷史／摘要

10. **主動壓縮歷史** — 對話歷史過長時，主動精簡當前上下文結論（或提議把目前結論整理成一份 .md），以摘要作為新起點，只保留下一步所需的核心狀態。

---

## 每次對話啟動規則

**每次對話開始時，先檢查以下兩處，確認「有哪些步驟」與「執行到哪裡」：**

1. `D:\GitLab\拆解步驟\` — 查看已拆解的工作步驟清單（若有），了解總共有哪些步驟要執行。
2. `D:\GitLab\session-log\` — 查看最新記錄檔，確認目前執行到哪一步、是否有未完成的工作或待辦事項。

若有相關記錄，主動告知使用者目前進度，並詢問是否繼續。

---

## AI 編碼行為準則

| 類型             | 位置                                                                       |
| ---------------- | -------------------------------------------------------------------------- |
| 核心行為準則     | `{AIDATA}/generalrules/.cursor/rules/coding-behavior.mdc`（`alwaysApply`） |
| Plan 規範        | `{AIDATA}/PLAN_SPEC.md`                                                    |
| 語言規範套用原則 | `{AIDATA}/coding-rules.md`（C# / Python）                                  |
| 前端性能規範     | `{AIDATA}/performance-rules.md`                                            |

**核心四原則：**

1. 編碼前先想清楚 — 列假設、查 `documents.md`、不確定先問
2. 簡潔優先 — 只實作請求範圍，不預留未要求的抽象或功能
3. 精準修改 — 每行 diff 須能追溯到請求
4. 目標驅動 — 將任務轉為可驗證目標

---

## 服務文件索引

| 類型                        | 位置                            |
| --------------------------- | ------------------------------- |
| WebAPI 服務清單             | `{AIDATA}/webapi/_index.md`     |
| BackgroundService 清單      | `{AIDATA}/service/_index.md`    |
| 前端業務文件                | `{AIDATA}/frontend/_index.md`   |
| DB Schema                   | `{AIDATA}/db/_index.md`         |
| Confluence 跨服務           | `{AIDATA}/others/_index.md`     |
| 運動賽事爬蟲                | `{AIDATA}/game/_index.md`       |
| 股票專題                    | `{AIDATA}/stock/_index.md`      |
| Confluence 全域（fallback） | `{AIDATA}/confluence/_index.md` |

---

## 前端規範

- 各 repo 根目錄 `./.rules.md`（如 `./{project}/.rules.md`）
- 業務規則：`{AIDATA}/frontend/_index.md` → 對應 `documents.md`

---

## 引導師

| 引導師             | 觸發語                                  | 用途                                       |
| ------------------ | --------------------------------------- | ------------------------------------------ |
| Session Log        | `@session-log`、記錄今天、結束工作      | 一問一答記錄工作進度 → 存入 `session-log/` |
| Summary            | `@summary`、整理摘要、做摘要            | 將此次對話紀錄整理成結構化摘要             |
| Plan 訪談師        | `@plan-maker`、幫我寫 Plan、新需求      | 引導需求 → 產出符合 PLAN_SPEC 的 Plan      |
| Plan 執行協調員    | `@plan-executor`、Resume、給我 Step 1   | 依 Plan 拆步實作，管理進度                 |
| Task Understanding | `@task-helper`、幫我理解任務            | 查文件分析任務內容                         |
| PR Review          | `@pr-review`、commit、push              | Commit Gate 檢查                           |
| Repo Init          | `@repo-init`、初始化 repo               | 建立空白專案                               |
| Service Teacher    | `@service-teacher`、這個 service 做什麼 | 解說服務職責與架構                         |
| Arch Teacher       | `@arch-teacher`、整體架構               | 解說系統架構                               |
| Lesson Learned     | `@lesson-learned`、記錄 bug             | 記錄經驗到 my-ai                           |
| Debug Helper       | `@debug-helper`、遇到 bug               | 引導排查錯誤                               |
| Perf Review        | `@perf-review`、效能檢查                | 效能分析 report                            |
| Test Maker         | `@test-maker`、寫測試                   | 產出測試計畫與腳本                         |
| AI Tester          | `@ai-tester`、執行測試                  | 執行測試腳本                               |

> 完整 prompt 見 `{AIDATA}/systemprompts/*-prompt.md`（Session Log 見 `D:\GitLab\.session-log-prompt.md`，Summary 見 `D:\GitLab\summary-prompt.md`）

---

## 快速路徑替換

本檔案中 `{AIDATA}` = `./my-ai`
