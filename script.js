// script.js
const dobInput = document.getElementById("dob");
const calculateBtn = document.getElementById("calculate-btn");
const resultDiv = document.getElementById("result");
const countdownDiv = document.getElementById("countdown");
const zodiacDiv = document.getElementById("zodiac");
const funfactDiv = document.getElementById("funfact");
const downloadBtn = document.getElementById("download-btn");
const toggleThemeBtn = document.getElementById("toggle-theme");

const zodiacSigns = [
    { sign: "Capricorn", end: new Date(0, 0, 19) },
    { sign: "Aquarius", end: new Date(0, 1, 18) },
    { sign: "Pisces", end: new Date(0, 2, 20) },
    { sign: "Aries", end: new Date(0, 3, 19) },
    { sign: "Taurus", end: new Date(0, 4, 20) },
    { sign: "Gemini", end: new Date(0, 5, 20) },
    { sign: "Cancer", end: new Date(0, 6, 22) },
    { sign: "Leo", end: new Date(0, 7, 22) },
    { sign: "Virgo", end: new Date(0, 8, 22) },
    { sign: "Libra", end: new Date(0, 9, 22) },
    { sign: "Scorpio", end: new Date(0, 10, 21) },
    { sign: "Sagittarius", end: new Date(0, 11, 21) },
    { sign: "Capricorn", end: new Date(0, 11, 31) }
];

function calculateAge(dob) {
    const today = new Date();
    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    let days = today.getDate() - dob.getDate();

    if (days < 0) {
        months--;
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }
    return { years, months, days };
}

function getNextBirthday(dob) {
    const today = new Date();
    let next = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
    if (next < today) next.setFullYear(today.getFullYear() + 1);
    const diff = Math.ceil((next - today) / (1000 * 60 * 60 * 24));
    return diff;
}

function getZodiacSign(dob) {
    const month = dob.getMonth();
    const day = dob.getDate();
    const date = new Date(0, month, day);
    return zodiacSigns.find(z => date <= z.end).sign;
}

function getFunFact(years) {
    if (years > 30) return "You are older than Google!";
    if (years === 0) return "Welcome to the world, tiny human!";
    return `You have lived approximately ${years * 365} days!`;
}

function calculateAndDisplay(dob) {
    const age = calculateAge(dob);
    resultDiv.textContent = `You are ${age.years} years, ${age.months} months, and ${age.days} days old.`;

    const daysLeft = getNextBirthday(dob);
    countdownDiv.textContent = `Your next birthday is in ${daysLeft} days.`;

    zodiacDiv.textContent = `Your zodiac sign is ${getZodiacSign(dob)}.`;
    funfactDiv.textContent = getFunFact(age.years);
}

calculateBtn.addEventListener("click", () => {
    const dob = new Date(dobInput.value);
    if (!dobInput.value || dob > new Date()) {
        resultDiv.textContent = "Please enter a valid date of birth.";
        countdownDiv.textContent = zodiacDiv.textContent = funfactDiv.textContent = "";
        return;
    }
    localStorage.setItem("dob", dobInput.value);
    calculateAndDisplay(dob);
});

window.addEventListener("load", () => {
    dobInput.value = "";
    localStorage.removeItem("dob"); 
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
        document.body.classList.add("dark-mode");
        document.querySelector(".age-calculator").classList.add("dark-mode");
    }
});

downloadBtn.addEventListener("click", () => {
    const text = `${resultDiv.textContent}\n${countdownDiv.textContent}\n${zodiacDiv.textContent}\n${funfactDiv.textContent}`;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "age_result.txt";
    a.click();
    URL.revokeObjectURL(url);
});

toggleThemeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.querySelector(".age-calculator").classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
});
