//1. 박스 두개 만들기
//2. 드랍다운 리스트
//3. 환율정보 들고오기
//4. 드랍다운 리스트 선택
//5. 금액 입력 환전 금액 표시
//6. 드랍다운 리스트에서 아이템을 선택하면 다시 그 단위 기준으로 선택이 됨
//7. 숫자를 한국어로 변환
//8. 반대로 밑에 박스에서 숫자를 바꿔도 위에 박스로 환율 적용댐

let currencyRatio = {
  USD: {
    KRW: 1184,
    USD: 1,
    VND: 22972,
    unit: "달러",
  },
  KRW: {
    KRW: 1,
    USD: 0.00084,
    VND: 19.4,
    unit: "원",
  },
  VND: {
    KRW: 0.052,
    USD: 0.000044,
    VND: 1,
    unit: "동",
  },
};

var unitWords = ["", "만", "억", "조"];
var splitUnit = 10000;
let fromBtn = document.getElementById("from-btn");
let toBtn = document.getElementById("to-btn");
let fromInput = document.getElementById("from-input");
let toInput = document.getElementById("to-input");
let fromCurrency = "USD";
let toCurrency = "USD";
// 메뉴버튼 단위변경
document.querySelectorAll("#from-currency-list a").forEach((menu) =>
  menu.addEventListener("click", function () {
    fromBtn.innerHTML = this.innerHTML;
    fromCurrency = this.innerHTML;
    convert();
  })
);

document.querySelectorAll("#to-currency-list a").forEach((item) =>
  item.addEventListener("click", function () {
    toBtn.textContent = this.textContent;
    toCurrency = this.textContent;
    convert();
  })
);

function convert() {
  let amount = fromInput.value;
  let convertedAmount = amount * currencyRatio[fromCurrency][toCurrency];
  let fromAmount = document.getElementById("fromAmount");
  let toAmount = document.getElementById("toAmount");
  toInput.value = convertedAmount.toFixed(2);
  toAmount.innerHTML = convertedAmount.toFixed(2);
  if (fromCurrency === "USD") {
    fromAmount.innerHTML = `${amount}달러`;
  } else if (fromCurrency === "KRW") {
    fromAmount.innerHTML = `${amount}원`;
  } else if (fromCurrency === "VND") {
    fromAmount.innerHTML = `${amount}동`;
  }
}

function reverseConvert() {
  let amount = toInput.value;
  let convertedAmount = amount * currencyRatio[toCurrency][fromCurrency];
  fromInput.value = convertedAmount.toFixed(2);
  fromAmount.innerHTML = convertedAmount.toFixed(2);
  if (toCurrency === "USD") {
    toAmount.innerHTML = `${amount}달러`;
  } else if (toCurrency === "KRW") {
    toAmount.innerHTML = `${amount}원`;
  } else if (toCurrency === "VND") {
    toAmount.innerHTML = `${amount}동`;
  }
}

// 클릭시 focus테두리 
const fromInputArea = document.getElementById("from-input-area");
const toInputArea = document.getElementById("to-input-area");
fromInput.addEventListener("focus", () => fromInputArea.classList.add("focus"));
fromInput.addEventListener("blur", () => fromInputArea.classList.remove("focus"));
toInput.addEventListener("focus", () => toInputArea.classList.add("focus"));
toInput.addEventListener("blur", () => toInputArea.classList.remove("focus"));
