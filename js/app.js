// Utility helpers
function byId(id) {
  return document.getElementById(id);
}

function formatMoneyAUD(value) {
  return `$${value.toFixed(2)} AUD`;
}

// Page navigation
const PAGES = ["home", "televisions", "about"];

function setActiveNav(page) {
  const buttons = document.querySelectorAll(".nav-item");
  buttons.forEach((btn) => {
    const isActive = btn.dataset.page === page;
    btn.classList.toggle("is-active", isActive);
    btn.setAttribute("aria-current", isActive ? "page" : "false");
  });
}

function showPage(page) {
  if (!PAGES.includes(page)) page = "home";

  const sections = document.querySelectorAll(".page");
  sections.forEach((sec) => {
    const match = sec.dataset.page === page;
    sec.hidden = !match;
  });

  setActiveNav(page);

  window.location.hash = page;
}

// Wire nav buttons
document.querySelectorAll(".nav-item").forEach((btn) => {
  btn.addEventListener("click", () => showPage(btn.dataset.page));
});

// Logo click -> Home page
byId("logoHome").addEventListener("click", (e) => {
  e.preventDefault();
  showPage("home");
});

// Load initial page from hash
function initialRoute() {
  const hash = (window.location.hash || "").replace("#", "").trim();
  showPage(hash || "home");
}
window.addEventListener("hashchange", initialRoute);

// Mini interaction on Home
byId("calcAnnualHours").addEventListener("click", () => {
  const hoursPerDay = Number(byId("hoursPerDay").value);

  if (Number.isNaN(hoursPerDay) || hoursPerDay < 0 || hoursPerDay > 24) {
    byId("annualHoursResult").textContent = "Please enter hours per day between 0 and 24.";
    return;
  }

  const annualHours = hoursPerDay * 365;
  byId("annualHoursResult").textContent = `Estimated annual usage: ${annualHours.toFixed(
    0
  )} hours/year.`;
});

// TV estimator on Televisions page
byId("estimateTvCost").addEventListener("click", () => {
  const watts = Number(byId("tvWatts").value);
  const hours = Number(byId("tvHours").value);
  const price = Number(byId("priceKwh").value);

  const resultEl = byId("tvCostResult");

  if ([watts, hours, price].some((v) => Number.isNaN(v))) {
    resultEl.textContent = "Please enter valid numbers for all fields.";
    return;
  }
  if (watts <= 0) {
    resultEl.textContent = "Power draw must be greater than 0 W.";
    return;
  }
  if (hours < 0 || hours > 24) {
    resultEl.textContent = "Hours per day must be between 0 and 24.";
    return;
  }
  if (price < 0) {
    resultEl.textContent = "Price per kWh must be 0 or more.";
    return;
  }

  // kWh per year = (W / 1000) * hours/day * 365
  const kwhPerYear = (watts / 1000) * hours * 365;
  const annualCost = kwhPerYear * price;

  resultEl.textContent = `Estimated annual energy: ${kwhPerYear.toFixed(
    1
  )} kWh/year • Estimated cost: ${formatMoneyAUD(annualCost)}`;
});

// Footer year
byId("footerYear").textContent = new Date().getFullYear().toString();

initialRoute();
