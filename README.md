# Ndosi Profile Picture Update — Automated Tests

This project uses Playwright to automatically test the "update profile picture" feature on the Ndosi Automation test site.

## What it tests

**UI Test:** Logs in, opens the menu, goes to My Profile, opens Edit Profile, uploads a new picture, and checks that the picture actually changed.

**API Tests:** Checks the three backend endpoints used in that flow, for both success and failure:

- `POST /API/login` — 200 on correct login, 401 on wrong password
- `GET /API/profile` — 200 with a valid token, 401 with none
- `POST /API/profile/image` — 200 with a valid token and file, 401 with no token

## How to run it

1. Install everything:
npm install
npx playwright install

2. Create a `.env` file with your login details:
NDOSI_EMAIL=your_email_here
NDOSI_PASSWORD=your_password_here

3. Run the tests:
npx playwright test
npx playwright test --headed 

4. View the report:
npx playwright show-report


## Project files

- `tests/profile-picture-upload.spec.ts` — the UI test
- `tests/api-endpoint-validation.spec.ts` — the API tests
- `screenshots/` — a picture from each step of the UI test
- `.github/workflows/playwright.yml` — runs these tests automatically on GitHub

## Automatic runs

This project runs by itself on GitHub Actions:
- Every time code is pushed
- Once a day at midnight (South African time)

Login details are stored securely as GitHub Secrets, not written in the code anywhere.
