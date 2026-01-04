# 🤖 AI News-to-Post Studio

## 📖 Overview

**AI News-to-Post Studio** is a full-stack capable web application designed to streamline the workflow of social media managers. It fetches real-time news articles based on a chosen topic and uses Generative AI to synthesize them into engagement-ready social posts.

### ✨ Key Features
* **🔍 Smart Topic Search:** Instantly fetches recent news from Google News RSS.
* **📰 Intelligent Selection:** Review and select up to 3 relevant articles as context.
* **✍️ Content Generation:** Uses LangChain to generate:
    * 3 "Scroll-stopping" Hooks.
    * Instagram-ready Caption (with hashtags).
    * AI Image Generation Prompt (text-only).
* **🔒 Privacy-First:** Runs entirely locally using **Ollama** (no API keys required).

---

## 🛠️ Architecture & Tech Stack

This project uses a modern **Client-Side Generation (CSG)** architecture to demonstrate low-latency interactions with local AI models.

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React 19 + TypeScript | UI logic and state management. |
| **Build Tool** | Vite | Lightning-fast HMR and bundling. |
| **Styling** | TailwindCSS | Utility-first responsive design. |
| **Orchestration** | LangChain.js | Structured prompting and LLM chaining. |
| **AI Model** | Ollama (`gemma3:4b`) | Local inference (running on localhost). |
| **News Source** | Google News RSS | Real-time article fetching via XML parsing. |

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### 1. Prerequisites
* **Node.js** (v18 or higher)
* **Ollama** installed on your machine ([Download here](https://ollama.com))

### 2. Configure Local AI (Ollama)
Since this app runs in the browser, you must allow it to access your local Ollama instance.

**Step A: Pull the Model**
Open your terminal and download the model used in the code (Gemma 3 or 2):
```bash
ollama pull gemma3:4b
