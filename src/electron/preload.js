// console.log(`👋🏻 from preload.js`);

// eslint-disable-next-line
const { ipcRenderer, contextBridge } = require('electron');

// Can be accessed through window.app
contextBridge.exposeInMainWorld('electron', {
  getAppVersion: () => ipcRenderer.invoke('app:version'),
  appNotify: data => ipcRenderer.send('app:notify', data),
  appOpenRepoLink: data => ipcRenderer.send('app:openRepoLink', data),

  closeWindow: () => ipcRenderer.send('window:close'),
  maximizeWindow: () => ipcRenderer.send('window:maximize'),
  minimizeWindow: () => ipcRenderer.send('window:minimize'),
  restoreWindow: () => ipcRenderer.send('window:restore'),
  reloadWindow: () => ipcRenderer.send('window:reload'),

  getAllTimeBlocks: () => ipcRenderer.invoke('timeblocks:get'),
  updateTimeBlocks: data => ipcRenderer.send('timeblocks:update', data),
  clearAllTimeBlocks: () => ipcRenderer.send('timeblocks:clear'),

  getUserConfigs: () => ipcRenderer.invoke('userConfigs:get'),
  setUserConfig: data => ipcRenderer.send('userConfig:set', data)
});
