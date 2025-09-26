// SleepyLearn App - Main JavaScript File

// App State Management
const appState = {
    currentPage: 'home',
    isPlaying: false,
    currentStory: null,
    breathingActive: false,
    audioEnabled: true,
    backgroundMusicEnabled: true
};

// DOM Elements
const elements = {
    // Pages
    homePage: document.getElementById('homePage'),
    storyPage: document.getElementById('storyPage'),
    breathingPage: document.getElementById('breathingPage'),
    
    // Homepage buttons
    storyBtn: document.getElementById('storyBtn'),
    breathingBtn: document.getElementById('breathingBtn'),
    
    // Story page elements
    storyTitle: document.getElementById('storyTitle'),
    storyText: document.getElementById('storyText'),
    startStoryBtn: document.getElementById('startStoryBtn'),
    stopStoryBtn: document.getElementById('stopStoryBtn'),
    storyHomeBtn: document.getElementById('storyHomeBtn'),
    
    // Breathing page elements
    breathingInstruction: document.getElementById('breathingInstruction'),
    breathingPhase: document.getElementById('breathingPhase'),
    startBreathingBtn: document.getElementById('startBreathingBtn'),
    stopBreathingBtn: document.getElementById('stopBreathingBtn'),
    breathingHomeBtn: document.getElementById('breathingHomeBtn')
};

// Basic Navigation Controller
class NavigationController {
    constructor() {
        this.currentPage = 'home';
        this.initializeEventListeners();
    }
    
    initializeEventListeners() {
        // Homepage navigation
        elements.storyBtn.addEventListener('click', () => this.navigateToStories());
        elements.breathingBtn.addEventListener('click', () => this.navigateToBreathing());
        
        // Return to home buttons
        elements.storyHomeBtn.addEventListener('click', () => this.navigateToHome());
        elements.breathingHomeBtn.addEventListener('click', () => this.navigateToHome());
        
        // Story page buttons (placeholder for now)
        elements.startStoryBtn.addEventListener('click', () => this.handleStartStory());
        elements.stopStoryBtn.addEventListener('click', () => this.handleStopStory());
        
        // Breathing page buttons (placeholder for now)
        elements.startBreathingBtn.addEventListener('click', () => this.handleStartBreathing());
        elements.stopBreathingBtn.addEventListener('click', () => this.handleStopBreathing());
    }
    
    navigateToHome() {
        this.hideAllPages();
        elements.homePage.classList.add('active');
        this.currentPage = 'home';
        appState.currentPage = 'home';
        console.log('Navigated to home page');
    }
    
    navigateToStories() {
        this.hideAllPages();
        elements.storyPage.classList.add('active');
        this.currentPage = 'stories';
        appState.currentPage = 'stories';
        console.log('Navigated to stories page');
    }
    
    navigateToBreathing() {
        this.hideAllPages();
        elements.breathingPage.classList.add('active');
        this.currentPage = 'breathing';
        appState.currentPage = 'breathing';
        console.log('Navigated to breathing page');
    }
    
    hideAllPages() {
        elements.homePage.classList.remove('active');
        elements.storyPage.classList.remove('active');
        elements.breathingPage.classList.remove('active');
    }
    
    getCurrentPage() {
        return this.currentPage;
    }
    
    // Placeholder methods for story functionality
    handleStartStory() {
        console.log('Start story clicked - functionality to be implemented');
        elements.startStoryBtn.style.display = 'none';
        elements.stopStoryBtn.style.display = 'inline-block';
        appState.isPlaying = true;
    }
    
    handleStopStory() {
        console.log('Stop story clicked - functionality to be implemented');
        elements.startStoryBtn.style.display = 'inline-block';
        elements.stopStoryBtn.style.display = 'none';
        appState.isPlaying = false;
    }
    
    // Placeholder methods for breathing functionality
    handleStartBreathing() {
        console.log('Start breathing clicked - functionality to be implemented');
        elements.startBreathingBtn.style.display = 'none';
        elements.stopBreathingBtn.style.display = 'inline-block';
        appState.breathingActive = true;
        
        // Update instruction text
        elements.breathingInstruction.textContent = '準備開始...';
        elements.breathingPhase.textContent = '跟著語音指導深呼吸';
    }
    
