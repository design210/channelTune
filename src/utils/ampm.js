function getTime(hour) {
  hour = hour.replace(/(^0+)/, "");
  let str = "";
  if (hour > 12) {
    str = "오후";
    hour = hour - 12;
  } else {
    str = "오전";
  }
  if (hour < 10) {
    hour = "0" + hour;
  }

  return str + " " + hour;
}
export default getTime;
