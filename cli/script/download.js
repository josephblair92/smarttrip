// https://smarttrip.wmata.com/Account/Summary

const CARD_ID = "REPLACE_ME";
const NUM_MONTHS = 4;

const now = new Date();
const pad = (n) => n.toString().padStart(2, "0");
const formatDate = (date) =>
  `${pad(date.getMonth() + 1)}/${pad(date.getDate())}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
for (let i = -1; i >= -1 * NUM_MONTHS; i--) {
  const month = now.getMonth() + i;
  const startDate = new Date(now.getFullYear(), month, 1);
  const endDate = new Date(new Date(now.getFullYear(), month + 1, 1).getTime() - 1);
  const params = new URLSearchParams();
  params.set("StartDate", formatDate(startDate));
  params.set("EndDate", formatDate(endDate));
  params.set(
    "Month",
    `${startDate.getFullYear()}${pad(startDate.getMonth() + 1)}`,
  );
  params.set("Period", "M");
  params.set("TransactionStatus", "Successful");
  params.set("cardId", CARD_ID);
  const url = `https://smartrip.wmata.com/Card/UsageReport/GetExcel?${params.toString().replaceAll("+", "%20")}`;
  console.log(url);
  window.open(url, "_blank");
}
