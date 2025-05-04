document.addEventListener('DOMContentLoaded', function() {
    // Load student data if exists
    const studentData = JSON.parse(localStorage.getItem('studentData')) || {};
    if (studentData.name && studentData.rollNo) {
        document.getElementById('name').value = studentData.name;
        document.getElementById('rollNo').value = studentData.rollNo;
    }
    
    // Form submission
    const passForm = document.getElementById('passForm');
    passForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const rollNo = document.getElementById('rollNo').value;
        const department = document.getElementById('department').value;
        const passType = document.getElementById('passType').value;
        const reason = document.getElementById('reason').value;
        const date = document.getElementById('date').value;
        
        // Save student data for future use
        localStorage.setItem('studentData', JSON.stringify({ name, rollNo }));
        
        // Create pass application
        const application = {
            id: Date.now(),
            name,
            rollNo,
            department,
            passType,
            reason,
            date,
            status: 'pending',
            submittedAt: new Date().toISOString()
        };
        
        // Save to localStorage
        let applications = JSON.parse(localStorage.getItem('passApplications')) || [];
        applications.push(application);
        localStorage.setItem('passApplications', JSON.stringify(applications));
        
        // Update UI
        updateStatusMessage(application);
        loadPassHistory();
        
        // Reset form
        passForm.reset();
        document.getElementById('name').value = name;
        document.getElementById('rollNo').value = rollNo;
        
        // Show success message
        alert('Pass application submitted successfully!');
    });
    
    // Load initial data
    loadActiveApplication();
    loadPassHistory();
    
    // Check for updates every 5 seconds
    setInterval(loadActiveApplication, 5000);
});

function loadActiveApplication() {
    const applications = JSON.parse(localStorage.getItem('passApplications')) || [];
    const studentData = JSON.parse(localStorage.getItem('studentData')) || {};
    
    if (!studentData.rollNo) return;
    
    // Find the most recent application for this student
    const studentApplications = applications.filter(app => app.rollNo === studentData.rollNo);
    if (studentApplications.length > 0) {
        const latestApplication = studentApplications.reduce((latest, current) => {
            return new Date(current.submittedAt) > new Date(latest.submittedAt) ? current : latest;
        });
        
        updateStatusMessage(latestApplication);
    } else {
        document.getElementById('statusMessage').textContent = 'No active applications';
        document.getElementById('statusMessage').className = 'status-message';
    }
}

function updateStatusMessage(application) {
    const statusMessage = document.getElementById('statusMessage');
    statusMessage.innerHTML = `
        <h4>${application.passType} Pass - ${application.status.toUpperCase()}</h4>
        <p><strong>Date:</strong> ${formatDate(application.date)}</p>
        <p><strong>Reason:</strong> ${application.reason}</p>
        ${application.status !== 'pending' ? `<p><strong>Processed At:</strong> ${formatDateTime(application.processedAt)}</p>` : ''}
    `;
    statusMessage.className = `status-message ${application.status}`;
}

function loadPassHistory() {
    const applications = JSON.parse(localStorage.getItem('passApplications')) || [];
    const studentData = JSON.parse(localStorage.getItem('studentData')) || {};
    
    if (!studentData.rollNo) return;
    
    const studentApplications = applications.filter(app => app.rollNo === studentData.rollNo)
                                          .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
    
    const historyContainer = document.getElementById('passHistory');
    historyContainer.innerHTML = '';
    
    if (studentApplications.length === 0) {
        historyContainer.innerHTML = '<p>No pass history found</p>';
        return;
    }
    
    studentApplications.forEach(app => {
        const passItem = document.createElement('div');
        passItem.className = `pass-item ${app.status}`;
        passItem.innerHTML = `
            <h4>${app.passType} Pass - ${app.status.toUpperCase()}</h4>
            <p><strong>Date:</strong> ${formatDate(app.date)}</p>
            <p><strong>Reason:</strong> ${app.reason}</p>
            <p><strong>Submitted:</strong> ${formatDateTime(app.submittedAt)}</p>
            ${app.status !== 'pending' ? `<p><strong>Processed:</strong> ${formatDateTime(app.processedAt)}</p>` : ''}
            <p class="date">Application ID: ${app.id}</p>
        `;
        historyContainer.appendChild(passItem);
    });
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

function formatDateTime(dateTimeString) {
    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(dateTimeString).toLocaleDateString(undefined, options);
}