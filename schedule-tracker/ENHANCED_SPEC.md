# Parent-Child Schedule & Reward System - Enhanced Specification

## Executive Summary

Two-role system (Parent + Child views) with visual schedule builder, habit tracking, points economy, and AI-powered insights. Extends the basic schedule tracker into a full habit formation platform.

---

## 1. System Architecture

### 1.1 Technology Stack (Enhanced)

**Frontend:**
- HTML5 + CSS3 + Vanilla JavaScript (ES6+)
- Component-based structure (single-page app pattern)
- Responsive design (mobile-first)

**Storage:**
- localStorage (parent profile, child profile, schedule, rewards, history)
- Schema versioning for migrations

**External APIs (Future-Proof):**
- AI insights: Local LLM or OpenAI API (optional, parent-configured)
- Notifications: Browser Notification API + optional push service
- Audio: Web Audio API + configurable sounds

**Deployment:**
- Static files (no server required)
- Optional HTTPS for push notifications on mobile
- PWA capabilities (installable, offline-first)

---

## 2. Data Model

### 2.1 Schema

```javascript
// Version: 2.0
const appData = {
  version: "2.0",
  parent: {
    id: "parent_001",
    name: "Parent Name",
    email: "optional@email.com",
    createdAt: "2026-04-26"
  },
  children: [
    {
      id: "child_001",
      name: "Child Name",
      age: 6,
      schoolLevel: "Grade 1",
      focusAreas: ["homework", "reading", "chores"],
      avatar: "emoji_or_image",
      totalPoints: 450,
      streak: {
        study: 5,
        habit: 3
      }
    }
  ],
  schedule: [
    {
      id: "block_001",
      childId: "child_001",
      type: "study" | "habit", // For AI analysis
      name: "Math Homework",
      startTime: "15:00",
      endTime: "15:30",
      duration: 30,
      icon: "🔢",
      timerEnabled: true,
      timerSound: "bell",
      repeat: "daily" | "monday" | "tuesday" | "custom",
      pointsValue: 10,
      active: true,
      order: 1
    }
  ],
  habits: [
    {
      id: "habit_001",
      childId: "child_001",
      name: "Read 20 minutes",
      frequency: "daily" | "3x_weekly" | "weekly",
      pointsValue: 15,
      category: "reading",
      completedDates: ["2026-04-25", "2026-04-26"],
      streak: 5
    }
  ],
  rewards: [
    {
      id: "reward_001",
      childId: "child_001",
      name: "Extra Screen Time",
      icon: "📺",
      pointsRequired: 50,
      tier: "small",
      redeemed: false,
      redeemedDate: null
    }
  ],
  history: [
    {
      date: "2026-04-26",
      completedSchedule: ["block_001", "block_003"],
      completedHabits: ["habit_001"],
      pointsEarned: 25,
      notes: "tired today"
    }
  ],
  settings: {
    notifications: true,
    sounds: true,
    reminderLeadTime: 5, // minutes before
    rewardAnimations: true,
    difficulty: "normal" // easy/medium/hard
  }
}
```

---

## 3. User Roles & Views

### 3.1 Parent View (Setup & Management)

**Routes/Pages:**

1. **Dashboard** (`/parent/dashboard`)
   - Child selector (if multiple children)
   - Today's schedule overview
   - Current points & streak
   - Weekly completion % (sparkline)
   - Quick add habit button

2. **Child Profile** (`/parent/child/:id`)
   - Edit name, age, school level
   - Focus areas (multi-select: homework, reading, math, chores, sports)
   - Avatar selection (emoji picker)
   - Delete child (with confirmation)

3. **Schedule Builder** (`/parent/schedule`)
   - Visual timeline (horizontal scroll or vertical list)
   - Drag-and-drop time blocks
   - Add block modal:
     - Name input
     - Time pickers (start/end)
     - Icon selector (emoji grid)
     - Type toggle (study/habit)
     - Points field
     - Timer toggle + sound selector
     - Repeat pattern (daily, weekdays, custom days)
     - Active/inactive switch

4. **Habits Manager** (`/parent/habits`)
   - List of habits with checkboxes for quick completion
   - Add habit form
   - Edit/delete habits
   - Set frequency (daily, 3x/week, weekly)
   - Set points value
   - View streak history

