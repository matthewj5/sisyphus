// Application state
let timerInterval = null;
let tasks = [];
let currentTaskIndex = -1;
let timeRemaining = 0;
let timerStarted = false;
let questionnaireCompleted = false;

// Questionnaire state
let currentSectionIndex = 0;
let formResponses = {};

// Page navigation
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.add('hidden'));

    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.remove('hidden');
    }
}

// Questionnaire functions
function renderQuestionnaireSection() {
    const section = questionnaireData.sections[currentSectionIndex];
    const content = document.getElementById('questionnaireContent');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    // Update progress
    const progress = ((currentSectionIndex + 1) / questionnaireData.sections.length) * 100;
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `Section ${currentSectionIndex + 1} of ${questionnaireData.sections.length}`;
    
    // Render section
    content.innerHTML = `
        <div class="section-container">
            <h3 class="section-title">${section.title}</h3>
            <div class="questions-container">
                ${section.questions.map(q => renderQuestion(q, section.id)).join('')}
            </div>
        </div>
    `;
    
    // Restore previous answers if any
    section.questions.forEach(q => {
        const key = `${section.id}_${q.id}`;
        if (formResponses[key]) {
            const input = document.getElementById(key);
            if (input) input.value = formResponses[key];
        }
    });
    
    // Update navigation buttons
    updateNavigationButtons();
}

function renderQuestion(question, sectionId) {
    const fieldId = `${sectionId}_${question.id}`;
    const required = question.required ? 'required' : '';
    
    let inputHTML = '';
    if (question.type === 'textarea') {
        inputHTML = `<textarea 
            id="${fieldId}" 
            name="${fieldId}" 
            class="form-input textarea" 
            placeholder="Be honest... we already know anyway"
            ${required}></textarea>`;
    } else if (question.type === 'select' && question.options) {
        inputHTML = `<select id="${fieldId}" name="${fieldId}" class="form-input" ${required}>
            <option value="">Choose your fate...</option>
            ${question.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
        </select>`;
    } else {
        inputHTML = `<input 
            type="${question.type || 'text'}" 
            id="${fieldId}" 
            name="${fieldId}" 
            class="form-input" 
            ${question.pattern ? `pattern="${question.pattern}"` : ''}
            ${required}>`;
    }
    
    return `
        <div class="form-group">
            <label for="${fieldId}" class="form-label">
                ${question.label}
                ${question.required ? '<span class="required">*</span>' : ''}
            </label>
            ${inputHTML}
        </div>
    `;
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevSection');
    const nextBtn = document.getElementById('nextSection');
    const submitBtn = document.getElementById('submitForm');
    
    // Show/hide previous button
    if (currentSectionIndex === 0) {
        prevBtn.classList.add('hidden');
    } else {
        prevBtn.classList.remove('hidden');
    }
    
    // Show next or submit button
    if (currentSectionIndex === questionnaireData.sections.length - 1) {
        nextBtn.classList.add('hidden');
        submitBtn.classList.remove('hidden');
        // Show disclaimer on last section
        showDisclaimer();
    } else {
        nextBtn.classList.remove('hidden');
        submitBtn.classList.add('hidden');
    }
}

function saveCurrentSection() {
    const section = questionnaireData.sections[currentSectionIndex];
    section.questions.forEach(q => {
        const key = `${section.id}_${q.id}`;
        const input = document.getElementById(key);
        if (input) {
            formResponses[key] = input.value;
        }
    });
}

function validateCurrentSection() {
    const section = questionnaireData.sections[currentSectionIndex];
    let isValid = true;
    
    section.questions.forEach(q => {
        if (q.required) {
            const key = `${section.id}_${q.id}`;
            const input = document.getElementById(key);
            if (!input || !input.value.trim()) {
                isValid = false;
                input?.classList.add('error');
            } else {
                input?.classList.remove('error');
            }
        }
    });
    
    return isValid;
}

function showDisclaimer() {
    const disclaimerDiv = document.getElementById('disclaimer');
    const disclaimer = questionnaireData.disclaimer;
    
    disclaimerDiv.innerHTML = `
        <h4>${disclaimer.title}</h4>
        <p>${disclaimer.text}</p>
        <ul class="disclaimer-list">
            ${disclaimer.terms.map(term => `<li>✓ ${term}</li>`).join('')}
        </ul>
        <div class="disclaimer-footer">
            <p><strong>Privacy Policy:</strong> ${disclaimer.privacyPolicy}</p>
            <p><strong>Data Retention:</strong> ${disclaimer.dataRetention}</p>
            <p class="warning">${disclaimer.warning}</p>
        </div>
    `;
    disclaimerDiv.classList.remove('hidden');
}

