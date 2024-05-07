const {createwindow} = require('../main.js');
const { app, BrowserWindow } = require('electron');
require('../database.js')
require('electron-reload')(__dirname)
app.allowRendererProcessReuse = true
app.whenReady().then(createwindow)