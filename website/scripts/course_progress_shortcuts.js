// website/scripts/course_progress_shortcuts.js

const COURSE_PROGRESS_KEY = 'course-progress';

// Get stored progress object or set to default values if missing
function getCourseProgress() {
  const stored = localStorage.getItem(COURSE_PROGRESS_KEY);
  return stored ? JSON.parse(stored) : {
    'course-copy-paste': false,
    'course-undo-redo': false,
    'course-find': false,
    'course-save': false,
    'course-select-all': false,
    'quiz-completed': false
  };
}

// Save the progress object to local storage
function saveCourseProgress(progress) {
  localStorage.setItem(COURSE_PROGRESS_KEY, JSON.stringify(progress));
}

// Mark a course as visited (completed)
function markCourseAsCompleted(courseId) {
  const progress = getCourseProgress();
  progress[courseId] = true;
  saveCourseProgress(progress);
  document.dispatchEvent(new CustomEvent('courseCompleted', {
    detail: { courseId }
  }));
}

// Mark the quiz as completed
function markQuizAsCompleted() {
  markCourseAsCompleted('quiz-completed');
}

// Helper to check if a course is completed
function isCourseCompleted(courseId) {
  const progress = getCourseProgress();
  return !!progress[courseId];
}

// Update the appearance/status of a course card on the Hub page
function updateCourseStatus(courseId) {
  const courseElement = document.getElementById(courseId);
  if (courseElement) {
    if (isCourseCompleted(courseId)) {
      courseElement.classList.add('completed');
    } else {
      courseElement.classList.remove('completed');
    }
  }
}

// Check all courses and update their UI status on the Hub page
function checkAndMarkCompletedCourses() {
  const courses = [
    'course-copy-paste',
    'course-undo-redo',
    'course-find',
    'course-save',
    'course-select-all',
    'quiz-completed'
  ];
  courses.forEach(courseId => {
    if (isCourseCompleted(courseId)) {
      updateCourseStatus(courseId);
    }
  });
}

// Update text status indicators in the Hub page
function updateStatus() {
  console.log()
}

// Listen for DOMContentLoaded to ensure elements are ready
document.addEventListener('DOMContentLoaded', () => {
  updateStatus();
  checkAndMarkCompletedCourses();

  document.addEventListener('courseCompleted', (event) => {
    console.log('Course completed event received:', event.detail.courseId);
    updateStatus();
  });
});