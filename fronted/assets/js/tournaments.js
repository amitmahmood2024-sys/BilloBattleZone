const TOURNAMENT_KEY = "bbz_tournaments";
const JOINED_KEY = "bbz_joined_tournaments";

// default tournaments (V1)
function seedTournaments() {
  if (!localStorage.getItem(TOURNAMENT_KEY)) {
    const list = [
      { id: 1, title: "Free Fire Solo", entry: "FREE", cost: 0 },
      { id: 2, title: "PUBG Duo", entry: "COIN", cost: 10 },
      { id: 3, title: "COD Mobile Squad", entry: "COIN", cost: 20 }
    ];
    localStorage.setItem(TOURNAMENT_KEY, JSON.stringify(list));
  }
}

function getTournaments() {
  seedTournaments();
  return JSON.parse(localStorage.getItem(TOURNAMENT_KEY));
}

function getJoined() {
  return JSON.parse(localStorage.getItem(JOINED_KEY) || "[]");
}

function saveJoined(list) {
  localStorage.setItem(JOINED_KEY, JSON.stringify(list));
}

function joinTournament(id) {
  const joined = getJoined();
  if (joined.includes(id)) {
    alert("Already joined");
    return;
  }

  const t = getTournaments().find(x => x.id === id);
  const w = getWallet();

  if (t.entry === "COIN") {
    if (w.coins < t.cost) {
      alert("Not enough coins");
      return;
    }
    w.coins -= t.cost;
    saveWallet(w);
    renderWallet();
  }

  joined.push(id);
  saveJoined(joined);
  renderTournaments();
}
pushNotification(
  "Tournament Joined",
  `You successfully joined "${t.title}"`
);