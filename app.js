document.addEventListener("DOMContentLoaded", function () {
  // Navigation: Wechsel zwischen den Abschnitten
  const navLinks = document.querySelectorAll("nav ul li a");
  const sections = document.querySelectorAll(".exercise-section");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      // Aktive Klassen zurücksetzen
      navLinks.forEach((l) => l.classList.remove("active"));
      sections.forEach((sec) => sec.classList.remove("active"));

      // Aktive Klasse für den geklickten Link und den zugehörigen Abschnitt setzen
      this.classList.add("active");
      const sectionId = this.getAttribute("data-section");
      document.getElementById(sectionId).classList.add("active");
    });
  });

  // Timer-Funktionalität für jede Übung
  const timers = {
    morning: {
      duration: 15 * 60, // 15 Minuten in Sekunden
      display: document.getElementById("morning-timer-display"),
      startBtn: document.getElementById("morning-start-btn"),
      stopBtn: document.getElementById("morning-stop-btn"),
    },
    afternoon: {
      duration: 10 * 60, // 10 Minuten in Sekunden
      display: document.getElementById("afternoon-timer-display"),
      startBtn: document.getElementById("afternoon-start-btn"),
      stopBtn: document.getElementById("afternoon-stop-btn"),
    },
    evening: {
      duration: 15 * 60, // 15 Minuten in Sekunden
      display: document.getElementById("evening-timer-display"),
      startBtn: document.getElementById("evening-start-btn"),
      stopBtn: document.getElementById("evening-stop-btn"),
    },
  };

  Object.keys(timers).forEach((key) => {
    const timer = timers[key];
    let intervalId = null;
    let remainingTime = timer.duration;

    function updateDisplay() {
      const minutes = Math.floor(remainingTime / 60);
      const seconds = remainingTime % 60;
      timer.display.textContent = `${String(minutes).padStart(2, "0")}:${String(
        seconds
      ).padStart(2, "0")}`;
    }

    function startTimer() {
      timer.startBtn.disabled = true;
      timer.stopBtn.disabled = false;
      intervalId = setInterval(() => {
        if (remainingTime > 0) {
          remainingTime--;
          updateDisplay();
        } else {
          clearInterval(intervalId);
          timer.startBtn.disabled = false;
          timer.stopBtn.disabled = true;
          alert("Zeit ist abgelaufen!");
          // Timer zurücksetzen
          remainingTime = timer.duration;
          updateDisplay();
        }
      }, 1000);
    }

    function stopTimer() {
      if (intervalId) {
        clearInterval(intervalId);
        timer.startBtn.disabled = false;
        timer.stopBtn.disabled = true;
      }
    }

    timer.startBtn.addEventListener("click", startTimer);
    timer.stopBtn.addEventListener("click", stopTimer);

    // Anzeige initialisieren
    updateDisplay();
  });
});
