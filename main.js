const { protocol } = require('electron');
const{getConnection} = require("./src/database/database.js");
const{app,BrowserWindow,ipcMain} = require('electron/main');
require('electron-reload')(__dirname)
app.allowRendererProcessReuse = true
const createFeedback = async(feedback)=>{
    try {
        const conn = await getConnection();
        feedback.feedbackname = feedback.feedbackname
        feedback.feedbackreason = feedback.feedbackreason
        const result = await conn.query("INSERT INTO feedback SET?",feedback)
         feedback.id = result.insertId
         new Notification({
            title:'Customer Feedback Project',
            body:'Feedback Submitted Sucessfully'
         })  .onshow()
 return feedback

    } catch (error) {
        
    }
}



function createWindow(){
    const win = new BrowserWindow({
        width:800,
        height:600, 
        webPreferences: {
            nodeIntegration:true
            //preload: path.join(__dirname, 'preload.js')
          }
    }); 

 
   win.loadFile('src/ui/index.html');
}

let server = require('./server/server.js')
let db = require('./src/database/database.js')
app.whenReady().then(()=>{
    ipcMain.handle('ping', () => 'pong')
    createWindow()
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
app.on('window-all-closed',()=>{
    if(process.plateform!== 'darwin') app.quit();
});


module.exports = {
   createWindow,
    createFeedback
}