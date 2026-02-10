import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.blesync.app',
  appName: 'BLE Sync',
  webDir: 'dist/ble-sync/browser',
  server: {
    androidScheme: 'https',
  },
};

export default config;
