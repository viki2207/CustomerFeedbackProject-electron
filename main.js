const{app,BrowserWindow} = require('electron');
function createWindow(){
    const win = new BrowserWindow({
        width:768,
        height:560
    }); 

    win.loadFile('src/index.html');
    win.webContents.openDevTools();
}

app.whenReady().then(createWindow);


app.on('window-all-closed',()=>{
    if(process.plateform!== 'darwin') app.quit();
});


