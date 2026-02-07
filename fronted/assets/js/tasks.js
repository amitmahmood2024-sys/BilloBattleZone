const TASK_KEY = "bbz_tasks";
const TASK_SUBMIT_KEY = "bbz_task_submissions";

function seedTasks() {
  if (!localStorage.getItem(TASK_KEY)) {
    const list = [
      { id: 1, title: "Join Telegram Channel", reward: 30 },
      { id: 2, title: "Follow Facebook Page", reward: 20 },
      { id: 3, title: "Invite 3 Friends", reward: 50 },
      { id: 4, title: "Install Android App", reward: 40 }
    ];
    localStorage.setItem(TASK_KEY, JSON.stringify(list));
  }
}

function getTasks() {
  seedTasks();
  return JSON.parse(localStorage.getItem(TASK_KEY));
}

function getSubmissions() {
  return JSON.parse(localStorage.getItem(TASK_SUBMIT_KEY) || "{}");
}

function saveSubmissions(obj) {
  localStorage.setItem(TASK_SUBMIT_KEY, JSON.stringify(obj));
}

function submitTask(taskId) {
  const proof = prompt("Submit proof (URL or text):");
  if (!proof) return;

  const submissions = getSubmissions();
  submissions[taskId] = { proof, status: "pending" };
  saveSubmissions(submissions);

  alert("Task submitted! Pending approval (simulated).");
  renderTasks();
}

function claimTask(taskId) {
  const submissions = getSubmissions();
  const s = submissions[taskId];
  if (!s || s.status !== "pending") {
    alert("No submission found");
    return;
  }

  // simulate admin approval instantly (V1)
  s.status = "approved";
  saveSubmissions(submissions);

  const task = getTasks().find(t => t.id === taskId);
  addCoins(task.reward);
  alert("Task approved! Reward added to wallet");
  renderTasks();
}
pushNotification(
  "Task Approved",
  `You received ${task.reward} coins for completing "${task.title}"`
);