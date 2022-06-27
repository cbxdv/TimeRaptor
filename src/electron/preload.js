// console.log(`👋🏻 from preload.js`);

// eslint-disable-next-line
const { ipcRenderer, contextBridge } = require('electron');

// Can be accessed through window.app
contextBridge.exposeInMainWorld('electron', {
  getAppVersion: () => ipcRenderer.invoke('app:version'),
  getPlatform: () => ipcRenderer.invoke('app:platform'),
  appNotify: data => ipcRenderer.send('app:notify', data),
  appOpenRepoLink: data => ipcRenderer.send('app:openRepoLink', data),

  quitApp: () => ipcRenderer.send('app:quit'),
  closeWindow: () => ipcRenderer.send('window:close'),
  maximizeWindow: () => ipcRenderer.send('window:maximize'),
  minimizeWindow: () => ipcRenderer.send('window:minimize'),
  restoreWindow: () => ipcRenderer.send('window:restore'),
  reloadWindow: () => ipcRenderer.send('window:reload'),

  getUserConfigs: () => ipcRenderer.invoke('configs:get'),
  setUserConfig: data => ipcRenderer.send('config:set', data),

  getAllTimeBlocks: () => ipcRenderer.invoke('timetable:get'),
  updateTimeBlocks: data => ipcRenderer.send('timetable:update', data),
  clearAllTimeBlocks: () => ipcRenderer.send('timetable:clear'),

  getAllTodos: () => ipcRenderer.invoke('todos:get'),
  updateTodos: data => ipcRenderer.send('todos:update', data),
  clearAllTodos: () => ipcRenderer.send('todos:clear')
});
