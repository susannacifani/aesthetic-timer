const { ipcRenderer } = require('electron');

document.getElementById('shrink-btn').addEventListener('click', () => {
  ipcRenderer.send('minimize-window');
});

document.getElementById('close-btn').addEventListener('click', () => {
  ipcRenderer.send('close-window');
});


/*document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('start-btn').addEventListener('click', () => {
      ipcRenderer.send('load-page-set-time');
    });
  });*/


  
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('start').addEventListener('click', () => {
      let time = parseInt(document.getElementById('time').innerText); // Ottieni il valore del timer
      ipcRenderer.send('load-countdown', time); // Invia il valore al main process
  });
});


// Se siamo in countdown.html, riceviamo il valore di `time` e avviamo il conto alla rovescia
ipcRenderer.on('set-time', (event, time) => {
  let seconds = time * 60; // Converti minuti in secondi
  const alarmSound = document.getElementById("alarm-sound"); // Seleziona l'audio

  function updateCountdown() {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;

    document.getElementById("countdown").innerText =
      `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;

    if (seconds > 0) {
      seconds--;
      setTimeout(updateCountdown, 1000);
    } else {
      // Quando il tempo scade, suona l'allarme
      alarmSound.play().catch(error => console.error("Errore nella riproduzione audio:", error));
    }
  }

  updateCountdown();
});
