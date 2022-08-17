function year(status) {
  const newYear = [];
  const year = new Date().getFullYear();
  for (let i = 2020; i <= year; i++) {
    newYear.push(i);
  }
  newYear.sort((a, b) => b - a);
  if (status !== "onlyYear") {
    newYear.unshift("전체");
  }
  return newYear;
}

function settlementYear(status) {
  const newYear = [];
  const year = new Date().getFullYear();
  for (let i = 2022; i <= year; i++) {
    newYear.push(i);
  }
  if (status !== "onlyYear") {
    newYear.unshift("전체");
  }
  return newYear;
}

// 년.월.일 시:분:초 얻기?
function getNow() {
  const date = new Date();
  let arr = [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()];

  arr = arr.map(item => (parseInt(item) < 10 ? `0${item}` : item));
  return `${arr[0]}.${arr[1]}.${arr[2]} ${arr[3]}:${arr[4]}:${arr[5]}`;
}

const calculateDate = (stringDate, oper, val) => {
  if ((stringDate || "") === "") {
    return "";
  }

  const date = new Date(stringDate);
  if (oper === "+") {
    date.setHours(date.getHours() + parseInt(val));
  }

  if (oper === "-") {
    date.setHours(date.getHours() - parseInt(val));
  }

  let arr = [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()];

  arr = arr.map(item => (parseInt(item) < 10 ? `0${item}` : item));
  return `${arr[0]}-${arr[1]}-${arr[2]} ${arr[3]}:${arr[4]}:${arr[5]}`;
};

export { year, getNow, calculateDate, settlementYear };
