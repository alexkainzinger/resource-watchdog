import * as path from 'path';
import * as Mocha from 'mocha';
import * as glob from 'glob';

export async function run(): Promise<void> {
	// Create the mocha test
	const mocha = new Mocha({
		ui: 'tdd',
		color: true
	});

	const testsRoot = path.resolve(__dirname, '..');

	try {
		const files = await glob.glob('**/**.test.js', { cwd: testsRoot });

		// Add files to the test suite
		files.forEach(f => mocha.addFile(path.resolve(testsRoot, f)));

		// Run the mocha test
		mocha.run(failures => {
			if (failures > 0) {
				Promise.reject(new Error(`${failures} tests failed.`));
			} else {
				Promise.resolve();
			}
		});
	} catch (err) {
		console.error(err);
		Promise.reject(err);
	}
}