    handleStopBreathing() {
        console.log('Stop breathing clicked - functionality to be implemented');
        elements.startBreathingBtn.style.display = 'inline-block';
        elements.stopBreathingBtn.style.display = 'none';
        appState.breathingActive = false;
        
        // Reset instruction text
        elements.breathingInstruction.textContent = '準備開始放鬆練習';
        elements.breathingPhase.textContent = '跟著語音指導一起深呼吸';
    }
}

// Audio Manager for Speech Synthesis
class AudioManager {
    constructor() {
        this.speechSynthesis = window.speechSynthesis;
        this.currentUtterance = null;
        this.isSupported = 'speechSynthesis' in window;
        this.voices = [];
        this.selectedVoice = null;
        
        if (this.isSupported) {
            this.initializeVoices();
        }
    }
    
    initializeVoices() {
        // Load voices (may be async in some browsers)
        const loadVoices = () => {
            this.voices = this.speechSynthesis.getVoices();
            
            // Try to find a Chinese voice, fallback to default
            this.selectedVoice = this.voices.find(voice => 
                voice.lang.includes('zh') || voice.lang.includes('cmn')
            ) || this.voices[0];
            
            console.log('Available voices:', this.voices.length);
            console.log('Selected voice:', this.selectedVoice?.name || 'Default');
        };
        
        // Voices might not be loaded immediately
        if (this.voices.length === 0) {
            this.speechSynthesis.addEventListener('voiceschanged', loadVoices);
        }
        loadVoices();
    }
    
    speakText(text, options = {}) {
        if (!this.isSupported) {
            console.warn('Speech synthesis not supported');
            return Promise.reject(new Error('Speech synthesis not supported'));
        }
        
        return new Promise((resolve, reject) => {
            try {
                // Stop any current speech
                this.stopSpeech();
                
                // Create new utterance
                this.currentUtterance = new SpeechSynthesisUtterance(text);
                
                // Configure voice settings for children
                this.currentUtterance.rate = options.rate || 0.8; // Slower for children
                this.currentUtterance.pitch = options.pitch || 1.1; // Slightly higher pitch
                this.currentUtterance.volume = options.volume || 0.9;
                
                // Use selected voice if available
                if (this.selectedVoice) {
                    this.currentUtterance.voice = this.selectedVoice;
                }
                
                // Set up event listeners
                this.currentUtterance.onend = () => {
                    console.log('Speech finished');
                    resolve();
                };
                
                this.currentUtterance.onerror = (event) => {
                    console.error('Speech error:', event.error);
                    reject(new Error(`Speech error: ${event.error}`));
                };
                
                this.currentUtterance.onstart = () => {
                    console.log('Speech started:', text);
                };
                
                // Start speaking
                this.speechSynthesis.speak(this.currentUtterance);
                
            } catch (error) {
                console.error('Error creating speech:', error);
                reject(error);
            }
        });
    }
    
    stopSpeech() {
        if (this.isSupported && this.speechSynthesis.speaking) {
            this.speechSynthesis.cancel();
            console.log('Speech stopped');
        }
    }
    
    pauseSpeech() {
        if (this.isSupported && this.speechSynthesis.speaking) {
            this.speechSynthesis.pause();
            console.log('Speech paused');
        }
    }
    
    resumeSpeech() {
        if (this.isSupported && this.speechSynthesis.paused) {
            this.speechSynthesis.resume();
            console.log('Speech resumed');
        }
    }
    
    isSpeaking() {
        return this.isSupported && this.speechSynthesis.speaking;
    }
    
    isPaused() {
        return this.isSupported && this.speechSynthesis.paused;
    }
    
    // Background music support
    playBackgroundMusic(audioFile) {
        try {
            if (this.backgroundAudio) {
                this.stopBackgroundMusic();
            }
            
            this.backgroundAudio = new Audio(audioFile);
            this.backgroundAudio.loop = true;
            this.backgroundAudio.volume = 0.3; // Keep background music quiet
            
            return this.backgroundAudio.play();
        } catch (error) {
            console.warn('Background music not available:', error);
        }
    }
    
    stopBackgroundMusic() {
        if (this.backgroundAudio) {
            this.backgroundAudio.pause();
            this.backgroundAudio.currentTime = 0;
            this.backgroundAudio = null;
        }
    }
    
    setVolume(level) {
        if (this.backgroundAudio) {
            this.backgroundAudio.volume = Math.max(0, Math.min(1, level));
        }
    }
    
    // Test speech functionality
    testSpeech() {
        const testText = "你好，歡迎來到睡前學習時光！";
        return this.speakText(testText);
    }
}

