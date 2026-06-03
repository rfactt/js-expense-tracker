const expenseForm = document.getElementById("expense-form");
const expenseNameInput = document.getElementById("expense-name");
const expenseValueInput = document.getElementById("expense-value");
const expenseCategorySelect = document.getElementById("expense-category");
const expenseList = document.getElementById("expense-list");
const totalElement = document.getElementById("total");

const incomeForm = document.getElementById("income-form");
const monthlyIncomeInput = document.getElementById("monthly-income");
const essentialsBudgetElement = document.getElementById("essentials-budget");
const wantsBudgetElement = document.getElementById("wants-budget");
const savingsBudgetElement = document.getElementById("savings-budget");

const essentialsProgressElement = document.getElementById("essentials-progress");
const wantsProgressElement = document.getElementById("wants-progress");
const savingsProgressElement = document.getElementById("savings-progress");

const essentialsUsedElement = document.getElementById("essentials-used");
const wantsUsedElement = document.getElementById("wants-used");
const savingsUsedElement = document.getElementById("savings-used");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let monthlyIncome = Number(localStorage.getItem("monthlyIncome")) || 0;

if (monthlyIncome > 0) {
  monthlyIncomeInput.value = monthlyIncome;
}

expenseForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = expenseNameInput.value.trim();
  const value = Number(expenseValueInput.value);
  const category = expenseCategorySelect.value;

  if (name === "" || value <= 0 || category === "") {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  const expense = {
    id: Date.now(),
    name: name,
    value: value,
    category: category
  };

  expenses.push(expense);

  saveExpenses();
  renderExpenses();
  updateTotal();
  updateBudget();

  expenseForm.reset();
});

incomeForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const income = Number(monthlyIncomeInput.value);

  if (income <= 0) {
    alert("Digite um salário válido.");
    return;
  }

  monthlyIncome = income;

  saveMonthlyIncome();
  updateBudget();
  renderExpenses();
});

expenseList.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-btn")) {
    const id = event.target.dataset.id;
    deleteExpense(id);
  }
});

function renderExpenses() {
  expenseList.innerHTML = "";

  if (expenses.length === 0) {
    expenseList.innerHTML = `
      <li class="empty-message">Nenhum gasto cadastrado.</li>
    `;
    return;
  }

  expenses.forEach(function (expense) {
    const li = document.createElement("li");
    const isOverBudget = isCategoryOverBudget(expense.category);

    if (isOverBudget) {
      li.classList.add("over-budget");
    }

    li.innerHTML = `
      <strong>${expense.name}</strong>
      <span>${formatCurrency(expense.value)}</span>
      <small>${formatCategory(expense.category)}</small>

      ${
        isOverBudget
          ? `<p class="budget-warning">Limite ultrapassado. Evite gastar mais nessa categoria.</p>`
          : ""
      }

      <button class="delete-btn" data-id="${expense.id}">Deletar</button>
    `;

    expenseList.appendChild(li);
  });
}

function deleteExpense(id) {
  expenses = expenses.filter(function (expense) {
    return String(expense.id) !== String(id);
  });

  saveExpenses();
  renderExpenses();
  updateTotal();
  updateBudget();
}

function updateTotal() {
  const total = expenses.reduce(function (sum, expense) {
    return sum + expense.value;
  }, 0);

  totalElement.textContent = formatCurrency(total);
}

function updateBudget() {
  const essentials = monthlyIncome * 0.5;
  const wants = monthlyIncome * 0.3;
  const savings = monthlyIncome * 0.2;

  const essentialsTotal = getCategoryTotal("essenciais");
  const wantsTotal = getCategoryTotal("desejos");
  const savingsTotal = getCategoryTotal("reserva");

  const essentialsPercent = calculatePercentage(essentialsTotal, essentials);
  const wantsPercent = calculatePercentage(wantsTotal, wants);
  const savingsPercent = calculatePercentage(savingsTotal, savings);

  essentialsBudgetElement.textContent = formatCurrency(essentials);
  wantsBudgetElement.textContent = formatCurrency(wants);
  savingsBudgetElement.textContent = formatCurrency(savings);

  essentialsProgressElement.style.width = `${Math.min(essentialsPercent, 100)}%`;
  wantsProgressElement.style.width = `${Math.min(wantsPercent, 100)}%`;
  savingsProgressElement.style.width = `${Math.min(savingsPercent, 100)}%`;

  essentialsUsedElement.textContent = `${essentialsPercent}% utilizado`;
  wantsUsedElement.textContent = `${wantsPercent}% utilizado`;
  savingsUsedElement.textContent = `${savingsPercent}% utilizado`;
}

function calculatePercentage(total, limit) {
  if (limit <= 0) {
    return 0;
  }

  return Math.round((total / limit) * 100);
}

function saveExpenses() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function saveMonthlyIncome() {
  localStorage.setItem("monthlyIncome", monthlyIncome);
}

function formatCurrency(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function formatCategory(category) {
  const categories = {
    essenciais: "Essenciais",
    desejos: "Desejos",
    reserva: "Reserva",
    outros: "Outros"
  };

  return categories[category] || category;
}

function getCategoryLimit(category) {
  if (category === "essenciais") {
    return monthlyIncome * 0.5;
  }

  if (category === "desejos") {
    return monthlyIncome * 0.3;
  }

  if (category === "reserva") {
    return monthlyIncome * 0.2;
  }

  return Infinity;
}

function getCategoryTotal(category) {
  return expenses.reduce(function (total, expense) {
    if (expense.category === category) {
      return total + expense.value;
    }

    return total;
  }, 0);
}

function isCategoryOverBudget(category) {
  if (monthlyIncome <= 0) {
    return false;
  }

  const categoryLimit = getCategoryLimit(category);
  const categoryTotal = getCategoryTotal(category);

  return categoryTotal > categoryLimit;
}

renderExpenses();
updateTotal();
updateBudget();