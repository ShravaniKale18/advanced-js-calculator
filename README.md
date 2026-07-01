# 🧮 Calculator Pro (Standard & Scientific)

A sleek, responsive, and fully interactive web-based calculator featuring both Standard and Scientific computational modes, a persistent tracking history log, and full desktop keyboard support. Developed as a core project during my **Frontend Web Development Internship** at **CodeAlpha**.

## 🚀 Live Demo
* https://shravanikale18.github.io/advanced-js-calculator/*

---

## 📌 Project Overview
This project was built to showcase clean UI/UX layout techniques combined with robust JavaScript logic. Unlike standard calculators that evaluate mathematical formulas instantaneously, this application implements an **expression-building engine**. It mimics real-world advanced scientific calculators by allowing users to select the functional operation first (e.g., `sin(`, `log(`), input their values, and evaluate everything seamlessly on demand.

### Key Internship Objectives Met:
* Implemented clean, component-based Separation of Concerns using **HTML5, CSS3, and JavaScript**.
* Mastered state handling by concurrently managing user-facing strings (`displayExpression`) and backend JavaScript strings (`jsExpression`).
* Wrote responsive design properties supporting Desktop, Tablet, and Mobile layouts.

---

## ✨ Features

* **Dual Engine Modes:** Seamlessly toggle layouts between standard algebraic math operations and engineering scientific functions (`sin`, `cos`, `tan`, `log`, `ln`, `√`, exponents).
* **Smart Backspace Execution:** Deletes full scientific keywords (like `sin(` or `log(`) gracefully in one click instead of fragmenting code logic.
* **Persistent History Tracking:** Tracks previous computations in a dedicated scrollable log panel that automatically anchors focus onto the latest result.
* **Production-Grade Architecture:** Replaced the unsafe, outdated native `eval()` wrapper with modern `new Function()` evaluation constructors.
* **Full Keyboard Support:** Built global accessibility listeners mapping physical desktop keys to the interface layout.

---

## 🛠️ Technologies Used

* **Structure:** HTML5 Semantic Elements
* **Styling:** CSS3 Grid, Flexbox Layouts, Media Queries, Custom Scrollbar Layout UI
* **Logic Engine:** Vanilla JavaScript (ES6+)

---

## 📂 Project Structure

```text
├── index.html        # Main interface structural layout
├── styles.css        # Responsive layout styling rules
├── index.js          # Core calculation & UI event-handler state machine
└── README.md         # Project documentation (This file)
