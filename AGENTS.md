## 規範文件索引

> **[核心指令]**
> 請在執行任何任務前，務必先讀取並遵守 `./CLAUDE.md` 的 AI 行為準則。

| 類型 | 位置 |
|---|---|
| AI 核心行為準則 | `./CLAUDE.md` |
| Plan 規範 | `./PLAN_SPEC.md` |
| 前端/UI 撰寫規範 | **各 repo 根目錄** `./.rules.md` |
| 測試計畫規範 | `./testing/TEST_PLAN_SPEC.md` |
| 測試腳本規範 | `./testing/testing-rules.md` |

---

## AI 編碼行為準則（摘要）

核心四原則：

1. **編碼前先想清楚** — 列假設、查 `documents.md`、不確定先問
2. **簡潔優先** — 只實作請求範圍，不預留未要求的抽象或功能
3. **精準修改** — 每行 diff 須能追溯到請求；不順手重構或改格式
4. **目標驅動** — 將任務轉為可驗證目標（測試通過、`@pr-review` pass 等）

---

## Code 修改前 Branch Gate

修改任何 code 前必須確認目標 repo 目前分支：

1. 取得目前分支：`git rev-parse --abbrev-ref HEAD`
2. 若目前分支不是 `main` / `master`：已在工作分支，可繼續。
3. 若目前分支是 `main` / `master`：檢查 local/remote 是否有其他分支。
4. 若存在其他分支：**擋下，詢問使用者是否切換**，不得直接修改。
5. 若無其他分支：通過，提醒使用者目前在主線。

---

## 前端／UI 規範套用

編輯前端檔案前，依專案框架類型套用對應規範：

### Vue / Nuxt 專案

編輯 `.vue`、`pages/`、`components/`、`layouts/`、`nuxt.config.*` 等前端檔案前：

1. **鎖定 repo**：以目前正在修改的檔案所屬 **repo 根目錄** 為準。
2. **讀取**該 repo 根目錄 `./.rules.md`，並依其內容套用。
3. 若該 repo **尚無** `./.rules.md`：**先詢問開發者**。
4. 若前端改動涉及大量資料渲染、API 批次呼叫或 WebSocket，參考 `./performance-rules.md`。

### Angular 專案

編輯 `.ts`、`.html`、`.scss`、`src/app/`、`angular.json` 等 Angular 前端檔案前：

1. **鎖定 repo**：以目前正在修改的檔案所屬 **repo 根目錄** 為準。
2. **讀取**該 repo 根目錄 `./.rules.md`，並依其內容套用。
3. 若該 repo **尚無** `./.rules.md`：**先詢問開發者**。
4. 若前端改動涉及大量資料渲染、API 批次呼叫或 WebSocket，參考 `./performance-rules.md`。

#### Angular 檔案類型對應

| 檔案類型 | 用途 | 注意事項 |
|---------|------|---------|
| `*.component.ts` | 元件邏輯（Class + Decorator） | 遵循 Angular Style Guide；OnInit 初始化 |
| `*.component.html` | 元件模板 | 使用 `data-testid` 供 E2E；避免 inline style |
| `*.component.scss` | 元件樣式 | 使用 `:host` 封裝；避免 `/deep/` |
| `*.service.ts` | 服務（DI 注入） | `@Injectable({ providedIn: 'root' })` |
| `*.module.ts` | NgModule 定義 | declarations / imports / providers 分清楚 |
| `*.interceptor.ts` | HTTP 攔截器 | 實作 `HttpInterceptor` |
| `*.guard.ts` | 路由守衛 | 實作 `CanActivate` 等介面 |
| `*.dto.ts` / `*.interface.ts` | 型別定義 | 對齊 API Response 欄位 |
| `angular.json` | 專案配置 | build / serve / test 設定 |
| `environment*.ts` | 環境變數 | `environment.ts`(dev) / `environment.prd.ts`(prod) |

---

## 對話記憶（Session Persistence）

**每次對話結束前**，應使用 `@session-log` 記錄本次對話摘要。

**每次新對話開始時**，必須先讀取本專案 `_sessions/` 目錄中**最近 3 筆**記錄（依檔名日期排序），了解前面的開發上下文，避免重複詢問已解決的問題。

若 `_sessions/` 不存在或為空，跳過此步驟。

---

## 引導師

| 引導師 | 觸發語 | prompt |
|---|---|---|
| Plan 訪談師 | `@plan-maker`、幫我寫 Plan、新需求 | `./systemprompts/plan-maker-prompt.md` |
| Plan 執行協調員 | `@plan-executor`、Resume、給我 Step 1 | `./systemprompts/plan-executor-prompt.md` |
| Task Understanding | `@task-helper`、幫我理解任務 | `./systemprompts/task-understanding-prompt.md` |
| PR Review | `@pr-review`、commit、push | `./systemprompts/pr-review-prompt.md` |
| Repo Init | `@repo-init`、初始化 repo、建立新專案 | `./systemprompts/repo-init-prompt.md` |
| Lesson Learned | `@lesson-learned`、記錄這次 bug | `./systemprompts/lesson-learned-prompt.md` |
| Session Log | `@session-log`、記錄這次對話、結束前記錄 | `./systemprompts/session-log-prompt.md` |
| Debug Helper | `@debug-helper`、遇到 bug | `./systemprompts/debug-helper-prompt.md` |
| Perf Review | `@perf-review`、效能檢查 | `./systemprompts/perf-review-prompt.md` |
| Test Maker | `@test-maker`、寫測試計畫 | `./systemprompts/test-maker-prompt.md` |
| AI Tester | `@ai-tester`、執行測試 | `./systemprompts/ai-tester-prompt.md` |

---

## 語言規範套用

- 前端/UI 撰寫規範 → 讀目前 repo 根目錄 `./.rules.md`
- 本 my-ai 為前端專用版，不含 C# / Python 規範。
