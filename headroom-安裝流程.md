# Headroom 安裝與設定流程

在空白電腦（已安裝 VS Code + Cline 擴充套件）上，讓 Cline 透過 headroom 壓縮 context 並連到 AI Provider。

---

## 步驟 1：安裝 Python（3.10 以上）

### Windows

1. 到 <https://www.python.org/downloads/> 下載 Python 3.10+ 安裝檔。
2. 安裝時**勾選「Add Python to PATH」**。
3. 驗證：`python --version`

### Mac

1. 安裝 Homebrew（已裝可跳過）。
2. `brew install python@3.13`（或 3.10 以上任一版）。
3. 驗證：`python3 --version`

---

## 步驟 2：安裝 headroom

```bash
pip install "headroom-ai[all]"
```

- 引號不能省（PowerShell 會把 `[all]` 當萬用字元）。
- Mac 若 `pip` 找不到，改用 `pip3 install "headroom-ai[all]"`。
- 驗證：`headroom --version`

---

## 步驟 3：啟動 proxy（連到 AI Provider）

headroom proxy 本身只是「壓縮 + 轉送」的中間層，要先告訴它「上游是哪個 LLM、用哪把 key」。

### Windows（`start-headroom.ps1`）

```powershell
# 只改下面這一行：換成你真正的 AI Provider API key
$AI ProviderApiKey = "sk-你的key"

$env:OPENAI_TARGET_API_URL    = "https://api.AI Provider.com/v1"
$env:OPENAI_TARGET_API_HEADERS = '{"Authorization":"Bearer ' + $AI ProviderApiKey + '"}'

Write-Host "OPENAI_TARGET_API_HEADERS = " $env:OPENAI_TARGET_API_HEADERS
headroom proxy
```

執行：

```powershell
powershell -ExecutionPolicy Bypass -File "start-headroom.ps1"
```

### Mac（`start-headroom.sh`）

```bash
#!/usr/bin/env bash
export OPENAI_TARGET_API_URL="https://api.AI Provider.com/v1"
export OPENAI_TARGET_API_HEADERS='{"Authorization":"Bearer sk-你的key"}'
headroom proxy
```

執行：

```bash
chmod +x start-headroom.sh
./start-headroom.sh
```

看到 `HEADROOM PROXY` 的 banner、監聽 `http://127.0.0.1:8787` 即成功。

---

## 步驟 4：設定 Cline 的 API Provider

在 Cline 設定中：

1. API Provider → **OpenAI Compatible**
2. **Base URL** → `http://127.0.0.1:8787/v1`
3. **API Key** → 隨便填（例如 `headroom`，真正的 key 由 proxy 轉送）
4. **Model** → 你要用的 AI Provider 模型名

---

## 步驟 5：註冊 MCP（拿到 3 個工具）

修改 `cline_mcp_settings.json`，加入 headroom MCP server。

### 檔案位置

| 平台    | 路徑                                                                 |
| ------- | -------------------------------------------------------------------- |
| Windows | `C:\Users\<使用者名稱>\.cline\data\settings\cline_mcp_settings.json` |
| Mac     | `/Users/<使用者名稱>/.cline/data/settings/cline_mcp_settings.json`   |

### 要改的內容

把檔案改成（或把 `headroom` 這個 server 加進現有的 `mcpServers`）：

```json
{
  "mcpServers": {
    "headroom": {
      "command": "headroom",
      "args": ["mcp", "serve", "--proxy-url", "http://127.0.0.1:8787"],
      "alwaysAllow": [
        "headroom_retrieve",
        "headroom_compress",
        "headroom_stats"
      ]
    }
  }
}
```

- `command`：Mac 通常用 `headroom`。Windows 若 Cline 找不到，改成完整路徑（用 `(Get-Command headroom).Source` 查），例如 `C:\Users\<使用者名稱>\AppData\Local\Programs\Python\Python314\Scripts\headroom.exe`。
- `args`：`mcp serve --proxy-url http://127.0.0.1:8787`（指向正在跑的 proxy）。
- `alwaysAllow`：自動放行這 3 個工具，避免每次跳出確認框。

改完後**重載 Cline**：VS Code 按 `Ctrl+Shift+P` → 執行 `Developer: Reload Window`。

---

## 驗證

在 Cline 對話中請它呼叫 `headroom_stats`，看到壓縮統計（例如 `Tokens saved: ...`）即代表整條設定成功。
