# 前端專案目錄

這是本專案的前端站台總覽，列出了目前實際運行的前端專案，以及可用的初始模板。

---

## 1. 實際專案清單 (Active Projects)

未來當您建立新的前端專案（例如 `test-vue-app`）時，請將專案名稱、使用的框架與說明登記在此表格中，以便 AI（如 `@plan-maker`）在規劃時能夠正確索引並切換上下文。

| 專案目錄 | 使用框架 | 說明 | UI 規範檔 |
|---------|---------|------|-----------|
| *(暫無)* | - | *(等待建立新專案後更新此區塊)* | - |

---

## 2. 模板清單 (Templates)

本專案目前提供兩種前端框架的初始模板：

| 目錄 | 框架 | 說明 |
|------|------|------|
| `vue-template` | **Vue 3 (Nuxt 4)** | 基於 Nuxt 4 與 Vuetify 的現代化 Vue 前端模板 |
| `angular-template` | **Angular 17** | 基於 Angular 17 與 Angular Material 的企業級前端模板 |

---

## 3. 範例與參考 (Examples & References)

本目錄保留了作為參考用的範例文件，供未來建立新前端專案時作為撰寫規範的參考：

| 目錄/檔案 | 說明 |
|----------|------|
| `example/` | 包含 `README.md` (技術棧與頁面總覽範例) 與 `ui-context.md` (UI 功能與錯誤處理定義範例) |

---

## 4. 技術棧速覽

### Vue Template (`vue-template`)
- **核心框架**：Vue 3.5 + Nuxt 4
- **語言**：TypeScript 5.9
- **狀態管理**：Pinia
- **UI 元件庫**：Vuetify 3 + MDI Icons
- **工具/其他**：VueUse, Day.js, pako (壓縮工具)
- **Node 版本**：`>=22.12.0`
- **建置工具**：Vite

### Angular Template (`angular-template`)
- **核心框架**：Angular 17
- **語言**：TypeScript 5.2
- **UI 元件庫**：Angular Material + CDK
- **工具/其他**：RxJS
- **建置工具**：Angular CLI

---

## 5. 查閱與開發原則

- **前端 UI 規範**：操作說明與畫面定義，請見各模板目錄下的 `ui-context.md` (如有建立)。
- **API 串接**：請統一查閱 `./webapi/` 目錄下的 OpenAPI (Swagger) 規格文件。
- AI 在處理前端任務時（例如 `@task-helper`），應優先根據使用者選擇的模板，遵循該框架的最佳實踐與對應的 TypeScript 規範。
