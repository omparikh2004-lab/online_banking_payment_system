// ============================================================
// SECUREBANK - MODERN ONLINE BANKING SYSTEM
// Complete JavaScript Functionality
// ============================================================

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
    updateDate();
    loadDashboardStats();
});

// ===== LOADING OVERLAY =====
function showLoading() {
    document.getElementById('loading-overlay').classList.add('active');
}

function hideLoading() {
    document.getElementById('loading-overlay').classList.remove('active');
}

// ===== NOTIFICATIONS =====
function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    const messageEl = document.getElementById('notification-message');
    
    notification.className = 'notification';
    if (type === 'success') {
        notification.classList.add('success');
    } else if (type === 'error') {
        notification.classList.add('error');
    }
    
    messageEl.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3500);
}

// ===== AUTHENTICATION =====
function checkLoginStatus() {
    const user = localStorage.getItem('loggedInUser');
    if (user) {
        document.getElementById('register').style.display = 'none';
        document.getElementById('login').style.display = 'none';
        document.getElementById('forgot-password').style.display = 'none';
        document.getElementById('main-content').style.display = 'flex';
        document.getElementById('user-name-display').textContent = user;
        document.getElementById('user-name').textContent = user;
        showSection('dashboard');
        loadDashboardStats();
    }
}

function showRegister(e) {
    if (e) e.preventDefault();
    document.getElementById('register').style.display = 'flex';
    document.getElementById('login').style.display = 'none';
    document.getElementById('forgot-password').style.display = 'none';
}

function showLogin(e) {
    if (e) e.preventDefault();
    document.getElementById('login').style.display = 'flex';
    document.getElementById('register').style.display = 'none';
    document.getElementById('forgot-password').style.display = 'none';
    document.getElementById('login-error').textContent = '';
}

function showForgotPassword(e) {
    if (e) e.preventDefault();
    document.getElementById('forgot-password').style.display = 'flex';
    document.getElementById('login').style.display = 'none';
}

