"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initIpcMain = exports.fetch = void 0;
var electron_1 = require("electron");
var axios_1 = require("axios");
exports.fetch = axios_1.default.create();
var axiosTimerFunc = function (startTime) {
    var now = Date.now();
    var seconds = Math.floor((now - startTime) / 1000);
    var milliseconds = Math.floor((now - startTime) % 1000);
    return seconds + "." + milliseconds + " s";
};
exports.fetch.interceptors.request.use(function (config) {
    config.headers["pakpost-request-startTime"] = Date.now();
    return config;
});
exports.fetch.interceptors.response.use(function (response) {
    var start = response.config.headers["pakpost-request-startTime"];
    response.headers["pakpost-request-duration"] = axiosTimerFunc(start);
    return response;
}, function (error) {
    var start = error.config.headers["pakpost-request-startTime"];
    error.config.headers["pakpost-request-duration"] = axiosTimerFunc(start);
    return Promise.reject({
        errors: error,
        dataErrors: error.response.data.errors,
    });
});
exports.initIpcMain = function () {
    electron_1.ipcMain.handle("app-config", function () { return ({
        os: {
            platform: process.platform,
            version: process.versions.electron,
        },
        app: {
            version: electron_1.app.getVersion(),
            name: electron_1.app.getName(),
        },
    }); });
    electron_1.ipcMain.handle("node-axios", function (e, params) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, exports.fetch(params)
                    .then(function (result) {
                    return {
                        data: result.data,
                        headers: result.headers,
                        status: result.status,
                        statusText: result.statusText,
                    };
                })
                    .catch(function (err) {
                    return {
                        errors: {
                            config: {
                                headers: err.errors.config.headers,
                            },
                            message: err.errors.message,
                        },
                        dataErrors: err.dataErrors,
                    };
                })];
        });
    }); });
    electron_1.ipcMain.handle("check-update", function () { });
};
//# sourceMappingURL=ipc-main-handler.js.map