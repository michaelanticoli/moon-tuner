import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { PushNotifications } from '@capacitor/push-notifications';

/**
 * Initialize native (Capacitor) integrations. Safe no-op on web.
 * Call once from app bootstrap.
 */
export async function initNative() {
  if (!Capacitor.isNativePlatform()) return;

  try {
    await StatusBar.setStyle({ style: Style.Dark });
    await StatusBar.setBackgroundColor({ color: '#000000' });
  } catch (e) {
    console.warn('StatusBar init failed', e);
  }

  try {
    await SplashScreen.hide({ fadeOutDuration: 400 });
  } catch (e) {
    console.warn('SplashScreen hide failed', e);
  }

  try {
    const perm = await PushNotifications.checkPermissions();
    let granted = perm.receive === 'granted';
    if (!granted) {
      const req = await PushNotifications.requestPermissions();
      granted = req.receive === 'granted';
    }
    if (granted) {
      await PushNotifications.register();
      PushNotifications.addListener('registration', (token) => {
        console.info('[push] token', token.value);
      });
      PushNotifications.addListener('registrationError', (err) => {
        console.warn('[push] registration error', err);
      });
    }
  } catch (e) {
    console.warn('Push init failed', e);
  }
}