function nextSection() {
    if (validateCurrentSection()) {
        saveCurrentSection();
        if (currentSectionIndex < questionnaireData.sections.length - 1) {
            currentSectionIndex++;
            renderQuestionnaireSection();
            window.scrollTo(0, 0);
        }
    } else {
        alert('Please fill in all required fields before proceeding. We need ALL your secrets.');
    }
}

function previousSection() {
    saveCurrentSection();
    if (currentSectionIndex > 0) {
        currentSectionIndex--;
        renderQuestionnaireSection();
        window.scrollTo(0, 0);
    }
}

// Timer functions
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function parseTimeInput(timeString) {
    // Remove any non-digit or colon characters
    const cleaned = timeString.replace(/[^\d:]/g, '');
    const parts = cleaned.split(':');
    
    if (parts.length !== 2) return null;
    
    const mins = parseInt(parts[0]) || 0;
    const secs = parseInt(parts[1]) || 0;
    
    if (mins < 0 || mins > 999 || secs < 0 || secs > 59) return null;
    
    return (mins * 60) + secs;
}

function updateTimerDisplay() {
    const timerValue = document.getElementById('timerValue');
    timerValue.value = formatTime(timeRemaining);

    // Add warning class when time is running low
    if (timeRemaining <= 30 && timeRemaining > 0) {
        timerValue.classList.add('timer-warning');
    } else {
        timerValue.classList.remove('timer-warning');
    }
}

function startTimer() {
    if (timerInterval) return; // Already running
    
    timerStarted = true;
    
    // Hide add task section, show running section
    document.getElementById('addTaskSection').classList.add('hidden');
    document.getElementById('timerRunningSection').classList.remove('hidden');

    timerInterval = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();

        if (timeRemaining <= 0) {
            // Current task finished
            completeCurrentTask();
            advanceToNextTask();
        }
    }, 1000);
}

function completeCurrentTask() {
    if (currentTaskIndex >= 0 && currentTaskIndex < tasks.length) {
        tasks[currentTaskIndex].completed = true;
        renderTasks();
    }
}

function advanceToNextTask() {
    currentTaskIndex++;
    
    if (currentTaskIndex >= tasks.length) {
        // All tasks completed!
        clearInterval(timerInterval);
        timerInterval = null;
        alert('🎉 Congratulations! All tasks completed! The boulder has reached the top!');
        resetToTaskEntry();
        return;
    }
    
    // Start next task
    const nextTask = tasks[currentTaskIndex];
    timeRemaining = nextTask.duration;
    updateTimerDisplay();
    updateCurrentTaskDisplay();
}

function skipCurrentTask() {
    if (currentTaskIndex >= 0 && currentTaskIndex < tasks.length) {
        completeCurrentTask();
        advanceToNextTask();
    }
}

function updateCurrentTaskDisplay() {
    const currentTaskName = document.getElementById('currentTaskName');
    if (currentTaskIndex >= 0 && currentTaskIndex < tasks.length) {
        currentTaskName.textContent = `Current: ${tasks[currentTaskIndex].text}`;
    } else {
        currentTaskName.textContent = 'No task selected';
    }
}

function resetToTaskEntry() {
    // Clear interval if running
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    // Reset state
    tasks = [];
    currentTaskIndex = -1;
    timeRemaining = 0;
    timerStarted = false;
    
    // Show add task section, hide running section
    document.getElementById('addTaskSection').classList.remove('hidden');
    document.getElementById('timerRunningSection').classList.add('hidden');
    document.getElementById('startAllBtn').classList.add('hidden');
    
    // Reset display
    updateTimerDisplay();
    updateCurrentTaskDisplay();
    renderTasks();
}

// Task functions
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const durationInput = document.getElementById('taskDuration');
    const taskText = taskInput.value.trim();
    const durationText = durationInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task name.');
        return;
    }
    
    if (durationText === '') {
        alert('Please enter a duration (MM:SS).');
        return;
    }
    
    const duration = parseTimeInput(durationText);
    if (duration === null || duration <= 0) {
        alert('Invalid duration. Please use MM:SS format (e.g., 05:00).');
        return;
    }

    tasks.push({
        id: Date.now(),
        text: taskText,
        duration: duration,
        completed: false
    });

    taskInput.value = '';
    durationInput.value = '';
    renderTasks();
    
    // Show start button if we have tasks
    if (tasks.length > 0) {
        document.getElementById('startAllBtn').classList.remove('hidden');
        document.getElementById('noTasksMessage').classList.add('hidden');
    }
}

