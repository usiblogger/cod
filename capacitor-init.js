// Capacitor initialization for SleepyLearn
import { Capacitor } from '@capacitor/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Keyboard } from '@capacitor/keyboard';

// Initialize Capacitor plugins when app loads
document.addEventListener('DOMContentLoaded', async () => {
    if (Capacitor.isNativePlatform()) {
        console.log('Running on native platform:', Capacitor.getPlatform());
        
        try {
            // Configure status bar
            await StatusBar.setStyle({ style: Style.Light });
            await StatusBar.setBackgroundColor({ color: '#f5f7fa' });
            
            // Configure keyboard
            Keyboard.addListener('keyboardWillShow', info => {
                console.log('Keyboard will show with height:', info.keyboardHeight);
            });
            
            Keyboard.addListener('keyboardDidShow', info => {
                console.log('Keyboard did show with height:', info.keyboardHeight);
            });
            
            // Hide splash screen after app is ready
            setTimeout(async () => {
                await SplashScreen.hide();
            }, 2000);
            
        } catch (error) {
            console.error('Error initializing Capacitor plugins:', error);
        }
    } else {
        console.log('Running in web browser');
    }
});

// Handle back button on Android
document.addEventListener('ionBackButton', (ev) => {
    ev.detail.register(-1, () => {
        const currentPage = window.SleepyLearn?.navigation?.getCurrentPage();
        
        if (currentPage === 'home') {
            // On home page, minimize app instead of closing
            if (Capacitor.isNativePlatform()) {
                // Let the system handle the back button
                return;
            }
        } else {
            // Navigate back to home
            window.SleepyLearn?.navigation?.navigateToHome();
        }
    });
});

// Export for use in other scripts
window.CapacitorInit = {
    isNative: () => Capacitor.isNativePlatform(),
    getPlatform: () => Capacitor.getPlatform()
};