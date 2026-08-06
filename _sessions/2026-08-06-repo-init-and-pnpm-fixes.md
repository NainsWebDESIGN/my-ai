# Session：完成 Vue 與 Angular 專案初始化及 pnpm 建置設定修正

> 日期：2026-08-06 | 專案：test-angular-app & my-ai

---

## 完成事項

- 成功使用 `@repo-init` 初始化了 `test-vue-app`（搭配 cursor / devtools-infra 設計風格）與 `test-angular-app`（搭配 supabase / devtools-infra 設計風格）。
- 解決了 pnpm v10+ 針對原生模組（`@parcel/watcher`、`esbuild`）要求手動授權 `approve-builds` 的問題。
- 修改了 `session-log-prompt.md` 規則，減少 Agent 的提問數量，並規定由 Agent 自動統整對話紀錄。

---

## 異動檔案

- `test-vue-app/` 與 `test-angular-app/` (初始化整個目錄結構)
- `test-vue-app/package.json`、`my-ai/templates/vue-template/package.json` (移除已廢棄的 `pnpm` 欄位)
- `test-vue-app/pnpm-workspace.yaml`、`test-angular-app/pnpm-workspace.yaml`、`my-ai/templates/angular-template/pnpm-workspace.yaml`、`my-ai/templates/vue-template/pnpm-workspace.yaml` (新增 pnpm `allowBuilds` 設定)
- `test-vue-app/.gitignore`、`test-angular-app/.gitignore` (加入 Agent 本機專用規則 `.cursor/`, `AGENTS.md` 等)
- `test-vue-app/.rules.md`、`test-angular-app/src/styles/_design-tokens.scss` (套用設計風格)
- `my-ai/systemprompts/session-log-prompt.md` (精簡提問流程)

---

## 關鍵決策與取捨

- 發現 pnpm `package.json` 裡的 `pnpm.onlyBuiltDependencies` 已失效，改為全面在各專案與模板根目錄部署 `pnpm-workspace.yaml` 進行白名單授權。
- `test-angular-app` 專案目前為本機建立，尚未推送到遠端。而 `my-ai` 模板庫的變更則已透過 `@repo-push` 成功推送到遠端 `main` 分支。

---

## 待辦 / 下一步

看看各個引導師，還有沒有更適合我的

---

## 給下個 agent 的提示

目前沒有
