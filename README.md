# ✨ Modern Glassmorphic Registration Form

A modern, responsive, and compact **Registration Form** crafted with pure **HTML5**, **CSS3**, and **Vanilla JavaScript**. Designed with a dark luxury aesthetic, dynamic glassmorphism, ambient glowing orbs, real-time input validation, and interactive micro-animations.

---

## 🌟 Highlights & Features

- 🎨 **Premium Glassmorphic UI**: High-end frosted glass appearance (`backdrop-filter: blur(28px)`), sleek borders, and animated ambient gradient orbs.
- ⚡ **Zero-Scroll Compact Layout**: Perfectly balanced vertical rhythm designed to fit within the viewport without requiring page scrolling on standard screens.
- 👁️ **Password Show / Hide Toggle**: Effortlessly inspect and hide passwords for both the Password and Confirm Password fields.
- 📊 **Real-time Password Strength Meter**: Dynamic indicator evaluating password complexity (Weak, Fair, Good, Strong & Secure) on the fly.
- 🛡️ **Live Validation & Feedback**:
  - Instant password match verification (`password === confirmPassword`).
  - Sleek non-intrusive **Toast Notifications** for instant user feedback.
  - Interactive **Success Modal Dialog** using semantic `<dialog>` elements.
- 📱 **Fully Responsive**: Adapts seamlessly to mobile, tablet, and desktop screens with fluid layouts.
- 🚀 **Zero Dependencies**: Pure Vanilla web stack — no heavy external frameworks or build tooling required.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) | Semantic structure, accessible form controls, and native `<dialog>` modals |
| ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) | Glassmorphism, CSS variables, keyframe animations, and responsive flex/grid |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) | Client-side validation, visibility toggles, strength algorithm, and toast events |
| ![Google Fonts](https://img.shields.io/badge/Google%20Fonts-Plus%20Jakarta%20Sans-4285F4?style=flat-square&logo=google&logoColor=white) | Clean and modern typography |

---

## 📂 Project Structure

```bash
Registration-Form/
│
├── index.html       # Main semantic HTML structure & SVG icons
├── index.css        # Glassmorphic styles, ambient orbs & animations
├── index.js         # Validation logic, strength meter & modal handlers
└── README.md        # Project documentation
```

---

## 🚀 Quick Start

No package manager or build step is required! You can run this project instantly in any browser:

### 1. Clone the repository
```bash
git clone https://github.com/Sanjeet3065/Registration-Form.git
```

### 2. Open the project folder
```bash
cd Registration-Form
```

### 3. Launch in your browser
- Simply double-click `index.html` to open it in your default browser.
- Or use VS Code's **Live Server** extension.
- Or start a quick local server with Python:
  ```bash
  python -m http.server 3000
  ```
  Then visit `http://localhost:3000` in your web browser.

---

## 🎯 Form Validation Details

1. **First & Last Name**: Validated to prevent empty strings.
2. **Email Address**: Checked against standard email formatting patterns.
3. **Password**: Requires a minimum of 6 characters; dynamically graded for length, numbers, uppercase letters, and special symbols.
4. **Confirm Password**: Real-time cross-checking with the initial password; provides visual feedback and error messaging on mismatch.
5. **Terms & Conditions**: Native accessible checkbox verification before allowing submission.

---

## 🤝 Contributing

Contributions, issues, and feature requests are always welcome!
Feel free to fork this repository, submit issues, or open a pull request.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).