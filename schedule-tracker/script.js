// Default schedule for 6-year-old
const defaultSchedule = [
    {
        id: 1,
        time: "07:30",
        name: "Wake Up & Get Dressed",
        description: "Put on clothes and brush teeth",
        icon: "👕",
        category: "morning",
        duration: 15
    },
    {
        id: 2,
        time: "07:45",
        name: "Breakfast Time",
        description: "Eat a healthy breakfast",
        icon: "🍳",
        category: "morning",
        duration: 30
    },
    {
        id: 3,
        time: "08:30",
        name: "School/ learning",
        description: "Read books or do activities",
        icon: "📚",
        category: "learning",
        duration: 120
    },
    {
        id: 4,
        time: "10:30",
        name: "Snack Break",
        description: "Have a healthy snack",
        icon: "🍎",
        category: "break",
        duration: 15
    },
    {
        id: 5,
        time: "11:00",
        name: "Playtime",
        description: "Fun play and creativity",
        icon: "🎨",
        category: "play",
        duration: 60
    },
    {
        id: 6,
        time: "12:00",
        name: "Lunch Time",
        description: "Yummy lunch!",
        icon: "🍔",
        category: "meal",
        duration: 45
    },
    {
        id: 7,
        time: "12:45",
        name: "Clean Up",
        description: "Tidy up toys and room",
        icon: "🧹",
        category: "chore",
        duration: 15
    },
    {
        id: 8,
        time: "14:00",
        name: "Quiet Time/Nap",
        description: "Rest and relax",
        icon: "😴",
        category: "rest",
        duration: 60
    },
    {
        id: 9,
        time: "15:30",
        name: "Outdoor Play",
        description: "Play outside or exercise",
        icon: "⚽",
        category: "play",
        duration: 60
    },
    {
        id: 10,
        time: "16:30",
        name: "Homework/Practice",
        description: "Practice letters or numbers",
        icon: "✏️",
        category: "learning",
        duration: 30
    },
    {
        id: 11,
        time: "17:00",
        name: "Screen Time",
        description: "TV or tablet time",
        icon: "📺",
        category: "screen",
        duration: 30
    },
    {
        id: 12,
        time: "17:30",
        name: "Dinner Time",
        description: "Family dinner",
        icon: "🍽️",
        category: "meal",
        duration: 45
    },
    {
        id: 13,
        time: "18:15",
        name: "Bath Time",
        description: "Take a warm bath",
        icon: "🛁",
        category: "routine",
        duration: 20
    },
    {
        id: 14,
        time: "18:45",
        name: "Read a Book",
        description: "Story time before bed",
        icon: "📖",
        category: "learning",
        duration: 20
    },
    {
        id: 15,
        time: "19:15",
        name: "Bed Time",
        description: "Time to sleep",
        icon: "🌟",
        category: "routine",
        duration: 0
    }
];

// Current state
let schedule = [];
let completedTasks = [];

// Load data from localStorage
function loadData() {
    const savedSchedule = localStorage.getItem('schedule');
    const savedCompleted = localStorage.getItem('completedTasks');

    if (savedSchedule) {
        schedule = JSON.parse(savedSchedule);
    } else {
        schedule = JSON.parse(JSON.stringify(defaultSchedule));
        saveData();
    }

    if (savedCompleted) {
        completedTasks = JSON.parse(savedCompleted);
    }
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('schedule', JSON.stringify(schedule));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
}

// Initialize the app
function init() {
    loadData();
    renderSchedule();
    updateProgress();
    updateTime();
    checkCurrentActivity();
    setInterval(updateTime, 1000);
    setInterval(checkCurrentActivity, 60000); // Check every minute
    requestNotificationPermission();
}

// Render schedule activities
function renderSchedule() {
    const grid = document.getElementById('scheduleGrid');
    grid.innerHTML = '';

    schedule.forEach((activity, index) => {
        const card = createActivityCard(activity, index);
        grid.appendChild(card);
    });
}

// Create activity card element
function createActivityCard(activity, index) {
    const card = document.createElement('div');
    card.className = 'activity-card';
    card.id = `activity-${activity.id}`;

    const isCompleted = completedTasks.includes(activity.id);
    const isCurrent = isCurrentActivity(activity);

    if (isCompleted) card.classList.add('completed');
    if (isCurrent) card.classList.add('current');

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const [hours, minutes] = activity.time.split(':').map(Number);
    const activityMinutes = hours * 60 + minutes;
    const isPast = currentMinutes > activityMinutes && !isCompleted;

    card.innerHTML = `
        <div class="card-header">
            <span class="time-badge">⏰ ${activity.time}</span>
            <span class="category-icon">${activity.icon}</span>
        </div>
        <h3 class="activity-name">${activity.name}</h3>
        <p class="activity-description">${activity.description}</p>
        <div class="complete-checkbox ${isCompleted ? 'checked' : ''}"
             onclick="toggleTask(${activity.id})">
            ${isCompleted ? '✓' : ''}
        </div>
        <div class="star-reward">
            ${isCompleted ?
                `<span class="small-star earned">⭐</span>
                 <span class="small-star earned">⭐</span>` :
                `<span class="small-star">⭐</span>
                 <span class="small-star">⭐</span>`
            }
        </div>
    `;

    return card;
}

