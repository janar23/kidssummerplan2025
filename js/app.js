// Main application script
document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    let selectedChild = 'sanha'; // Default to Sanha
    let currentWeek = 1; // Default to first week
    
    // DOM Elements
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
    
    // Initialize weekly view
    renderWeeklyTasks(currentWeek);
    updateWeekDisplay();
    updateProgressBars();
    updateWeeklyProgress();
    
    // Event Listeners
    sanhaBtn.addEventListener('click', function() {
        selectedChild = 'sanha';
        selectedChildName.textContent = 'Sanha';
        sanhaBtn.classList.add('active');
        sanavBtn.classList.remove('active');
        renderWeeklyTasks(currentWeek);
        updateProgressBars();
        updateWeeklyProgress();
    });
    
    sanavBtn.addEventListener('click', function() {
        selectedChild = 'sanav';
        selectedChildName.textContent = 'Sanav';
        sanavBtn.classList.add('active');
        sanhaBtn.classList.remove('active');
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
    
    // Function to hide the modal and reset its content
    function hideModal() {
        modal.style.display = 'none';
        const printPrepBtn = document.getElementById('print-prep-btn');
        if (printPrepBtn) {
            printPrepBtn.style.display = 'none';
        }
        // Make sure task completion button is in a normal state for next use
        completeTaskBtn.style.display = 'block';
        modalTaskStatus.style.display = 'block';
    }
    
    closeModalBtn.addEventListener('click', hideModal);
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            hideModal();
        }
    });
    
    completeTaskBtn.addEventListener('click', function() {
        const taskId = completeTaskBtn.getAttribute('data-task-id');
        const taskDate = completeTaskBtn.getAttribute('data-task-date');
        
        if(taskId && taskDate) {
            markTaskComplete(taskId, taskDate);
            modal.style.display = 'none';
            renderWeeklyTasks(currentWeek);
            updateProgressBars();
        }
    });
    
    // Functions
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
                const dayHeaderContainer = document.createElement('div');
                dayHeaderContainer.className = 'day-header-container';
                
                const dayHeader = document.createElement('h3');
                dayHeader.textContent = day;
                dayHeaderContainer.appendChild(dayHeader);
                
                // Create parent preparation button
                const prepButton = document.createElement('button');
                prepButton.className = 'parent-prep-button';
                prepButton.innerHTML = '<i class="fas fa-clipboard-list"></i> Prep';
                prepButton.addEventListener('click', function() {
                    showParentPreparationModal(day, week);
                });
                dayHeaderContainer.appendChild(prepButton);
                
                dayCard.appendChild(dayHeaderContainer);
                
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
                            // Add the selected child's name as a URL parameter
                            const worksheetUrl = `${worksheetLink}?child=${selectedChild}`;
                            window.open(worksheetUrl, '_blank', 'width=800,height=600');
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
                        const worksheetUrl = `${worksheetLink}?child=${selectedChild}`;
                        window.open(worksheetUrl, '_blank', 'width=800,height=600');
                    };
                } else {
                    const buttonContainer = document.getElementById('modal-buttons');
                    const newWorksheetButton = document.createElement('button');
                    newWorksheetButton.id = 'open-worksheet-btn';
                    newWorksheetButton.className = 'modal-button';
                    newWorksheetButton.innerHTML = '<i class="fas fa-file-alt"></i> Open Worksheet';
                    newWorksheetButton.onclick = function() {
                        const worksheetUrl = `${worksheetLink}?child=${selectedChild}`;
                        window.open(worksheetUrl, '_blank', 'width=800,height=600');
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
                "Skip counting by 2s, 5s, 10s": "worksheets/math-week2-skip-counting.html",
                "Measurement with rulers": "worksheets/math-week2-measurement.html",
                "Time telling practice": "worksheets/math-week2-time-telling.html",
                "Pattern recognition games": "worksheets/math-week2-pattern-recognition.html",
                "Money counting practice": "worksheets/math-week2-money-counting.html",
                "Subtraction worksheets (20 mins)": "worksheets/math-week2-subtraction.html"
            },
            3: {
                "Double-digit addition": "worksheets/math-week3-double-digit-addition.html",
                "Geometry shapes & properties": "worksheets/math-week3-geometry-shapes.html",
                "Graphing favorite colors/foods": "worksheets/math-week3-graphing.html",
                "Fractions with pizza/pies": "worksheets/math-week3-fractions.html",
                "Estimation games": "worksheets/math-week3-estimation.html"
            },
            4: {
                "Multiplication tables (2,5,10)": "worksheets/math-week4-multiplication.html",
                "Calendar math activities": "worksheets/math-week4-calendar-activities.html",
                "Division intro with objects": "worksheets/math-week4-division-intro.html",
                "Place value games": "worksheets/math-week4-place-value.html",
                "Problem solving challenges": "worksheets/math-week4-problem-solving.html"
            },
            5: {
                "Mental math strategies": "worksheets/math-week5-mental-math.html",
                "Measurement cooking project": "worksheets/math-week5-measurement-cooking.html",
                "Symmetry in nature": "worksheets/math-week5-symmetry.html",
                "Number line activities": "worksheets/math-week5-number-line.html",
                "Data collection & sorting": "worksheets/math-week5-data-collection.html"
            },
            6: {
                "Currency from different countries": "worksheets/math-week6-currency.html",
                "Shopping math scenarios": "worksheets/math-week6-shopping.html",
                "Temperature tracking graphs": "worksheets/math-week6-temperature.html",
                "Patterns AI might recognize (dice/coins)": "worksheets/math-week6-patterns.html",
                "Sports statistics simple analysis": "worksheets/math-week6-sports-stats.html"
            },
            7: {
                "Create patterns AI could recognize": "worksheets/math-week7-ai-patterns.html",
                "Measuring garden/outdoor spaces": "worksheets/math-week7-garden-measurement.html",
                "Patterns AI uses in music and art": "worksheets/math-week7-music-art-patterns.html",
                "Architecture & building math": "worksheets/math-week7-architecture.html",
                "Distance and speed concepts for robots": "worksheets/math-week7-distance-speed.html"
            },
            8: {
                "Solve real problems with simple algorithms": "worksheets/math-week8-algorithms.html",
                "Review all math concepts": "worksheets/math-week8-review.html",
                "Teach a simple algorithm to family": "worksheets/math-week8-teach-algorithm.html",
                "AI-style pattern recognition games": "worksheets/math-week8-pattern-recognition.html",
                "Calculate and graph your AI learning": "worksheets/math-week8-learning-graph.html"
            }
        };
        
        // Writing worksheets
        const writingWorksheets = {
            1: {
                "Write about your weekend (20 mins)": "worksheets/writing-week1-weekend.html",
                "Write a letter to grandparents": "worksheets/writing-week1-letter.html"
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
        
        // Reading worksheets/activities
        const readingWorksheets = {
            1: {
                "Comic book reading (20 mins)": "storybook/honesty-story.html"
            }
        };
        
        // Creative worksheets
        const creativeWorksheets = {
            1: {
                "Origami animals": "worksheets/creative-week1-origami.html",
                "Finger painting": "worksheets/creative-week1-finger-painting.html"
            },
            7: {
                "Design a self-driving vehicle": "worksheets/creative-week7-friday.html"
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
        
        if (taskType === categories.reading && readingWorksheets[week]) {
            // Look for a partial match in the task description
            for (const key in readingWorksheets[week]) {
                if (taskDescription.includes(key) || key.includes(taskDescription)) {
                    return readingWorksheets[week][key];
                }
            }
        }
        
        if (taskType === categories.creative && creativeWorksheets[week]) {
            // Look for a partial match in the task description
            for (const key in creativeWorksheets[week]) {
                if (taskDescription.includes(key) || key.includes(taskDescription)) {
                    return creativeWorksheets[week][key];
                }
            }
        }
        
        return null;
    }
});
