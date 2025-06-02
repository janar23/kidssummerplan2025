// Parent preparation modal functionality
window.showParentPreparationModal = function(dayName, weekNumber) {
    // Get DOM elements needed for the modal
    const modal = document.getElementById('task-details-modal');
    const modalTaskTitle = document.getElementById('modal-task-title');
    const modalTaskDescription = document.getElementById('modal-task-description');
    const modalTaskStatus = document.getElementById('modal-task-status');
    const completeTaskBtn = document.getElementById('complete-task-btn');
    
    // Get tasks for this day
    const tasks = weeklySchedule[weekNumber][dayName];
    if (!tasks || tasks.length === 0) return;
    
    // Create a complete materials list
    const allMaterials = new Set();
    const adviceByTask = [];
    
    // Gather all materials and advice
    tasks.forEach(task => {
        const taskType = task.type; // reading, math, writing, creative
        const taskName = task.task;
        
        // Check if this task has preparation details
        if (taskPreparations[taskType] && taskPreparations[taskType][taskName]) {
            const prep = taskPreparations[taskType][taskName];
            
            // Add materials to the set (to avoid duplicates)
            prep.materials.forEach(material => allMaterials.add(material));
            
            // Add advice for this task
            adviceByTask.push({
                task: taskName,
                type: taskType,
                advice: prep.advice
            });
        }
    });
    
    // Convert set to sorted array
    const sortedMaterials = [...allMaterials].sort();
    
    // Update modal content
    modalTaskTitle.textContent = `Parent Preparation for ${dayName}`;
    
    // Create content for the modal
    let contentHtml = '';
    
    // Materials section
    contentHtml += '<div class="preparation-section">';
    contentHtml += '<h4><i class="fas fa-shopping-basket"></i> Materials Needed:</h4>';
    contentHtml += '<ul class="materials-list">';
    
    if (sortedMaterials.length > 0) {
        sortedMaterials.forEach(material => {
            contentHtml += `<li><input type="checkbox" id="material-${material.replace(/[^a-zA-Z0-9]/g, '')}" class="prep-checkbox"><label for="material-${material.replace(/[^a-zA-Z0-9]/g, '')}">${material}</label></li>`;
        });
    } else {
        contentHtml += '<li>No special materials required for this day\'s tasks.</li>';
    }
    
    contentHtml += '</ul></div>';
    
    // Advice section
    if (adviceByTask.length > 0) {
        contentHtml += '<div class="preparation-section">';
        contentHtml += '<h4><i class="fas fa-lightbulb"></i> Preparation Tips:</h4>';
        contentHtml += '<ul class="advice-list">';
        
        adviceByTask.forEach(item => {
            contentHtml += `<li><strong>${item.task}</strong>: ${item.advice}</li>`;
        });
        
        contentHtml += '</ul></div>';
    }
    
    modalTaskDescription.innerHTML = contentHtml;
    modalTaskStatus.style.display = 'none';
    completeTaskBtn.style.display = 'none';
    
    // Create print button if it doesn't exist
    let printPrepBtn = document.getElementById('print-prep-btn');
    if (!printPrepBtn) {
        printPrepBtn = document.createElement('button');
        printPrepBtn.id = 'print-prep-btn';
        printPrepBtn.className = 'modal-button';
        printPrepBtn.innerHTML = '<i class="fas fa-print"></i> Print Preparation List';
        const modalButtons = document.getElementById('modal-buttons');
        modalButtons.appendChild(printPrepBtn);
    }
    
    // Show print button
    printPrepBtn.style.display = 'inline-block';
    printPrepBtn.onclick = function() {
        // Print only the relevant content
        const content = document.createElement('div');
        content.innerHTML = `
            <h1 style="text-align: center;">Parent Preparation for ${dayName}, Week ${weekNumber}</h1>
            ${contentHtml}
        `;
        
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Parent Preparation List</title>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; }
                    h1 { color: #ff7e5f; }
                    h4 { color: #ff7e5f; margin-top: 20px; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
                    ul { padding-left: 20px; }
                    li { margin-bottom: 10px; }
                    .materials-list li, .advice-list li { page-break-inside: avoid; }
                    .preparation-section { margin-bottom: 20px; }
                </style>
            </head>
            <body>
                ${content.innerHTML}
            </body>
            </html>
        `);
        
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 250);
    };
    
    // Show the modal
    modal.style.display = 'flex';
};
