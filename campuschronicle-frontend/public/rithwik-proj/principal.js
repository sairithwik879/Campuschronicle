document.addEventListener('DOMContentLoaded', function() {
    // Load initial data
    loadPendingRequests();
    loadApprovalHistory();
    loadStudentFilterOptions();
    
    // Set up filter
    document.getElementById('applyFilter').addEventListener('click', applyFilters);
    
    // Check for new requests every 5 seconds
    setInterval(loadPendingRequests, 5000);
});

function loadPendingRequests() {
    const applications = JSON.parse(localStorage.getItem('passApplications')) || [];
    const pendingRequests = applications.filter(app => app.status === 'pending')
                                     .sort((a, b) => new Date(a.submittedAt) - new Date(b.submittedAt));
    
    const requestsContainer = document.getElementById('pendingRequests');
    requestsContainer.innerHTML = '';
    
    // Update notification badge
    const notificationBadge = document.getElementById('notification-badge');
    if (pendingRequests.length > 0) {
        notificationBadge.textContent = pendingRequests.length;
        notificationBadge.classList.remove('hidden');
    } else {
        notificationBadge.classList.add('hidden');
        requestsContainer.innerHTML = '<p>No pending pass requests</p>';
        return;
    }
    
    pendingRequests.forEach(request => {
        const requestItem = document.createElement('div');
        requestItem.className = 'request-item pending';
        requestItem.innerHTML = `
            <h4>${request.name} (${request.rollNo})</h4>
            <p><strong>Department:</strong> ${request.department}</p>
            <p><strong>Pass Type:</strong> ${request.passType}</p>
            <p><strong>Date:</strong> ${formatDate(request.date)}</p>
            <p><strong>Reason:</strong> ${request.reason}</p>
            <p class="date">Submitted: ${formatDateTime(request.submittedAt)}</p>
            <div class="action-buttons">
                <button class="btn btn-approve" data-id="${request.id}">Approve</button>
                <button class="btn btn-reject" data-id="${request.id}">Reject</button>
            </div>
        `;
        requestsContainer.appendChild(requestItem);
    });
    
    // Add event listeners to action buttons
    document.querySelectorAll('.btn-approve').forEach(btn => {
        btn.addEventListener('click', function() {
            processApplication(this.dataset.id, 'approved');
        });
    });
    
    document.querySelectorAll('.btn-reject').forEach(btn => {
        btn.addEventListener('click', function() {
            processApplication(this.dataset.id, 'rejected');
        });
    });
}

function loadApprovalHistory() {
    const applications = JSON.parse(localStorage.getItem('passApplications')) || [];
    const processedApplications = applications.filter(app => app.status !== 'pending')
                                           .sort((a, b) => new Date(b.processedAt) - new Date(a.processedAt));
    
    const historyContainer = document.getElementById('approvalHistory');
    historyContainer.innerHTML = '';
    
    if (processedApplications.length === 0) {
        historyContainer.innerHTML = '<p>No approval history found</p>';
        return;
    }
    
    processedApplications.forEach(app => {
        const historyItem = document.createElement('div');
        historyItem.className = `pass-item ${app.status}`;
        historyItem.innerHTML = `
            <h4>${app.name} (${app.rollNo})</h4>
            <p><strong>Pass Type:</strong> ${app.passType}</p>
            <p><strong>Date:</strong> ${formatDate(app.date)}</p>
            <p><strong>Reason:</strong> ${app.reason}</p>
            <p><strong>Status:</strong> ${app.status.toUpperCase()}</p>
            <p><strong>Submitted:</strong> ${formatDateTime(app.submittedAt)}</p>
            <p><strong>Processed:</strong> ${formatDateTime(app.processedAt)}</p>
            <p class="date">Application ID: ${app.id}</p>
        `;
        historyContainer.appendChild(historyItem);
    });
}

function loadStudentFilterOptions() {
    const applications = JSON.parse(localStorage.getItem('passApplications')) || [];
    const students = [...new Set(applications.map(app => `${app.name} (${app.rollNo})`))];
    
    const studentFilter = document.getElementById('filterStudent');
    students.forEach(student => {
        const option = document.createElement('option');
        option.value = student;
        option.textContent = student;
        studentFilter.appendChild(option);
    });
}

function applyFilters() {
    const studentFilter = document.getElementById('filterStudent').value;
    const statusFilter = document.getElementById('filterStatus').value;
    
    const applications = JSON.parse(localStorage.getItem('passApplications')) || [];
    let filteredApplications = applications.filter(app => app.status !== 'pending');
    
    if (studentFilter) {
        const rollNo = studentFilter.match(/\((.+)\)/)[1];
        filteredApplications = filteredApplications.filter(app => app.rollNo === rollNo);
    }
    
    if (statusFilter) {
        filteredApplications = filteredApplications.filter(app => app.status === statusFilter);
    }
    
    const historyContainer = document.getElementById('approvalHistory');
    historyContainer.innerHTML = '';
    
    if (filteredApplications.length === 0) {
        historyContainer.innerHTML = '<p>No matching records found</p>';
        return;
    }
    
    filteredApplications.forEach(app => {
        const historyItem = document.createElement('div');
        historyItem.className = `pass-item ${app.status}`;
        historyItem.innerHTML = `
            <h4>${app.name} (${app.rollNo})</h4>
            <p><strong>Pass Type:</strong> ${app.passType}</p>
            <p><strong>Date:</strong> ${formatDate(app.date)}</p>
            <p><strong>Reason:</strong> ${app.reason}</p>
            <p><strong>Status:</strong> ${app.status.toUpperCase()}</p>
            <p><strong>Submitted:</strong> ${formatDateTime(app.submittedAt)}</p>
            <p><strong>Processed:</strong> ${formatDateTime(app.processedAt)}</p>
            <p class="date">Application ID: ${app.id}</p>
        `;
        historyContainer.appendChild(historyItem);
    });
}

function processApplication(id, status) {
    const applications = JSON.parse(localStorage.getItem('passApplications')) || [];
    const applicationIndex = applications.findIndex(app => app.id == id);
    
    if (applicationIndex !== -1) {
        applications[applicationIndex].status = status;
        applications[applicationIndex].processedAt = new Date().toISOString();
        localStorage.setItem('passApplications', JSON.stringify(applications));
        
        // Reload data
        loadPendingRequests();
        loadApprovalHistory();
    }
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