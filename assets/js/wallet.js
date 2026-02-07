const WALLET_KEY = "bbz_wallet";

function getWallet() {
  const w = localStorage.getItem(WALLET_KEY);
  if (w) return JSON.parse(w);

  // default wallet (first login)
  const init = { coins: 0, bonus: 0, balance: 0 };
  localStorage.setItem(WALLET_KEY, JSON.stringify(init));
  return init;
}

function saveWallet(w) {
  localStorage.setItem(WALLET_KEY, JSON.stringify(w));
}

function addCoins(n) {
  const w = getWallet();
  w.coins += n;
  saveWallet(w);
  renderWallet();
}

function addBonus(n) {
  const w = getWallet();
  w.bonus += n;
  saveWallet(w);
  renderWallet();
}

function addBalance(n) {
  const w = getWallet();
  w.balance += n;
  saveWallet(w);
  renderWallet();
}