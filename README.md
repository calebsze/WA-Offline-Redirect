# WA Offline Redirect (WhatsApp to Signal Detour) 🚀

An automated open-source routing engine that forces your WhatsApp presence status to **Offline** and immediately intercepts incoming private messages with an automated text redirecting contacts directly to your **Signal** profile. 

Optimized to run seamlessly 24/7 on **Render's Free Background Worker** infrastructure without requiring your local computer or primary phone to remain turned on.

---

## ✨ Features

- 🖥️ **24/7 Cloud Isolation:** Hosted entirely on Render as a Background Worker. Your phone and laptop can be completely powered off.
- 🕵️‍♂️ **Forced Offline Presence:** Automatically flags your status as unavailable to mask your active timeline.
- 🔕 **Group Chat Filtering:** Smart filtering completely drops group chat payloads and broadcast updates to prevent loop spam.
- 📦 **Persistent Local Storage:** Locks Puppeteer browser binaries safely inside localized project cache folders to survive automated server restarts.
- 🔒 **Privacy Safeguarded:** Critical profile data and your Signal destination link are pulled from sandboxed environment variables, keeping this public repository 100% safe.

---

## 🛠️ Architecture & Core Dependencies

- [whatsapp-web.js](https://github.com) - Node.js WhatsApp Web API framework.
- [Express](https://expressjs.com) - Baseline application health server core.
- [Axios](https://axios-http.com) - Integrated Keep-Alive trigger mechanics.
- [Puppeteer (Chromium)](https://pptr.dev) - Headless browser automation runtime.

---

## 🚀 Step-by-Step Deployment Instructions

### 1. Repository Check
Ensure your `index.js` file handles your contact coordinates securely through environment configurations:
```javascript
const signalLink = process.env.SIGNAL_LINK || "https://signal.me";
```

### 2. Configure Cloud Environment on Render
1. Create a free account at [Render](https://render.com).
2. Click **New +** and select **Background Worker** *(Do not choose Web Service)*.
3. Connect your GitHub profile and select this repository.
4. Set the following build options:
   - **Runtime:** `Node`
   - **Build Command:** `npm install && npx puppeteer browsers install chrome`
   - **Start Command:** `node index.js`
   - **Instance Type:** `Free` (\$0/mo)

### 3. Add Advanced Environment Variables 🔒
Before hitting deploy, expand **Advanced Options** and input these parameters to secure your assets and prevent disk cleanup errors:

| Key | Value | Description |
| :--- | :--- | :--- |
| `SIGNAL_LINK` | `https://signal.me` | Your hidden, actual Signal profile URL. |
| `PUPPETEER_CACHE_DIR` | `/opt/render/project/src/.puppeteer_cache` | Forces Render to retain your Chrome binary on restart. |

Click **Create Background Worker**.

---

## 📱 One-Time Identity Linking Strategy

1. Navigate straight to your service workspace's **Logs** streaming panel.
2. Allow the machine 1–2 minutes to pull dependency maps and construct the virtual filesystem.
3. Once running, a large **QR code formatted out of raw text blocks** will print inside the console log lines.
4. **Act quickly:** Open **WhatsApp** on your phone ➡️ **Settings/Linked Devices** ➡️ **Link a Device**, and target your phone camera at the console window QR layout before Render's 60-second system idle timer triggers a container refresh.
5. Upon registration, the console will track code clearance and output: `Bot is linked to your WhatsApp cluster!`.

---

## 🛑 Equipment Shutdown
Once linked, your account loop is safely suspended inside the remote cloud server grid. You can now completely shutdown your computer, terminate your laptop terminal sessions, or lose mobile network connection—the node background service will intercept any inbound private messages autonomously.

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
