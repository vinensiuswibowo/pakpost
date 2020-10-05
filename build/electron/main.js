"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var isDev = require("electron-is-dev");
var ipc_main_handler_1 = require("./ipc-main-handler");
// import { MENU } from "./constants";
var win = null;
function createWindow() {
    win = new electron_1.BrowserWindow({
        width: 900,
        height: 700,
        titleBarStyle: "hidden",
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            worldSafeExecuteJavaScript: true,
            preload: path.join(__dirname, "preload.js"),
        },
        backgroundColor: "#ffffff",
        icon: path.join(__dirname, "assets/ios/iTunesArtwork@3x.png"),
    });
    if (isDev) {
        win.loadURL("http://localhost:3000/index.html");
    }
    else {
        // 'build/index.html'
        win.loadURL("file://" + __dirname + "/../index.html");
        // Menu.setApplicationMenu(Menu.buildFromTemplate(MENU));
    }
    win.on("closed", function () { return (win = null); });
    // Hot Reloading
    if (isDev) {
        // 'node_modules/.bin/electronPath'
        require("electron-reload")(__dirname, {
            electron: path.join(__dirname, "..", "..", "node_modules", ".bin", "electron"),
            forceHardReset: true,
            hardResetMethod: "exit",
        });
    }
    if (isDev) {
        // DevTools
        // installExtension(REACT_DEVELOPER_TOOLS)
        //   .then((name) => console.log(`Added Extension:  ${name}`))
        //   .catch((err) => console.log("An error occurred: ", err));
        win.webContents.openDevTools();
    }
}
electron_1.app.on("ready", createWindow);
electron_1.app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
electron_1.app.on("certificate-error", function (event, webContents, url, error, certificate, callback) {
    // On certificate error we disable default behaviour (stop loading the page)
    // and we then say "it is all fine - true" to the callback
    event.preventDefault();
    callback(true);
});
electron_1.app.on("activate", function () {
    if (win === null) {
        createWindow();
    }
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipc_main_handler_1.initIpcMain();
//# sourceMappingURL=main.js.map