function register() {
    try {
        const fullname = document.getElementById('new-fullname').value.trim();
        const username = document.getElementById('new-username').value.trim();
        const email = document.getElementById('new-email').value.trim();
        const password = document.getElementById('new-password').value.trim();
        const confirmPassword = document.getElementById('confirm-password').value.trim();

        if (!fullname || !username || !email || !password || !confirmPassword) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        if (username.length < 3) {
            showNotification('Username must be at least 3 characters', 'error');
            return;
        }

        if (password.length < 6) {
            showNotification('Password must be at least 6 characters', 'error');
            return;
        }

        if (password !== confirmPassword) {
            showNotification('Passwords do not match', 'error');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        let users = JSON.parse(localStorage.getItem('users')) || {};
        
        if (users[username]) {
            showNotification('Username already exists. Please choose another.', 'error');
            return;
        }

        users[username] = {
            password: password,
            fullname: fullname,
            email: email,
            createdAt: new Date().toISOString()
        };
        localStorage.setItem('users', JSON.stringify(users));

        // Clear form
        document.getElementById('new-fullname').value = '';
        document.getElementById('new-username').value = '';
        document.getElementById('new-email').value = '';
        document.getElementById('new-password').value = '';
        document.getElementById('confirm-password').value = '';

        showNotification('Account created successfully! Please login.', 'success');
        setTimeout(() => {
            showLogin();
            document.getElementById('username').focus();
        }, 1500);
    } catch (error) {
        console.error('Registration error:', error);
        showNotification('An error occurred during registration', 'error');
    }
}

function login() {
    try {
        let username = document.getElementById('username').value.trim();
        let password = document.getElementById('password').value.trim();
        
        if (!username || !password) {
            document.getElementById('login-error').innerText = 'Please enter username and password!';
            showNotification('Please enter username and password', 'error');
            return;
        }
        
        let users = JSON.parse(localStorage.getItem('users')) || {};
        
        // Check if user exists and password matches
        let user = users[username];
        if (user && user.password === password) {
            localStorage.setItem('loggedInUser', username);
            
            const rememberMe = document.getElementById('remember-me');
            if (rememberMe && rememberMe.checked) {
                localStorage.setItem('rememberUser', username);
            } else {
                localStorage.removeItem('rememberUser');
            }
            
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
            document.getElementById('login-error').textContent = '';
            
            showNotification('Welcome back, ' + username + '!', 'success');
            loadDashboard(username);
        } else {
            document.getElementById('login-error').innerText = 'Invalid username or password!';
            showNotification('Invalid username or password', 'error');
        }
    } catch (error) {
        console.error('Login error:', error);
        showNotification('An error occurred during login', 'error');
    }
}

function loadDashboard(username) {
    document.getElementById('login').style.display = 'none';
    document.getElementById('register').style.display = 'none';
    document.getElementById('forgot-password').style.display = 'none';
    document.getElementById('main-content').style.display = 'flex';
    
    document.getElementById('user-name-display').textContent = username;
    document.getElementById('user-name').textContent = username;
    
    showNotification('Logged in successfully!', 'success');
    showSection('dashboard');
    loadDashboardStats();
    loadRecentTransactions();
}

function logout() {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('rememberUser');
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('login').style.display = 'flex';
    document.getElementById('password').value = '';
    document.getElementById('username').value = '';
    showNotification('Logged out successfully', 'info');
}

function togglePassword(fieldId) {
    const field = document.getElementById(fieldId);
    const icon = field.parentElement.querySelector('.toggle-password i');
    
    if (field.type === 'password') {
        field.type = 'text';
        icon.className = 'fas fa-eye-slash';
    } else {
        field.type = 'password';
        icon.className = 'fas fa-eye';
    }
}

function resetPassword() {
    const email = document.getElementById('reset-email').value.trim();
    if (!email) {
        showNotification('Please enter your email address', 'error');
        return;
    }
    showNotification('Password reset link sent to your email', 'success');
    setTimeout(() => showLogin(), 2000);
}

// ===== NAVIGATION =====
function showSection(sectionId, e) {
    if (e) e.preventDefault();
    
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.add('active');
    }
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.section === sectionId) {
            link.classList.add('active');
        }
    });
    
    if (sectionId === 'history') {
        loadTransactionHistory();
    } else if (sectionId === 'dashboard') {
        loadDashboardStats();
        loadRecentTransactions();
    }
}

// ===== DASHBOARD =====
function updateDate() {
    const dateEl = document.getElementById('current-date');
    if (dateEl) {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateEl.textContent = now.toLocaleDateString('en-US', options);
    }
}

function loadDashboardStats() {
    const username = localStorage.getItem('loggedInUser');
    if (!username) return;

    const transactions = JSON.parse(localStorage.getItem('transactions')) || {};
    const userTransactions = transactions[username] || [];
    
    const totalTransactions = userTransactions.length;
    document.getElementById('total-transactions').textContent = totalTransactions;
    
    let totalIncome = 0;
    let totalExpenses = 0;
    
    userTransactions.forEach(tx => {
        const amount = parseFloat(tx.amount) || 0;
        if (tx.type === 'Payment' || tx.type === 'Fund Transfer') {
            totalExpenses += amount;
        }
    });
    
    document.getElementById('total-income').textContent = '$0.00';
    document.getElementById('total-expenses').textContent = '$' + totalExpenses.toFixed(2);
    
    const balance = 10000 - totalExpenses;
    document.getElementById('total-balance').textContent = '$' + balance.toFixed(2);
}

