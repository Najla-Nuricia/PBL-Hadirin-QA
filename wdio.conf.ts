const APPIUM_PORT = Number(process.env.APPIUM_PORT ?? 4723);
const DEVICE_NAME = process.env.ANDROID_DEVICE_NAME ?? 'emulator-5554';
const PLATFORM_VERSION = process.env.ANDROID_PLATFORM_VERSION ?? '16';
const APP_PACKAGE = process.env.FLUTTER_APP_PACKAGE ?? 'com.example.mobile';
const APP_ACTIVITY = process.env.FLUTTER_APP_ACTIVITY ?? 'com.example.mobile.MainActivity';
const APP_PATH = process.env.FLUTTER_APP_PATH;

const capabilities = [
  {
    platformName: 'Android',
    'appium:platformVersion': PLATFORM_VERSION,
    'appium:deviceName': DEVICE_NAME,
    'appium:automationName': 'UiAutomator2',
    ...(APP_PATH ? { 'appium:app': APP_PATH } : {}),
    ...(APP_PATH ? {} : { 'appium:appPackage': APP_PACKAGE }),
    ...(APP_PATH ? {} : { 'appium:appActivity': APP_ACTIVITY }),
    'appium:noReset': true,
    'appium:autoGrantPermissions': true,
    'appium:newCommandTimeout': 120,
    'appium:ensureWebviewsHavePages': true,
  },
];

export const config = {
  runner: 'local',
  specs: ['./tests/**/*.ts'],
  exclude: [],
  maxInstances: 1,
  logLevel: 'info',
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },
  services: [
    [
      'appium',
      {
        args: {
          port: APPIUM_PORT,
          relaxedSecurity: true,
        },
      },
    ],
  ],
  capabilities,
};

export default config;
