# SleepyLearn - Bedtime Learning App 🌙

A gentle, child-friendly web application designed to help children aged 3-8 years with bedtime learning and relaxation practices through voice-guided stories and breathing exercises.

## 🌟 Features

### 📚 Bedtime Stories
- **AI-Generated Stories**: Create new bedtime stories using AI technology
- **Synchronized Text Highlighting**: Text lights up as it's being read aloud
- **Chinese Voice Narration**: Clear, child-appropriate speech synthesis

### 🫁 4-7-8 Breathing Method
- **Harvard-Recommended Technique**: Based on Dr. Andrew Weil's 4-7-8 breathing method
- **Scientifically Proven**: Activates parasympathetic nervous system for rapid relaxation
- **4 Complete Cycles**: Optimal number for sleep preparation
- **Visual Timer**: Real-time countdown for each breathing phase
- **Guided Instructions**: Step-by-step voice guidance in Chinese

## 🧠 The Science Behind Bedtime Learning

Research shows that **bedtime learning significantly enhances children's comprehension and memory consolidation**. The pre-sleep period is a golden opportunity for:

### 🎯 Cognitive Benefits
### 💤 Sleep Quality Benefits  
### 👨‍👩‍👧‍👦 Family Bonding

## Technologies

SleepyLearn showcases a rich ecosystem of *cutting-edge web technologies*, demonstrating how modern development can remain accessible to beginner engineers while delivering professional-grade functionality:

#### *🌐 Frontend Technologies*
- *HTML5*: Semantic markup, accessibility features, responsive design
- *CSS3*: Advanced styling, gradients, animations, flexbox, grid layout
- *Vanilla JavaScript (ES6+)*: Modern syntax, classes, async/await, modules
- *Web APIs*: Extensive use of browser-native capabilities

#### *🎵 Audio & Speech Technologies*
- *Web Speech API*: SpeechSynthesis for text-to-speech conversion
- *HTML5 Audio API*: Background music and sound effect management
- *AudioContext*: Advanced audio processing and mixing
- *Media Session API*: Audio playback control integration

#### *🤖 AI & External Services*
- *FreeGPT API*: AI-powered story generation
- *CDN Integration*: jsDelivr for reliable external library loading
- *RESTful API Integration*: Asynchronous data fetching and error handling
- *Fallback Systems*: Robust offline functionality

#### *📱 Mobile & Cross-Platform*
- *Ionic Capacitor*: Native mobile app deployment
- *Progressive Web App (PWA)*: Service worker ready architecture
- *Responsive Design*: Mobile-first approach with touch optimization
- *Cross-browser Compatibility*: Chrome, Firefox, Safari, Edge support

#### *🏗️ Architecture & Development*
- *ES6 Classes*: Object-oriented programming patterns
- *Module Pattern*: Clean separation of concerns
- *Event-Driven Architecture*: Loose coupling between components
- *State Management*: Centralized application state handling
- *Error Handling*: Comprehensive try-catch and fallback systems

#### *🎨 UI/UX Technologies*
- *CSS Grid & Flexbox*: Modern layout systems
- *CSS Animations*: Smooth transitions and micro-interactions
- *Custom Properties (CSS Variables)*: Dynamic theming support
- *Media Queries*: Responsive breakpoints for all devices
- *Accessibility (ARIA)*: Screen reader and keyboard navigation support

#### *🔧 Development Tools & Practices*
- *NPM Package Management*: Dependency management and scripts
- *JSON Configuration*: Structured app and build configuration
- *Markdown Documentation*: Comprehensive project documentation
- *Git Version Control*: Professional development workflow

#### *📊 Technology Count Summary*
This project integrates *25+ cutting-edge technologies* including:
- *5 Core Web Technologies*: HTML5, CSS3, JavaScript ES6+, Web APIs, JSON
- *4 Audio Technologies*: Web Speech API, HTML5 Audio, AudioContext, Media Session
- *3 AI Technologies*: FreeGPT API, RESTful integration, Fallback systems
- *4 Mobile Technologies*: Ionic Capacitor, PWA, Responsive Design, Cross-platform
- *6 Architecture Patterns*: ES6 Classes, Modules, Events, State Management, Error Handling, Configuration
- *3 Development Tools*: NPM, Git, Markdown


## 📄 License

Open source project - feel free to use, modify, and share!


## 📱 SleepyLearn Mobile App Build Guide Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Add Platforms
```bash
# Add iOS platform
npm run capacitor:add:ios

# Add Android platform  
npm run capacitor:add:android
```

### 3. Sync Web Assets
```bash
npm run capacitor:sync
```

### 4. Run on Device/Simulator
```bash
# Run on iOS
npm run capacitor:run:ios

# Run on Android
npm run capacitor:run:android
```

### 5. Open in Native IDE
```bash
# Open Xcode for iOS
npm run capacitor:open:ios

# Open Android Studio
npm run capacitor:open:android
```

## 📋 Prerequisites

### For iOS Development:
- macOS with Xcode installed
- iOS Simulator or physical iOS device
- Apple Developer Account (for device testing)

### For Android Development:
- Android Studio installed
- Android SDK and build tools
- Android device or emulator

## 🔧 Configuration

### App Configuration
- **App ID**: `com.sleepylearn.app`
- **App Name**: `SleepyLearn`
- **Web Directory**: `.` (current directory)
- **Entry Point**: `index.html`

### Features Configured:
- ✅ Splash Screen with app colors
- ✅ Status Bar styling
- ✅ Keyboard handling
- ✅ Back button navigation
- ✅ Web Speech API support
- ✅ Audio playback capabilities

## 📱 App Features

### Core Functionality:
- 🤖 AI-powered bedtime stories
- 🫁 4-7-8 breathing exercises
- 🎧 Voice narration with text highlighting
- 📱 Native mobile experience
- 🌙 Child-friendly interface

### Mobile Optimizations:
- Touch-friendly buttons (80px+ height)
- Responsive design for all screen sizes
- Native status bar integration
- Proper keyboard handling
- Hardware back button support

## 🛠️ Troubleshooting

### Common Issues:

1. **Speech Synthesis not working on iOS**:
   - Ensure user interaction before starting speech
   - Check iOS Safari limitations

2. **Audio not playing**:
   - Verify audio permissions
   - Test on physical device (simulators may have limitations)

3. **Build errors**:
   - Run `npm run capacitor:sync` after changes
   - Clean and rebuild native projects

### Debug Commands:
```bash
# View Capacitor info
npx cap doctor

# Clean sync
npx cap sync --deployment

# View logs (iOS)
npx cap run ios --livereload --external

# View logs (Android)
npx cap run android --livereload --external
```

## 📦 Distribution

### iOS App Store:
1. Archive in Xcode
2. Upload to App Store Connect
3. Submit for review

### Google Play Store:
1. Generate signed APK/AAB in Android Studio
2. Upload to Google Play Console
3. Submit for review

## 🔐 Permissions

The app requires these permissions:
- **Microphone**: For speech synthesis (system level)
- **Audio**: For story playback and voice guidance
- **Network**: For AI story generation (optional)

## 📞 Support

For build issues or questions:
- Check Capacitor documentation: https://capacitorjs.com/docs
- Review Ionic documentation: https://ionicframework.com/docs

---

*Sweet dreams and happy learning! 🌙✨*
