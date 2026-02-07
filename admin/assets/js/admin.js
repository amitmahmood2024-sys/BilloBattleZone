if (localStorage.getItem("bbz_admin") !== "1") {
  location.href = "login.html";
}

const WD_KEY = "bbz_withdraw_requests";

function getWithdraws() {
  return JSON.parse(localStorage.getItem(WD_KEY) || "[]");
}
function renderWithdraws() {
  const list = getWithdraws();
  const box = document.getElementById("withdrawList");
  box.innerHTML = "";

  if (list.length === 0) {
    box.innerHTML = "<p>No requests</p>";
    return;
  }

  list.forEach((w, i) => {
    const div = document.createElement("div");
    div.className = "list-item";
    div.innerHTML = `
      <span>${w.user} - ৳${w.amount} (${w.method})</span>
      <button class="btn secondary">Approve</button>
    `;
    div.querySelector("button").onclick = () => {
      w.status = "approved";
      list[i] = w;
      localStorage.setItem("bbz_withdraw_requests", JSON.stringify(list));
      pushNotification(
        "Withdraw Approved",
        `Your ৳${w.amount} withdraw has been approved`
      );
      renderWithdraws();
    };
    box.appendChild(div);
  });
}


renderWithdraws();

// ---- TASK REVIEW ----
const TASK_SUBMIT_KEY = "bbz_task_submissions";
const TASK_KEY = "bbz_tasks";

function getTasks() {
  return JSON.parse(localStorage.getItem(TASK_KEY) || "[]");
}

function getSubmissions() {
  return JSON.parse(localStorage.getItem(TASK_SUBMIT_KEY) || "{}");
}

function renderTaskReview() {
  const subs = getSubmissions();
  const tasks = getTasks();
  const box = document.getElementById("taskReview");
  box.innerHTML = "";

  const ids = Object.keys(subs);
  if (ids.length === 0) {
    box.innerHTML = "<p>No submissions</p>";
    return;
  }

  ids.forEach(id => {
    const s = subs[id];
    if (s.status !== "pending") return;

    const task = tasks.find(t => t.id == id);
    const div = document.createElement("div");
    div.className = "list-item";
    div.innerHTML = `
      <span>${task.title}<br><small>${s.proof}</small></span>
      <button class="btn secondary">Approve</button>
    `;
    div.querySelector("button").onclick = () => {
      s.status = "approved";
      subs[id] = s;
      localStorage.setItem(TASK_SUBMIT_KEY, JSON.stringify(subs));
      pushNotification("Task Approved", `"${task.title}" approved by admin`);
      renderTaskReview();
    };
    box.appendChild(div);
  });
}
// ---- TOURNAMENT WINNER ----
const TOURNAMENT_KEY = "bbz_tournaments";

function renderWinners() {
  const list = JSON.parse(localStorage.getItem(TOURNAMENT_KEY) || "[]");
  const box = document.getElementById("winnerBox");
  box.innerHTML = "";

  list.forEach(t => {
    const div = document.createElement("div");
    div.className = "list-item";
    div.innerHTML = `
      <span>${t.title}</span>
      <button class="btn secondary">Set Winner</button>
    `;
    div.querySelector("button").onclick = () => {
      const winner = prompt("Winner username?");
      if (!winner) return;
      t.winner = winner;
      localStorage.setItem(TOURNAMENT_KEY, JSON.stringify(list));
      pushNotification(
        "Tournament Result",
        `${winner} won "${t.title}"`
      );
      alert("Winner saved");
    };
    box.appendChild(div);
  });
  
}
renderWithdraws();
renderTaskReview();
renderWinners();
