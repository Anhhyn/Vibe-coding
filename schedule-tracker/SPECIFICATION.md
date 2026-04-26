# Child Schedule Tracker - Detailed Specification

## 1. Project Overview

**Project Name:** My Daily Schedule & Rewards  
**Target User:** 6-year-old child  
**Platform:** Web Application (HTML5 + CSS3 + Vanilla JavaScript)  
**Deployment:** Local browser (no server required)  
**Goal:** Help children track daily activities through a fun, visual reward system  

---

## 2. Core Objectives

### Primary Goals
- Provide clear visual schedule of daily activities
- Enable child to independently mark tasks complete
- Immediate positive reinforcement through rewards
- Teach time management and routine building
- Reduce parental reminders through automated notifications

### Age-Appropriate Design (6 years old)
- Large touch-friendly buttons (minimum 44x44px)
- Bright, contrasting colors
- Simple icons/emojis instead of text-heavy instructions
- Instant feedback (animations, sounds)
- Minimal reading required

---

## 3. Technical Architecture

### Technology Stack
- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Storage:** Browser localStorage (no backend)
- **Notifications:** Browser Notification API
- **Audio:** Web Audio API for sound effects
- **Graphics:** CSS animations, emoji-based icons

### File Structure
```
schedule-tracker/
├── index.html          # Main HTML structure
├── style.css           # All styling and animations
├── script.js           # Application logic
└── README.md           # User documentation (optional)
```

---

## 4. Feature Requirements

### 4.1 Schedule Management

#### Activity Data Structure
Each activity object contains:
```javascript
{
  id: Number,              // Unique identifier
  time: String,            // "HH:MM" 24-hour format
  name: String,            // Display name (short)
  description: String,     // Helper text
  icon: String,            // Emoji or unicode icon
  category: String,        // Type group (morning, meal, play, etc.)
  duration: Number,        // Minutes (for future features)
  rewardStars: Number      // Stars earned (default 2)
}
```

#### Built-in Schedule
15 pre-configured activities for a typical 6-year-old:
1. Wake Up & Get Dressed (7:30 AM)
2. Breakfast Time (7:45 AM)
3. School/Learning (8:30 AM)
4. Snack Break (10:30 AM)
5. Playtime (11:00 AM)
6. Lunch Time (12:00 PM)
7. Clean Up (12:45 PM)
8. Quiet Time/Nap (2:00 PM)
9. Outdoor Play (3:30 PM)
10. Homework/Practice (4:30 PM)
11. Screen Time (5:00 PM)
12. Dinner Time (5:30 PM)
13. Bath Time (6:15 PM)
14. Read a Book (6:45 PM)
15. Bed Time (7:15 PM)

**Customization:** Parents can modify schedule by editing `defaultSchedule` array in script.js or future UI editor.

### 4.2 Task Completion Flow

**User Interaction:**
1. Child sees all activities in chronological grid
2. When activity begins (or any time after), child taps the circular checkbox
3. Checkbox animates (bounce, color change, checkmark appears)
4. Card border turns green (completed state)
5. 2 stars appear and animate (pop-in effect)
6. Confetti celebration plays
7. Completion sound (pleasant chime)
8. Progress bar updates immediately
9. Total star counter increments

**Visual States:**
- **Upcoming:** White card, normal border
- **Current (within ±15 min):** Orange border, pulsing animation
- **Completed:** Green border, green-tinted background, checked box
- **Missed (past time, not completed):** Red border (optional, may discourage)

### 4.3 Reward System

#### Star Economy
- Each completed task = 2 stars
- Bonus: Complete all tasks = +10 bonus stars
- Stars persist across days (accumulate)
- Displayed prominently in header

#### Visual Feedback
- Star counter in header with spinning star icon
- Per-task stars shown under checkbox (dim → bright when earned)
- Confetti explosion from center
- Sound effect (C-major chord arpeggio)
- Celebration overlay appears briefly
- Full-screen modal for 100% completion

**Reward Experience:**
- Immediate: Confetti, sound, stars, progress update
- Delayed: Accumulated stars toward larger rewards (parent-defined)
- Celebration modal: "You earned X stars plus Y bonus stars! Great job!"

### 4.4 Progress Tracking

**Progress Bar**
- Horizontal bar at top (under header)
- Shows % of tasks completed today
- Smooth width transition (0.5s)
- Percentage text centered on bar

**Percentage calculation:**
```
% = (completedTasks.length / totalActivities) × 100
```

### 4.5 Reminder System

**Reminder Trigger:**
- Activity time ± 5 minutes window
- Card gets orange "current" styling
- Browser notification (if granted permission)

