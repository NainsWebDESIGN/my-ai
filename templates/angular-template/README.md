# Angular Template

Angular CLI 起始模板，供 `@repo-init` 初始化新專案使用。

## 技術棧

- **框架**：Angular 17+
- **語言**：TypeScript 5.2+
- **樣式**：SCSS
- **狀態管理**：Service + BehaviorSubject（輕量）；可擴充 NgRx
- **HTTP**：HttpClient + RxJS
- **測試**：Karma + Jasmine

## 目錄結構

```
src/
├── app/
│   ├── core/
│   │   ├── services/       # API Service（HttpClient 封裝）
│   │   ├── interceptors/   # HTTP 攔截器（Auth、Error）
│   │   └── guards/         # 路由守衛
│   ├── shared/
│   │   └── shared.module.ts  # 共用 Module（Material/CDK/pipe/directive）
│   ├── features/           # 功能模組（Lazy Loading）
│   ├── app.component.ts    # 根元件
│   ├── app.module.ts       # 根 Module
│   └── app-routing.module.ts # 路由定義
├── environments/
│   ├── environment.ts      # 開發環境
│   └── environment.prd.ts  # 正式環境
├── styles.scss             # 全域樣式
├── index.html
└── main.ts
```

## 開發

```bash
npm install
npm start          # ng serve → http://localhost:4200
npm run build      # 正式建置
npm test           # 單元測試
```
