import {
  app,
  BrowserWindow,
  Menu,
  ipcMain,
  IpcMainEvent,
  session,
  AuthenticationResponseDetails,
  AuthInfo,
  Event,
} from 'electron';
import express from 'express';
import path from 'path';
import { promises as fs } from 'fs';
import moment from 'moment';
import { ICaptchaResponse, IBrowserSession, ICaptchaConfig } from './types';

const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:46.0) Gecko/20100101 Firefox/46.0';
const captchaBank: ICaptchaResponse[] = [];
let activeBrowserSessions: IBrowserSession[] = [];
let mainWindow: BrowserWindow;
let browserWindow: BrowserWindow;

const menu = Menu.buildFromTemplate([
  {
    label: app.name,
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' },
    ],
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },

      { role: 'pasteAndMatchStyle' },
      { role: 'delete' },
      { role: 'selectAll' },
      { type: 'separator' },

      { role: 'delete' },
      { type: 'separator' },
      { role: 'selectAll' },
    ],
  },
]);
Menu.setApplicationMenu(menu);

const expressApp: express.Express = express();

expressApp.use(express.json());
expressApp.use(express.urlencoded({ extended: true }));

expressApp.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).send(captchaBank);
});
const expressServer = expressApp.listen(3000);

const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    width: 500,
    height: 650,
    minWidth: 500,
    minHeight: 650,
    resizable: false,
    fullscreen: false,
    useContentSize: true,
    show: false,
    frame: false,
    backgroundColor: '#e1e6ea',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, './preload.js'),
    },
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }
  mainWindow.loadFile(path.join(__dirname, './public/index.html'));
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show();
  });
  mainWindow.on('closed', () => {
    expressServer.close();
    app.quit();
  });
};

const createBrowserWindow = (browserSession: IBrowserSession) => {
  browserWindow = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      partition: 'persist:' + browserSession.id,
    },
  });

  browserWindow.loadURL('https://www.google.com/?hl=ja', {
    userAgent: USER_AGENT,
  });
};

const createCaptchaWindow = async (
  browserSession: IBrowserSession,
  captchaConfig: ICaptchaConfig,
) => {
  const captchaWindow = new BrowserWindow({
    width: 400,
    height: 500,
    minWidth: 400,
    minHeight: 500,
    useContentSize: true,
    resizable: false,
    fullscreenable: false,
    backgroundColor: '#e1e6ea',
    webPreferences: {
      partition: 'persist:' + browserSession.id,
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, './preload.js'),
    },
  });
  if (process.env.NODE_ENV === 'development') {
    captchaWindow.webContents.openDevTools({ mode: 'detach' });
  }
  captchaWindow.webContents.on('did-finish-load', () => {
    captchaWindow.webContents.send(
      'loadedCaptchaWindow',
      browserSession,
      captchaConfig,
    );
  });

  ipcMain.once(
    `deleteSession:${browserSession.id}`,
    async (event: IpcMainEvent) => {
      mainWindow.webContents.send('deleteSession', browserSession);
      const persistId = 'persist:' + browserSession.id;
      await session.fromPartition(persistId).clearCache();
      await session.fromPartition(persistId).clearStorageData();
      captchaWindow.close();
    },
  );

  ipcMain.on(
    `forceReloadCaptcha:${browserSession.id}`,
    async (event: IpcMainEvent) => {
      await captchaWindow.loadURL(captchaConfig.host, {
        userAgent: USER_AGENT,
      });
    },
  );

  ipcMain.on(
    `saveProxy:${browserSession.id}`,
    async (event: IpcMainEvent, newSession: IBrowserSession) => {
      mainWindow.webContents.send('editSession', newSession);
      for (let i = 0; i < activeBrowserSessions.length; i++) {
        if (newSession.id === activeBrowserSessions[i].id) {
          activeBrowserSessions[i] = newSession;
          browserSession = newSession;
        }
      }
      await setProxy(captchaWindow, newSession);
      await captchaWindow.loadURL(captchaConfig.host, {
        userAgent: USER_AGENT,
      });
    },
  );

  captchaWindow.on('closed', () => {
    activeBrowserSessions = activeBrowserSessions.filter(
      s => s.id !== browserSession.id,
    );
    ipcMain.removeAllListeners(`saveProxy:${browserSession.id}`);
    ipcMain.removeAllListeners(`clearSession:${browserSession.id}`);
    ipcMain.removeAllListeners(`forceReloadCaptcha:${browserSession.id}`);
    ipcMain.removeAllListeners(`deleteSession:${browserSession.id}`);
  });

  await setProxy(captchaWindow, browserSession);

  setInterception(browserSession);

  await captchaWindow.loadURL(captchaConfig.host, {
    userAgent: USER_AGENT,
  });
};

