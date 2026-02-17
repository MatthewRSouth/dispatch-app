# Hoshida Dispatch Enrollment App

A secure, bilingual web application for enrolling students at Hoshida Dispatch. This app replaces paper forms with a streamlined digital workflow that captures student data, uploads photos to Google Drive, saves records to Google Sheets, and automatically sends parents payment and confirmation information via email.

---

## 🚀 Features

- **Secure Login:** Password-protected access for authorized parents.
- **Digital Enrollment Form:** Bilingual (English/Japanese) input for parent and child information.
- **Photo Upload:** Automatically uploads child photos to a designated Google Drive folder.
- **Google Sheets Integration:** Saves all submitted data to a master spreadsheet in real time.
- **PDF Generation:** (via Apps Script) Generates a formatted PDF application form for school records.
- **Automated Emails:** (via Apps Script) Sends confirmation emails with payment instructions to parents upon enrollment.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite) |
| Backend | Vercel Serverless Functions (Node.js) |
| Database | Google Sheets API |
| Storage | Google Drive API |
| Automation | Google Apps Script |

---
##⚙️ Setup & Installation

###1. Clone the repository

```bash
git clone https://github.com/your-username/hoshida-enrollment.git
cd hoshida-enrollment
```

###2. Install dependencies

```bash
npm install
```

###3. Configure Environment Variables

Create a `.env.local` file in the root directory with the following keys. **Never commit this file to version control.**

```env
# App Security
LOGIN_PASSWORD=your_secure_password

# Google Cloud Credentials (OAuth 2.0)
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REFRESH_TOKEN=your_refresh_token

# Google Resource IDs
GOOGLE_SHEET_ID=your_spreadsheet_id
GOOGLE_DRIVE_FOLDER_ID=your_drive_folder_id
```

> All sensitive credentials are managed exclusively through environment variables and are never stored in the codebase.

### 4. Run Locally

```bash
npm run dev
```

---

## ☁️ Google Cloud Setup

The app uses a dedicated Google Cloud Project to communicate with the Drive and Sheets APIs.

1. Navigate to the [Google Cloud Console](https://console.cloud.google.com/).
2. Enable the **Google Sheets API** and **Google Drive API**.
3. Create **OAuth 2.0 Credentials** for a Web Application.
4. Generate a **Refresh Token** (via OAuth Playground or a helper script) to allow the app to maintain API access without manual re-authentication.

---

## 🤖 Google Apps Script (Automation)

Email delivery and PDF generation are handled by a Google Apps Script bound to the master spreadsheet, keeping automation logic separate from the main codebase.

**To access or edit the script:**

1. Open the **Master Spreadsheet**.
2. Navigate to **Extensions > Apps Script**.
3. Confirm the `createPDFFromSheet` function is present and correctly configured.
4. Ensure an **On Change** trigger is active to run automatically when a new enrollment row is added.

**Key files:**

- `Code.gs` — Handles PDF creation and email dispatch logic.

> **Note:** Payment details referenced in confirmation emails are managed within the Apps Script. Update the `sendEnrollmentEmail` function there if payment information changes — do not hardcode payment details in the React frontend.

---

## 📦 Deployment (Vercel)

This app is optimized for deployment on [Vercel](https://vercel.com/).

1. Push the repository to GitHub.
2. Import the project into Vercel.
3. Add all environment variables from the [Configuration](#3-configure-environment-variables) step to **Vercel Project Settings > Environment Variables**.
4. Trigger a redeployment.

---

## 🚨 Troubleshooting

| Symptom | Likely Cause | Resolution |
|---|---|---|
| "Submission Failed" error | Expired refresh token or API quota exceeded | Check Vercel Function Logs; regenerate the refresh token if necessary |
| Confirmation email not delivered | Apps Script execution error | Review the **Executions** tab in Google Apps Script for error details |
| Unexpected duplicate entries | Network timeout causing a retry | Verify the master spreadsheet for duplicates; the form includes submit-state management to minimize this |

---

## 📝 Maintenance Notes

- **UI Text / Labels:** Most bilingual labels are located in `src/components/ParentInformation.jsx` and related component files.
- **Payment Information:** Must be updated inside the Google Apps Script (`sendEnrollmentEmail` function), not in the React source code.
- **API Credentials:** If Google credentials are rotated, update both the `.env.local` file (local) and Vercel environment variables (production).
