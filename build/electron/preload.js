"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld("contextElectron", {
    appConfig: function () { return electron_1.ipcRenderer.invoke("app-config"); },
    nodeAxios: function (params) { return electron_1.ipcRenderer.invoke("node-axios", params); },
    checkUpdate: function () { return electron_1.ipcRenderer.invoke("check-update"); },
});
//# sourceMappingURL=preload.js.map