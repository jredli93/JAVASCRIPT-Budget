class UI {
  constructor() {
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmount = document.getElementById("budget-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("balance");
    this.balanceAmount = document.getElementById("balance-amount");
    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = [];
    this.itemID = 0;
  }

  // submit budget form
  submitBudgetForm() {
    const value = this.budgetInput.value;

    if (value === "" || value < 0) {
      this.budgetFeedback.classList.add("showItem");
      this.budgetFeedback.innerHTML = `<p>Value cant be empty or negative</p>`;
      const self = this;
      setTimeout(function() {
        self.budgetFeedback.classList.remove("showItem");
        self.budgetFeedback.innerHTML = "";
      }, 3000);
    } else {
      this.budgetAmount.textContent = value;
      this.budgetInput = "";
      this.showBalance();
    }

    this.budgetAmount.textContent = value;
  }

  submitExpenseForm() {
    let expenseInput = this.expenseInput.value;
    let amountInput = parseInt(this.amountInput.value);

    let expense = {
      id: this.itemID,
      name: expenseInput,
      amount: amountInput
    };

    this.itemID++;
    this.itemList.push(expense);
    this.addExpense(expense);
    this.showBalance();
  }

  addExpense(expense) {
    const div = document.createElement("div");
    div.classList.add("expense");
    div.innerHTML = ` <div class="expense">
        <div class="expense-item d-flex justify-content-between align-items-baseline">

         <h6 class="expense-title mb-0 text-uppercase list-item">- ${expense.name}</h6>
         <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>

         <div class="expense-icons list-item">

          <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
           <i class="fas fa-edit"></i>
          </a>
          <a href="#" class="delete-icon" data-id="${expense.id}">
           <i class="fas fa-trash"></i>
          </a>
         </div>
        </div>

       </div>`;
    this.expenseList.appendChild(div);
  }

  // total expenes calc
  totalExpense() {
    let total = 0;
    if (this.itemList.length > 0) {
      total = this.itemList.reduce(function(acc, curr) {
        acc += curr.amount;
        return acc;
      }, 0);
    }
    this.expenseAmount.textContent = total;
    return total;
  }

  // update balance
  updateBalance() {
    let expenseAmount = this.totalExpense();
    let balanceAmount = parseInt(this.budgetAmount.textContent) - expenseAmount;

    if (balanceAmount <= 0) {
      this.balanceAmount.classList.remove("showGreen", "showBlack");
      this.balanceAmount.classList.add("showRed");
    } else if (balanceAmount > 0) {
      this.balanceAmount.classList.remove("showRed", "showBlack");
      this.balanceAmount.classList.add("showGreen");
    }

    this.balanceAmount.textContent = balanceAmount;
  }

  // show balance
  showBalance() {
    this.totalExpense();
    this.updateBalance();
  }
}

function eventListeners() {
  const ui = new UI();

  // submit budget input
  const budgetSubmit = document.getElementById("budget-form");

  budgetSubmit.addEventListener("submit", function(event) {
    event.preventDefault();
    ui.submitBudgetForm();
  });

  // submit expense
  const expenseSubmit = document.getElementById("expense-form");
  expenseSubmit.addEventListener("submit", function(event) {
    event.preventDefault();
    ui.submitExpenseForm();
  });
}

document.addEventListener("DOMContentLoaded", function() {
  eventListeners();
});
