/* eslint-disable */
const { app, BrowserWindow, Tray, Menu } = require('electron');
const path = require('path');
const os = require('os');
const Store = require('electron-store');
const isSquirrelStartup = require('electron-squirrel-startup');

const store = new Store();

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow = null;
let tray = null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1220,
    height: 800,
    minWidth: 1220,
    minHeight: 800,
    show: false,
    frame: os.platform() !== 'win32',
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      backgroundThrottling: false
    },
    icon: path.join(__dirname, './assets/Logo.ico')
  });

  const menu = new Menu.buildFromTemplate([]);
  mainWindow.setMenu(menu);

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Hiding menubar
  mainWindow.setMenuBarVisibility(false);

  mainWindow.on('ready-to-show', async () => {
    const minimized = await store.get('userConfigs.openMinimized');
    if (minimized !== undefined && minimized === true) {
      return;
    }
    mainWindow.show();
  });
};

const createTray = () => {
  tray = new Tray(path.join(__dirname, './assets/Logo.ico'));
  tray.setToolTip('Time Raptor');
  const trayMenu = Menu.buildFromTemplate([
    {
      label: 'Show',
      click() {
        showWindow();
      }
    },
    { role: 'quit' }
  ]);
  tray.setContextMenu(trayMenu);

  tray.on('click', () => {
    showWindow();
  });
};

const onReadyHandler = () => {
  createWindow();
  createTray();
};

app.on('ready', onReadyHandler);

const showWindow = () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  } else {
    mainWindow.show();
  }
};

app.on('window-all-closed', async () => {
  const close = await store.get('userconfigs.closeOnExit', false);
  if (close) {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

if (process.platform === 'win32') {
  app.setAppUserModelId('Time Raptor');
}

if (isSquirrelStartup) {
  app.quit();
}

require('update-electron-app')();

// Importing and starting all ipc handlers of the app
require('./electron/ipcHandlers.js');
