# Dikdarshan 🧭

**Dikdarshan** is a streamlined counseling management platform built with the MERN stack. It provides a secure, automated way for students to request guidance, verify their identity via OTP, and receive instant email confirmations.

---

## 🚀 Features

*   **Secure OTP Authentication**: Uses `Nodemailer` to send 4-digit verification codes to users' Gmail accounts.
*   **Persistent Data Storage**: Implements a local "flat-file" database using `data.json` and the Node.js `fs` module to store patient and session records.
*   **Post-Redirect-Get (PRG) Workflow**: Ensures a smooth user experience by preventing duplicate form submissions and showing clear status messages.
*   **Automated Email Notifications**: Automatically notifies both the user and the administrator when a new counseling request is filed.
*   **Modern UI**: Built with a focus on professional aesthetics using **React** and **Tailwind CSS**.

---

## 🛠️ Technical Stack

*   **Frontend**: React.js (Vite)
*   **Backend**: Node.js & Express.js
*   **Mailing**: Nodemailer (via Gmail SMTP)
*   **Database**: JSON (Local Filesystem)

---

## 📦 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone [https://github.com/royelnath/Dikdarshan.git](https://github.com/royelnath/Dikdarshan.git)
   cd Dikdarshan
