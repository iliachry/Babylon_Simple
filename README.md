# 3D Model Viewer & Authoring Tool

This project provides a web-based 3D model viewer and authoring tool using Babylon.js and Node.js/Express. Users can upload 3D models, adjust camera settings, and view models interactively.

---

## Features
- **3D Model Authoring Tool**: Upload `.glb`/`.gltf` models, adjust camera (alpha, beta, radius, target), and save settings.
- **3D Model Viewer**: View the uploaded model with the saved camera settings.
- **Modern UI**: Clean, responsive, and user-friendly interface.

---

## Folder Structure

```
Babylon_Simple/
├── backend/
│   ├── models/           # Uploaded 3D models (auto-created)
│   ├── model-info/       # Saved camera/model settings (auto-created)
│   ├── server.js         # Express backend server
│   ├── package.json      # Backend dependencies
│   └── ...
├── frontend/
│   ├── author.html       # Authoring tool UI
│   ├── viewer.html       # Viewer UI
│   ├── styles/           # CSS files for UI
│   └── ...
└── README.md             # This file
```

---

## Setup Instructions

### 1. Install Backend Dependencies
```sh
cd backend
npm install
```

### 2. Start the Backend Server
```sh
npm start
```
- The server runs on [http://localhost:3000](http://localhost:3000)
- The server will auto-create `models` and `model-info` folders if they do not exist.

### 3. Access the Frontend
- Open `http://localhost:3000/author.html` to upload models and set camera views.
- Open `http://localhost:3000/viewer.html` to view the model with the saved camera settings.

---

## Usage

### Authoring Tool (`author.html`)
1. Open the authoring tool in your browser.
2. Upload a `.glb` or `.gltf` model file.
3. Adjust the camera using the UI controls or by interacting with the 3D view.
4. Click **Save Camera Settings** to store the current camera view.

### Viewer (`viewer.html`)
1. Open the viewer in your browser.
2. The most recently uploaded model and camera settings will be loaded automatically.

---

## Notes
- All uploaded models and settings are shared (not per-user).
- The backend must have write permissions to the `backend/models` and `backend/model-info` folders.
- The project is designed for local or single-server deployment. For multi-user or production use, consider adding authentication and user-specific storage.
- CORS is not enabled by default; both frontend and backend are served from the same server.

---

## Troubleshooting
- **Model not loading in viewer?**
  - Make sure you have uploaded a model and saved camera settings in the authoring tool.
  - Check that the model file exists in `backend/models` and `model-info.json` exists in `backend/model-info`.
- **Permission errors?**
  - Ensure the backend process has write access to the `models` and `model-info` folders.

---

## License
MIT