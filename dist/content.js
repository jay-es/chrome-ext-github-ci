// @ts-check

/** @typedef {STATUS_OTHER|STATUS_PASSED|STATUS_GOING} Status */
const STATUS_OTHER = "OTHER";
const STATUS_PASSED = "PASSED";
const STATUS_GOING = "GOING";

let prevPath = "";
let currentPath = "";
/** @type {Status} */ let prevStatus = STATUS_OTHER;
/** @type {Status} */ let currentStatus = STATUS_OTHER;

const setCurrent = () => {
  const TEXT_PASSED = "All checks have passed";
  const TEXT_GOING = "Some checks haven’t completed yet";

  currentPath = document.location.pathname;
  currentStatus = STATUS_OTHER;

  document.querySelectorAll(".status-heading").forEach((el) => {
    const text = el.textContent;
    if (text === TEXT_PASSED) {
      currentStatus = STATUS_PASSED;
    } else if (text === TEXT_GOING) {
      currentStatus = STATUS_GOING;
    }
  });
};

// init
setCurrent();

setInterval(() => {
  setCurrent();

  if (
    prevPath === currentPath &&
    prevStatus === STATUS_GOING &&
    currentStatus === STATUS_PASSED
  ) {
    const url = chrome.runtime.getURL("audio.mp3");
    const audio = new Audio(url);
    audio.play();
  }

  prevPath = currentPath;
  prevStatus = currentStatus;
}, 5000);
