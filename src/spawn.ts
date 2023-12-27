import { spawn, SpawnOptionsWithoutStdio } from 'child_process';

export const asyncSpawn = async (
	command: string,
	args: string[],
	options?: SpawnOptionsWithoutStdio | undefined
): Promise<{ okData: string; errData: string }> => {
	return new Promise((res, rej) => {
		const childProcess = spawn(command, args, options);
		let okData = '';
		let errData = '';

		childProcess.stdout?.on(
			'data',
			(chunk) => (okData = okData + chunk.toString())
		);
		childProcess.stderr?.on(
			'data',
			(chunk) => (errData = errData + chunk.toString())
		);

		childProcess.on('close', () => {
			res({ okData, errData });
		});
		childProcess.on('error', (err) => {
			rej(new Error(`${command} ${args.join(' ')}\n\n` + err.message));
		});
	});
};
