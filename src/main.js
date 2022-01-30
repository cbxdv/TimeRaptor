/* eslint-disable */
const { app, BrowserWindow, Tray, Menu } = require('electron');
const path = require('path');
const os = require('os');
const Store = require('electron-store');

const store = new Store();

let mainWindow = null;
let loadingWindow = null; 
let tray = null;

// Boolean to indicate whether the app is quiting or just closing window
let isAppQuitting = false;

const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1220,
    height: 800,
    minWidth: 1220,
    minHeight: 800,
    show: false,
    frame: os.platform() !== 'win32',
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      backgroundThrottling: false,
      devTools: false
    },
    icon: path.join(__dirname, './assets/Logo.ico')
  });

  const menu = new Menu.buildFromTemplate([
    {
      label: 'Time Raptor',
      submenu: [
        { role: 'close' },
        { role: 'quit' }
      ]
    }
  ]);

  Menu.setApplicationMenu(menu)

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools
  // mainWindow.webContents.openDevTools();

  // Hiding menubar
  mainWindow.setMenuBarVisibility(false);

  mainWindow.on('ready-to-show', async () => {
    const minimized = await store.get('userConfigs.openMinimized');
    if (minimized !== undefined && minimized === true) {
      return;
    }
    if (loadingWindow) {
      loadingWindow.close();
    }
    mainWindow.show();
  });

  mainWindow.on('close', async event => {
    if (!isAppQuitting) {
      event.preventDefault();
    }
    const close = await store.get('userConfigs.closeOnExit', false);
    if (close) {
      app.quit();
    } else {
      mainWindow.hide();
    }
  });

};

const createLoadingWindow = () => {
  loadingWindow = new BrowserWindow({
    width: 300,
    height: 300,
    frame: false,
    transparent: true
  });
  loadingWindow.setResizable(false);
  loadingWindow.loadURL('file://' + __dirname + '/pages/Loading.html');
  loadingWindow.on('closed', () => (loadingWindow = null));
  loadingWindow.on('ready-to-show', () => {
    loadingWindow.show();
  });
};

const createTray = () => {

  let iconPath = path.join(__dirname, './assets/trayIcons/Icon.ico');
  if (os.platform === 'darwin') {
    iconPath = path.join(__dirname, './assets/trayIcons/Icon.png');
  }

  tray = new Tray(iconPath);
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

  if (os.platform == 'win32') {
    tray.on('click', () => {
      showWindow();
    });
  }
};

const onReadyHandler = () => {
  createLoadingWindow();
  createMainWindow();
  createTray();
};

app.on('ready', onReadyHandler);

const showWindow = () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  } else {
    mainWindow.show();
  }
};

app.on('activate', showWindow);

app.on('before-quit', () => isAppQuitting = true )

app.on('will-quit', () => isAppQuitting = true )

app.on('quit', () => {
  if (BrowserWindow.getAllWindows().length !== 0) {
    mainWindow.close()
    tray = null;
    mainWindow = null;
  }
  tray = null;
  app.quit();
})

if (process.platform === 'win32') {
  app.setAppUserModelId(process.execPath)
}

require('update-electron-app')();

// Importing and starting all ipc handlers of the app
require('./electron/ipcHandlers.js');