5. **Rewards Shop** (`/parent/rewards`)
   - Create reward:
     - Name, icon (emoji/image)
     - Points required
     - Tier (small/medium/big) for grouping
     - Description
   - Manage rewards (edit/delete)
   - Preview child's rewards screen

6. **Analytics & AI** (`/parent/analytics`)
   - **Weekly Summary Card:**
     - Completion % bar (Mon-Sun)
     - Study vs Habit streaks
     - Total points earned
   - **Time-of-Day Graph:**
     - Heatmap or bar chart showing completion by hour
     - Highlight "most skipped" time block
   - **AI Mentor Panel:**
     - Auto-generated insights (sentence-based)
     - "Try this" suggestions (actionable)
     - Optional: Add note about child's state (tired, sick, busy)

7. **Settings** (`/parent/settings`)
   - Notification preferences
   - Sound on/off
   - Reminder lead time
   - Data export/import
   - Reset data

### 3.2 Child View (Daily Use)

**Routes/Pages:**

1. **Home "Remind-Clock"** (`/child/home`)
   - Vertical timeline of today's blocks
   - Each block shows:
     - Icon + name
     - Time range (3:00 PM - 3:30 PM)
     - Mini countdown timer (if active)
     - "Done" button (large, circular)
   - Current block: pulsing border, larger
   - Completed block: green checkmark overlay
   - Next block: slightly dimmed
   - Top bar:
     - Child's name + avatar
     - Current points balance (animated)
     - Streak fire icon 🔥

2. **Rewards Shop** (`/child/rewards`)
   - Grid of rewards (like mini app store)
   - Each card:
     - Large icon
     - Name
     - Points required (prominently shown)
     - Progress ring or "Unlock" button
   - Child can "purchase" with points (parent approval optional)
   - Unlocked rewards: "Claimed" badge with celebration

3. **My Stats** (`/child/stats`) - Optional for older kids
   - This week's stars (visual count)
   - Streak counter
   - Badges earned

---

## 4. Feature Breakdown (MVP)

### 4.1 Parent Features

#### A. Profile & Child Management
- Add/remove multiple children
- Edit child details (name, age, focus areas)
- Individual schedules per child

#### B. Visual Schedule Builder
- Drag-and-drop timeline (time-based)
- Time block customization:
  - Name (max 20 chars)
  - Start/end time (time picker)
  - Duration auto-calculated
  - Icon picker (100+ emojis)
  - Type: Study (homework, reading) vs Habit (chores, routines)
  - Points value (1-100)
  - Timer enable/disable
  - Sound selection (bell, chime, applause, custom)
  - Repeat pattern: daily, weekdays (Mon-Fri), weekends (Sat-Sun), custom
- Preview mode: See child's view
- Import/export schedule (JSON)

#### C. Habits System
- Create reusable habits (not time-bound)
- Mark complete any time (checkbox)
- Frequency-based goals (e.g., "3x/week reading")
- Streak tracking
- Points awarded immediately on completion

#### D. Rewards Configuration
- Define rewards with:
  - Name (e.g., "Ice Cream Trip")
  - Icon
  - Points cost
  - Tier category
  - Description
  - Optional: parent-only approval required
- Tier grouping for browsing (small: <50, medium: 50-150, big: 150+)
- Shows how many children can afford

#### E. Dashboard & Analytics
**Widgets:**
1. Completion rate (week): ______%
2. Current streak: 🔥 X days
3. Total points earned: YYYY
4. Most consistent: [habit name]
5. Needs improvement: [habit name]

**Charts:**
- Simple bar chart (Canvas/DOM-based):
  - X: Mon Tue Wed Thu Fri Sat Sun
  - Y: % completed (0-100)
- Time-of-day heatmap:
  - 7am-9pm hourly blocks
  - Color intensity = completion % for that time slot
  - Hover: tooltip with stats

#### F. AI Mentor (Parent-Facing)
**Data Sources:**
- Completion timestamps
- Missed activities
- Parent-entered notes ("tired", "sick", "busy")
- Habit frequency patterns

**Auto-Insights (weekly):**
- "You finished homework on time 5/7 days this week."
- "Most skipped: Evening play block (often after dinner)."
- "Best performing: Morning routine (100% completion)."

**Suggestions (sentence-based):**
- "Try moving Math homework 30 min earlier to avoid TV conflict."
- "Split Reading into two 10-min blocks instead of one 20-min block."
- "Consider increasing points for Chores to boost motivation."