**Browser Notifications:**
- Request permission on first load
- Notification title: "Time for [Activity Name]!"
- Body: Activity description
- Icon: Star emoji
- One notification per activity per day (tracked in localStorage with date key)

**Reminder Frequency:**
- Auto-check every 60 seconds
- Notification only sent once daily per activity
- Reminder flags cleared at midnight

### 4.6 Time Display

**Current Time:**
- Large digital clock in center
- Updates every second
- Styled with dashed border
- 12-hour format with AM/PM

### 4.7 Daily Reset

**Automatic Reset:**
- Triggered at midnight (00:00)
- Clears completedTasks array
- Re-renders all cards as uncompleted
- Progress bar resets to 0%
- Star counter resets to 0

**Manual Reset:**
- Exposed as `window.resetDaily()` for testing
- Not available in UI (prevents accidental reset)
- Optional future: Parent settings panel with reset button

---

## 5. User Interface Design

### 5.1 Layout Structure

```
┌─────────────────────────────────────┐
│         HEADER                      │
│  🌟 My Daily Schedule 🌟            │
│  [⭐ 0 Stars]                       │
├─────────────────────────────────────┤
│  [===== Progress Bar ===== 0%]      │
├─────────────────────────────────────┤
│         🕐 2:30 PM                  │
├─────────────────────────────────────┤
│         SCHEDULE GRID               │
│  ┌─────┐  ┌─────┐  ┌─────┐         │
│  │Card │  │Card │  │Card │         │
│  └─────┘  └─────┘  └─────┘         │
│  ┌─────┐  ┌─────┐  ┌─────┐         │
│  │Card │  │Card │  │Card │         │
│  └─────┘  └─────┘  └─────┘         │
├─────────────────────────────────────┤
│         FOOTER                      │
│  Complete tasks to earn stars! ⭐  │
└─────────────────────────────────────┘
```

### 5.2 Design Principles

**Typography:**
- Primary: Comic Sans MS, Chalkboard, Arial Rounded MT Bold (child-friendly)
- Large, bold headings (2-2.5rem)
- Minimum body text size 1rem

