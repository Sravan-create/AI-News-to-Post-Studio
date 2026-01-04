
````markdown
# 🤖 AI News-to-Post Studio

> Transform trending topics into social-ready content ideas using AI.  
> A lightweight, polished mini full-stack project built as a hiring take-home assignment.

---

## 📌 Project Overview

**AI News-to-Post Studio** is a minimal web application that turns a topic and a small set of recent news articles into **social media content ideas**.

The app allows a user to:
1. Enter a topic or industry.
2. Fetch recent news articles related to that topic.
3. Select up to 3 articles.
4. Generate:
   - 3 scroll-stopping hooks
   - 1 Instagram-ready caption
   - 1 AI image prompt (text only)

This project focuses on **clean UI, sensible API-style logic, structured LLM output, and clear data flow**, rather than over-engineering.

---

## 🧱 Tech Stack

| Layer | Technology |
|-----|-----------|
| Frontend | React + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| LLM Orchestration | LangChain (JavaScript) |
| LLM Runtime | Ollama (Local LLM) |
| News Source | Google News RSS |
| State Persistence | Browser localStorage |

---

## 🧠 Architecture Notes (Brief)

- The application follows a **simple client-side generation flow**:
  - UI handles topic input, article selection, and result display.
  - News articles are fetched from **Google News RSS feeds**.
  - Selected article titles + URLs are passed into a **LangChain prompt**.
  - LangChain enforces structured generation:
    - Exactly 3 hooks
    - 1 caption
    - 1 image prompt (text only)
- The LLM runs **locally via Ollama**, keeping the project privacy-friendly and easy to demo without API keys.
- Session data (topics, articles, generated outputs) is stored in `localStorage` for simplicity.

---

## 🚀 Setup & Installation

### 1️⃣ Prerequisites

Make sure you have:
- **Node.js v18+**
- **Ollama** installed  
  👉 https://ollama.com

---

### 2️⃣ Configure Ollama (Local LLM)

Pull the model used by the app:

```bash
ollama pull gemma3:4b
````

Start Ollama with CORS enabled so the browser can access it:

#### macOS / Linux

```bash
OLLAMA_ORIGINS="*" ollama serve
```

#### Windows (PowerShell)

```powershell
$env:OLLAMA_ORIGINS="*"; ollama serve
```

Ollama will run at:

```
http://localhost:11434
```

---

### 3️⃣ Run the App

```bash
# Clone the repository
git clone https://github.com/Sravan-create/AI-News-to-Post-Studio.git
cd AI-News-to-Post-Studio

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open:

```
http://localhost:3000
```

---

## 🔑 Environment Variables

No environment variables are strictly required.

Optional:

```env
OPENAI_API_KEY=your_key_here
```

(Only needed if switching from Ollama to OpenAI inside the LangChain configuration.)

---

## 📰 Article Source

### Primary Source

* **Google News RSS**

  ```
  https://news.google.com/rss/search?q=<topic>
  ```

### Strategy

* The app attempts to fetch real RSS articles.
* Due to browser CORS restrictions (common in client-only apps), a **graceful fallback mode** is implemented:

  * If RSS fetching fails, the app enters **simulation mode**, where the LLM generates realistic, recent-style headlines so the end-to-end flow remains demoable.

This approach preserves UX while clearly documented as a limitation.

---

## 🧪 LLM Output Contract

The AI always returns **structured output**:

```json
{
  "hooks": ["Hook 1", "Hook 2", "Hook 3"],
  "caption": "Instagram-ready caption (≤ 280 chars)",
  "imagePrompt": "Text-only visual description"
}
```

❗ The project intentionally **does NOT generate images** — only the **image prompt text**, exactly as required by the assignment.

---

## ⚠️ Limitations

1. **Client-Side RSS Fetching**

   * Google News RSS may be blocked by CORS in some browsers.
2. **Local Model Performance**

   * Generation speed depends on local CPU/GPU.
3. **No Backend Persistence**

   * Data is stored in `localStorage` only.
4. **No Authentication**

   * Single-user demo flow by design.

---
