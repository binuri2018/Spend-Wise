# 💰 Spend Wise - A Modern Expense Tracker

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Firebase](https://img.shields.io/badge/Firebase-10.7.0-orange)

A modern, responsive expense tracking platform built with **React** and **Firebase**, helping users manage their personal finances with ease. Spend Wise combines clean design with powerful features to make budgeting simple, insightful, and effective. 

- *Deployed Application* - [💰 Spend Wise](https://spendwisea.netlify.app/)

## ✨ Features

### For Users
- 📝 Add, edit, and delete expenses with categories and descriptions  
- 📊 Track total, average, and count of expenses  
- 📂 Organize expenses by category and date  
- 🔍 Search and filter expenses for quick access  
- 📈 View detailed analytics with interactive charts  
- 👤 Secure authentication with personalized dashboards  
- 📱 Fully responsive design for all devices  

### Technical Features  
- 🔐 Firebase Authentication for secure user login  
- 📦 Firestore Database for real-time expense management  
- 📊 Recharts for visual data representation  
- 🎨 Modern UI with Tailwind/Material Design principles  
- ⚡ Optimized performance and smooth rendering  
- 🔒 Form validation and error handling  
- 🎯 SEO-friendly structure  

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14.0.0 or higher)
- npm 
- Firebase account

### Installation

1. Clone the repository
```bash
git clone https://github.com/binuri2018/Spend-Wise.git
cd Spend-Wise
```

2. Install dependencies
```bash
npm install
```

3. Create a Firebase project and enable:
   - Authentication (Email/Password), Google auth
   - Firestore Database

4. Create a `src/firebase.js` file in the root directory and add your Firebase configuration:
```src/firebase.js
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

5. Start the development server
```bash
npm start
```

## 🛠️ Built With

- [React](https://reactjs.org/) - Frontend framework
- [Firebase](https://firebase.google.com/) - Backend and authentication
- [React Router](https://reactrouter.com/) - Routing
- [Font Awesome](https://fontawesome.com/) - Icons
- [Google Fonts](https://fonts.google.com/) - Typography

## 📱 Features in Detail

### User Authentication
- Secure email/password authentication
- Google Authentication
- Protected routes for authenticated users
- Session persistence

### Expense Management
- Add, edit, and delete expenses
- Category organization
- Track totals, averages, and counts

### Analytics & Dashboard
- Interactive bar and pie charts
- Expense summary cards (Total, Average, Count)
- Top spending categories overview
- Recent expenses list

### Responsive Design
- Mobile-first approach
- Adaptive layouts
- Touch-friendly interface
- Optimized for all devices

## 🔒 Security Features

- Form validation
- Input sanitization
- Protected routes
- Secure authentication
- Error handling

## 🎨 UI/UX Features

- Clean and modern design
- Intuitive navigation
- Responsive layouts
- Loading states
- Error feedback
- Smooth animations
- Consistent styling

## 📦 Project Structure

```
spend-wise/
├── src/
│   ├── components/
│   │   ├── Navbar/
|   |   ├── ExpenseForm/
│   │   ├── ExpenseList/
│   │   └── Charts/
│   ├── pages/
│   │   ├── Dashboard/
│   │   ├── Login/
│   │   └──  Register/
│   ├── firebase.js
|   ├── Styles.css
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

## 👥 Authors

- Binuri Manodya - Initial work - (https://github.com/binuri2018)

## 🙏 Acknowledgments

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Google Material Design](https://material.io/design)
- [Font Awesome](https://fontawesome.com/)
- [Google Fonts](https://fonts.google.com/)
