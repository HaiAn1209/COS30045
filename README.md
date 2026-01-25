# COS30045 – Exercise 0.2: Appliance Energy Consumption Website

## Aim
Build a small interactive website demonstrating:
- HTML structure and semantic layout
- External CSS styling
- JavaScript-driven navigation between pages
- Regular GitHub commits and repository management

## Pages
This website contains three pages:
1. Home
2. Televisions
3. About Us

Navigation between pages is implemented using JavaScript.

## Features (Requirement Checklist)
- [x] Three pages (Home, Televisions, About Us)
- [x] Top navigation menu switches pages using JavaScript
- [x] Power logo is shown at the top-left and returns to Home when clicked
- [x] Mouse-over feedback (hover effects) on navigation items
- [x] Active page feedback (highlight current page)
- [x] Styling implemented via external CSS file (black–red theme)
- [x] Footer includes year, author name, and GenAI acknowledgement (if used)
- [x] Placeholder content related to appliance energy consumption in the Australian market

## How to Run Locally
1. Clone the repository
2. Open the folder in VS Code
3. Run using a local server:
   - VS Code extension: **Live Server**
4. Open `index.html`

## Repository Structure
- `index.html`
- `css/styles.css`
- `js/app.js`
- `assets/PowerIcon.png`

## GenAI / GitHub Copilot Acknowledgement & Reflection
### How I used GenAI / Copilot
- I used GitHub Copilot / GenAI to generate an initial project skeleton.
- I used it to suggest CSS patterns.
- I used it to draft JavaScript functions for page switching and updating the active navigation state.

### What I learned
- I improved my understanding of JavaScript-driven navigation using `data-page` attributes and DOM event listeners.
- I learned how to maintain UI state consistently by toggling `hidden` and CSS classes (e.g., active navigation item).
- I reinforced best practices such as keeping CSS in a separate file and using reusable style variables.

### Limitations / changes I made to ensure correctness
- I reviewed and edited generated code for clarity, accessibility, and edge cases (e.g., input validation and safe default routing).
- I adjusted the CSS theme manually to match the required black–red design and improved contrast for readability.
- I ensured all requirements were met and that I can explain/modify the code during demonstrations.

## Author
Vu Hoang Hai An

## Footer Acknowledgement
This project includes an acknowledgement in the website footer indicating GenAI assistance was used (if applicable), and that the final code was reviewed and edited by the author.
