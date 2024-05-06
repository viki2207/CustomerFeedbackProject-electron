const { getConnection } = require("./database.js");
const { app, BrowserWindow, Notification } = require('electron');

let mainWindow;

require('electron-reload')(__dirname);
app.allowRendererProcessReuse = true;

function createWindow() {
    window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
    });

    window.loadFile("src/ui/index.html");
}

let db = require('./database.js');

app.whenReady().then(() => {
    createWindow();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

module.exports = {
    createWindow,
};
