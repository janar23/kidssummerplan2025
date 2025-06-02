// Main application script
document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    let selectedDate = new Date();
    let selectedChild = 'sanha'; // Default to Sanha
    let currentWeek = 1; // Default to first week
    
    // DOM Elements
    const calendarContainer = document.getElementById('calendar-container');
    const currentMonthYearElem = document.getElementById('current-month-year');
    const selectedDateElem = document.getElementById('selected-date');
    const tasksContainer = document.getElementById('tasks-container');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const sanhaBtn = document.getElementById('sanha-btn');
    const sanavBtn = document.getElementById('sanav-btn');
    
    // New week selection elements
    const currentWeekDisplay = document.getElementById('current-week-display');
    const currentWeekProgress = document.getElementById('current-week-progress');
    const selectedChildName = document.getElementById('selected-child-name');
    const prevWeekBtn = document.getElementById('prev-week');
    const nextWeekBtn = document.getElementById('next-week');
    const weekDots = document.querySelectorAll('.week-dot');
    const daysContainer = document.getElementById('days-container');
    
    // Progress tracking elements
    const tasksCompletedElem = document.getElementById('tasks-completed');
    const tasksTotalElem = document.getElementById('tasks-total');
    const overallProgressBar = document.getElementById('overall-progress-bar');
    const achievementEmoji = document.getElementById('achievement-emoji');
    
    // Modal elements
    const modal = document.getElementById('task-details-modal');
    const modalTaskTitle = document.getElementById('modal-task-title');
    const modalTaskDescription = document.getElementById('modal-task-description');
    const modalTaskStatus = document.getElementById('modal-task-status');
    const completeTaskBtn = document.getElementById('complete-task-btn');
    const closeModalBtn = document.querySelector('.close-modal');
    
    // Progress bar elements
    const readingProgressBar = document.getElementById('reading-progress');
    const mathProgressBar = document.getElementById('math-progress');
    const writingProgressBar = document.getElementById('writing-progress');
    const creativeProgressBar = document.getElementById('creative-progress');
    
    // Initialize calendar, tasks, and weekly view
    renderCalendar(currentMonth, currentYear);
    renderTasks(selectedDate);
    renderWeeklyTasks(currentWeek);
    updateProgressBars();
    updateWeeklyProgress();
    
    // Event Listeners
    prevMonthBtn.addEventListener('click', function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentMonth, currentYear);
    });
    
    nextMonthBtn.addEventListener('click', function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentMonth, currentYear);
    });
    
    sanhaBtn.addEventListener('click', function() {
        selectedChild = 'sanha';
        selectedChildName.textContent = 'Sanha';
        sanhaBtn.classList.add('active');
        sanavBtn.classList.remove('active');
        renderCalendar(currentMonth, currentYear);
        renderTasks(selectedDate);
        renderWeeklyTasks(currentWeek);
        updateProgressBars();
        updateWeeklyProgress();
    });
    
    sanavBtn.addEventListener('click', function() {
        selectedChild = 'sanav';
        selectedChildName.textContent = 'Sanav';
        sanavBtn.classList.add('active');
        sanhaBtn.classList.remove('active');
        renderCalendar(currentMonth, currentYear);
        renderTasks(selectedDate);
        renderWeeklyTasks(currentWeek);
        updateProgressBars();
        updateWeeklyProgress();
    });
    
    // Week navigation
    prevWeekBtn.addEventListener('click', function() {
        if (currentWeek > 1) {
            currentWeek--;
            updateWeekDisplay();
            renderWeeklyTasks(currentWeek);
            updateWeeklyProgress();
        }
    });
    
    nextWeekBtn.addEventListener('click', function() {
        if (currentWeek < 8) {
            currentWeek++;
            updateWeekDisplay();
            renderWeeklyTasks(currentWeek);
            updateWeeklyProgress();
        }
    });
    
    // Week dots selection
    weekDots.forEach(dot => {
        dot.addEventListener('click', function() {
            currentWeek = parseInt(this.dataset.week);
            updateWeekDisplay();
            renderWeeklyTasks(currentWeek);
            updateWeeklyProgress();
        });
    });
    
    closeModalBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    completeTaskBtn.addEventListener('click', function() {
        const taskId = completeTaskBtn.getAttribute('data-task-id');
        const taskDate = completeTaskBtn.getAttribute('data-task-date');
        
        if(taskId && taskDate) {
            markTaskComplete(taskId, taskDate);
            modal.style.display = 'none';
            renderTasks(selectedDate);
            renderCalendar(currentMonth, currentYear);
            updateProgressBars();
        }
    });
    
    // Functions
    function renderCalendar(month, year) {
        calendarContainer.innerHTML = '';
        
        currentMonthYearElem.textContent = `${getMonthName(month)} ${year}`;
        
        // Add day names
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayNames.forEach(day => {
            const dayNameElem = document.createElement('div');
            dayNameElem.className = 'day-name';
            dayNameElem.textContent = day;
            calendarContainer.appendChild(dayNameElem);
        });
        
        // Get first day of month and total days
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        // Get previous month's last days
        const prevMonthDays = new Date(year, month, 0).getDate();
        
        // Calendar day grid creation
        let dayCount = 1;
        let nextMonthDay = 1;
        
        for (let i = 0; i < 42; i++) {
            // If we've gone past the number of days in this month
            if (dayCount > daysInMonth) {
                break;
            }
            
            const dayElem = document.createElement('div');
            dayElem.className = 'day';
            
            // Previous month days
            if (i < firstDay) {
                const prevDay = prevMonthDays - (firstDay - i - 1);
                dayElem.innerHTML = `<div class="day-number">${prevDay}</div>`;
                dayElem.classList.add('outside-month');
                
            // Current month days
            } else if (dayCount <= daysInMonth) {
                dayElem.innerHTML = `<div class="day-number">${dayCount}</div>`;
                
                const currentDate = new Date(year, month, dayCount);
                
                // Check if it's today
                if (isToday(currentDate)) {
                    dayElem.classList.add('today');
                }
                
                // Check if it's selected date
                if (isSameDate(currentDate, selectedDate)) {
                    dayElem.classList.add('selected');
                }
                
                // Add task dots for each category
                const taskDots = document.createElement('div');
                taskDots.className = 'task-dots';
                
                // Check if there are tasks for this date
                const dateTasks = getTasksForDate(currentDate);
                const categories = {};
                
                dateTasks.forEach(task => {
                    if (!categories[task.category]) {
                        categories[task.category] = true;
                        const dot = document.createElement('span');
                        dot.className = `task-dot ${task.category}`;
                        taskDots.appendChild(dot);
                    }
                });
                
                dayElem.appendChild(taskDots);
                
                // Add click event to select this date
                dayElem.addEventListener('click', function() {
                    selectedDate = new Date(year, month, dayCount);
                    renderCalendar(month, year);
                    renderTasks(selectedDate);
                });
                
                dayCount++;
                
            // Next month days
            } else {
                dayElem.innerHTML = `<div class="day-number">${nextMonthDay}</div>`;
                dayElem.classList.add('outside-month');
                nextMonthDay++;
            }
            
            calendarContainer.appendChild(dayElem);
        }
    }
    
    function renderTasks(date) {
        // Update the selected date text
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        selectedDateElem.textContent = date.toLocaleDateString('en-US', options);
        
        // Get tasks for the selected date
        const tasks = getTasksForDate(date);
        
        // Clear tasks container
        tasksContainer.innerHTML = '';
        
        if (tasks.length === 0) {
            tasksContainer.innerHTML = '<p class="no-tasks">No tasks scheduled for this day. Take a break and have fun!</p>';
            return;
        }
        
        // Create task cards
        tasks.forEach((task, index) => {
            const taskCard = document.createElement('div');
            
            // Handle both old and new task formats
            let isCompleted = false;
            let taskTitle, taskDescription, taskCategory, taskDuration;
            
            if (task.id) {
                // Old task format
                isCompleted = isTaskCompleted(task.id, formatDate(date));
                taskTitle = task.title;
                taskDescription = task.description;
                taskCategory = task.category;
                taskDuration = task.duration;
            } else {
                // New task format from weekly schedule
                const dayName = date.toString().split(' ')[0]; // Get day name
                // Calculate which week we're in
                const daysSinceSummerStart = Math.floor((date - summerStart) / (1000 * 60 * 60 * 24));
                const weekNumber = Math.floor(daysSinceSummerStart / 7) + 1;
                const taskId = `${selectedChild}-week${weekNumber}-${dayName}-${index}`;
                isCompleted = isWeeklyTaskCompleted(taskId);
                taskTitle = task.task;
                taskDescription = '';
                taskCategory = task.type;
                taskDuration = '';
            }
            
            taskCard.className = `task-card ${isCompleted ? 'completed' : ''}`;
            
            let cardHtml = `<h3><i class="fas fa-${getIconClass(taskCategory)}"></i> ${taskTitle}</h3>`;
            
            if (taskDescription) {
                cardHtml += `<p>${taskDescription}</p>`;
            }
            
            if (taskDuration) {
                cardHtml += `<p><strong>Duration:</strong> ${taskDuration}</p>`;
            }
            
            cardHtml += `<div class="task-category ${taskCategory}">${taskCategory}</div>`;
            
            taskCard.innerHTML = cardHtml;
            
            taskCard.addEventListener('click', function() {
                showTaskModal(task, date);
            });
            
            tasksContainer.appendChild(taskCard);
        });
    }
    
    function getTasksForDate(date) {
        // Check if date is within summer vacation period
        if (date < summerStart || date > summerEnd) {
            return [];
        }
        
        // Get the day of week
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayName = daysOfWeek[date.getDay()];
        
        // If it's Monday-Friday, show the weekly schedule tasks
        if (date.getDay() >= 1 && date.getDay() <= 5) {
            // Calculate which week we're in
            const daysSinceSummerStart = Math.floor((date - summerStart) / (1000 * 60 * 60 * 24));
            const weekNumber = Math.floor(daysSinceSummerStart / 7) + 1;
            
            // Check if this week is in our schedule
            if (weekNumber >= 1 && weekNumber <= 8) {
                // Return tasks for this day from the weekly schedule
                return weeklySchedule[weekNumber][dayName] || [];
            }
        }
        
        // For weekend or fallback, use the old task structure
        const dayOfWeek = date.getDay();
        const schedule = selectedChild === 'sanha' ? sanhaFullSchedule : sanavFullSchedule;
        const tasks = [];
        
        // Add reading tasks
        schedule.reading.forEach(task => {
            if (task.daysOfWeek.includes(dayOfWeek)) {
                tasks.push({...task});
            }
        });
        
        // Add math tasks
        schedule.math.forEach(task => {
            if (task.daysOfWeek.includes(dayOfWeek)) {
                tasks.push({...task});
            }
        });
        
        // Add writing tasks
        schedule.writing.forEach(task => {
            if (task.daysOfWeek.includes(dayOfWeek)) {
                tasks.push({...task});
            }
        });
        
        // Add creative tasks
        schedule.creative.forEach(task => {
            if (task.daysOfWeek.includes(dayOfWeek)) {
                tasks.push({...task});
            }
        });
        
        return tasks;
    }
    
    function showTaskModal(task, date) {
        // For the calendar view
        const taskTitle = task.title || task.task;
        modalTaskTitle.textContent = taskTitle;
        modalTaskDescription.textContent = task.description || '';
        
        // Check if this is a weekly task or calendar task
        let isCompleted;
        if (task.id) {
            // Old task format
            isCompleted = isTaskCompleted(task.id, formatDate(date));
            completeTaskBtn.setAttribute('data-task-id', task.id);
            completeTaskBtn.setAttribute('data-task-date', formatDate(date));
            completeTaskBtn.setAttribute('data-task-type', 'calendar');
        } else {
            // Weekly task format - create a unique ID
            const week = currentWeek;
            const day = date.toString().split(' ')[0]; // Get day name
            const taskIndex = weeklySchedule[week][day].indexOf(task);
            const taskId = `${selectedChild}-week${week}-${day}-${taskIndex}`;
            
            isCompleted = isWeeklyTaskCompleted(taskId);
            completeTaskBtn.setAttribute('data-task-id', taskId);
            completeTaskBtn.setAttribute('data-task-date', formatDate(date));
            completeTaskBtn.setAttribute('data-task-type', 'weekly');
            
            // Check if there's a worksheet for this task
            const worksheetLink = getWorksheetLink(week, task.type, task.task);
            if (worksheetLink) {
                const worksheetButton = document.getElementById('open-worksheet-btn');
                if (worksheetButton) {
                    worksheetButton.style.display = 'block';
                    worksheetButton.onclick = function() {
                        window.open(worksheetLink, '_blank', 'width=800,height=600');
                    };
                } else {
                    const buttonContainer = document.getElementById('modal-buttons');
                    const newWorksheetButton = document.createElement('button');
                    newWorksheetButton.id = 'open-worksheet-btn';
                    newWorksheetButton.className = 'modal-button';
                    newWorksheetButton.innerHTML = '<i class="fas fa-file-alt"></i> Open Worksheet';
                    newWorksheetButton.onclick = function() {
                        window.open(worksheetLink, '_blank', 'width=800,height=600');
                    };
                    buttonContainer.appendChild(newWorksheetButton);
                }
            } else {
                const worksheetButton = document.getElementById('open-worksheet-btn');
                if (worksheetButton) {
                    worksheetButton.style.display = 'none';
                }
            }
        }
        
        if (isCompleted) {
            modalTaskStatus.className = 'task-status completed';
            modalTaskStatus.textContent = 'Completed!';
            completeTaskBtn.style.display = 'none';
        } else {
            modalTaskStatus.className = 'task-status';
            modalTaskStatus.textContent = 'Not completed yet';
            completeTaskBtn.style.display = 'block';
        }
        
        modal.style.display = 'flex';
    }
    
    function markTaskComplete(taskId, dateString) {
        // Find the child's completedTasks array
        const childCompletedTasks = completedTasks[selectedChild];
        
        // Check if this task is already marked complete for this date
        const existingIndex = childCompletedTasks.findIndex(
            task => task.id === taskId && task.date === dateString
        );
        
        if (existingIndex === -1) {
            // Add to completed tasks
            childCompletedTasks.push({
                id: taskId,
                date: dateString
            });
            
            // Save to localStorage
            saveCompletedTasks();
            
            // Update progress indicators
            updateWeeklyProgress();
            updateProgressBars();
        }
    }
    
    function isTaskCompleted(taskId, dateString) {
        return completedTasks[selectedChild].some(
            task => task.id === taskId && task.date === dateString
        );
    }
    
    function renderWeeklyTasks(week) {
        // Clear the days container
        daysContainer.innerHTML = '';
        
        // Get the tasks for the selected week
        const weekSchedule = weeklySchedule[week];
        if (!weekSchedule) return;
        
        // Create a card for each day of the week
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        
        days.forEach(day => {
            if (weekSchedule[day]) {
                const dayCard = document.createElement('div');
                dayCard.className = 'day-card';
                
                // Create day header
                const dayHeader = document.createElement('h3');
                dayHeader.textContent = day;
                dayCard.appendChild(dayHeader);
                
                // Create task list
                const taskList = document.createElement('div');
                taskList.className = 'task-list';
                
                // Add tasks
                weekSchedule[day].forEach((task, index) => {
                    const taskItem = document.createElement('div');
                    taskItem.className = 'task-item';
                    
                    // Create unique ID for this task
                    const taskId = `${selectedChild}-week${week}-${day}-${index}`;
                    
                    // Check if task is completed
                    const isCompleted = isWeeklyTaskCompleted(taskId);
                    if (isCompleted) {
                        taskItem.classList.add('complete');
                    }
                    
                    // Create checkbox
                    const checkbox = document.createElement('div');
                    checkbox.className = `task-checkbox ${isCompleted ? 'checked' : ''}`;
                    if (isCompleted) {
                        checkbox.innerHTML = '<i class="fas fa-check"></i>';
                    }
                    taskItem.appendChild(checkbox);
                    
                    // Create task content
                    const taskContent = document.createElement('div');
                    taskContent.className = 'task-content';
                    
                    // Create task title
                    const taskTitle = document.createElement('div');
                    taskTitle.className = 'task-title';
                    
                    // Add icon based on task type
                    const taskIcon = document.createElement('span');
                    taskIcon.className = `task-icon ${task.type}`;
                    taskIcon.innerHTML = `<i class="fas fa-${getIconClass(task.type)}"></i>`;
                    taskTitle.appendChild(taskIcon);
                    
                    // Add task type label
                    const taskTypeText = document.createElement('span');
                    taskTypeText.textContent = task.type.charAt(0).toUpperCase() + task.type.slice(1);
                    taskTitle.appendChild(taskTypeText);
                    
                    taskContent.appendChild(taskTitle);
                    
                    // Add task description
                    const taskDesc = document.createElement('div');
                    taskDesc.className = 'task-description';
                    taskDesc.textContent = task.task;
                    taskContent.appendChild(taskDesc);
                    
                    // Check if we have a worksheet for this task and add a link
                    const worksheetLink = getWorksheetLink(week, task.type, task.task);
                    if (worksheetLink) {
                        const worksheetButton = document.createElement('button');
                        worksheetButton.className = 'worksheet-button';
                        worksheetButton.innerHTML = '<i class="fas fa-file-alt"></i> Open Worksheet';
                        worksheetButton.addEventListener('click', function(e) {
                            e.stopPropagation(); // Prevent toggling task completion
                            window.open(worksheetLink, '_blank', 'width=800,height=600');
                        });
                        taskContent.appendChild(worksheetButton);
                    }
                    
                    taskItem.appendChild(taskContent);
                    
                    // Add click event to toggle completion
                    taskItem.addEventListener('click', function() {
                        toggleWeeklyTaskCompletion(taskId, taskItem, checkbox);
                    });
                    
                    taskList.appendChild(taskItem);
                });
                
                dayCard.appendChild(taskList);
                daysContainer.appendChild(dayCard);
            }
        });
    }
    
    function isWeeklyTaskCompleted(taskId) {
        return completedTasks[selectedChild].some(task => task.id === taskId);
    }
    
    function toggleWeeklyTaskCompletion(taskId, taskElement, checkbox) {
        const isCompleted = isWeeklyTaskCompleted(taskId);
        
        if (!isCompleted) {
            // Mark as complete
            completedTasks[selectedChild].push({
                id: taskId,
                date: getCurrentDate()
            });
            taskElement.classList.add('complete');
            checkbox.classList.add('checked');
            checkbox.innerHTML = '<i class="fas fa-check"></i>';
        } else {
            // Mark as incomplete
            const taskIndex = completedTasks[selectedChild].findIndex(task => task.id === taskId);
            if (taskIndex !== -1) {
                completedTasks[selectedChild].splice(taskIndex, 1);
            }
            taskElement.classList.remove('complete');
            checkbox.classList.remove('checked');
            checkbox.innerHTML = '';
        }
        
        // Save to localStorage
        saveCompletedTasks();
        
        // Update progress indicators
        updateWeeklyProgress();
        updateProgressBars();
    }
    
    function updateWeekDisplay() {
        // Update week dots
        weekDots.forEach(dot => {
            const dotWeek = parseInt(dot.dataset.week);
            if (dotWeek === currentWeek) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        // Update week text
        currentWeekDisplay.textContent = `Week ${currentWeek} of 8`;
        currentWeekProgress.textContent = `Week ${currentWeek}`;
        
        // Update prev/next buttons
        prevWeekBtn.disabled = (currentWeek === 1);
        nextWeekBtn.disabled = (currentWeek === 8);
    }
    
    function getCurrentDate() {
        const today = new Date();
        return formatDate(today);
    }
    
    function getIconClass(type) {
        switch(type) {
            case 'reading': return 'book';
            case 'math': return 'calculator';
            case 'writing': return 'pen';
            case 'creative': return 'palette';
            default: return 'star';
        }
    }
    
    function updateWeeklyProgress() {
        // Count total tasks for the week
        let totalTasks = 0;
        let completedCount = 0;
        
        const weekSchedule = weeklySchedule[currentWeek];
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        
        days.forEach(day => {
            if (weekSchedule[day]) {
                weekSchedule[day].forEach((task, index) => {
                    totalTasks++;
                    const taskId = `${selectedChild}-week${currentWeek}-${day}-${index}`;
                    if (isWeeklyTaskCompleted(taskId)) {
                        completedCount++;
                    }
                });
            }
        });
        
        // Update statistics
        tasksCompletedElem.textContent = completedCount;
        tasksTotalElem.textContent = totalTasks;
        
        // Calculate percentage
        const percentage = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;
        
        // Update progress bar
        overallProgressBar.style.width = `${percentage}%`;
        overallProgressBar.textContent = `${percentage}%`;
        
        // Update achievement emoji
        if (percentage === 100) {
            achievementEmoji.textContent = '🏆';
        } else if (percentage >= 75) {
            achievementEmoji.textContent = '⭐';
        } else if (percentage >= 50) {
            achievementEmoji.textContent = '👍';
        } else {
            achievementEmoji.textContent = '💪';
        }
    }
    
    function updateProgressBars() {
        const child = selectedChild;
        
        // Calculate progress for each category across all weeks
        let totalReadingTasks = 0;
        let totalMathTasks = 0;
        let totalWritingTasks = 0;
        let totalCreativeTasks = 0;
        
        let completedReading = 0;
        let completedMath = 0;
        let completedWriting = 0;
        let completedCreative = 0;
        
        // Loop through all weeks
        for (let week = 1; week <= 8; week++) {
            const weekSchedule = weeklySchedule[week];
            const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
            
            days.forEach(day => {
                if (weekSchedule[day]) {
                    weekSchedule[day].forEach((task, index) => {
                        // Count by category
                        if (task.type === categories.reading) totalReadingTasks++;
                        else if (task.type === categories.math) totalMathTasks++;
                        else if (task.type === categories.writing) totalWritingTasks++;
                        else if (task.type === categories.creative) totalCreativeTasks++;
                        
                        // Check if completed
                        const taskId = `${child}-week${week}-${day}-${index}`;
                        if (isWeeklyTaskCompleted(taskId)) {
                            if (task.type === categories.reading) completedReading++;
                            else if (task.type === categories.math) completedMath++;
                            else if (task.type === categories.writing) completedWriting++;
                            else if (task.type === categories.creative) completedCreative++;
                        }
                    });
                }
            });
        }
        
        // Calculate percentages
        const readingPercentage = totalReadingTasks > 0 ? Math.round((completedReading / totalReadingTasks) * 100) : 0;
        const mathPercentage = totalMathTasks > 0 ? Math.round((completedMath / totalMathTasks) * 100) : 0;
        const writingPercentage = totalWritingTasks > 0 ? Math.round((completedWriting / totalWritingTasks) * 100) : 0;
        const creativePercentage = totalCreativeTasks > 0 ? Math.round((completedCreative / totalCreativeTasks) * 100) : 0;
        
        // Update progress bars
        readingProgressBar.style.width = `${readingPercentage}%`;
        readingProgressBar.textContent = `${readingPercentage}%`;
        
        mathProgressBar.style.width = `${mathPercentage}%`;
        mathProgressBar.textContent = `${mathPercentage}%`;
        
        writingProgressBar.style.width = `${writingPercentage}%`;
        writingProgressBar.textContent = `${writingPercentage}%`;
        
        creativeProgressBar.style.width = `${creativePercentage}%`;
        creativeProgressBar.textContent = `${creativePercentage}%`;
    }
    
    // Helper Functions
    function getMonthName(month) {
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return monthNames[month];
    }
    
    function isToday(date) {
        const today = new Date();
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
    }
    
    function isSameDate(date1, date2) {
        return date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear();
    }
    
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    function parseDateString(dateString) {
        const [year, month, day] = dateString.split('-').map(Number);
        return new Date(year, month - 1, day);
    }
    
    // Function to map task to worksheet links
    function getWorksheetLink(week, taskType, taskDescription) {
        // Math worksheets
        const mathWorksheets = {
            1: {
                "Addition practice (1-50)": "worksheets/math-week1-addition.html",
                "Subtraction worksheets (20 mins)": "worksheets/math-week1-subtraction.html",
                "Shape identification & drawing": "worksheets/math-week1-shapes.html",
                "Counting games (1-100)": "worksheets/math-week1-counting.html",
                "Simple word problems": "worksheets/math-week1-word-problems.html"
            },
            2: {
                "Subtraction worksheets (20 mins)": "worksheets/math-week2-subtraction.html"
            },
            3: {
                "Double-digit addition": "worksheets/math-week3-double-digit-addition.html"
            },
            4: {
                "Multiplication tables (2,5,10)": "worksheets/math-week4-multiplication.html"
            }
        };
        
        // Writing worksheets
        const writingWorksheets = {
            1: {
                "Write about your weekend (20 mins)": "worksheets/writing-week1-weekend.html"
            },
            2: {
                "Write what you know about robots": "worksheets/writing-week2-robots.html"
            },
            3: {
                "Write a letter to grandparents": "worksheets/writing-week3-letter.html"
            },
            4: {
                "Write about an AI or tech hero": "worksheets/writing-week4-tech-hero.html"
            }
        };
        
        // Check task type and return corresponding worksheet if it exists
        if (taskType === categories.math && mathWorksheets[week]) {
            // Look for a partial match in the task description
            for (const key in mathWorksheets[week]) {
                if (taskDescription.includes(key) || key.includes(taskDescription)) {
                    return mathWorksheets[week][key];
                }
            }
        }
        
        if (taskType === categories.writing && writingWorksheets[week]) {
            // Look for a partial match in the task description
            for (const key in writingWorksheets[week]) {
                if (taskDescription.includes(key) || key.includes(taskDescription)) {
                    return writingWorksheets[week][key];
                }
            }
        }
        
        return null;
    }
});
