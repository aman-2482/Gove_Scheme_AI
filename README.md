<div align="center">

# 🇮🇳 AI Government Scheme & Subsidy Finder

<img src="https://readme-typing-svg.demolab.com?font=Inter&weight=700&size=22&pause=1000&color=FF6B35&center=true&vCenter=true&width=600&lines=Discover+Government+Schemes+with+AI;Check+Eligibility+in+Seconds;Get+Direct+Official+Apply+Links" alt="Typing SVG" />

<br/>

[![FastAPI](https://img.shields.io/badge/FastAPI-0.135-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.14-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org/)
[![DeepSeek](https://img.shields.io/badge/AI-DeepSeek_Chat-6C63FF?style=for-the-badge&logo=openai&logoColor=white)](https://openrouter.ai/)
[![OpenRouter](https://img.shields.io/badge/OpenRouter-API-FF6B35?style=for-the-badge&logo=openai&logoColor=white)](https://openrouter.ai/)
[![License](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-22c55e?style=for-the-badge&logo=statuspage&logoColor=white)]()

<br/>

> **🚀 Powered by AI — Discover schemes, check eligibility, and get direct apply links in seconds.**

<br/>

</div>

---

## 🌟 What is this?

**AI Government Scheme & Subsidy Finder** is a full-stack AI-powered web application that helps Indian citizens instantly discover relevant **government schemes, subsidies, and welfare programs** based on their personal situation — using the power of Large Language Models via **OpenRouter**.

No more endless scrolling through government portals. Just describe your situation, and the AI finds the right schemes for you. ✨

---

## 🎯 Features

| Feature | Description |
|---|---|
| 🤖 **AI-Powered Analysis** | Leverages DeepSeek Chat via OpenRouter for intelligent scheme matching |
| ✅ **Eligibility Check** | AI explains exactly why you do or don't qualify |
| 🔗 **Direct Apply Links** | Official `.gov.in` government portal URLs — no middlemen |
| 🚀 **Recommended Actions** | Step-by-step next actions tailored to your situation |
| ⚠️ **Risk & Caveats** | Honest warnings about scheme limitations |
| 🌐 **1500+ Schemes** | Covers agriculture, housing, education, business, solar & more |
| 📍 **28 States Covered** | State-specific and central government schemes |
| ⚡ **Free & No Signup** | Zero registration required |

---

## 🛠️ Tech Stack

<div align="center">

### 🔵 Backend
| Technology | Version | Purpose |
|---|---|---|
| ![Python](https://img.shields.io/badge/-Python-3776AB?logo=python&logoColor=white) | 3.14 | Core language |
| ![FastAPI](https://img.shields.io/badge/-FastAPI-009688?logo=fastapi&logoColor=white) | 0.135 | REST API framework |
| ![Uvicorn](https://img.shields.io/badge/-Uvicorn-4B5563?logo=gunicorn&logoColor=white) | 0.41 | ASGI server |
| ![Pydantic](https://img.shields.io/badge/-Pydantic-E92063?logo=pydantic&logoColor=white) | 2.x | Data validation & settings |
| ![HTTPX](https://img.shields.io/badge/-HTTPX-009688?logo=python&logoColor=white) | 0.28 | Async HTTP client |
| ![SQLAlchemy](https://img.shields.io/badge/-SQLAlchemy-D71F00?logo=sqlite&logoColor=white) | 2.0 | ORM (future DB integration) |

### 🟠 Frontend
| Technology | Purpose |
|---|---|
| ![HTML5](https://img.shields.io/badge/-HTML5-E34F26?logo=html5&logoColor=white) | Structure |
| ![CSS3](https://img.shields.io/badge/-CSS3-1572B6?logo=css3&logoColor=white) | Glassmorphism UI design |
| ![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?logo=javascript&logoColor=black) | Async API calls & dynamic UI |
| ![Google Fonts](https://img.shields.io/badge/-Inter_Font-4285F4?logo=google&logoColor=white) | Modern typography |

### 🟣 AI / Infra
| Technology | Purpose |
|---|---|
| ![OpenRouter](https://img.shields.io/badge/-OpenRouter-FF6B35?logo=openai&logoColor=white) | LLM gateway (model-agnostic) |
| **DeepSeek Chat** | Primary model (ultra-fast, low-cost) |
| **Mistral Large** | Balanced fallback model |
| **Claude 3 Haiku** | Premium fallback model |

</div>

---

## 📁 Project Structure

```
📦 AI/
├── 🖥️ frontend/
│   ├── index.html          # Main UI — glassmorphism, animated blobs
│   ├── styles.css          # Full design system, dark-themed
│   └── app.js              # Fetch API, loading states, result rendering
│
└── ⚙️  backend/
    ├── .venv/              # Python virtual environment
    ├── pyrightconfig.json  # Pyright type-checker config
    └── app/
        ├── main.py         # FastAPI app, CORS, static file serving
        ├── api/
        │   └── endpoints.py        # POST /api/chat route
        ├── core/
        │   └── ai_config.py        # Pydantic settings (API keys, models)
        ├── schemas/
        │   └── ai.py               # Request/Response Pydantic models
        ├── services/
        │   └── ai_service.py       # OpenRouter API client + retry logic
        └── models/
            └── usage.py            # SQLAlchemy usage log model
```

---

## 🚀 Getting Started

### Prerequisites

- Python **3.10+** (3.14 recommended)
- An **[OpenRouter API Key](https://openrouter.ai/keys)** (free to get)

---

### ⚡ Quick Setup

#### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/ai-scheme-finder.git
cd ai-scheme-finder
```

#### 2️⃣ Create & activate virtual environment

```bash
cd backend
python -m venv .venv

# Windows
.venv\Scripts\activate

# macOS / Linux
source .venv/bin/activate
```

#### 3️⃣ Install dependencies

```bash
pip install fastapi uvicorn httpx pydantic pydantic-settings sqlalchemy python-dotenv
```

#### 4️⃣ Set your API key

Open `backend/app/core/ai_config.py` and set your OpenRouter key:

```python
OPENROUTER_API_KEY: str = "sk-or-v1-your-key-here"
```

> 💡 Or create a `backend/.env` file:
> ```env
> OPENROUTER_API_KEY=sk-or-v1-your-key-here
> ```

#### 5️⃣ Run the server

```bash
cd backend
.venv\Scripts\uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

#### 6️⃣ Open in browser 🎉

```
http://localhost:8000
```

---

## 🔌 API Reference

### `POST /api/chat`

Analyze a user's situation and return matched government schemes.

**Request Body:**
```json
{
  "user_prompt": "I am a farmer in Maharashtra with 3 acres of land looking for solar pump subsidies",
  "temperature": 0.2
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "summary": "PM-KUSUM Yojana offers up to 90% subsidy for solar pumps...",
    "eligibility_reason": "You meet the land ownership and state criteria...",
    "recommended_actions": ["Gather land documents", "Apply via state portal"],
    "risk_notes": ["Funds are limited — apply early"],
    "apply_links": [
      { "name": "PM-KUSUM Official Portal", "url": "https://pmkusum.mnre.gov.in/" }
    ]
  },
  "tokens_used": 512,
  "model_used": "deepseek/deepseek-chat"
}
```

| Endpoint | Method | Description |
|---|---|---|
| `/` | `GET` | Serves the frontend UI |
| `/health` | `GET` | Health check |
| `/api/chat` | `POST` | Main AI analysis endpoint |
| `/docs` | `GET` | Interactive Swagger API docs |

---

## ⏰ Keep Render Awake (24/7)

This repository includes a GitHub Actions workflow that pings your backend every 10 minutes to reduce cold starts.

- Workflow file: `.github/workflows/keep-render-awake.yml`
- Ping target: your deployed `/health` endpoint
- Schedule: every 10 minutes + manual trigger

### Setup (one time)

1. Go to GitHub repository **Settings → Secrets and variables → Actions**.
2. Add a new repository secret named `RENDER_HEALTH_URL`.
3. Set its value to your Render health URL, for example:

```text
https://your-render-service.onrender.com/health
```

4. Push this code to GitHub.
5. In **Actions**, run **Keep Render Backend Awake** once using **Run workflow**.

If the secret is missing or the endpoint returns non-2xx/3xx, the workflow fails so you can catch issues quickly.

---

## 💡 Example Queries

Try these in the app:

> 🌾 *"I am a farmer in Punjab with 5 acres of land. Tell me about PM-KUSUM solar pump subsidy."*

> 👩‍💼 *"I am a woman entrepreneur from Rajasthan looking for a MUDRA loan for my small tailoring business."*

> 🎓 *"I am a student from a rural area in Bihar looking for post-matric scholarship schemes."*

> 🏠 *"I want to know about PM Awas Yojana for affordable housing in Maharashtra."*

---

## 🏗️ Architecture Overview

```
User Browser
     │
     ▼
┌─────────────────────────────────┐
│   FastAPI Backend (Port 8000)   │
│  ┌──────────┐  ┌─────────────┐  │
│  │ /static  │  │  /api/chat  │  │
│  │ (HTML,   │  │  Endpoint   │  │
│  │  CSS, JS)│  └──────┬──────┘  │
│  └──────────┘         │         │
│                  AIService      │
│                       │         │
└───────────────────────┼─────────┘
                        │
                        ▼
              ┌──────────────────┐
              │   OpenRouter API  │
              │  ┌─────────────┐  │
              │  │ DeepSeek    │  │
              │  │ Chat (main) │  │
              │  └─────────────┘  │
              └──────────────────┘
```

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. 🍴 Fork the repository
2. 🌿 Create a feature branch: `git checkout -b feature/amazing-feature`
3. 💾 Commit your changes: `git commit -m 'Add amazing feature'`
4. 📤 Push to branch: `git push origin feature/amazing-feature`
5. 🔁 Open a Pull Request

---

## 🗺️ Roadmap

- [ ] 🗄️ PostgreSQL integration for usage logging & scheme caching
- [ ] 🔍 Vector search (RAG) for accurate scheme retrieval
- [ ] 🌐 Multi-language support (Hindi, Bengali, Tamil...)
- [ ] 📱 PWA / Mobile app version
- [ ] 👤 User profiles & saved searches
- [ ] 📊 Admin analytics dashboard
- [ ] 🔔 Scheme deadline notifications

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## ⚠️ Disclaimer

> This tool is **for informational purposes only**. Always verify scheme details and eligibility on the **official government portals** before applying. Scheme availability and eligibility criteria may change.

---

<div align="center">

Made with ❤️ for India 🇮🇳

**[⬆ Back to Top](#-ai-government-scheme--subsidy-finder)**

</div>