// Check if activity is current (within 15 min window)
function isCurrentActivity(activity) {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const [hours, minutes] = activity.time.split(':').map(Number);
    const activityMinutes = hours * 60 + minutes;

    return Math.abs(currentMinutes - activityMinutes) <= 15;
}

// Toggle task completion
function toggleTask(taskId) {
    const index = completedTasks.indexOf(taskId);

    if (index > -1) {
        // Uncomplete
        completedTasks.splice(index, 1);
        showCelebration(false);
    } else {
        // Complete
        completedTasks.push(taskId);
        showCelebration(true);
        playSound();
        updateStars();
        checkAllCompleted();
    }

    saveData();
    renderSchedule();
    updateProgress();
}

// Show celebration animation
function showCelebration(earned) {
    if (earned) {
        const celebration = document.getElementById('celebration');
        celebration.classList.add('show');
        createConfetti();

        setTimeout(() => {
            celebration.classList.remove('show');
        }, 2000);
    }
}

// Create confetti effect
function createConfetti() {
    const colors = ['#FFD93D', '#FF6B6B', '#4CAF50', '#667eea', '#FFA500'];
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 4000);
    }
}

// Update progress bar
function updateProgress() {
    const total = schedule.length;
    const completed = completedTasks.length;
    const percentage = Math.round((completed / total) * 100);

    document.getElementById('progressBar').style.width = percentage + '%';
    document.getElementById('progressText').textContent = `${percentage}% Complete`;
    document.getElementById('totalStars').textContent = completed * 2; // 2 stars per task
}

// Update current time
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
    document.getElementById('currentTime').textContent = timeString;
}

// Check for current activity and send reminder
function checkCurrentActivity() {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    schedule.forEach(activity => {
        const [hours, minutes] = activity.time.split(':').map(Number);
        const activityMinutes = hours * 60 + minutes;

        const card = document.getElementById(`activity-${activity.id}`);

        if (card) {
            // Check if it's time for this activity (within 5 minutes before or after)
            const timeDiff = Math.abs(currentMinutes - activityMinutes);
            if (timeDiff <= 5 && !completedTasks.includes(activity.id)) {
                sendReminder(activity);
            }
        }
    });
}

// Send browser notification
function sendReminder(activity) {
    // Check if we already sent a reminder for this activity today
    const today = new Date().toDateString();
    const reminderKey = `reminder_${activity.id}_${today}`;

    if (localStorage.getItem(reminderKey)) return;

    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(`Time for ${activity.name}!`, {
            body: activity.description,
            icon: '🌟'
        });
    }

    localStorage.setItem(reminderKey, 'true');

    // Clear reminder flag at midnight
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    setTimeout(() => localStorage.removeItem(reminderKey), tomorrow - new Date());
}

// Request notification permission
function requestNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
}

// Play completion sound
function playSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
    oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
    oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
}

// Update stars display
function updateStars() {
    const stars = completedTasks.length * 2;
    document.getElementById('totalStars').textContent = stars;
}

// Check if all tasks completed
function checkAllCompleted() {
    if (completedTasks.length === schedule.length) {
        setTimeout(() => {
            const modal = document.getElementById('rewardModal');
            modal.classList.add('show');

            // Bonus stars for completing all!
            const bonusStars = 10;
            const currentStars = completedTasks.length * 2;
            document.getElementById('rewardMessage').textContent =
                `You earned ${currentStars} stars plus ${bonusStars} bonus stars! Great job! 🏆`;
        }, 1500);
    }
}

// Close modal
function closeModal() {
    document.getElementById('rewardModal').classList.remove('show');
}

// Reset daily progress (can be called manually)
function resetDaily() {
    completedTasks = [];
    saveData();
    renderSchedule();
    updateProgress();
}

// Reset reminders at midnight
setInterval(() => {
    const now = new Date();
    if (now.getHours() === 0 && now.getMinutes() === 0) {
        resetDaily();
    }
}, 60000);

// Initialize app on load
window.addEventListener('DOMContentLoaded', init);

// Expose reset function globally for debugging/emergency use
window.resetDaily = resetDaily;
