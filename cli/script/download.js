const cardId = "REPLACE_ME";
const now = new Date();
const pad = (n) => n.toString().padStart(2, "0");
const formatDate = (date) =>
  `${pad(date.getMonth() + 1)}/${pad(date.getDate())}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
for (let i = now.getMonth() - 1; i > -6; i--) {
  const startDate = new Date(now.getFullYear(), i, 1);
  const endDate = new Date(new Date(now.getFullYear(), i + 1, 1).getTime() - 1);
  const params = new URLSearchParams();
  params.set("StartDate", formatDate(startDate));
  params.set("EndDate", formatDate(endDate));
  params.set(
    "Month",
    `${startDate.getFullYear()}${pad(startDate.getMonth() + 1)}`,
  );
  params.set("Period", "M");
  params.set("TransactionStatus", "Successful");
  params.set("cardId", cardId);
  const url = `https://smartrip.wmata.com/Card/UsageReport/GetExcel?${params.toString().replaceAll("+", "%20")}`;
  console.log(url);
  window.open(url, "_blank");
}
