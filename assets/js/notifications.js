const NOTI_KEY = "bbz_notifications";

function getNotifications() {
  return JSON.parse(localStorage.getItem(NOTI_KEY) || "[]");
}

function saveNotifications(list) {
  localStorage.setItem(NOTI_KEY, JSON.stringify(list));
}

function pushNotification(title, message) {
  const list = getNotifications();
  list.unshift({
    id: Date.now(),
    title,
    message,
    read: false,
    time: new Date().toLocaleString()
  });
  saveNotifications(list);
  renderNotifications();
}

function markAllRead() {
  const list = getNotifications();
  list.forEach(n => n.read = true);
  saveNotifications(list);
  renderNotifications();
}