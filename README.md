# WA Offline Redirect (WhatsApp to Signal Detour) 🚀

An automated open-source solution that forces your WhatsApp presence status to **Offline** and immediately intercepts incoming private messages with an automated text redirecting contacts to your **Signal** profile. 

Perfect for users migrating away from WhatsApp who want a 24/7 self-hosted routing engine without keeping their local computers turned on.

---

## ✨ Features

- 🖥️ **24/7 Cloud Execution:** Hosted entirely on Render's free tier. Your phone and laptop can be completely shut down.
- 🕵️‍♂️ **Forced Offline Presence:** Automatically flags your status as unavailable to hide your active state.
- 🔕 **Group Chat Filtering:** Smart filtering completely ignores group chats and broadcast updates to prevent spamming.
- 🔒 **Privacy First:** Sensitive credentials and your Signal link are managed safely through cloud environment variables, making this repository 100% safe to be **Public**.
- ☕ **Keep-Alive Core:** Built-in self-pinging routine prevents Render's free tier from going to sleep.

---

## 🛠️ Architecture & Core Dependencies

- [whatsapp-web.js](https://github.com) - Node.js WhatsApp Web API framework.
- [Express](https://expressjs.com) - Minimalist web server to handle platform health checks.
- [Axios](https://axios-http.com) - Extensible HTTP client for running the keep-alive routing engine.
- [Puppeteer (Chromium)](https://pptr.dev) - Headless web automation runner.

---

## 🚀 Step-by-Step Deployment Instructions

### 1. Repository Setup & Editing Code
1. Fork or clone this repository to your personal GitHub account.
2. Ensure your `index.js` uses the environment variable block to protect your identity:
   ```javascript
   const signalLink = process.env.SIGNAL_LINK || "https://signal.me";
   ```
3. Keep this repository public or private depending on your preference.

### 2. Configure Cloud Environment on Render
1. Create a free account at [Render](https://render.com).
2. Click **New +** and select **Web Service**.
3. Link your GitHub account and select this repository.
4. Set the following Build settings:
   - **Runtime:** `Node`
   - **Build Command:** `chmod +x render-build.sh && ./render-build.sh`
   - **Start Command:** `npm start`
   - **Instance Type:** `Free`

### 3. Inject Critical Environment Variables 🔒
Before clicking deploy, expand the **Advanced Options** section at the bottom of the config page and select **Add Environment Variable**:

| Key | Value | Description |
| :--- | :--- | :--- |
| `SIGNAL_LINK` | `https://signal.me` | Your actual, private Signal chat URL. |
| `RENDER_EXTERNAL_URL` | *(Leave Blank)* | Render will bind this automatically to run the keep-alive routine. |

Click **Create Web Service**.

### 4. Sync & Link Your Identity (One-Time Setup)
1. Navigate to the **Logs** tab in your Render service dashboard.
2. Wait for the compilation script to download Chromium and launch the bot engine.
3. A large **QR code made out of text characters** will print directly inside the cloud console log.
4. Quickly unlock your smartphone, open **WhatsApp**, tap **Linked Devices** -> **Link a Device**, and frame your camera over the log stream's QR code.
5. Once synced, the console logs will clear and print `Connected to WhatsApp!`.

---

## 🛑 Turning Off Your Equipment
Once connected, your node runtime is completely isolated in the cloud. You can now safely **shut down your laptop**, turn off your PC, or disconnect your phone's cellular network data. The server will intercept signals and message users back autonomously.

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
