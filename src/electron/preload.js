// console.log(`👋🏻 from preload.js`);

const { ipcRenderer, contextBridge } = require('electron');

// Can be accessed through window.app
contextBridge.exposeInMainWorld('electron', {
  appVersion: () => ipcRenderer.invoke('app:version'),
  appNotify: (data) => ipcRenderer.send('app:notify', data),
  appOpenRepoLink: (data) => ipcRenderer.send('app:openrepolink', data),

  closeWindow: () => ipcRenderer.send('window:close'),
  maximizeWindow: () => ipcRenderer.send('window:maximize'),
  minimizeWindow: () => ipcRenderer.send('window:minimize'),
  restoreWindow: () => ipcRenderer.send('window:restore'),

  getAllTimeBlocks: () => ipcRenderer.invoke('timeblocks:get'),
  updateTimeBlocks: (data) => ipcRenderer.send('timeblocks:update', data),
  clearAllTimeBlocks: () => ipcRenderer.send('timeblocks:clear'),

  getUserConfigs: () => ipcRenderer.invoke('userconfigs:get'),
  setUserConfig: (data) => ipcRenderer.send('userconfig:set', data),
});
