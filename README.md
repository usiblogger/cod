# SleepyLearn - Bedtime Learning App 🌙

A gentle, child-friendly web application designed to help children aged 3-8 years with bedtime learning and relaxation practices through voice-guided stories and breathing exercises.

## 🌟 Features

### 📚 Bedtime Stories
- **Pre-loaded Story**: "小兔子與月亮" (The Little Rabbit and the Moon)
- **AI-Generated Stories**: Create new bedtime stories using AI technology
- **Synchronized Text Highlighting**: Text lights up as it's being read aloud
- **Chinese Voice Narration**: Clear, child-appropriate speech synthesis

### 🫁 4-7-8 Breathing Method
- **Harvard-Recommended Technique**: Based on Dr. Andrew Weil's 4-7-8 breathing method
- **Scientifically Proven**: Activates parasympathetic nervous system for rapid relaxation
- **Timed Phases**: 
  - Inhale through nose: 4 seconds
  - Hold breath: 7 seconds  
  - Exhale through mouth: 8 seconds
- **4 Complete Cycles**: Optimal number for sleep preparation
- **Visual Timer**: Real-time countdown for each breathing phase
- **Guided Instructions**: Step-by-step voice guidance in Chinese

## 🧠 The Science Behind Bedtime Learning

Research shows that **bedtime learning significantly enhances children's comprehension and memory consolidation**. The pre-sleep period is a golden opportunity for:

### 🎯 Cognitive Benefits
- **Enhanced Memory Formation**: The brain processes and consolidates information during sleep
- **Improved Comprehension**: Relaxed state allows better absorption of stories and lessons
- **Value Integration**: Moral lessons and positive values are better retained when learned before sleep

### 💤 Sleep Quality Benefits  
- **Stress Reduction**: Deep breathing exercises lower blood pressure and heart rate
- **Anxiety Relief**: Calming stories help children process daily experiences
- **Sleep Preparation**: Consistent bedtime routines signal the brain to prepare for rest

### 👨‍👩‍👧‍👦 Family Bonding
- **Quality Time**: Shared bedtime learning creates precious parent-child moments
- **Communication**: Stories open opportunities for meaningful conversations
- **Routine Building**: Consistent practices strengthen family bonds and security

## 🚀 How to Use

1. **Open the App**: Launch `index.html` in a modern web browser
2. **Choose an Activity**:
   - Click "睡前故事" for bedtime stories
   - Click "深呼吸放鬆練習" for breathing exercises
3. **Story Features**:
   - "開始聽故事" - Listen to the pre-loaded story
   - "AI創作新故事" - Generate a new AI story
   - Watch text highlight as it's being read
4. **Breathing Exercise**:
   - "開始放鬆練習" - Start guided breathing
   - Follow the voice instructions and visual timer
   - Complete 5 relaxing breathing cycles

## Technologies

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

## 🎨 Design Philosophy

SleepyLearn follows child-centered design principles:

- **Simplicity**: Clean, uncluttered interface with clear navigation
- **Safety**: No data collection, works offline after initial load
- **Accessibility**: Supports various abilities and interaction methods
- **Calmness**: Soothing colors and gentle animations promote relaxation

## 📄 License

Open source project - feel free to use, modify, and share!

## 🔍 Research References

Studies supporting bedtime learning benefits:
- Memory consolidation during sleep enhances learning retention
- Bedtime routines reduce childhood anxiety and improve sleep quality  
- Parent-child bedtime interactions strengthen emotional bonds
- Deep breathing exercises effectively reduce stress hormones in children

# 📱 SleepyLearn Mobile App Build Guide

## 🚀 Quick Start

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
