console.log(`👋🏻 from preload.js`);

const { ipcRenderer, contextBridge } = require('electron');

// Can be accessed through window.app
contextBridge.exposeInMainWorld('electron', {
  appVersion: () => ipcRenderer.invoke('app:version'),
  appNotify: (data) => ipcRenderer.send('app:notify', data),
  appOpenLink: (data) => ipcRenderer.send('app:openlink', data),

  getAllTimeBlocks: () => ipcRenderer.invoke('timeblocks:get'),
  updateTimeBlocks: (data) => ipcRenderer.send('timeblocks:update', data),
  clearAllTimeBlocks: () => ipcRenderer.send('timeblocks:clear'),

  getUserConfigs: () => ipcRenderer.invoke('userconfigs:get'),
});