**Method:**
- Simple rule-based engine (no complex ML required)
- Template-based sentences with variable insertion
- Optional: Connect to OpenAI API (parent configures API key)

### 4.2 Child Features

#### A. Remind-Clock Home Screen
**Layout:**
- Vertical scroll timeline
- Blocks appear as:
  ```
  ┌─────────────────────────┐
  │  📚   Homework          │
  │  3:00 PM - 3:30 PM      │
  │  [⏳ 12:34 remaining]   │
  │                         │
  │        [✅ DONE]        │
  │                         │
  └─────────────────────────┘
  ```

**Behaviors:**
- At start time:
  - Block highlights (orange glow)
  - Sound plays (configurable)
  - Optional vibration (mobile)
  - Countdown timer appears
- At end time:
  - Timer turns red ("Time's up!")
  - Optional gentle reminder sound
- Child taps "Done" button:
  - Confetti animation
  - Points popup (+10!)
  - Balance increments
  - Checkmark overlay appears

#### B. Points & Stars Economy
- Points displayed prominently (top bar)
- Earned instantly on task completion
- Visual feedback:
  - "POP +10" animation
  - Sound effect
  - Star/coin icon flies into points counter

#### C. Rewards Shop (Child View)
- Kid-friendly card grid:
  - Large emoji icon (150px)
  - Name (e.g., "Choose Dinner")
  - Points needed (e.g., "200 ⭐")
  - Progress bar showing current/have
  - "Unlock" button (enabled if enough points)
- Unlock flow:
  - Tap button
  - Confirmation modal: "Redeem 200 stars for 'Choose Dinner'?"
  - On confirm: Celebration animation
  - Reward status: "Unlocked" with date
  - Points deducted
  - Parent notified (optional)

#### D. Mini-Games (Optional Future)
- Simple mini-games to earn bonus points
- Daily streak bonus (consecutive days)
- Weekly challenge bonuses

---

## 5. Analytics & Metrics

### 5.1 Completion Tracking

**Data Collected:**
- Schedule block ID
- Completion timestamp (YYYY-MM-DD HH:MM:SS)
- Completion status: on-time / late
- Habit completion dates
- Points awarded

**Derived Metrics:**
- Daily completion rate = (completed / total blocks) × 100
- Streak: consecutive days with ≥ 80% completion
- Habit streak: consecutive times habit completed
- Average completion time (vs scheduled time)

### 5.2 Time-of-Day Analysis

**Binning:**
- Hourly buckets (7am-9pm)
- Calculate completion % per bucket
- Identify "hot" (high completion) and "cold" (low completion) zones

**Visualization (Parent):**
- Horizontal bar chart with color gradient
- Each hour bar width = % completion
- Label: "7-8 AM: 90%"
- Highlight lowest-performing block

---

## 6. AI Mentor Implementation (Phase 1 - Rule-Based)

### 6.1 Insight Generation Rules

**Schedule Analysis:**
```javascript
function generateInsights(history, schedule) {
  const insights = [];

  // 1. Completion rate
  const weekRate = calculateWeeklyRate(history);
  insights.push({
    type: "summary",
    text: `This week you completed ${weekRate}% of tasks on time.`
  });

  // 2. Most missed block
  const missedBlock = findMostMissedBlock(history, schedule);
  if (missedBlock) {
    insights.push({
      type: "problem",
      text: `Most skipped: ${missedBlock.name} at ${missedBlock.time}.`
    });
  }

  // 3. Best performing
  const bestBlock = findBestBlock(history);
  insights.push({
    type: "success",
    text: `Best performing: ${bestBlock.name} (100% completion).`
  });

  // 4. Suggestion based on conflict
  const conflict = findTimeConflict(history);
  if (conflict) {
    insights.push({
      type: "suggestion",
      text: `Try moving ${conflict.task} 30 min earlier to avoid ${conflict.conflictWith}.`
    });
  }

  // 5. Habit suggestion
  if (weekRate < 70) {
    insights.push({
      type: "suggestion",
      text: "Consider reducing daily tasks or increasing point values to boost motivation."
    });
  }

  return insights;
}
```

**Natural Language Templates:**
- "Great job on {habit} this week—{streak} days in a row!"
- "Try shifting {task} earlier by {duration} to avoid the {conflict} rush."
- "{Child} seems most focused in the {timeOfDay}. More tasks then?"

### 6.2 Parent Notes Feature

