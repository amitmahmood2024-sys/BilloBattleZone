const MISSION_KEY = "bbz_missions";
const CLAIM_KEY = "bbz_mission_claims";

// default missions
function seedMissions() {
  if (!localStorage.getItem(MISSION_KEY)) {
    const list = [
      { id: 1, title: "Login Today", type: "DAILY", coins: 10, bonus: 0 },
      { id: 2, title: "Join 1 Tournament", type: "DAILY", coins: 20, bonus: 0 },
      { id: 3, title: "Complete 3 Missions", type: "WEEKLY", coins: 50, bonus: 20 }
    ];
    localStorage.setItem(MISSION_KEY, JSON.stringify(list));
  }
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function weekKey() {
  const d = new Date();
  const onejan = new Date(d.getFullYear(), 0, 1);
  return d.getFullYear() + "-W" + Math.ceil((((d - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}

function getClaimKey(type) {
  return type === "DAILY" ? todayKey() : weekKey();
}

function getClaims() {
  return JSON.parse(localStorage.getItem(CLAIM_KEY) || "{}");
}

function saveClaims(c) {
  localStorage.setItem(CLAIM_KEY, JSON.stringify(c));
}

function getMissions() {
  seedMissions();
  return JSON.parse(localStorage.getItem(MISSION_KEY));
}

function claimMission(m) {
  const claims = getClaims();
  const key = m.type + "_" + getClaimKey(m.type) + "_" + m.id;

  if (claims[key]) {
    alert("Already claimed");
    return;
  }

  // reward
  if (m.coins) addCoins(m.coins);
  if (m.bonus) addBonus(m.bonus);

  claims[key] = true;
  saveClaims(claims);
  renderMissions();
}
pushNotification(
  "Mission Completed",
  `You earned ${m.coins || 0} coins${m.bonus ? " + bonus" : ""}`
);