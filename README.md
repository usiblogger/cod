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

### 🎨 Child-Friendly Design
- **Large Touch-Friendly Buttons**: Minimum 80px height for easy interaction
- **Soft Gradient Colors**: Calming bedtime-appropriate color scheme
- **Responsive Design**: Works on tablets, desktops, and mobile devices
- **Accessibility Features**: Keyboard navigation, ARIA labels, high contrast support

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

## ⌨️ Keyboard Shortcuts

- **Escape**: Return to home page or stop current activity
- **Space**: Start/stop current activity
- **1**: Navigate to stories (from home page)
- **2**: Navigate to breathing exercises (from home page)



## 🛠️ Technical Features

### Audio Technology
- **Web Speech API**: Browser-native text-to-speech synthesis
- **Chinese Voice Support**: Optimized for Mandarin/Cantonese pronunciation
- **Audio Conflict Management**: Prevents overlapping audio streams
- **Graceful Fallbacks**: Works even when speech synthesis is unavailable

### AI Story Generation
- **Real GPT Integration**: Uses FreeGPT API for genuine AI-generated bedtime stories
- **Smart Fallback System**: 4 backup stories when AI is unavailable
- **Intelligent Parsing**: Automatically segments AI responses for optimal voice synthesis
- **Timeout Protection**: 15-second timeout prevents hanging requests
- **Child-Safe Content**: All stories designed for age-appropriate, positive values
- **Seamless Experience**: Users get stories whether AI works or not

### Browser Compatibility
- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Progressive Enhancement**: Core functionality works without advanced features
- **Error Handling**: User-friendly error messages for children
- **Performance Monitoring**: Optimized for smooth operation

## 🎨 Design Philosophy

SleepyLearn follows child-centered design principles:

- **Simplicity**: Clean, uncluttered interface with clear navigation
- **Safety**: No data collection, works offline after initial load
- **Accessibility**: Supports various abilities and interaction methods
- **Calmness**: Soothing colors and gentle animations promote relaxation

## 🔧 Installation

No installation required! Simply:

1. Download or clone this repository
2. Open `index.html` in a web browser
3. Allow microphone permissions if prompted (for speech synthesis)
4. Enjoy bedtime learning!

## 🌐 Browser Requirements

- **Recommended**: Chrome 80+, Firefox 75+, Safari 13+, Edge 80+
- **Speech Synthesis**: Required for voice features
- **JavaScript**: Must be enabled
- **Internet Connection**: Required for AI story generation only

## 📱 Device Support

- **Desktop**: Full functionality with keyboard shortcuts
- **Tablet**: Touch-optimized interface, perfect for bedtime use
- **Mobile**: Responsive design adapts to smaller screens

## 🤝 Contributing

This project welcomes contributions! Areas for improvement:

- Additional pre-loaded stories in multiple languages
- More breathing exercise variations
- Enhanced AI story prompts
- Accessibility improvements
- Performance optimizations

## 📄 License

Open source project - feel free to use, modify, and share!

## 🙏 Acknowledgments

- **FreeGPT**: For AI story generation capabilities
- **Web Speech API**: For browser-native voice synthesis
- **Child Development Research**: Informing our bedtime learning approach

---

*Sweet dreams and happy learning! 🌙✨*

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