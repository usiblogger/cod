# 🌙 SleepyLearn

A gentle, voice-guided bedtime learning app designed for children aged 3-8 years. SleepyLearn helps kids wind down with soothing bedtime stories and guided breathing exercises to improve sleep quality and relaxation.

## ✨ Features

### 📚 Bedtime Stories
- Interactive storytelling with synchronized text highlighting
- Voice-guided narration using text-to-speech technology
- Child-friendly stories like "小兔子與月亮" (Little Rabbit and the Moon)
- Easy navigation with large, touch-friendly buttons

### 🫁 Breathing Exercises
- Guided deep breathing exercises for relaxation
- Voice instructions for inhale, hold, and exhale phases
- Optional calming background music (ocean waves, gentle sounds)
- Timed breathing cycles designed for children

### 🎨 Child-Friendly Design
- Large, colorful buttons perfect for small hands
- Soft, calming color scheme suitable for bedtime
- Simple navigation between features
- Responsive design for tablets and desktops

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, or Edge)
- Device with speakers or headphones
- Internet connection (for initial load)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/sleepy-learn.git
   cd sleepy-learn
   ```

2. Open `index.html` in your web browser:
   ```bash
   open index.html
   # or
   python -m http.server 8000  # for local development server
   ```

3. That's it! No additional setup required.

## 🎯 How to Use

### For Children
1. **Homepage**: Choose between "睡前故事" (Bedtime Stories) or "深呼吸放鬆練習" (Breathing Exercises)
2. **Stories**: Click "開始聽故事" to start listening, watch the text highlight as the story plays
3. **Breathing**: Click "開始放鬆練習" to begin guided breathing with voice instructions
4. **Navigation**: Use "返回首頁" button to return to the main menu anytime

### For Parents/Caregivers
- Ensure device volume is at a comfortable level
- The app works best in a quiet, dimly lit environment
- Sessions typically last 3-5 minutes, perfect for bedtime routines
- No personal data is collected or stored

## 🛠️ Technical Details

### Built With
- **HTML5** - Semantic structure and accessibility
- **CSS3** - Responsive design and animations
- **Vanilla JavaScript** - Core functionality and interactions
- **Web Speech API** - Text-to-speech synthesis
- **HTML5 Audio API** - Background music and sound effects

### Browser Compatibility
- ✅ Chrome/Chromium (recommended)
- ✅ Firefox
- ✅ Safari (iOS/macOS)
- ✅ Edge
- ⚠️ Graceful fallback for browsers without speech synthesis

### Architecture
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   User Interface │    │  Audio Manager   │    │  Content Store  │
│   (HTML/CSS/JS)  │◄──►│  (Speech/Music)  │◄──►│  (Stories/Text) │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 🧪 Testing

Run the test suite:
```bash
# Open test.html in browser for unit tests
open test.html

# Or run with a local server
python -m http.server 8000
# Navigate to http://localhost:8000/test.html
```

### Test Coverage
- ✅ Audio Manager functionality
- ✅ Story Player synchronization
- ✅ Breathing Controller timing
- ✅ Navigation flow
- ✅ Error handling and fallbacks

## 🎨 Customization

### Adding New Stories
1. Edit the story data in `js/stories.js`:
```javascript
const stories = {
  "new-story": {
    title: "New Story Title",
    segments: [
      { text: "Story text here...", duration: 3000 },
      // Add more segments
    ]
  }
};
```

### Modifying Breathing Exercises
1. Update breathing patterns in `js/breathing.js`:
```javascript
const breathingConfig = {
  phases: [
    { type: "inhale", duration: 4000, instruction: "Breathe in..." },
    { type: "hold", duration: 2000, instruction: "Hold..." },
    { type: "exhale", duration: 6000, instruction: "Breathe out..." }
  ]
};
```

## 🌍 Accessibility

SleepyLearn is designed with accessibility in mind:
- **Visual**: High contrast colors, large fonts, clear visual hierarchy
- **Audio**: Volume controls, visual indicators for audio state
- **Motor**: Large click targets (44px minimum), simple navigation
- **Cognitive**: Simple interface, consistent patterns, clear instructions

## 🔒 Privacy & Security

- **No data collection**: No personal information is stored or transmitted
- **Local operation**: App runs entirely in the browser
- **No external dependencies**: Core functionality works offline
- **Child-safe**: No external links or inappropriate content

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Designed with input from child development specialists
- Inspired by mindfulness and sleep hygiene best practices
- Built with accessibility guidelines from WCAG 2.1
- Special thanks to parents and educators who provided feedback

## 📞 Support

If you encounter any issues or have questions:
- 📧 Email: support@sleepylearn.app
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/sleepy-learn/issues)
- 📖 Documentation: [Wiki](https://github.com/your-username/sleepy-learn/wiki)

---

**Sweet dreams! 🌙✨**

> "The best bridge between despair and hope is a good night's sleep." - E.B. White
