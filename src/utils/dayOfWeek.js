function dayOfWeek(day) {
  var week = new Array("일", "월", "화", "수", "목", "금", "토");

  var today = new Date(day).getDay();
  var todayLabel = week[today];

  return todayLabel;
}

function dayJsWeek(day) {
  switch (day) {
    case "Mo":
      return "월요일";
    case "Tu":
      return "화요일";
    case "We":
      return "수요일";
    case "Th":
      return "목요일";
    case "Fr":
      return "금요일";
    case "Sa":
      return "토요일";
    case "Su":
      return "일요일";
  }
}

// 금일, 이번주기간, 이번달 기간 구하기(검색 조건 setting시)
// return Array: [0]: 시작일, [1]: 종료일
const getPeriod = (type = "day") => {
  let res = [];
  switch (type) {
    case "today":
    case "day":
    case "d":
      let d = new Date();
      res = [
        `${d.getFullYear()}-${d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1}-${d.getDate() < 10 ? "0" + d.getDate() : d.getDate()}`,
        `${d.getFullYear()}-${d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1}-${d.getDate() < 10 ? "0" + d.getDate() : d.getDate()}`,
      ];
      break;
    case "w":
    case "week":
      let s = new Date();
      s.setDate(s.getDate() - s.getDay());

      let e = new Date();
      e.setDate(e.getDate() + (6 - e.getDay()));

      res = [
        `${s.getFullYear()}-${s.getMonth() + 1 < 10 ? "0" + (s.getMonth() + 1) : s.getMonth() + 1}-${s.getDate() < 10 ? "0" + s.getDate() : s.getDate()}`,
        `${e.getFullYear()}-${e.getMonth() + 1 < 10 ? "0" + (e.getMonth() + 1) : e.getMonth() + 1}-${e.getDate() < 10 ? "0" + e.getDate() : e.getDate()}`,
      ];
      break;
    case "m":
    case "month":
      let s2 = new Date();

      let e2 = new Date();
      e2.setMonth(e2.getMonth() + 1);
      e2.setDate(0);
      res = [
        `${s2.getFullYear()}-${s2.getMonth() + 1 < 10 ? "0" + (s2.getMonth() + 1) : s2.getMonth() + 1}-01`,
        `${e2.getFullYear()}-${e2.getMonth() + 1 < 10 ? "0" + (e2.getMonth() + 1) : e2.getMonth() + 1}-${e2.getDate() < 10 ? "0" + e2.getDate() : e2.getDate()}`,
      ];
      break;
  }

  return res;
};

export { dayOfWeek, dayJsWeek, getPeriod };