function loadRecentTransactions() {
    const username = localStorage.getItem('loggedInUser');
    if (!username) return;

    const transactions = JSON.parse(localStorage.getItem('transactions')) || {};
    const userTransactions = transactions[username] || [];
    
    const recentContainer = document.getElementById('recent-transactions');
    
    if (userTransactions.length === 0) {
        recentContainer.innerHTML = '<div class="empty-state"><i class="fas fa-inbox"></i><p>No transactions yet</p></div>';
        return;
    }
    
    const recent = userTransactions.slice(-5).reverse();
    recentContainer.innerHTML = recent.map(tx => `
        <div class="transaction-item">
            <div class="transaction-left">
                <div class="transaction-icon ${tx.type === 'Fund Transfer' ? 'expense' : 'income'}">
                    <i class="fas fa-${tx.type === 'Fund Transfer' ? 'arrow-up' : 'arrow-down'}"></i>
                </div>
                <div class="transaction-details">
                    <h4>${tx.type}</h4>
                    <p>${tx.description || 'No description'}</p>
                </div>
            </div>
            <div class="transaction-amount negative">-$${parseFloat(tx.amount).toFixed(2)}</div>
        </div>
    `).join('');
}

// ===== TRANSFERS =====
function makeTransfer() {
    const username = localStorage.getItem('loggedInUser');
    const recipient = document.getElementById('transfer-recipient').value.trim();
    const amount = document.getElementById('transfer-amount').value.trim();
    const note = document.getElementById('transfer-note').value.trim();

    if (!recipient || !amount || parseFloat(amount) <= 0) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || {};
    if (!users[recipient]) {
        showNotification('Recipient username not found', 'error');
        return;
    }

    if (recipient === username) {
        showNotification('Cannot transfer to yourself', 'error');
        return;
    }

    let transactions = JSON.parse(localStorage.getItem('transactions')) || {};
    if (!transactions[username]) transactions[username] = [];
    if (!transactions[recipient]) transactions[recipient] = [];

    const txData = {
        type: 'Fund Transfer',
        amount: amount,
        description: note || `Transfer to ${recipient}`,
        date: new Date().toISOString(),
        recipient: recipient
    };

    transactions[username].push(txData);
    transactions[recipient].push({
        ...txData,
        type: 'Fund Transfer Received',
        recipient: username
    });

    localStorage.setItem('transactions', JSON.stringify(transactions));

    document.getElementById('transfer-success').textContent = 'Transfer successful!';
    document.getElementById('transfer-success').classList.add('show');
    document.getElementById('transfer-recipient').value = '';
    document.getElementById('transfer-amount').value = '';
    document.getElementById('transfer-note').value = '';

    showNotification('Transfer completed successfully!', 'success');
    
    setTimeout(() => {
        loadDashboardStats();
        showSection('dashboard');
    }, 1500);
}

// ===== PAYMENTS =====
function makePayment() {
    const username = localStorage.getItem('loggedInUser');
    const amount = document.getElementById('amount').value.trim();
    const method = document.getElementById('method').value;
    const description = document.getElementById('payment-description').value.trim();

    if (!amount || parseFloat(amount) <= 0) {
        showNotification('Please enter a valid amount', 'error');
        return;
    }

    if (!description) {
        showNotification('Please enter payment description', 'error');
        return;
    }

    let transactions = JSON.parse(localStorage.getItem('transactions')) || {};
    if (!transactions[username]) transactions[username] = [];

    const txData = {
        type: 'Payment',
        amount: amount,
        method: method,
        description: description,
        date: new Date().toISOString()
    };

    transactions[username].push(txData);
    localStorage.setItem('transactions', JSON.stringify(transactions));

    document.getElementById('payment-success').textContent = 'Payment successful!';
    document.getElementById('payment-success').classList.add('show');
    document.getElementById('amount').value = '';
    document.getElementById('payment-description').value = '';

    showNotification('Payment processed successfully!', 'success');
    
    setTimeout(() => {
        loadDashboardStats();
        showSection('dashboard');
    }, 1500);
}

