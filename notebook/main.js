const server = require('./app');
var path = require('path')
const { app, BrowserWindow } = require('electron')

var mainWindow;

function createWindow() {

    mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        devTools: true,
        icon: __dirname + "/logo-shera.png",

        autoHideMenuBar: true,

        webPreferences: {
            //preload: path.join(__dirname, "preload.js"),
            nodeIntegration: true,
        },
    });


    mainWindow.loadURL('http://localhost:8080/');

}

app.on('ready', createWindow)