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
  const TEXT_PASSED = "All checks have passed";
  const TEXT_FAILED1 = "All checks have failed";
  const TEXT_FAILED2 = "Some checks were not successful";
  const TEXT_GOING = "Some checks haven’t completed yet";

  for (const el of document.querySelectorAll(".status-heading")) {
    const text = el.textContent;
    if (text === TEXT_GOING) {
      return STATUS_GOING;
    } else if (text === TEXT_PASSED) {
      return STATUS_PASSED;
    } else if ([TEXT_FAILED1, TEXT_FAILED2].includes(text)) {
      return STATUS_FAILED;
    }
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
