# my-ai

前端專用的 AI 輔助開發規範倉庫（submodule）。作為專案的 `my-ai/` 子模組使用。

## 結構

```
my-ai/
├── CLAUDE.md / AGENTS.md    ← AI 自動讀取的入口
├── PLAN_SPEC.md             ← Plan 規格書規範
├── performance-rules.md     ← 效能規範
├── systemprompts/           ← 引導師 prompt
├── testing/                 ← 測試規範
└── templates/
    ├── toolstemplate/       ← Nuxt 3 + Vuetify 模板
    └── design-md/           ← 80 站台設計範本
```

## 使用方式

```bash
# 加入為 submodule（名稱固定為 my-ai）
cd your-frontend-project
git submodule add https://github.com/YOUR_ORG/my-ai.git my-ai
```

## 引導師

| 觸發語 | 功能 |
|--------|------|
| `@plan-maker` | 撰寫 Plan 規格書 |
| `@plan-executor` | 依 Plan 逐步實作 |
| `@repo-init` | 初始化新專案 |
| `@pr-review` | PR 提交前審查 |
| `@test-maker` | 產生測試計畫 |
| `@ai-tester` | 執行測試腳本 |
| `@debug-helper` | 除錯引導 |
| `@perf-review` | 效能分析 |
| `@lesson-learned` | 記錄 bug 經驗 |
| `@task-helper` | 任務分析與理解 |
