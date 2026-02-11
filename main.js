// main.js
const { app, BrowserWindow } = require("electron");
const path = require("path");

let mainWindow = null;

function createMainWindow() {
  if (mainWindow) return;

  const indexPath = path.join(__dirname, "frontend", "index.html");

  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js")
    }
  });

  mainWindow.loadFile(indexPath);

  mainWindow.maximize();

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

// ==============================
// App lifecycle
// ==============================

app.whenReady().then(createMainWindow);

app.on("activate", () => {
  if (!mainWindow) createMainWindow();
});

app.on("window-all-closed", () => {
  app.quit();
});