// Browser Compatibility Check
function checkBrowserSupport() {
    const support = {
        speechSynthesis: 'speechSynthesis' in window,
        audioContext: 'AudioContext' in window || 'webkitAudioContext' in window,
        localStorage: 'localStorage' in window
    };
    
    console.log('Browser support:', support);
    
    if (!support.speechSynthesis) {
        console.warn('Speech Synthesis not supported - will need fallback');
    }
    
    return support;
}

// Story Data
const storyData = {
    id: "rabbit-moon",
    title: "小兔子與月亮",
    segments: [
        { text: "從前有一隻小兔子，住在森林裡的小屋子裡。", duration: 4000 },
        { text: "每天晚上，小兔子都會看著天空中美麗的月亮。", duration: 4000 },
        { text: "月亮溫柔地照亮著整個森林，讓小兔子感到很安心。", duration: 4000 },
        { text: "有一天晚上，小兔子對月亮說：「月亮姐姐，謝謝你每天陪伴我。」", duration: 5000 },
        { text: "月亮微笑著回答：「小兔子，我也很喜歡和你一起度過每個夜晚。」", duration: 5000 },
        { text: "從那天起，小兔子和月亮成為了最好的朋友。", duration: 4000 },
        { text: "每當小兔子感到害怕或孤單時，只要看看月亮，就會感到溫暖和安全。", duration: 5000 },
        { text: "現在，讓我們也像小兔子一樣，安心地進入甜美的夢鄉吧。", duration: 5000 }
    ]
};

// Story Player Class
class StoryPlayer {
    constructor(audioManager) {
        this.audioManager = audioManager;
        this.currentStory = null;
        this.currentSegmentIndex = 0;
        this.isPlaying = false;
        this.segmentTimer = null;
    }
    
    loadStory(story) {
        this.currentStory = story;
        this.currentSegmentIndex = 0;
        
        // Update UI with story content
        elements.storyTitle.textContent = story.title;
        this.displayStoryText();
    }
    
    displayStoryText() {
        if (!this.currentStory) return;
        
        const storyTextContainer = elements.storyText;
        storyTextContainer.innerHTML = '';
        
        this.currentStory.segments.forEach((segment, index) => {
            const p = document.createElement('p');
            p.textContent = segment.text;
            p.id = `segment-${index}`;
            p.style.marginBottom = '1rem';
            storyTextContainer.appendChild(p);
        });
    }
    
    async playStory() {
        if (!this.currentStory || this.isPlaying) return;
        
        this.isPlaying = true;
        this.currentSegmentIndex = 0;
        
        try {
            await this.playNextSegment();
        } catch (error) {
            console.error('Error playing story:', error);
            this.stopStory();
        }
    }
    
    async playNextSegment() {
        if (!this.isPlaying || this.currentSegmentIndex >= this.currentStory.segments.length) {
            this.stopStory();
            return;
        }
        
        const segment = this.currentStory.segments[this.currentSegmentIndex];
        
        // Highlight current segment
        this.highlightCurrentText(this.currentSegmentIndex);
        
        try {
            // Speak the segment
            await this.audioManager.speakText(segment.text);
            
            // Move to next segment if still playing
            if (this.isPlaying) {
                this.currentSegmentIndex++;
                // Small delay between segments
                setTimeout(() => {
                    if (this.isPlaying) {
                        this.playNextSegment();
                    }
                }, 1000);
            }
        } catch (error) {
            console.error('Error speaking segment:', error);
            this.stopStory();
        }
    }
    
    highlightCurrentText(index) {
        // Remove previous highlights
        document.querySelectorAll('.story-text p').forEach(p => {
            p.classList.remove('highlight');
        });
        
        // Add highlight to current segment
        const currentSegment = document.getElementById(`segment-${index}`);
        if (currentSegment) {
            currentSegment.classList.add('highlight');
        }
    }
    
    stopStory() {
        this.isPlaying = false;
        this.audioManager.stopSpeech();
        
        // Remove all highlights
        document.querySelectorAll('.story-text p').forEach(p => {
            p.classList.remove('highlight');
        });
        
        // Reset UI
        elements.startStoryBtn.style.display = 'inline-block';
        elements.stopStoryBtn.style.display = 'none';
        appState.isPlaying = false;
    }
}

