import * as vscode from 'vscode';
import { CONFIGURATION_KEY } from './constants';
import ResourceWatchdog from './resource-watchdog';

export function activate(context: vscode.ExtensionContext) {
	const resourceWatchdog = new ResourceWatchdog();
	resourceWatchdog.startUpdating();

	vscode.workspace.onDidChangeConfiguration(e => {
		if (e.affectsConfiguration(CONFIGURATION_KEY)) {
			resourceWatchdog.onConfigChange();
		}
	});

	context.subscriptions.push(resourceWatchdog);
}

export function deactivate() {}
