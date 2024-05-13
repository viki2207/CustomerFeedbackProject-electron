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
// Function to close the database connection
const closeConnection = async() => {
    try {
        // Close the database connection
        await getConnection().end();
        console.log("Database connection closed successfully.");
    } catch (error) {
        console.error("Error closing database connection:", error);
    }
};

let db = require('./database.js');

app.whenReady().then(() => {
    createWindow();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on('window-all-closed', () => {
    closeConnection();
    if (process.platform !== 'darwin') app.quit();
});

module.exports = {
    createWindow,
};
