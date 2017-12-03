// @flow
import { BrowserWindow } from 'electron';

export default class MenuBuilder {
  mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
  }

  buildMenu() {
    if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
      this.setupDevelopmentEnvironment();
    }
    // this.setupDevelopmentEnvironment();
  }

  setupDevelopmentEnvironment() {
    this.mainWindow.openDevTools();
  }
}
