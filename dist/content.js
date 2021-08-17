// @ts-check

/** @typedef {STATUS_OTHER|STATUS_DONE|STATUS_GOING} Status */
const STATUS_OTHER = "OTHER";
const STATUS_DONE = "DONE";
const STATUS_GOING = "GOING";

let prevPath = "";
let currentPath = "";
/** @type {Status} */ let prevStatus = STATUS_OTHER;
/** @type {Status} */ let currentStatus = STATUS_OTHER;

const audio = new Audio(chrome.runtime.getURL("audio.mp3"));
audio.load();

const setCurrent = () => {
  const TEXT_PASSED = "All checks have passed";
  const TEXT_FAILED1 = "All checks have failed";
  const TEXT_FAILED2 = "Some checks were not successful";
  const TEXT_GOING = "Some checks haven’t completed yet";

  currentPath = document.location.pathname;
  currentStatus = STATUS_OTHER;

  document.querySelectorAll(".status-heading").forEach((el) => {
    const text = el.textContent;
    if (text === TEXT_GOING) {
      currentStatus = STATUS_GOING;
    } else if ([TEXT_PASSED, TEXT_FAILED1, TEXT_FAILED2].includes(text)) {
      currentStatus = STATUS_DONE;
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
    currentStatus === STATUS_DONE
  ) {
    audio.play();
  }

  prevPath = currentPath;
  prevStatus = currentStatus;
}, 5000);
