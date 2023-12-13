// @ts-check

/** @typedef {STATUS_OTHER|STATUS_GOING|STATUS_PASSED|STATUS_FAILED} Status */
const STATUS_OTHER = "OTHER";
const STATUS_GOING = "GOING";
const STATUS_PASSED = "PASSED";
const STATUS_FAILED = "FAILED";

let prevPath = "";
/** @type {Status} */ let prevStatus = STATUS_OTHER;

const okSound = new Audio(chrome.runtime.getURL("ok.mp3"));
const ngSound = new Audio(chrome.runtime.getURL("ng.mp3"));
okSound.load();
ngSound.load();

/** @returns {Status} */
const getCurrentStatus = () => {
  for (const el of document.querySelectorAll(".status-heading")) {
    const text = el.textContent;
    if (text === "All checks have passed") return STATUS_PASSED;
    if (text === "All checks have failed") return STATUS_FAILED;
    if (text === "Some checks were not successful") return STATUS_FAILED;
    if (text === "Some checks haven’t completed yet") return STATUS_GOING;
  }

  return STATUS_OTHER;
};

const exec = () => {
  const currentPath = document.location.pathname;
  const currentStatus = getCurrentStatus();

  if (prevPath === currentPath && prevStatus === STATUS_GOING) {
    if (currentStatus === STATUS_PASSED) {
      okSound.play();
    } else if (currentStatus === STATUS_FAILED) {
      ngSound.play();
    }
  }

  prevPath = currentPath;
  prevStatus = currentStatus;
};

exec();
setInterval(exec, 2000);