// ===== TRANSACTION HISTORY =====
function loadTransactionHistory() {
    const username = localStorage.getItem('loggedInUser');
    if (!username) return;

    const transactions = JSON.parse(localStorage.getItem('transactions')) || {};
    const userTransactions = transactions[username] || [];
    
    const historyContainer = document.getElementById('transaction-history');
    
    if (userTransactions.length === 0) {
        historyContainer.innerHTML = '<div class="empty-state"><i class="fas fa-inbox"></i><p>No transactions found</p></div>';
        return;
    }

    historyContainer.innerHTML = userTransactions.slice().reverse().map(tx => {
        const date = new Date(tx.date).toLocaleDateString();
        const isIncome = tx.type.includes('Received');
        
        return `
            <div class="transaction-item">
                <div class="transaction-left">
                    <div class="transaction-icon ${isIncome ? 'income' : 'expense'}">
                        <i class="fas fa-${isIncome ? 'arrow-down' : 'arrow-up'}"></i>
                    </div>
                    <div class="transaction-details">
                        <h4>${tx.type}</h4>
                        <p>${tx.description} • ${date}</p>
                    </div>
                </div>
                <div class="transaction-amount ${isIncome ? 'positive' : 'negative'}">
                    ${isIncome ? '+' : '-'}$${parseFloat(tx.amount).toFixed(2)}
                </div>
            </div>
        `;
    }).join('');
}

function filterHistory() {
    const filterType = document.getElementById('filter-type').value;
    const filterDate = document.getElementById('filter-date').value;
    
    const username = localStorage.getItem('loggedInUser');
    if (!username) return;

    let transactions = JSON.parse(localStorage.getItem('transactions')) || {};
    let userTransactions = transactions[username] || [];
    
    if (filterType) {
        userTransactions = userTransactions.filter(tx => tx.type === filterType);
    }
    
    if (filterDate) {
        userTransactions = userTransactions.filter(tx => {
            const txDate = new Date(tx.date).toISOString().split('T')[0];
            return txDate === filterDate;
        });
    }
    
    const historyContainer = document.getElementById('transaction-history');
    
    if (userTransactions.length === 0) {
        historyContainer.innerHTML = '<div class="empty-state"><i class="fas fa-inbox"></i><p>No transactions found</p></div>';
        return;
    }

    historyContainer.innerHTML = userTransactions.slice().reverse().map(tx => {
        const date = new Date(tx.date).toLocaleDateString();
        const isIncome = tx.type.includes('Received');
        
        return `
            <div class="transaction-item">
                <div class="transaction-left">
                    <div class="transaction-icon ${isIncome ? 'income' : 'expense'}">
                        <i class="fas fa-${isIncome ? 'arrow-down' : 'arrow-up'}"></i>
                    </div>
                    <div class="transaction-details">
                        <h4>${tx.type}</h4>
                        <p>${tx.description} • ${date}</p>
                    </div>
                </div>
                <div class="transaction-amount ${isIncome ? 'positive' : 'negative'}">
                    ${isIncome ? '+' : '-'}$${parseFloat(tx.amount).toFixed(2)}
                </div>
            </div>
        `;
    }).join('');
}

function clearHistory() {
    if (confirm('Are you sure you want to delete all transactions?')) {
        const username = localStorage.getItem('loggedInUser');
        let transactions = JSON.parse(localStorage.getItem('transactions')) || {};
        delete transactions[username];
        localStorage.setItem('transactions', JSON.stringify(transactions));
        
        showNotification('Transaction history cleared', 'success');
        loadTransactionHistory();
        loadDashboardStats();
    }
}

// ===== SETTINGS =====
function updateProfile() {
    const fullname = document.getElementById('user-fullname').value.trim();
    const email = document.getElementById('user-email').value.trim();

    if (!fullname || !email) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    showNotification('Profile updated successfully!', 'success');
    document.getElementById('user-fullname').value = '';
    document.getElementById('user-email').value = '';
}

// Demo function stubs
function addPaymentMethod() {
    showNotification('Feature coming soon!', 'info');
}

function changePassword() {
    showNotification('Feature coming soon!', 'info');
}

function deleteAccount() {
    showNotification('Feature coming soon!', 'info');
}
