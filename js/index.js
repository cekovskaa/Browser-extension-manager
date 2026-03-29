const modeBtn = document.querySelector(".mode-btn");
const modeIcon = modeBtn.querySelector("img");
const filterbtns = document.querySelectorAll(".filters button");


if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  modeIcon.src = "/assets/images/icon-sun.svg";
  modeIcon.alt = "sun light mode";
}

modeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  modeIcon.src = isDark
    ? "/assets/images/icon-sun.svg"
    : "/assets/images/icon-moon.svg";
  modeIcon.alt = isDark ? "sun light mode" : "moon dark mode";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});


let currentFilter = localStorage.getItem("filter") || "all";


filterbtns.forEach((btn) => {
  btn.classList.toggle("active", btn.dataset.filter === currentFilter);
});

filterbtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterbtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    localStorage.setItem("filter", currentFilter);
    applyFilter();
  });
});

const container = document.getElementById("extensions-container");
let allExtensions = [];

async function loadExtensions() {
  try {
    const res = await fetch("./data.json");
    const data = await res.json();
    allExtensions = data;
    applyFilter(); 
  } catch (error) {
    console.error("Error loading data:", error);
  }
}

function applyFilter() {
  if (currentFilter === "active") {
    renderExtensions(allExtensions.filter((e) => e.isActive));
  } else if (currentFilter === "inactive") {
    renderExtensions(allExtensions.filter((e) => !e.isActive));
  } else {
    renderExtensions(allExtensions);
  }
}

function renderExtensions(data) {
  container.innerHTML = "";

  data.forEach((ext) => {
    const col = document.createElement("div");
    col.className = "col-12 col-md-4 mb-4";

    col.innerHTML = `
      <div class="card custom-card h-100">
        <div class="card-body p-3 d-flex flex-column justify-content-between">
          
          <div class="d-flex align-items-start gap-3 gap-md-2 gap-lg-3 mb-3 mb-lg-5">
            <img src="${ext.logo}" alt="${ext.name} logo" class="extension-logo" />
            <div>
              <h5 class="card-title mb-1">${ext.name}</h5>
              <p class="card-text text-muted small">${ext.description}</p>
            </div>
          </div>

          <div class="d-flex justify-content-between align-items-center mt-3">
            <button class="btn remove-btn" data-name="${ext.name}">Remove</button>
            <div class="form-check form-switch mb-0">
              <input
                class="form-check-input toggle-input"
                type="checkbox"
                role="switch"
                id="toggle-${ext.name}"
                ${ext.isActive ? "checked" : ""}
              />
            </div>
          </div>

        </div>
      </div>
    `;

    col.querySelector(".toggle-input").addEventListener("change", (e) => {
      const target = allExtensions.find((item) => item.name === ext.name);
      if (target) target.isActive = e.target.checked;
      applyFilter();
    });

    col.querySelector(".remove-btn").addEventListener("click", () => {
      allExtensions = allExtensions.filter((item) => item.name !== ext.name);
      applyFilter();
    });

    container.appendChild(col);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadExtensions();
});
