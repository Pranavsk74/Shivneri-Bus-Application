# Shivneri Smart AI Bus Application 🚌⚡

Official MSRTC demonstration platform for premium **Shivneri intercity passenger services** connecting Mumbai and Pune via the expressway. Featuring live AI tracking, intelligent route selection, interactive seat booking, and comprehensive Software Requirements Specification (SRS) documentation.

---

## ✨ Features

- **Mumbai ↔ Pune Corridor Service**: Seamless point-to-point and intermediate boarding point selection (Dadar, Borivali, Thane, Swargate, Pune Station, Wakad).
- **Interactive Seat Reservation**: Real-time seat layout selection with fare calculation and instant confirmation badges.
- **Simulated Live AI Route Tracking**: Real-time progress visualization, simulated speed, next stop prediction, and dynamic ETA calculation.
- **Smart Notification Hub**: Live status updates, boarding alerts, and weather advisories.
- **Embedded SRS Documentation**: Complete interactive Software Requirements Specification (SRS) accessible directly within the application (`/srs`).
- **Responsive Luxury Aesthetic**: Built with modern typography, smooth micro-interactions, dark/gold accents, and dynamic motion.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Routing**: [React Router DOM v6](https://reactrouter.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + PostCSS + Autoprefixer
- **Icons & Animation**: [Lucide React](https://lucide.dev/) & [Framer Motion](https://www.framer.com/motion/)
- **Effects**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Pranavsk74/Shivneri-Bus-Application.git
   cd Shivneri-Bus-Application
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

---

## 📦 Building for Production

To create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## 🌐 Deploying to Vercel

This repository is pre-configured for direct zero-config deployment on [Vercel](https://vercel.com):

1. Go to [Vercel](https://vercel.com) and click **"Add New..."** → **"Project"**.
2. Import the `Shivneri-Bus-Application` repository from your GitHub account.
3. Vercel automatically detects the Vite configuration:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**.

> **Note**: A [`vercel.json`](./vercel.json) rewrite rule is included to handle client-side routing without 404 errors on deep linking or page refreshes.

---

## 📄 License

This project is licensed under the MIT License.