**Purpose:** Context for AI (why missed?)
**Input:**
- Date picker
- Note tags: "Tired", "Sick", "Busy", "Travel", "Party"
- Optional text: "Had dentist appointment"
**Impact:** AI weights missed days with notes differently

### 6.3 Future AI Enhancement (OpenAI)

**Optional Integration:**
- Parent adds OpenAI API key in settings
- Insights become more conversational
- Personalized suggestions based on child's interests
- Weekly summary email option

---

## 7. UI/UX Specification

### 7.1 Design System

**Color Palette:**
```
Parent Dashboard:
  Primary: #667eea (blue-purple)
  Secondary: #FF6B6B (coral)
  Success: #4CAF50 (green)
  Warning: #FFA500 (orange)
  Background: #f5f7fa (light gray)

Child App:
  Primary: #FFD93D (sunny yellow)
  Secondary: #4CAF50 (green)
  Accent: #FF6B6B (coral)
  Background: #FFF9E6 (cream)
```

**Typography:**
- Parent: Inter or Roboto (clean UI)
- Child: Comic Sans MS or Fredoka (round, playful)

**Icons:**
- Emoji-based (universal, zero assets)
- Optional: SVG icons from FontAwesome/Material

### 7.2 Parent Dashboard Wireframe

```
┌─────────────────────────────────────┐
│  👨‍👦 Parent Dashboard               │
├─────────────────────────────────────┤
│  Child: [Emma] [▼]                  │
├─────────────────────────────────────┤
│  Today's Schedule  [Edit]           │
│  [ 8:00 Breakfast ✅]               │
│  [ 9:00 School   ✅]                │
│  [15:00 Homework ⬜]                │
├─────────────────────────────────────┤
│  Points:  450 ⭐   Streak:  5 🔥    │
├─────────────────────────────────────┤
│  Weekly Completion                  │
│  [Mon 80%] [Tue 90%] [Wed 100%] ... │
├─────────────────────────────────────┤
│  AI Mentor:                         │
│  • "Homework completion 5/7 days"   │
│  • "Try earlier start for reading"  │
│  [See all suggestions]              │
└─────────────────────────────────────┘
```

### 7.3 Child Home Screen Wireframe

```
┌─────────────────────────────────────┐
│  ⭐ 150  🔥 3    [👤 Avatar]         │
├─────────────────────────────────────┤
│                                     │
│  ╔═══════════════════════════════╗  │
│  ║   📚   Homework               ║  │
│  ║   3:00 PM - 3:30 PM          ║  │
│  ║   ⏳ 12:34 remaining           ║  │
│  ║                               ║  │
│  ║          [ ✅ DONE ]          ║  │
│  ╚═══════════════════════════════╝  │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  🎨  Art Time               │   │
│  │  4:00 PM - 4:30 PM          │   │
│  │  [ ⭕ Not started ]          │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  🎮  Play Time               │   │
│  │  5:00 PM - 6:00 PM          │   │
│  │  [ ⭕ Not started ]          │   │
│  └─────────────────────────────┘   │
│                                     │
│  [🏪 Rewards]  [📊 Stats]          │
└─────────────────────────────────────┘
```

---

## 8. Interaction Flows

### 8.1 Parent Setup Flow

```
1. Open app (first time)
   → Landing page: "Parent" / "Child" entry points
   → Click "Parent"

2. Create Parent Profile
   → Enter name
   → (Optional) email
   → Save

3. Add Child
   → "Add Child" button
   → Form: Name, Age, School Grade, Focus Areas (checkboxes)
   → Choose avatar (emoji picker)
   → Save

4. Build Schedule
   → "Create Schedule" button
   → Timeline UI appears
   → "Add Block" → modal pops up
   → Fill fields:
     - Name: Homework
     - Start: 3:00 PM, End: 3:30 PM
     - Icon: 📚
     - Type: Study
     - Points: 10
     - Timer: ON, Sound: Bell
   → Drag to reorder
   → Save

5. Create Rewards
   → "Rewards Shop" tab
   → "Add Reward"
   → Fill: "Extra Screen Time", icon 📺, cost 50, tier small
   → Add more rewards

6. Preview (optional)
   → "Preview as Child" button
   → Opens child view in new tab

7. Done! Child can start using.
```

### 8.2 Child Daily Flow

