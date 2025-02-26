const { app, BrowserWindow, ipcMain } = require('electron');

let win; // Variabile globale per la finestra

const createWindow = () => {
  win = new BrowserWindow({
    width: 300,
    height: 375,
    frame: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: true, // Permette l'uso di require in renderer.js
      contextIsolation: false
    }
  });

  win.loadFile('set-time.html');
};

app.whenReady().then(() => {
  createWindow();
});

// Gestione degli eventi per ridurre e chiudere la finestra
ipcMain.on('minimize-window', () => {
  if (win) win.minimize();
});

ipcMain.on('close-window', () => {
  if (win) win.close();
});


/*
ipcMain.on('load-page-set-time', () => {
  if (win) {
    win.loadFile('set-time.html'); // Sostituisce la pagina attuale 
  }
});*/

ipcMain.on('load-countdown', (event, time) => {
  if (win) {
    win.webContents.once('did-finish-load', () => {
      win.webContents.send('set-time', time);
    });
    win.loadFile('countdown.html');
  }
});



