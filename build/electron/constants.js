"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MENU = void 0;
var electron_1 = require("electron");
exports.MENU = [
    {
        label: "Filter",
        submenu: [
            {
                label: "About Pakpost",
                accelerator: "Shift+CmdOrCtrl+H",
                click: function () {
                    console.log("Oh, hi there!");
                },
            },
            {
                label: "Check for Updates",
                accelerator: "Shift+CmdOrCtrl+H",
                click: function () {
                    console.log("Oh, hi there!");
                },
            },
            {
                label: "Quit",
                accelerator: "Command+Q",
                click: function () {
                    electron_1.app.quit();
                },
            },
        ],
    },
    {
        label: "Help",
        submenu: [
            {
                label: "About Pakpost",
                accelerator: "Shift+CmdOrCtrl+H",
                click: function () {
                    console.log("Oh, hi there!");
                },
            },
            {
                label: "Check for Updates",
                accelerator: "Shift+CmdOrCtrl+H",
                click: function () {
                    console.log("Oh, hi there!");
                },
            },
        ],
    },
];
//# sourceMappingURL=constants.js.map