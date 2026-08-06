# Session：修正 AI 設定與更新 Session Log 流程

> 日期：2026-08-06 | 專案：my-ai

---

## 完成事項

- 修正並最佳化 `my-ai` 內的 AI 協作設定與 Prompt 流程，使其更精簡並專注於當前開發目錄。
- 解決了 pnpm v10+ 的原生模組授權問題，並更新了 `my-ai/templates` 底下的 Vue 與 Angular 模板。
- 順利將變更透過 `@repo-push` 推送到遠端儲存庫。

---

## 異動檔案

- `.gitignore` (新增 `.specstory` 忽略規則)
- `README.md` (修正文件內目錄名稱拼字為 `init-index`)
- `systemprompts/session-log-prompt.md` (精簡提問流程，加入「只記錄當前目錄」的過濾規則，並嚴禁寫入 Code Blocks)
- `templates/vue-template/package.json` (移除已廢棄的 `pnpm` 欄位)
- `templates/vue-template/pnpm-workspace.yaml` (新增 pnpm `allowBuilds` 白名單設定)
- `templates/angular-template/pnpm-workspace.yaml` (新增 pnpm `allowBuilds` 白名單設定)

---

## 關鍵決策與取捨

- 將 `@session-log` 原本五題的人工提問改為兩題，前三題改由 AI 自動依據終端機「當前目錄」的開發軌跡生成，排除了原本混在一起的其他專案資訊，讓這份紀錄精準對齊 `my-ai` 本身的開發脈絡。
- 發現 `package.json` 的 `pnpm.onlyBuiltDependencies` 已失效，改為全面在模板根目錄 (`templates/*`) 部署 `pnpm-workspace.yaml` 以應對未來的專案初始化。

---

## 待辦 / 下一步

看看各個引導師，正確了解每個引導師的功能，並且看看有沒有能更正成更適合我的

---

## 給下個 agent 的提示

若我想不起來要幹嘛就開頭提示我一下「依照上次的紀錄，你可以先了解一下引導師的功能，是否有需要?」
