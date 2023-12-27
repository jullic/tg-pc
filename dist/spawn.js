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
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncSpawn = void 0;
const child_process_1 = require("child_process");
const asyncSpawn = (command, args, options) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((res, rej) => {
        var _a, _b;
        const childProcess = (0, child_process_1.spawn)(command, args, options);
        let okData = '';
        let errData = '';
        (_a = childProcess.stdout) === null || _a === void 0 ? void 0 : _a.on('data', (chunk) => (okData = okData + chunk.toString()));
        (_b = childProcess.stderr) === null || _b === void 0 ? void 0 : _b.on('data', (chunk) => (errData = errData + chunk.toString()));
        childProcess.on('close', () => {
            res({ okData, errData });
        });
        childProcess.on('error', (err) => {
            rej(new Error(`${command} ${args.join(' ')}\n\n` + err.message));
        });
    });
});
exports.asyncSpawn = asyncSpawn;
