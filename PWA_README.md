# Summer Learning Adventure 2025 PWA

This application has been converted to a Progressive Web App (PWA), making it installable and usable offline on mobile devices including Android tablets.

## Features Added

- **Installable on Home Screen**: The app can be added to the home screen on Android tablets and other devices
- **Offline Support**: All essential features work even without internet connection
- **App-like Experience**: Runs in a standalone window without browser UI
- **Automatic Updates**: The app will notify users when a new version is available

## How to Install on an Android Tablet

1. **Open the website** in Chrome browser on the Android tablet
2. Either:
   - Tap the "Install App on Device" button at the top of the application, OR
   - Tap the Chrome menu (three dots) and select "Add to Home screen"
3. Follow the prompts to install the application
4. Once installed, the app will appear on your home screen like any other app

## Technical Details

- **Web App Manifest**: Defines how the app appears when installed
- **Service Worker**: Manages caching and offline functionality
- **Icons**: App icons in multiple sizes for different devices
- **Responsive Design**: UI adjustments for tablet displays

## Testing the PWA Features

To test if the PWA is working correctly:
1. Open Chrome DevTools (on a desktop browser)
2. Go to the "Application" tab
3. Look for "Service Workers", "Manifest", and "Cache Storage" sections
4. Use the "Offline" checkbox in the Service Workers section to simulate offline mode

## Known Limitations

- The worksheets will only be available offline if they've been viewed at least once while online
- First-time installation requires an internet connection
