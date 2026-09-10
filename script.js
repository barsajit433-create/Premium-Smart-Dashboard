
let is24 = false;


/* =========================================
   TOGGLE 12 / 24 HOUR FORMAT
   ========================================= */

function toggleFormat() {

    is24 = !is24;

    updateClock();

}


/* =========================================
   UPDATE CLOCK
   ========================================= */

function updateClock() {

    const now = new Date();

    const timezone =
        Intl.DateTimeFormat()
            .resolvedOptions()
            .timeZone;


    let hours = now.getHours();

    const minutes =
        String(now.getMinutes())
            .padStart(2, "0");

    const seconds =
        String(now.getSeconds())
            .padStart(2, "0");

    let period = "";


    /* 12-HOUR FORMAT */

    if (!is24) {

        period =
            hours >= 12
                ? " PM"
                : " AM";

        hours = hours % 12 || 12;
    }


    hours =
        String(hours)
            .padStart(2, "0");


    /* CLOCK */

    document.getElementById("clock").innerHTML =
        `${hours}<span class="blink">:</span>${minutes}<span class="blink">:</span>${seconds}${period}`;


    /* DATE */

    document.getElementById("date").textContent =
        now.toLocaleDateString(
            undefined,
            {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        );


    /* TIMEZONE */

    document.getElementById("timezone").textContent =
        timezone;

}


/* =========================================
   KEYBOARD CONTROL
   ========================================= */

document
    .getElementById("clock")
    .addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                toggleFormat();

            }

        }
    );


/* =========================================
   START CLOCK
   ========================================= */

updateClock();


/* =========================================
   UPDATE EVERY SECOND
   ========================================= */

setInterval(updateClock, 1000);

