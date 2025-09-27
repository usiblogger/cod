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
    generateStoryBtn: document.getElementById('generateStoryBtn'),
    storyHomeBtn: document.getElementById('storyHomeBtn'),
    aiLoadingAnimation: document.getElementById('aiLoadingAnimation'),
    aiLoadingMessage: document.getElementById('aiLoadingMessage'),

    // Breathing page elements
    breathingContent: document.getElementById('breathingContent'),
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

    async navigateToStories() {
        this.hideAllPages();
        elements.storyPage.classList.add('active');
        this.currentPage = 'stories';
        appState.currentPage = 'stories';
        console.log('Navigated to stories page');

        // Auto-generate AI story on first visit
        if (!this.hasLoadedInitialStory) {
            this.hasLoadedInitialStory = true;
            console.log('First visit to stories - attempting to generate AI story');

            // Add a small delay to ensure the page is fully rendered
            setTimeout(async () => {
                await this.handleAutoGenerateStory();
            }, 500);
        }
    }

    navigateToBreathing() {
        this.hideAllPages();
        elements.breathingPage.classList.add('active');
        this.currentPage = 'breathing';
        appState.currentPage = 'breathing';

        // Ensure breathing content container is hidden initially
        elements.breathingContent.style.display = 'none';

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
        console.log('Starting breathing exercise');
        this.breathingController.startExercise();
    }

    handleStopBreathing() {
        console.log('Stopping breathing exercise');
        this.breathingController.stopExercise();
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

// AI Story Generator (Real GPT + Fallback Templates)
class AIStoryGenerator {
    constructor() {
        this.isGenerating = false;
        this.loadingMessages = [
            "歡迎來到 SleepyLearn！AI 正在為你創作故事...",
            "AI 正在想像一個美妙的故事...",
            "正在為你挑選最棒的角色...",
            "故事的魔法正在醞釀中...",
            "AI 正在編織夢幻的情節...",
            "正在添加溫暖的結局...",
            "幾乎完成了，請再等一下...",
            "故事即將準備好囉！"
        ];
        this.currentMessageIndex = 0;
        this.messageInterval = null;
        this.fallbackStories = [
            {
                title: '小熊和星星',
                segments: [
                    { text: "在一個安靜的森林裡，住著一隻可愛的小熊。", duration: 4000 },
                    { text: "每天晚上，小熊都會爬到山頂上看星星。", duration: 4000 },
                    { text: "有一天，小熊發現天空中有一顆特別亮的星星。", duration: 4500 },
                    { text: "那顆星星對小熊眨眨眼，好像在說話一樣。", duration: 4000 },
                    { text: "小熊許了一個願望：希望所有的朋友都能快樂。", duration: 4500 },
                    { text: "星星聽到了小熊的願望，溫柔地閃爍著。", duration: 4000 },
                    { text: "從那天起，森林裡的動物們都變得更加友愛。", duration: 4500 },
                    { text: "小熊明白了，善良的心願總會實現。", duration: 4000 }
                ]
            },
            {
                title: '勇敢的小貓咪',
                segments: [
                    { text: "小貓咪咪咪住在一個溫暖的小屋裡。", duration: 4000 },
                    { text: "她很害羞，不敢和其他小動物玩耍。", duration: 4000 },
                    { text: "有一天，小鳥從樹上掉了下來，受了傷。", duration: 4500 },
                    { text: "咪咪看到了，雖然害怕，但還是跑過去幫忙。", duration: 4500 },
                    { text: "她輕輕地把小鳥送回了鳥巢。", duration: 4000 },
                    { text: "小鳥的媽媽非常感謝咪咪的善良。", duration: 4000 },
                    { text: "從那天起，咪咪發現自己其實很勇敢。", duration: 4500 },
                    { text: "她交到了很多好朋友，每天都很快樂。", duration: 4000 }
                ]
            },
            {
                title: '魔法花園',
                segments: [
                    { text: "在一個神奇的花園裡，住著許多會說話的花朵。", duration: 4500 },
                    { text: "小女孩莉莉每天都會來這裡澆水。", duration: 4000 },
                    { text: "玫瑰花告訴她關於愛心的故事。", duration: 4000 },
                    { text: "向日葵教她要永遠保持樂觀。", duration: 4000 },
                    { text: "小雛菊說分享會讓快樂加倍。", duration: 4000 },
                    { text: "莉莉學會了很多美好的品格。", duration: 4000 },
                    { text: "她把這些道理分享給所有的朋友。", duration: 4500 },
                    { text: "花園變得更加美麗，充滿了歡聲笑語。", duration: 4500 }
                ]
            },
            {
                title: '月亮船的旅行',
                segments: [
                    { text: "小男孩阿明夢見自己坐上了月亮船。", duration: 4000 },
                    { text: "月亮船帶著他在夜空中遨遊。", duration: 4000 },
                    { text: "他看到了閃閃發光的銀河。", duration: 4000 },
                    { text: "遇到了友善的星星朋友們。", duration: 4000 },
                    { text: "星星們告訴他，每個人都有自己的光芒。", duration: 4500 },
                    { text: "阿明明白了要相信自己的能力。", duration: 4000 },
                    { text: "月亮船慢慢地把他送回家。", duration: 4000 },
                    { text: "阿明帶著美好的夢想安然入睡。", duration: 4000 }
                ]
            }
        ];
        this.usedFallbackStories = [];
    }

    async generateBedtimeStory() {
        if (this.isGenerating) return null;

        this.isGenerating = true;

        try {
            // Show loading animation
            this.showLoadingAnimation();

            // First try to use real GPT API
            const aiStory = await this.tryGenerateWithGPT();

            if (aiStory) {
                console.log('✅ AI 故事生成成功');
                return aiStory;
            } else {
                console.log('⚠️ AI 生成失敗，使用後備故事');
                return this.getFallbackStory();
            }

        } catch (error) {
            console.error('故事生成錯誤:', error);
            console.log('🔄 使用後備故事');
            return this.getFallbackStory();
        } finally {
            this.hideLoadingAnimation();
            this.isGenerating = false;
        }
    }



    showLoadingAnimation() {
        // Hide story content and instructions during loading
        const simpleInstructions = document.querySelector('#storyPage .simple-instructions');
        if (simpleInstructions) {
            simpleInstructions.style.display = 'none';
        }

        elements.storyTitle.style.display = 'none'; // Hide the old title
        elements.storyText.style.display = 'none';
        elements.startStoryBtn.style.display = 'none';
        elements.stopStoryBtn.style.display = 'none';
        elements.generateStoryBtn.textContent = '🤖 創作中...';
        elements.generateStoryBtn.disabled = true;

        // Show loading animation
        elements.aiLoadingAnimation.classList.add('active');

        // Start cycling through loading messages
        this.currentMessageIndex = 0;
        this.updateLoadingMessage();

        this.messageInterval = setInterval(() => {
            this.currentMessageIndex = (this.currentMessageIndex + 1) % this.loadingMessages.length;
            this.updateLoadingMessage();
        }, 2000); // Change message every 2 seconds
    }

    hideLoadingAnimation() {
        // Show instructions again
        const simpleInstructions = document.querySelector('#storyPage .simple-instructions');
        if (simpleInstructions) {
            simpleInstructions.style.display = 'block';
        }

        // Hide loading animation and show story content
        elements.aiLoadingAnimation.classList.remove('active');
        elements.storyTitle.style.display = 'block'; // Show the new title
        elements.storyText.style.display = 'block';
        elements.startStoryBtn.style.display = 'inline-block';
        elements.generateStoryBtn.textContent = '🤖 AI創作新故事';
        elements.generateStoryBtn.disabled = false;

        // Clear message interval
        if (this.messageInterval) {
            clearInterval(this.messageInterval);
            this.messageInterval = null;
        }
    }

    updateLoadingMessage() {
        if (elements.aiLoadingMessage) {
            elements.aiLoadingMessage.textContent = this.loadingMessages[this.currentMessageIndex];
        }
    }

    async tryGenerateWithGPT() {
        try {
            // Check if GPT library is available
            if (typeof gpt === 'undefined') {
                throw new Error('GPT library not available');
            }

            // Create a unique prompt each time to get different stories
            const themes = ['小動物的冒險', '友誼的力量', '勇氣與成長', '溫暖的家庭', '魔法與奇幻', '善良的心靈', '夢想與希望'];
            const characters = ['小兔子', '小熊', '小貓', '小鳥', '小狐狸', '小松鼠', '小象'];
            const settings = ['森林', '花園', '小村莊', '城堡', '海邊', '山谷', '星空下'];

            const randomTheme = themes[Math.floor(Math.random() * themes.length)];
            const randomCharacter = characters[Math.floor(Math.random() * characters.length)];
            const randomSetting = settings[Math.floor(Math.random() * settings.length)];
            const timestamp = Date.now();

            const prompt = `請創作一個全新的適合3-8歲兒童的溫馨睡前故事，大約200字。故事主題是「${randomTheme}」，主角是「${randomCharacter}」，場景在「${randomSetting}」。故事要有正面的價值觀，幫助孩子放鬆入睡。請用繁體中文，請直接回答故事內容，不要使用任何標題、標記或格式符號，只需要純文字故事內容。請確保這是一個獨特的新故事。(ID: ${timestamp})`;

            // Set a timeout for the API call
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error('API timeout')), 15000); // 15 second timeout
            });

            const gptPromise = gpt.ask(prompt);

            const response = await Promise.race([gptPromise, timeoutPromise]);

            console.log('GPT 原始回應:', response);

            if (!response || response.trim().length < 50) {
                throw new Error('Invalid response from GPT');
            }

            // Parse the GPT response into segments
            const segments = this.parseGPTResponseIntoSegments(response);

            const aiStory = {
                id: `ai-story-${Date.now()}`,
                title: `🤖 AI創作故事 (${randomTheme})`,
                segments: segments
            };

            console.log('生成的 AI 故事:', aiStory);

            return aiStory;

        } catch (error) {
            console.error('GPT API 錯誤:', error);
            return null;
        }
    }

    parseGPTResponseIntoSegments(storyText) {
        // Clean up the text - remove markdown formatting
        let cleanText = storyText.trim();

        // Remove markdown headers (####, ###, ##, #)
        cleanText = cleanText.replace(/^#{1,6}\s*/gm, '');

        // Remove markdown bold/italic (**text**, *text*)
        cleanText = cleanText.replace(/\*\*(.*?)\*\*/g, '$1');
        cleanText = cleanText.replace(/\*(.*?)\*/g, '$1');

        // Remove markdown links [text](url)
        cleanText = cleanText.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

        // Remove extra whitespace and newlines
        cleanText = cleanText.replace(/\n\s*\n/g, '\n').replace(/\s+/g, ' ').trim();

        // Split by common sentence endings
        let sentences = cleanText.split(/[。！？]/).filter(s => s.trim().length > 0);

        const segments = [];

        for (let i = 0; i < sentences.length; i++) {
            let sentence = sentences[i].trim();

            // Skip empty sentences or sentences that are too short
            if (!sentence || sentence.length < 5) continue;

            // Remove any remaining markdown or special characters at the start
            sentence = sentence.replace(/^[#\-\*\+\s]+/, '').trim();

            if (sentence) {
                // Add appropriate punctuation back
                let finalSentence = sentence;
                if (!finalSentence.match(/[。！？]$/)) {
                    finalSentence += '。';
                }

                segments.push({
                    text: finalSentence,
                    duration: Math.max(3000, Math.min(6000, finalSentence.length * 150)) // Dynamic duration based on length
                });
            }
        }

        // Ensure we have at least 4 segments
        if (segments.length < 4) {
            // If too few segments, try splitting by commas or other punctuation
            const allText = segments.map(s => s.text).join('');
            const moreSentences = allText.split(/[，、；]/).filter(s => s.trim().length > 10);

            if (moreSentences.length >= 4) {
                return moreSentences.map(sentence => ({
                    text: sentence.trim().replace(/^[#\-\*\+\s]+/, '') + '。',
                    duration: Math.max(3000, Math.min(6000, sentence.length * 150))
                }));
            }
        }

        // If still no good segments, use fallback
        if (segments.length === 0) {
            console.warn('無法解析 AI 回應，使用後備故事');
            return this.getFallbackStory().segments;
        }

        return segments;
    }

    getFallbackStory() {
        // Get available fallback stories (not used recently)
        let availableStories = this.fallbackStories.filter(story =>
            !this.usedFallbackStories.includes(story.title)
        );

        // If all stories have been used, reset the used list
        if (availableStories.length === 0) {
            this.usedFallbackStories = [];
            availableStories = [...this.fallbackStories];
        }

        // Randomly select a story
        const randomIndex = Math.floor(Math.random() * availableStories.length);
        const selectedStory = availableStories[randomIndex];

        // Mark this story as used
        this.usedFallbackStories.push(selectedStory.title);

        return {
            id: `fallback-story-${Date.now()}`,
            title: `📚 ${selectedStory.title}`,
            segments: [...selectedStory.segments] // Create a copy
        };
    }
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

        // Scroll to story text area when starting playback
        this.scrollToStoryText();

        try {
            await this.playNextSegment();
        } catch (error) {
            console.error('Error playing story:', error);
            this.stopStory();
        }
    }

    scrollToStoryText() {
        // Scroll to the story text area smoothly
        const storyTextElement = elements.storyText;
        if (storyTextElement) {
            storyTextElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
            });
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
        this.totalCycles = 4; // 4-7-8 呼吸法建議 4 次循環
        this.currentPhase = 'prepare';
        this.phaseTimer = null;

        this.phases = [
            { type: "prepare", duration: 6000, instruction: "準備開始，找一個舒適的位置" },
            { type: "exhale_prep", duration: 6000, instruction: "先用嘴巴將所有氣吐乾淨" },
            { type: "inhale", duration: 4000, instruction: "用鼻子緩慢深吸氣，數到4" },
            { type: "hold", duration: 7000, instruction: "屏住呼吸，數到7" },
            { type: "exhale", duration: 8000, instruction: "用嘴巴慢慢吐氣，數到8" }
        ];
    }

    async startExercise() {
        if (this.isActive) return;

        this.isActive = true;
        this.currentCycle = 0;
        this.currentPhase = 'prepare';

        // Update UI - hide instructions and simple instructions during exercise
        elements.startBreathingBtn.style.display = 'none';
        elements.stopBreathingBtn.style.display = 'inline-block';
        appState.breathingActive = true;

        // Keep simple instructions visible during exercise
        // (removed the hiding logic)

        try {
            // Show breathing content container first for welcome message subtitle
            elements.breathingContent.style.display = 'block';

            // Welcome message with subtitle
            const welcomeText = "讓我們開始4-7-8呼吸法練習";
            elements.breathingInstruction.textContent = welcomeText;
            elements.breathingPhase.textContent = "哈佛醫師推薦的放鬆技巧";

            await this.audioManager.speakText("讓我們開始4-7-8呼吸法練習。這是哈佛醫師推薦的放鬆技巧，能幫助你快速入睡。請跟著我的指導。");

            if (this.isActive) {
                await this.runBreathingCycle();
            }
        } catch (error) {
            console.error('Error starting breathing exercise:', error);
            this.stopExercise();
        }
    }

    async runBreathingCycle() {
        // First do the preparation phases
        const prepPhases = this.phases.slice(0, 2); // prepare and exhale_prep

        for (const phase of prepPhases) {
            if (!this.isActive) return;

            this.currentPhase = phase.type;

            // Update UI with subtitle (use instruction directly for consistency)
            elements.breathingInstruction.textContent = phase.instruction;
            elements.breathingPhase.textContent = "準備階段";

            try {
                // Speak instruction with subtitle and wait for completion
                await this.audioManager.speakText(phase.instruction);

                // Additional wait time after speech completes
                await new Promise(resolve => {
                    setTimeout(resolve, 1000); // 1 second pause after speech
                });

            } catch (error) {
                console.error('Error in preparation phase:', error);
                return;
            }
        }

        // Now do the main 4-7-8 breathing cycles
        const breathingPhases = this.phases.slice(2); // inhale, hold, exhale

        while (this.isActive && this.currentCycle < this.totalCycles) {
            for (const phase of breathingPhases) {
                if (!this.isActive) break;

                this.currentPhase = phase.type;

                // Update UI with specific instructions for each phase
                let instruction = phase.instruction;
                let spokenText = instruction; // What will be spoken

                if (phase.type === 'inhale') {
                    instruction = "用鼻子緩慢深吸氣，數到4...";
                    spokenText = "用鼻子緩慢深吸氣，數到4";
                } else if (phase.type === 'hold') {
                    instruction = "屏住呼吸，數到7...";
                    spokenText = "屏住呼吸，數到7";
                } else if (phase.type === 'exhale') {
                    instruction = "用嘴巴慢慢吐氣，發出嘶聲，數到8...";
                    spokenText = "用嘴巴慢慢吐氣，發出嘶聲，數到8";
                }

                // Show subtitle immediately when speaking starts
                elements.breathingInstruction.textContent = spokenText;

                try {
                    // Speak instruction with subtitle (don't wait for completion during breathing)
                    this.audioManager.speakText(spokenText);

                    // Visual countdown timer for each phase
                    let remainingTime = phase.duration / 1000; // Convert to seconds
                    const updateTimer = () => {
                        if (!this.isActive) return;

                        let phaseText = '';
                        if (phase.type === 'inhale') phaseText = '吸氣';
                        else if (phase.type === 'hold') phaseText = '閉氣';
                        else if (phase.type === 'exhale') phaseText = '吐氣';

                        elements.breathingPhase.textContent =
                            `第 ${this.currentCycle + 1} 次循環 - ${phaseText} ${Math.ceil(remainingTime)}秒`;

                        remainingTime--;

                        if (remainingTime > 0) {
                            this.phaseTimer = setTimeout(updateTimer, 1000);
                        }
                    };

                    updateTimer();

                    // Wait for phase duration
                    await new Promise(resolve => {
                        setTimeout(resolve, phase.duration);
                    });

                } catch (error) {
                    console.error('Error in breathing phase:', error);
                    break;
                }
            }

            this.currentCycle++;

            // Short pause between cycles
            if (this.isActive && this.currentCycle < this.totalCycles) {
                elements.breathingInstruction.textContent = "很好，準備下一次循環...";
                elements.breathingPhase.textContent = `完成 ${this.currentCycle} 次，準備第 ${this.currentCycle + 1} 次`;
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        }

        if (this.isActive) {
            // Completion message with subtitle
            try {
                elements.breathingInstruction.textContent = "練習完成！";
                elements.breathingPhase.textContent = "身心放鬆，準備入睡";

                await this.audioManager.speakText("很好！4-7-8呼吸法練習完成了。你的身心現在應該感到更加放鬆，可以安心地進入夢鄉了。");
            } catch (error) {
                console.error('Error speaking completion message:', error);
            }

            // Wait a moment before hiding
            await new Promise(resolve => setTimeout(resolve, 2000));

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

        // Reset UI - back to clean initial state
        elements.startBreathingBtn.style.display = 'inline-block';
        elements.stopBreathingBtn.style.display = 'none';

        // Hide breathing content container - back to clean state (no instructions)
        elements.breathingContent.style.display = 'none';

        // Reset instruction text for next time
        elements.breathingInstruction.textContent = '準備開始 4-7-8 呼吸法練習';
        elements.breathingPhase.textContent = '哈佛醫師推薦的快速入睡技巧';

        // Simple instructions remain visible (no need to show again)

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
        this.aiStoryGenerator = new AIStoryGenerator();
        this.hasLoadedInitialStory = false;

        // Load default story as fallback
        this.storyPlayer.loadStory(storyData);

        // Add AI story generation event listener
        elements.generateStoryBtn.addEventListener('click', () => this.handleGenerateStory());
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

    async handleGenerateStory() {
        console.log('Generating AI story');

        const aiStory = await this.aiStoryGenerator.generateBedtimeStory();

        if (aiStory) {
            // Load the new AI-generated story
            this.storyPlayer.loadStory(aiStory);
            console.log('AI story loaded successfully:', aiStory.title);

            // Update button text
            elements.generateStoryBtn.textContent = '🤖 再創作新故事';

            // Ensure the story text is visible after loading
            setTimeout(() => {
                elements.storyText.style.display = 'block';
                elements.startStoryBtn.style.display = 'inline-block';
            }, 100);
        } else {
            console.error('Failed to generate AI story');
            showErrorMessage('故事生成失敗，請稍後再試');
        }
    }

    async handleAutoGenerateStory() {
        console.log('Auto-generating AI story on first visit');

        try {
            // Use the regular method with loading animation for first visit too
            const aiStory = await this.aiStoryGenerator.generateBedtimeStory();

            if (aiStory) {
                // Load the new AI-generated story
                this.storyPlayer.loadStory(aiStory);
                console.log('✅ Auto AI story loaded successfully:', aiStory.title);

                // Update button text to indicate this is an AI story
                elements.generateStoryBtn.textContent = '🤖 再創作新故事';

            } else {
                console.log('⚠️ Auto AI generation failed, keeping default story');
                // Keep the default story that was already loaded
                elements.generateStoryBtn.textContent = '🤖 AI創作新故事';

                // Ensure default story is properly displayed
                elements.storyTitle.textContent = storyData.title;
                this.storyPlayer.displayStoryText();
            }
        } catch (error) {
            console.error('Auto AI story generation error:', error);
            console.log('🔄 Using default story as fallback');
            // Keep the default story that was already loaded
            elements.generateStoryBtn.textContent = '🤖 AI創作新故事';

            // Ensure default story is properly displayed
            elements.storyTitle.textContent = storyData.title;
            this.storyPlayer.displayStoryText();
        }
    }

    navigateToHome() {
        // Stop any active audio when navigating home
        this.audioManager.stopSpeech();
        this.storyPlayer.stopStory();
        this.breathingController.stopExercise();

        super.navigateToHome();
    }

    navigateToBreathing() {
        // Stop any active audio when navigating to breathing page
        this.audioManager.stopSpeech();
        this.storyPlayer.stopStory();
        this.breathingController.stopExercise();

        super.navigateToBreathing();
    }

    async navigateToStories() {
        // Stop any active audio when navigating to stories page
        this.audioManager.stopSpeech();
        this.storyPlayer.stopStory();
        this.breathingController.stopExercise();

        await super.navigateToStories();
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