function deleteTask(taskId) {
    if (timerStarted) {
        alert('Cannot delete tasks while timer is running!');
        return;
    }
    
    tasks = tasks.filter(t => t.id !== taskId);
    renderTasks();
    
    // Hide start button if no tasks
    if (tasks.length === 0) {
        document.getElementById('startAllBtn').classList.add('hidden');
        document.getElementById('noTasksMessage').classList.remove('hidden');
    }
}

function renderTasks() {
    const tasksList = document.getElementById('tasksList');

    if (tasks.length === 0) {
        tasksList.innerHTML = '';
        return;
    }

    tasksList.innerHTML = tasks.map((task, index) => `
        <li class="task-item ${task.completed ? 'completed' : ''} ${index === currentTaskIndex ? 'current' : ''}">
            <span class="task-number">${index + 1}.</span>
            <span class="task-text">${task.text}</span>
            <span class="task-duration">${formatTime(task.duration)}</span>
            ${!timerStarted ? `<button class="btn-delete" onclick="deleteTask(${task.id})">Delete</button>` : ''}
            ${task.completed ? '<span class="task-status">✓</span>' : ''}
            ${index === currentTaskIndex && timerStarted ? '<span class="task-status">▶</span>' : ''}
        </li>
    `).join('');
}

// Hell page function
function goToHell(message) {
    const hellMessage = document.getElementById('hellMessage');
    hellMessage.textContent = message;
    showPage('hellPage');
}

// Restart the application
function restart() {
    // Reset all state
    resetToTaskEntry();

    // Skip questionnaire if already completed, go directly to timer
    if (questionnaireCompleted) {
        showPage('timerPage');
    } else {
        currentSectionIndex = 0;
        formResponses = {};
        
        // Hide disclaimer
        const disclaimerDiv = document.getElementById('disclaimer');
        if (disclaimerDiv) {
            disclaimerDiv.classList.add('hidden');
        }
        
        // Re-render questionnaire from beginning
        renderQuestionnaireSection();
        showPage('questionnairePage');
    }
}

function startAllTasks() {
    if (tasks.length === 0) {
        alert('Please add at least one task before starting!');
        return;
    }
    
    // Start with first task
    currentTaskIndex = 0;
    timeRemaining = tasks[0].duration;
    updateTimerDisplay();
    updateCurrentTaskDisplay();
    startTimer();
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize questionnaire
    renderQuestionnaireSection();
    
    // Questionnaire navigation
    document.getElementById('nextSection').addEventListener('click', nextSection);
    document.getElementById('prevSection').addEventListener('click', previousSection);
    
    // Questionnaire form submission
    const questionnaireForm = document.getElementById('questionnaireForm');
    questionnaireForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateCurrentSection()) {
            saveCurrentSection();
            console.log('User completed the descent into madness:', formResponses);
            
            // Show a dramatic message before proceeding
            const confirmed = confirm('By submitting this form, you acknowledge that your soul is now property of Sisyphus Inc. Your exes have been notified. Proceed?');
            if (confirmed) {
                questionnaireCompleted = true; // Mark questionnaire as completed
                showPage('timerPage');
            }
        } else {
            alert('You must complete ALL fields. Your secrets are required for the boulder-pushing ceremony.');
        }
    });

    // Task management
    document.getElementById('addTaskBtn').addEventListener('click', addTask);
    document.getElementById('taskInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('taskDuration').focus();
        }
    });
    document.getElementById('taskDuration').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTask();
        }
    });
    
    // Start all tasks button
    document.getElementById('startAllBtn').addEventListener('click', startAllTasks);
    
    // Skip task button
    document.getElementById('skipTaskBtn').addEventListener('click', skipCurrentTask);

    // Navigate to camera page
    document.getElementById('goToCameraBtn').addEventListener('click', () => {
        showPage('cameraPage');
    });

    // Camera validation buttons
    document.getElementById('cameraSuccessBtn').addEventListener('click', () => {
        showPage('timerPage');
    });

    document.getElementById('cameraFailBtn').addEventListener('click', () => {
        goToHell('Camera validation failed! You cannot continue without proper surveillance.');
    });

    // Restart button
    document.getElementById('restartBtn').addEventListener('click', restart);

    // Initialize
    showPage('questionnairePage');
    renderTasks();
});
