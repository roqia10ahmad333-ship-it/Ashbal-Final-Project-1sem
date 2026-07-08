/* ==========================================
   1. CONSTANTS & INITIALIZATION
   ========================================== */
const TODAY = new Date(); // Current date and time
const MS_IN_A_DAY = 24 * 60 * 60 * 1000; // Total milliseconds in a single day

/* ==========================================
   2. PARALLEL ARRAYS (Exactly 4 Elements Each)
   ========================================== */
const courseNames = [
    "Full-Stack JavaScript",
    "Python Fundamentals",
    "UI/UX Design Systems",
    "Data Science Essentials"
];

const courseStatuses = [
    "Coming Soon",
    "Open Now",
    "Closed",
    "Open Soon"
];

// 4 ISO date strings representing: Future, Present/Very Close, Past, and Future dates
const courseLaunchDates = [
    "2026-08-20T00:00:00.000Z",
    "2026-07-09T00:00:00.000Z", 
    "2026-05-15T00:00:00.000Z",
    "2026-07-25T00:00:00.000Z"
];

/* ==========================================
   3. REQUIRED FUNCTIONS
   ========================================== */

/**
 * Calculates the exact floor difference in whole days between TODAY and target date.
 * Positive = Future, Zero = Today, Negative = Past
 */
function daysLeft(dateString) {
    const targetDate = new Date(dateString);
    // Calculate the difference in milliseconds
    const diffMs = targetDate.getTime() - TODAY.getTime();
    // Convert to days and apply Math.floor to get full whole integer counts
    return Math.floor(diffMs / MS_IN_A_DAY);
}

/**
 * Converts structural integer day counts into localized descriptive summary labels
 */
function daysLabel(daysCount) {
    if (daysCount > 0) {
        return `${daysCount} days left`;
    } else if (daysCount === 0) {
        return "Launching today";
    } else {
        // Convert negative days to positive for cleaner past phrase representation
        return `Already launched ${Math.abs(daysCount)} days ago`;
    }
}

/**
 * Filters the course parallel arrays and returns array of names matching exact status
 * (Case-sensitive behavior strictly preserved)
 */
function filterByStatus(statusString) {
    const matchedCourses = [];
    for (let i = 0; i < courseStatuses.length; i++) {
        if (courseStatuses[i] === statusString) {
            matchedCourses.push(courseNames[i]);
        }
    }
    return matchedCourses;
}

/* ==========================================
   4. LOGIC LOOPS & CONSOLE OUTPUTS
   ========================================== */

// --- HEADING 1: All Courses Report ---
console.log("==================================================");
console.log("📢 ALL COURSES REPORT & DETAILED METRICS:");
console.log("==================================================");

for (let i = 0; i < courseNames.length; i++) {
    const calculatedDays = daysLeft(courseLaunchDates[i]);
    const dynamicLabel = daysLabel(calculatedDays);
    
    console.log(`Course Name: "${courseNames[i]}"`);
    console.log(`Status: [${courseStatuses[i]}]`);
    console.log(`Launch Schedule Info: ${dynamicLabel}`);
    console.log("--------------------------------------------------");
}

// --- HEADING 2: Open Courses Filter Output ---
console.log("\n==================================================");
console.log("🔍 OPEN NOW STATUS FILTER OUTPUT:");
console.log("==================================================");
const openNowList = filterByStatus("Open Now");
console.log("Matching Array Results:", openNowList);

// --- HEADING 3: Upcoming Courses Filter Output ---
console.log("\n==================================================");
console.log("🚀 UPCOMING FUTURE TRACKS LAUNCH LIST:");
console.log("==================================================");

let upcomingFound = false;
for (let i = 0; i < courseNames.length; i++) {
    const targetedDaysFuture = daysLeft(courseLaunchDates[i]);
    // Filters strictly courses with positive future integers (> 0)
    if (targetedDaysFuture > 0) {
        console.log(`• Course: "${courseNames[i]}" | Time Remaining: ${targetedDaysFuture} days`);
        upcomingFound = true;
    }
}
if (!upcomingFound) {
    console.log("No upcoming future courses scheduled at this moment.");
}
console.log("==================================================");