// Breathing Exercise Controller
class BreathingController {
    constructor(audioManager) {
        this.audioManager = audioManager;
        this.isActive = false;
        this.currentCycle = 0;
        this.totalCycles = 5;
        this.currentPhase = 'prepare';
        this.phaseTimer = null;
        
        this.phases = [
            { type: "inhale", duration: 4000, instruction: "慢慢吸氣..." },
            { type: "hold", duration: 2000, instruction: "保持..." },
            { type: "exhale", duration: 6000, instruction: "慢慢呼氣..." },
            { type: "rest", duration: 2000, instruction: "放鬆..." }
        ];
    }
    
    async startExercise() {
        if (this.isActive) return;
        
        this.isActive = true;
        this.currentCycle = 0;
        this.currentPhase = 'prepare';
        
        // Update UI
        elements.startBreathingBtn.style.display = 'none';
        elements.stopBreathingBtn.style.display = 'inline-block';
        appState.breathingActive = true;
        
        try {
            // Welcome message
            await this.audioManager.speakText("讓我們開始深呼吸練習。跟著我的指導一起呼吸。");
            
            if (this.isActive) {
                await this.runBreathingCycle();
            }
        } catch (error) {
            console.error('Error starting breathing exercise:', error);
            this.stopExercise();
        }
    }
    
    async runBreathingCycle() {
        while (this.isActive && this.currentCycle < this.totalCycles) {
            for (const phase of this.phases) {
                if (!this.isActive) break;
                
                this.currentPhase = phase.type;
                
                // Update UI
                elements.breathingInstruction.textContent = phase.instruction;
                elements.breathingPhase.textContent = `第 ${this.currentCycle + 1} 次，共 ${this.totalCycles} 次`;
                
                try {
                    // Speak instruction
                    const speakPromise = this.audioManager.speakText(phase.instruction);
                    
                    // Wait for phase duration
                    const waitPromise = new Promise(resolve => {
                        this.phaseTimer = setTimeout(resolve, phase.duration);
                    });
                    
                    await Promise.race([speakPromise, waitPromise]);
                    
                } catch (error) {
                    console.error('Error in breathing phase:', error);
                    break;
                }
            }
            
            this.currentCycle++;
        }
        
        if (this.isActive) {
            // Completion message
            try {
                await this.audioManager.speakText("很好！深呼吸練習完成了。現在你可以安心地休息了。");
            } catch (error) {
                console.error('Error speaking completion message:', error);
            }
            
            this.stopExercise();
        }
    }
    
    stopExercise() {
        this.isActive = false;
        this.audioManager.stopSpeech();
        
        if (this.phaseTimer) {
            clearTimeout(this.phaseTimer);
            this.phaseTimer = null;
        }
        
        // Reset UI
        elements.startBreathingBtn.style.display = 'inline-block';
        elements.stopBreathingBtn.style.display = 'none';
        elements.breathingInstruction.textContent = '準備開始放鬆練習';
        elements.breathingPhase.textContent = '跟著語音指導一起深呼吸';
        appState.breathingActive = false;
    }
    
    getCurrentPhase() {
        return this.currentPhase;
    }
}

// Enhanced Navigation Controller
class EnhancedNavigationController extends NavigationController {
    constructor(audioManager, storyPlayer, breathingController) {
        super();
        this.audioManager = audioManager;
        this.storyPlayer = storyPlayer;
        this.breathingController = breathingController;
        
        // Load default story
        this.storyPlayer.loadStory(storyData);
    }
    
    handleStartStory() {
        console.log('Starting story playback');
        elements.startStoryBtn.style.display = 'none';
        elements.stopStoryBtn.style.display = 'inline-block';
        appState.isPlaying = true;
        
        this.storyPlayer.playStory();
    }
    
    handleStopStory() {
        console.log('Stopping story playback');
        this.storyPlayer.stopStory();
    }
    
    handleStartBreathing() {
        console.log('Starting breathing exercise');
        this.breathingController.startExercise();
    }
    
    handleStopBreathing() {
        console.log('Stopping breathing exercise');
        this.breathingController.stopExercise();
    }
    
    navigateToHome() {
        // Stop any active audio when navigating home
        this.audioManager.stopSpeech();
        this.storyPlayer.stopStory();
        this.breathingController.stopExercise();
        
        super.navigateToHome();
    }
}

