# 🏦 SecureBank - Modern Online Banking System

A **professional, modern online banking application** built with vanilla **HTML, CSS, and JavaScript**. Features a beautiful dark theme interface with complete banking functionality including user authentication, fund transfers, payments, and transaction management.

---

## ✨ Key Features

### 🔐 **Authentication**
- Secure user registration with validation
- Email and username uniqueness checking
- Password confirmation
- Login with remember-me functionality
- Forgot password feature
- Session management with localStorage

### 💳 **Banking Operations**
- **Fund Transfers** - Send money between users with descriptions
- **Bill Payments** - Make payments with multiple methods (Credit Card, Debit Card, Bank Transfer, E-Wallet)
- **Balance Tracking** - Real-time account balance calculation
- **Account Card** - Gradient design showing balance and account info

### 📊 **Dashboard & Analytics**
- Account overview with total balance
- Statistics dashboard (Income, Expenses, Transaction Count)
- Recent transactions display
- Quick action buttons for easy navigation

### 📜 **Transaction Management**
- Complete transaction history with timestamps
- Filter by transaction type and date
- View income and expense breakdown
- Clear history option
- Transaction icons and color coding

### ⚙️ **Settings**
- Profile management
- Payment methods display
- Security options (coming soon)

---

## 🎨 Design Highlights

### Dark Theme
- **Modern Dark Background** - Professional #0f172a color scheme
- **Blue Gradient Accents** - Modern banking aesthetic (#60a5fa - #3b82f6)
- **Glassmorphism Effects** - Backdrop blur and transparency
- **Smooth Animations** - Fade-in, hover, and transition effects
- **Responsive Design** - Works on mobile, tablet, and desktop

### User Experience
- Split-panel authentication pages
- Sticky navigation bar
- Empty state messages
- Toast notifications (success/error/info)
- Form validation with helpful error messages
- Password toggle visibility

---

## 🛠️ Technologies Used

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Icons:** Font Awesome 6.4.0
- **Typography:** Google Fonts - Poppins
- **Storage:** Browser localStorage (JSON)
- **Server:** Node.js HTTP Server
- **Version Control:** Git & GitHub

---

## 📁 Project Structure

```
online_banking_payment_system/
├── index.html          # Main application (auth pages + dashboard)
├── styles.css          # Modern dark theme styling (1000+ lines)
├── script.js           # Complete functionality (500+ lines)
├── README.md           # Project documentation
└── images/             # Screenshots and assets
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/online_banking_payment_system.git
   cd online_banking_payment_system
   ```

2. **Start the server**
   ```bash
   npx http-server . -p 8000
   ```

3. **Open in browser**
   - Local: `http://127.0.0.1:8000`
   - Network: `http://10.243.191.200:8000`

---

## 📖 How to Use

### Create Account
1. Click "Create one" on login page
2. Fill in: Full Name, Username, Email, Password
3. Click "Create Account"
4. You'll be redirected to login

### Login
1. Enter username and password
2. Check "Remember me" to stay logged in
3. Click "Sign In"

### Make a Transfer
1. Go to **Transfer** section
2. Enter recipient username
3. Enter amount
4. Add optional description
5. Click "Send Money"

### Make a Payment
1. Go to **Payments** section
2. Enter amount
3. Select payment method
4. Enter description
5. Click "Pay Now"

### View Transactions
1. Go to **History** section
2. Filter by type and/or date
3. View all transactions with details
4. Click "Clear All" to delete history

---

## 💾 Data Storage

All data is stored in browser **localStorage**:
```javascript
users: {
  "username": {
    password: "string",
    fullname: "string",
    email: "string",
    createdAt: "ISO date"
  }
}

transactions: {
  "username": [
    {
      type: "Fund Transfer|Payment|etc",
      amount: "number",
      description: "string",
      date: "ISO date",
      method: "optional",
      recipient: "optional"
    }
  ]
}
```

---

## 🎯 Key Functions

### Authentication
- `register()` - User registration with validation
- `login()` - User login with session management
- `logout()` - Clear session and return to login
- `checkLoginStatus()` - Verify if user is logged in

### Banking
- `makeTransfer()` - Send money between users
- `makePayment()` - Process bill payments
- `loadDashboardStats()` - Calculate and display stats
- `loadTransactionHistory()` - Display transactions
- `filterHistory()` - Filter transactions by type/date

### UI/UX
- `showSection()` - Navigate between dashboard sections
- `showNotification()` - Display toast messages
- `togglePassword()` - Show/hide password field

---

## 🔒 Security Features

- ✅ Password confirmation on registration
- ✅ Username and email validation
- ✅ Recipient validation for transfers
- ✅ Session management with localStorage
- ✅ Input sanitization
- ✅ Error handling and validation messages

**Note:** This is a demo application. For production use, implement:
- Backend authentication (JWT, OAuth2)
- HTTPS encryption
- Database storage
- Server-side validation
- Two-factor authentication

---

## 📱 Responsive Breakpoints

- **Desktop:** 1024px+ (Full layout)
- **Tablet:** 768px - 1023px (Adjusted spacing)
- **Mobile:** 480px - 767px (Stacked layout)
- **Small Mobile:** < 480px (Optimized for small screens)

---

## 🎨 Color Scheme

| Color | Value | Usage |
|-------|-------|-------|
| Primary | #60a5fa | Buttons, links, accents |
| Dark BG | #0f172a | Main background |
| Secondary BG | #1e293b | Cards, containers |
| Success | #10b981 | Positive actions, income |
| Danger | #ef4444 | Negative actions, expenses |
| Text Primary | #f1f5f9 | Main text |
| Text Muted | #94a3b8 | Secondary text |

---

## 📸 Screenshots

### Login Page
<img width="1915" height="899" alt="image" src="https://github.com/user-attachments/assets/7eb174dc-1592-452e-a7d7-287caa41af59" />


### Registration Page
<img width="1918" height="889" alt="image" src="https://github.com/user-attachments/assets/6164cc17-b9a5-4063-b321-9df5aecc3d3e" />


### Dashboard
<img width="1910" height="917" alt="image" src="https://github.com/user-attachments/assets/f1dc3502-2830-4126-8824-df385fcc7f7e" />


### Fund Transfer
<img width="1885" height="772" alt="image" src="https://github.com/user-attachments/assets/539d265a-cc7a-4962-a155-04f1edb69cb8" />








## 📈 Future Enhancements

- [ ] Bank backend API integration
- [ ] Real-time notifications
- [ ] Transaction receipts/export
- [ ] Multi-currency support
- [ ] Budget tracking
- [ ] Investment options
- [ ] Mobile app version
- [ ] Dark/Light theme toggle
- [ ] Advanced analytics
- [ ] User profile customization

---

## 👨‍💻 Development

Built with care using:
- Vanilla JavaScript (no frameworks)
- CSS3 Grid & Flexbox
- HTML5 semantic elements
- Responsive mobile-first approach

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---



---




© 2025 OM Parikh S V. All rights reserved.