```
1. Open app (child icon on home screen)
   → Child view loads
   → Sees today's schedule

2. Current block is highlighted (orange glow)
   → Sound plays gently
   → Timer counts down

3. When done:
   → Tap large "✅ DONE" button
   → Animation: Confetti
   → Sound: Triumph
   → "+10 ⭐" floats up
   → Points counter updates (450 → 460)
   → Block turns green with checkmark

4. Tap "Rewards" icon
   → Sees list of rewards
   → Has 460 stars, can afford "Extra Screen Time" (50)
   → Tap "Unlock"
   → Confirmation: "Redeem 50 stars?"
   → Confirms
   → "Unlocked! 🎉" celebration
   → Points now 410
   → Reward moves to "Unlocked" section

5. Later: Show parents unlocked reward for redemption.
```

### 8.3 Parent Review Flow (Weekly)

```
1. Parent opens app → Dashboard
2. Clicks "Weekly Review" tab
3. Sees:
   - Bar chart: Mon 80%, Tue 90%, Wed 60%, Thu 75%, Fri 85%
   - Streak: 5 days (study), 3 days (habit)
   - Notes: "Wednesday: tired after soccer"
   - AI Suggestion: "Move homework 30 min earlier on Wed"
4. Parent can:
   - Edit schedule based on insight
   - Add note to history
   - View detailed day breakdown
```

---

## 9. Technical Implementation Plan

### Phase 1: Core Structure (Week 1-2)
- [ ] Set up file structure
  ```
  app/
  ├── index.html          (router entry)
  ├── css/
  │   ├── parent.css
  │   ├── child.css
  │   └── common.css
  ├── js/
  │   ├── app.js          (main router/state)
  │   ├── storage.js      (localStorage schema)
  │   ├── parent/
  │   │   ├── dashboard.js
  │   │   ├── schedule-builder.js
  │   │   ├── habits.js
  │   │   ├── rewards.js
  │   │   └── analytics.js
  │   └── child/
  │       ├── home.js
  │       ├── timer.js
  │       └── rewards.js
  ├── assets/
  │   └── sounds/
  └── spec.md
  ```
- [ ] Implement storage.js (schema v2)
- [ ] Basic router (hash-based or simple show/hide)
- [ ] Parent dashboard UI (HTML)
- [ ] Child home UI (HTML)

### Phase 2: Parent Features (Week 3-4)
- [ ] Child profile CRUD
- [ ] Schedule builder:
  - Drag/drop timeline (use SortableJS or vanilla)
  - Time block modal
  - Icon selector
  - Save to localStorage
- [ ] Habits CRUD
- [ ] Rewards CRUD
- [ ] Dashboard widgets (points, streak, completion)

### Phase 3: Child Features (Week 5-6)
- [ ] Render schedule blocks (iterate schedule array)
- [ ] Timer countdown (setInterval per block)
- [ ] Completion toggle (send points, update storage)
- [ ] Animations (confetti, points pop)
- [ ] Rewards shop UI (child view)
- [ ] Points accrual and redemption

### Phase 4: Analytics & AI (Week 7-8)
- [ ] History tracking (store completions)
- [ ] Completion stats calculation
- [ ] Simple bar chart (pure CSS/JS)
- [ ] Time-of-day heatmap
- [ ] Rule-based insight engine
- [ ] AI suggestions panel
- [ ] Parent notes feature

### Phase 5: Polish (Week 9-10)
- [ ] Notifications (browser)
- [ ] Sound integration
- [ ] Mobile responsive tweaks
- [ ] Touch optimization
- [ ] PWA manifest (installable)
- [ ] Cross-browser testing
- [ ] Accessibility improvements

---

## 10. Critical Considerations

### 10.1 State Management

**Single Source of Truth:**
```javascript
const state = {
  currentUser: 'parent' | 'child',
  currentChildId: 'child_001',
  data: { ... } // full appData object
};
```

**Persistence:** All mutations → `storage.save(state.data)`

**Reactivity:** Simple observer pattern:
```javascript
function setState(update) {
  state.data = { ...state.data, ...update };
  storage.save(state.data);
  render(); // re-render current view
}
```

### 10.2 Time Handling

**Timezones:**
- Store all times as HH:MM strings (local time)
- No timezone conversion needed (app is local-only)
- Date objects for timestamps (local)

**Daily Reset:**
- Trigger at local midnight
- Or soft reset: When child opens app, if `lastOpenDate !== today`, reset completion flags only

### 10.3 Points Ledger