**Color Palette:**
- Background gradients: Purple (#667eea) → Pink (#764ba2)
- Header gradient: Yellow (#FFD93D) → Coral (#FF6B6B)
- Success: #4CAF50 (green)
- Warning/Current: #FFA500 (orange)
- Error/Missed: #ff6b6b (red)
- Card background: White
- Text: #333 (dark), #666 (medium)

**Spacing:**
- Container max-width: 900px
- Card gap: 20px
- Border-radius: 20-30px (soft, friendly)
- Padding: 20-30px

**Shadows:**
- Card: 0 5px 20px rgba(0,0,0,0.1)
- Header: 0 10px 40px rgba(0,0,0,0.2)
- Buttons: 0 5px 20px color with 0.4 alpha

### 5.3 Card Design

**Layout:**
```
┌─────────────────────────────┐
│ ⏰ 8:30    📚                │
│ School/Learning             │
│ Read books or do activities  │
│                               │
│       [○]                   │
│        ⭐ ⭐ (dim/bright)    │
└─────────────────────────────┘
```

**Elements:**
- Top row: Time badge + Category icon
- Title: Activity name (bold)
- Body: Description (smaller, gray)
- Center: Large circular checkbox (50px diameter)
- Bottom: Two star icons (1.5rem)

**States:**
- **Default:** White bg, gray border, checkbox unmarked, stars dim (opacity 0.3)
- **Hover:** Card lifts 5px, shadow increases, checkbox border turns green
- **Current:** Orange border, light yellow bg tint, pulses
- **Completed:** Green border, light green bg tint, checkbox green with ✓, stars bright

### 5.4 Animations

**CSS Keyframes:**
- `bounce`: Header title subtle bounce (2s infinite)
- `spin`: Star icon rotation (3s linear infinite)
- `pulse`: Current card glow (2s infinite)
- `checkBounce`: Checkbox checkmark (0.5s)
- `starPop`: Star appearance (0.5s)
- `fadeIn`: Overlay fade (0.3-0.5s)
- `scaleIn`: Celebration pop (0.5s)
- `slideUp`: Modal slide from bottom (0.4s)
- `fall`: Confetti descent (3s)

**Transitions:**
- Progress bar width: 0.5s ease
- Card hover: all 0.3s ease
- Checkbox: all 0.3s ease

### 5.5 Responsive Design

**Breakpoints:**
- Desktop: > 600px → Grid 2-3 columns
- Mobile: ≤ 600px → Single column

**Adaptations:**
- Reduce header padding
- Smaller font sizes (1.8rem title, 1.5rem time)
- Full-width cards
- Touch-friendly targets (minimum 44px)

---

## 6. Data Management

### 6.1 LocalStorage Schema

**Keys:**
- `schedule`: JSON string of activity array (persist schedule customizations)
- `completedTasks`: JSON array of task IDs completed today
- `reminder_{id}_{date}`: Boolean flag if reminder sent today

**Reset Logic:**
- Daily at midnight (00:00)
- Clears completedTasks
- Clears reminder flags
- Keeps schedule customization (if parent customized)

**Data Retention:**
- Schedule customizations persist indefinitely
- Completed tasks reset daily
- Total stars not stored separately (calculated from completed tasks)

### 6.2 State Management

**Global Variables (script.js):**
```javascript
let schedule = [];           // Loaded from localStorage or default
let completedTasks = [];     // Array of task IDs completed today
```

**Functions:**
- `loadData()` - Fetch from localStorage or initialize
- `saveData()` - Persist to localStorage
- `renderSchedule()` - DOM generation from schedule array
- `updateProgress()` - Recalculate progress bar
- `toggleTask(id)` - Complete/uncomplete handler

---

## 7. Notification System

### 7.1 Browser Notifications

**Permission Request:**
- On first page load
- Standard browser prompt: "Allow notifications?"
- Deny → Reminder system disabled (no crash)

**Notification Content:**
- Title: `Time for ${activity.name}!`
- Body: `activity.description`
- Icon: ⭐ (star emoji)

**Scheduling:**
- Check every 60 seconds (setInterval)
- Find activities within ±5 min window
- Skip if already completed or already notified today

**Daily Cooldown:**
- Store key: `reminder_${activityId}_${dateString}`
- Date string: `new Date().toDateString()` (e.g., "Sun Apr 26 2026")
- Clear all at midnight

### 7.2 Visual In-App Reminder

- Card border changes to orange
- Pulsing glow animation
- No popup modal (to avoid interrupting current activity)

---

## 8. Audio Feedback

**Web Audio API Implementation:**
- Oscillator node: sine/triangle wave
- Frequencies: C5 (523.25Hz) → E5 (659.25Hz) → G5 (783.99Hz)
- Arpeggio: 0.1s between notes
- Gain envelope: fade out over 0.5s
- Volume: 0.3 (not jarring)

**Browser Autoplay Policy:**
- AudioContext must be resumed after user interaction
- First click on checkbox initializes audio
- Graceful fallback if Web Audio not supported

---

## 9. Celebration Effects

### 9.1 Confetti
- 50 particles generated randomly
- Colors: Bright palette (yellow, red, green, purple, orange)
- Physics: Fall from top (top: -10px), rotate 720°, fade out
- Duration: 3s
- Cleanup: DOM node removal after animation

### 9.2 Celebration Overlay
- Full-screen semi-transparent black (rgba(0,0,0,0.8))
- Centered modal with gradient background
- Auto-hide after 2 seconds
- No user action required

### 9.3 Completion Modal
- Triggered only when all 15 tasks completed
- Shows custom message with star count
- "Yay!" button to dismiss
- Prevents accidental dismissal (must click)

---

## 10. Error Handling & Edge Cases

### 10.1 No JavaScript
- Content still readable (basic HTML)
- Minimal styling still applies
- Graceful degradation

### 10.2 LocalStorage Disabled
- Catch localStorage errors
- Fallback to in-memory state (resets on page reload)
- Show console warning, no user-facing error

### 10.3 Notification Denied
- Silently skip notifications
- Visual reminders (orange card) still work
- No repeated permission requests

### 10.4 Midnight Boundary
- Check interval: every 60 seconds
- Exactly at 00:00 → trigger reset
- Uses server time or browser time (browser time assumed)

### 10.5 Multiple Tabs
- Each tab has independent state (no synchronization)
- No conflicts expected (localStorage reads are consistent)

---

## 11. Performance Considerations

### Optimization
- Minimal DOM manipulation (full re-render on toggle)
- Efficient event listeners (onclick inline for simplicity)
- Animations use CSS transforms (GPU-accelerated)
- Confetti nodes removed after animation
- No external dependencies (zero load time)

### Bundle Size
- Total assets: < 50KB combined
- No images (CSS gradients, emojis)
- No frameworks (vanilla JS)
- Instant load even on slow connections

---

## 12. Accessibility (A11y)

### Current Status: Basic
- Color contrast meets minimum WCAG AA on most screens
- Touch targets meet 44×44px minimum
- Semantic HTML (header, main, footer)
- ARIA labels: NONE (needs improvement)

### Recommended Improvements (Future)
- Add `aria-label` to checkboxes
- Keyboard navigation (Enter to toggle)
- Screen reader support (role="button", live regions)
- Reduced motion preference (respect `prefers-reduced-motion`)
- High contrast mode toggle

---

## 13. Security & Privacy

**No Data Collection:**
- All data stays on local device
- No network requests
- No analytics
- No cookies (except localStorage)

**Parental Control:**
- Code fully editable (no obfuscation)
- Parents can customize schedule
- No external dependencies (no CDN)

---

## 14. Testing Checklist

### Functional Tests
- [ ] Page loads without JavaScript errors
- [ ] All 15 activities render correctly
- [ ] Checkbox toggles completed state
- [ ] Stars increment by 2 on completion
- [ ] Progress bar updates smoothly
- [ ] Confetti appears on first completion
- [ ] Sound plays on completion
- [ ] All tasks completed → celebration modal
- [ ] Wake time notification triggers
- [ ] Notification only fires once per day
- [ ] Midnight reset clears completed tasks
- [ ] Data persists after page reload
- [ ] Custom schedule edits persist

### Visual Tests
- [ ] Cards readable on mobile (320px width)
- [ ] Touch targets easy to tap
- [ ] Colors clearly distinguishable
- [ ] Animations smooth (60fps)
- [ ] No layout shifts during load

### Browser Compatibility
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (iOS & macOS)
- [ ] Edge (latest)

---

## 15. Future Enhancement Roadmap

### Phase 1 (Nice-to-have)
- Editable schedule UI (drag-drop, time picker)
- Customizable reward stars per activity
- Weekly view calendar
- Achievement badges
- Parent dashboard (pin protected)

### Phase 2 (Advanced)
- Push notifications (service worker for offline)
- Multi-child support (profiles)
- Streak tracking (consecutive days)
- Export data (CSV/JSON)
- Print-friendly weekly schedule

### Phase 3 (Integration)
- sync across devices (optional cloud)
- Integration with smart home (lights, speakers)
- Voice reminders (speech synthesis)

---

## 16. Maintenance Notes

### Files to Edit
- **Activities:** `script.js` lines 2-65 (defaultSchedule array)
- **Colors:** `style.css` — change gradient values
- **Timing:** `script.js` — update check intervals
- **Icons:** Replace emoji with SVG for sharper display

### Customization Guide
1. **Add activity:** Add object to defaultSchedule array with unique ID
2. **Change time:** Edit `time` property (HH:MM format)
3. **Change icon:** Replace emoji in `icon` property
4. **Change stars:** Add `rewardStars: 3` to object (edit code to use)
5. **Adjust reminder window:** Change `checkCurrentActivity` window (currently ±5 min)

---

## 17. Success Metrics

### Engagement
- Daily usage rate (> 80% days used)
- Task completion rate (> 70% tasks completed)
- Independent check-off rate (no parent assistance)

### Learning Outcomes
- Improved routine adherence
- Reduced morning/evening resistance
- Better time awareness
- Understanding of delayed gratification

---

## 18. Known Limitations

1. **Browser dependency:** Requires modern browser with localStorage & Notification API
2. **Single timezone:** Uses browser local time
3. **Single child:** No multi-profile support
4. **No undo:** Uncheck to reverse
5. **No history:** Only today's progress visible
6. **Static schedule:** No automatic time adjustments for weekends/vacations
7. **Sound optional:** May not work on mobile without interaction

---

## 19. Support & Troubleshooting

### Common Issues

**Notifications not appearing:**
- Check browser permission (click lock icon in address bar)
- Ensure "Notifications" allowed
- Some browsers require HTTPS (use localhost is fine)

**Confetti lags:**
- Remove some particles (reduce count to 30)
- Reduce animation duration

**Schedule not saving:**
- Check localStorage enabled
- Check private/incognito mode (disables localStorage)
- Browser storage quota exceeded (unlikely)

**Sound not playing:**
- First interaction required
- Device muted
- Browser autoplay policy blocked

---

## 20. Deployment Instructions

### Local Use
1. Copy entire `schedule-tracker/` folder to any location
2. Double-click `index.html` to open in browser
3. Allow notifications when prompted

### Optional: Server
- Host static files on any web server
- No server-side code required
- Access from any device on network

### Mobile
- Transfer files to phone
- Open in mobile browser (Chrome, Safari)
- Add to home screen for app-like experience

---

**Document Version:** 1.0  
**Last Updated:** 2026-04-26  
**Status:** Complete (MVP delivered)