// Error Handling
function handleError(error, context) {
    console.error(`Error in ${context}:`, error);
    
    // Show user-friendly error message
    const errorMessage = error.message.includes('network') 
        ? '網路連線有問題，請稍後再試。'
        : '發生了一些問題，請重新整理頁面再試。';
    
    // You could show this in a modal or alert
    // For now, just log it
    console.log('User message:', errorMessage);
}

// Initialize App
function initializeApp() {
    console.log('Initializing SleepyLearn App...');
    
    try {
        // Check browser support
        const browserSupport = checkBrowserSupport();
        
        // Initialize core components
        const audioManager = new AudioManager();
        const storyPlayer = new StoryPlayer(audioManager);
        const breathingController = new BreathingController(audioManager);
        const navigation = new EnhancedNavigationController(audioManager, storyPlayer, breathingController);
        
        // Set initial app state
        appState.currentPage = 'home';
        appState.isPlaying = false;
        appState.breathingActive = false;
        
        // Test speech synthesis on first user interaction
        let speechTested = false;
        document.addEventListener('click', async () => {
            if (!speechTested && audioManager.isSupported) {
                speechTested = true;
                try {
                    console.log('Testing speech synthesis...');
                    // Small test to initialize speech synthesis
                    await audioManager.speakText('');
                } catch (error) {
                    console.warn('Speech synthesis test failed:', error);
                }
            }
        }, { once: true });
        
        console.log('SleepyLearn App initialized successfully');
        console.log('Current app state:', appState);
        
        // Store references globally for debugging
        window.SleepyLearn = {
            appState,
            elements,
            audioManager,
            storyPlayer,
            breathingController,
            navigation
        };
        
    } catch (error) {
        handleError(error, 'App Initialization');
    }
}

// Keyboard Navigation Support
function setupKeyboardNavigation() {
    document.addEventListener('keydown', (event) => {
        // Escape key - go back to home or stop current activity
        if (event.key === 'Escape') {
            const currentPage = appState.currentPage;
            
            if (currentPage === 'stories' && appState.isPlaying) {
                window.SleepyLearn?.storyPlayer?.stopStory();
            } else if (currentPage === 'breathing' && appState.breathingActive) {
                window.SleepyLearn?.breathingController?.stopExercise();
            } else if (currentPage !== 'home') {
                window.SleepyLearn?.navigation?.navigateToHome();
            }
        }
        
        // Space bar - start/stop current activity
        if (event.key === ' ' || event.code === 'Space') {
            event.preventDefault();
            
            const currentPage = appState.currentPage;
            
            if (currentPage === 'stories') {
                if (appState.isPlaying) {
                    window.SleepyLearn?.storyPlayer?.stopStory();
                } else {
                    window.SleepyLearn?.navigation?.handleStartStory();
                }
            } else if (currentPage === 'breathing') {
                if (appState.breathingActive) {
                    window.SleepyLearn?.breathingController?.stopExercise();
                } else {
                    window.SleepyLearn?.navigation?.handleStartBreathing();
                }
            }
        }
        
        // Number keys for quick navigation
        if (event.key === '1' && appState.currentPage === 'home') {
            window.SleepyLearn?.navigation?.navigateToStories();
        } else if (event.key === '2' && appState.currentPage === 'home') {
            window.SleepyLearn?.navigation?.navigateToBreathing();
        }
    });
}

// Enhanced Error Handling
function showErrorMessage(message) {
    // Create error message element if it doesn't exist
    let errorDiv = document.getElementById('errorMessage');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.id = 'errorMessage';
        errorDiv.className = 'error-message';
        document.querySelector('.container').appendChild(errorDiv);
    }
    
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

// Performance Monitoring
function monitorPerformance() {
    // Monitor memory usage if available
    if ('memory' in performance) {
        setInterval(() => {
            const memory = performance.memory;
            if (memory.usedJSHeapSize > 50 * 1024 * 1024) { // 50MB
                console.warn('High memory usage detected:', memory.usedJSHeapSize / 1024 / 1024, 'MB');
            }
        }, 30000); // Check every 30 seconds
    }
    
    // Monitor long tasks
    if ('PerformanceObserver' in window) {
        try {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.duration > 50) { // Tasks longer than 50ms
                        console.warn('Long task detected:', entry.duration, 'ms');
                    }
                }
            });
            observer.observe({ entryTypes: ['longtask'] });
        } catch (error) {
            console.log('Performance monitoring not available');
        }
    }
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupKeyboardNavigation();
    monitorPerformance();
});