const passwordInput = document.getElementById("password");
const strengthBar = document.querySelector(".strength-bar span");
const toggleBtn = document.querySelector(".toggle-btn");
const strengthLabel = document.getElementById("strengthLabel");
const crackTimeEl = document.getElementById("crackTime");


const rules = [/.{8,}/, /[0-9]/, /[.!@#$%^&*]/, /[a-z]/, /[A-Z]/];

const strengthStyles = [
  { width: "0%", color: "#fff0", label: "" },
  { width: "20%", color: "#ff0000", label: "Very Weak" },
  { width: "40%", color: "#ED7020", label: "Weak" },
  { width: "60%", color: "#E38621", label: "Medium" },
  { width: "80%", color: "#A7CC28", label: "Strong" },
  { width: "100%", color: "#008000", label: "Very Strong" }
];

function estimateCrackTime(password) {
  let charsetSize = 0;
  if (/[a-z]/.test(password)) charsetSize += 26;
  if (/[A-Z]/.test(password)) charsetSize += 26;
  if (/[0-9]/.test(password)) charsetSize += 10;
  if (/[.!@#$%^&*]/.test(password)) charsetSize += 32;

  const combinations = Math.pow(charsetSize, password.length);
  const guessesPerSecond = 1e10; // Example: 10 billion guesses/sec
  const seconds = combinations / guessesPerSecond;

  if (seconds < 60) return `${Math.round(seconds)} seconds`;
  if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
  if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
  return `${Math.round(seconds / 31536000)} years`;
}

passwordInput.addEventListener("input", () => {
  const value = passwordInput.value;
  const strength = rules.reduce((count, rule) => count + rule.test(value), 0);

  strengthBar.style.width = strengthStyles[strength].width;
  strengthBar.style.background = strengthStyles[strength].color;
  strengthLabel.textContent = strengthStyles[strength].label;

  crackTimeEl.textContent = estimateCrackTime(value);
});


toggleBtn.addEventListener("click", () => {
  const isHidden = passwordInput.type === "password";
  passwordInput.type = isHidden ? "text" : "password";
  toggleBtn.textContent = isHidden ? "🙈 Hide password" : "👁 Show password";
});