import express from "express";
import axios from "axios";

const app = express();
// 解析 JSON payload，並設定較大上限以防圖片 base64 超過預設大小
app.use(express.json({ limit: "50mb" }));

// 判斷是否包含多媒體 / 圖片
function isMedia(content) {
  if (Array.isArray(content)) {
    return content.some(
      (item) => item.type === "image_url" || item.type === "image",
    );
  }
  return false;
}

// 判斷是否為程式碼區塊
function isRawCode(text) {
  const codeBlockRegex = /```[\s\S]*?```/;
  const codeKeywordRegex =
    /(import\s+.*from|const\s+.*=|function\s+.*\(|class\s+.*\{)/;
  return codeBlockRegex.test(text) || codeKeywordRegex.test(text);
}

// 文字清理與壓縮 (0 Token 成本的規則過濾)
function compressText(text) {
  // 移除連續 3 個以上的空行，並修剪首尾空白
  return text.replace(/\n{3,}/g, "\n\n").trim();
}

// 核心轉發路由 (相容 OpenAI API 格式)
app.post("/v1/chat/completions", async (req, res) => {
  const { messages, ...otherParams } = req.body;

  // 1. 遍歷並處理每一條 Message
  const processedMessages = messages.map((msg) => {
    // 圖片/多媒體：原樣保留
    if (isMedia(msg.content)) return msg;

    // 純文字處理
    if (typeof msg.content === "string") {
      // 程式碼：原樣保留
      if (isRawCode(msg.content)) return msg;

      // 一般文字/除錯訊息：進行規則壓縮
      return {
        ...msg,
        content: compressText(msg.content),
      };
    }

    return msg;
  });

  // 2. 轉發至目標 AI 服務商 (例如 DeepSeek 或 OpenAI)
  try {
    const apiResponse = await axios.post(
      "https://api.deepseek.com/v1/chat/completions", // 可替換為目標 API 網址
      {
        ...otherParams,
        messages: processedMessages,
      },
      {
        headers: {
          Authorization: req.headers.authorization, // 自動沿用 Cline 帶過來的 API Key
          "Content-Type": "application/json",
        },
      },
    );

    // 3. 將 AI 的回答回傳給 Cline / IDE
    res.json(apiResponse.data);
  } catch (error) {
    console.error("轉發錯誤:", error.response?.data || error.message);
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { error: error.message });
  }
});

const PORT = 1491;
app.listen(PORT, () => {
  console.log(`代理伺服器已啟動於：http://localhost:${PORT}`);
});