const setProxy = async (
  captchaWindow: BrowserWindow,
  browserSession: IBrowserSession,
) => {
  if (browserSession.proxy.host !== '' && !isNaN(browserSession.proxy.port)) {
    await captchaWindow.webContents.session.setProxy({
      proxyRules: `http://${browserSession.proxy.host}:${browserSession.proxy.port}`,
    });
  } else {
    await captchaWindow.webContents.session.setProxy({
      proxyRules: '',
    });
  }
};

const setInterception = (browserSession: IBrowserSession) => {
  session
    .fromPartition('persist:' + browserSession.id)
    .protocol.interceptBufferProtocol('http', async (req, callback) => {
      const html = await fs.readFile(
        path.join(__dirname, './public/captcha-index.html'),
        'utf8',
      );
      return callback(Buffer.from(html));
    });
};

setInterval(() => {
  captchaBank.forEach((captcha, index) => {
    const now = moment().unix();
    if (now - captcha.timestamp > 115) {
      captchaBank.splice(index, 1);
      mainWindow.webContents.send('deleteCaptcha', captcha);
    }
  });
}, 1000);

// basic auth
app.on(
  'login',
  (
    event: Event,
    webContents: any,
    request: AuthenticationResponseDetails,
    authInfo: AuthInfo,
    callback,
  ) => {
    event.preventDefault();

    const partition = webContents.browserWindowOptions.webPreferences.partition;
    const found = activeBrowserSessions.find(
      window => 'persist:' + window.id === partition,
    );
    if (found) {
      callback(found.proxy.user, found.proxy.password);
    } else {
      callback();
    }
  },
);

ipcMain.on(
  'createNewSession',
  (
    event: IpcMainEvent,
    browserSession: IBrowserSession,
    capthcaConfig: ICaptchaConfig,
  ) => {
    createCaptchaWindow(browserSession, capthcaConfig);
    activeBrowserSessions.push(browserSession);
  },
);

ipcMain.on(
  'solveCaptcha',
  (event: IpcMainEvent, token: string, host: string) => {
    const captcha: ICaptchaResponse = {
      token: token,
      host: host,
      timestamp: moment().unix(),
    };
    captchaBank.push(captcha);
    mainWindow.webContents.send('addCaptcha', captcha);
  },
);

ipcMain.on('openBrowserWindow', (event: IpcMainEvent, sessionId: string) => {
  const foundSession = activeBrowserSessions.find(
    session => session.id === sessionId,
  );
  if (foundSession !== undefined) {
    createBrowserWindow(foundSession);
  }
});

ipcMain.on(
  'openAllCaptchaWindows',
  (
    event: IpcMainEvent,
    browserSessions: IBrowserSession[],
    captchaConfig: ICaptchaConfig,
  ) => {
    browserSessions.forEach(browserSession => {
      const found = activeBrowserSessions.find(s => s.id === browserSession.id);
      if (!found) {
        activeBrowserSessions.push(browserSession);
        createCaptchaWindow(browserSession, captchaConfig);
      }
    });
  },
);

ipcMain.on(
  'openCaptchaWindow',
  (
    event: IpcMainEvent,
    browserSession: IBrowserSession,
    captchaConfig: ICaptchaConfig,
  ) => {
    activeBrowserSessions.push(browserSession);
    createCaptchaWindow(browserSession, captchaConfig);
  },
);

ipcMain.on('maximizeWindow', () => {
  mainWindow.setFullScreen(!mainWindow.isFullScreen());
});

ipcMain.on('minimizeWindow', () => {
  mainWindow.minimize();
});

ipcMain.on('closeWindow', () => {
  mainWindow.close();
});

app.on('ready', () => {
  createMainWindow();
});
