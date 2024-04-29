const{app,BrowserWindow} = require('electron');
require("./src/database/database");
function createWindow(){
    const win = new BrowserWindow({
        width:768,
        height:560
    }); 

    win.loadFile('src/index.html');
}

app.whenReady().then(createWindow);


app.on('window-all-closed',()=>{
    if(process.plateform!== 'darwin') app.quit();
});


