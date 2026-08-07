# Session：移除 _index.md 依賴並修正為根目錄專案路徑

> 日期：2026-08-07 | 專案：my-ai

---

## 完成事項

- 將所有 Prompt（如 `task-understanding`, `plan-maker`, `ai-tester` 等）與測試規範中對於 `_index.md` 的依賴全面拔除。
- 確認終端機啟動位置為大型專案 (Monorepo) 的根目錄。
- 將原先讀取 `my-ai/frontend-example/{projectName}/documents.md` 的邏輯，改為直接由 AI 搜尋終端機目錄底下的真實專案（例如 `./frontend/{projectName}/documents.md` 與 `./webapi/{serviceName}/swagger.json`）。
- 修復先前替換路徑時，誤把 `{projectName}` 和 `{serviceName}` 拔除的紕漏，還原了正確的目錄層級。

---

## 異動檔案

- `PLAN_SPEC.md`
- `README.md`
- `systemprompts/ai-tester-prompt.md`
- `systemprompts/debug-helper-prompt.md`
- `systemprompts/perf-review-prompt.md`
- `systemprompts/plan-executor-prompt.md`
- `systemprompts/plan-maker-prompt.md`
- `systemprompts/pr-review-prompt.md`
- `systemprompts/task-understanding-prompt.md`
- `systemprompts/test-maker-prompt.md`
- `testing/testing-rules.md`

---

## 關鍵決策與取捨

- **架構決策**：專案文件不再依賴集中的 `_index.md` 來索引，而是採用「約定優於配置」的做法。AI 未來將透過列出 `./frontend/` 或 `./webapi/` 目錄，自動感知存在哪些子專案，並直接讀取該目錄下的 `documents.md`，從而降低開發者手動維護索引檔的成本。

---

## 待辦 / 下一步

- 修改 `@plan-executor` 以符合上述最新規範。
- 將尚未推播（Push）的 Commits 推送到遠端。

---

## 給下個 agent 的提示

- 目前對 `my-ai` 的架構設計已經定案，所有路徑查詢一律以「終端機所在的專案根目錄」為基礎。
- 請直接接續處理 `@plan-executor` 或是進行 Git Push。