**Audit Trail:**
- Every points change logged to `history[date].pointsEarned`
- Track source: schedule block ID or habit ID
- Enables rollback if needed

**Redemption:**
- Deduct points immediately upon unlock
- Record in history: `{ type: 'redeem', rewardId, points }`

### 10.4 Notifications

**Schedule-based reminders:**
- At block start time → show notification (if enabled)
- Sound plays (even if app closed, if using Service Worker)
- Mobile: Vibration pattern (optional)

**Frequency capping:**
- One notification per block per day
- Snooze option (10 min)

### 10.5 Conflict Resolution

**Multiple children sharing device:**
- Child selection screen on launch
- Switch via profile icon
- Data isolated by `childId`

**Offline mode:**
- All data local
- Sync when online (optional cloud future)

---

## 11. Edge Cases & Error Handling

| Scenario | Solution |
|----------|----------|
| localStorage full | Show "Clear some data" warning; compress old history |
| Invalid time input | Validate (start < end), show error |
| Duplicate block name | Allow (uniqueness on ID only) |
| Child redeems unavailable reward | Button disabled, show required points |
| Parent deletes active reward | Hide from child, refund points if owned |
| Midnight during active block | Completion carries over? Resets at next day open |
| App opened after days | Auto-reset completion flags for past dates |
| Browser blocks notifications | Show inline alert with enable instructions |
| Schedule conflict (overlap) | Allow? Or warn? (Recommend: allow for flexibility) |

---

## 12. Testing Matrix

### Test Cases

**Parent:**
- [ ] Create child profile
- [ ] Edit child profile
- [ ] Add schedule block (various times)
- [ ] Drag block to reorder
- [ ] Delete block
- [ ] Set timer & sound
- [ ] Create habit
- [ ] Mark habit complete (manual)
- [ ] Create reward
- [ ] Edit reward
- [ ] View analytics (with/without data)
- [ ] Add note to history
- [ ] Export/import data

**Child:**
- [ ] View daily schedule
- [ ] Timer countdown accuracy
- [ ] Complete block → points update
- [ ] View rewards shop
- [ ] Redeem reward
- [ ] Insufficient points check
- [ ] Sound plays (muted/unmuted)
- [ ] Notification received
- [ ] Confetti triggers

**Integration:**
- [ ] Parent changes reflect in child view (on next load)
- [ ] Child completion updates parent dashboard
- [ ] Points sync between views
- [ ] Daily reset works

---

## 13. Accessibility & Internationalization

### Accessibility (A11y)
- ARIA labels for all buttons
- Keyboard navigation support
- High contrast mode (optional)
- Reduced motion support (prefers-reduced-motion)

### i18n (Future)
- JSON language files
- Child-friendly language layer
- Parent settings for language

---

## 14. Performance & Security

### Performance
- Lazy-load views (only render visible)
- Debounce localStorage writes
- Minimal re-renders (use virtual DOM concepts or efficient updates)

### Security
- No server = minimal attack surface
- Sanitize inputs (child names, etc.)
- No external scripts (avoid XSS)
- Parent password (optional PIN) for sensitive actions (deleting child)

---

## 15 deliverables

### v0.1 (Internal Alpha)
- Parent: Basic CRUD (child, schedule, rewards)
- Child: Basic completion flow
- LocalStorage schema
- No AI, no analytics charts

### v0.5 (Beta)
- Timer & notifications
- Points & rewards redemption
- Basic analytics (completion %)
- Habit tracking

### v1.0 (MVP Launch)
- All core features stable
- AI insights (rule-based)
- Responsive mobile UI
- Full testing coverage
- Documentation

### v2.0 (Future)
- Multi-language
- Cloud sync (optional)
- Advanced AI (LLM integration)
- Multi-child advanced management
- Parent-child messaging

---

## 16. Questions & Decisions Needed

1. **Multi-child?** Yes (assume 1-3 children)
2. **Approval flow for rewards?** Auto-redeem vs parent-approval toggle
3. **Points expiration?** Reset daily, weekly, or never?
4. **Default reminder sounds?** List of 5 cheerful sounds
5. **AI source?** Rule-based first, optionally OpenAI
6. **Habit frequency types:** daily, 3x/week, weekly, custom?
7. **Streak reset on miss?** Yes (consecutive days only)
8. **Private data?** No cloud, but parent may want backup export

---

**Version:** 2.0  
**Status:** Draft for review  
**Owner:** Parent-Child Engagement Product
