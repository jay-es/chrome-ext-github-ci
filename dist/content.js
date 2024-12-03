// @ts-check

/** @typedef {STATUS_OTHER|STATUS_GOING|STATUS_PASSED|STATUS_FAILED} Status */
const STATUS_OTHER = "OTHER";
const STATUS_GOING = "GOING";
const STATUS_PASSED = "PASSED";
const STATUS_FAILED = "FAILED";

let prevPath = "";
/** @type {Status} */ let prevStatus = STATUS_OTHER;

/** @returns {Status} */
const getCurrentStatus = () => {
  const selectors = ".merge-pr .status-heading, .merge-pr [class*=Heading]";
  for (const el of document.querySelectorAll(selectors)) {
    const text = el.textContent;
    if (text === "All checks have passed") return STATUS_PASSED;
    if (text === "All checks have failed") return STATUS_FAILED;
    if (text === "Some checks were not successful") return STATUS_FAILED;
    if (text === "Some checks haven’t completed yet") return STATUS_GOING; // .status-heading
    if (text === "Some checks haven't completed yet") return STATUS_GOING; // .prc-Heading-Heading-*
  }

  return STATUS_OTHER;
};

/** @param {string} filename */
const playSound = (filename) =>
  new Audio(chrome.runtime.getURL(filename)).play();

const exec = () => {
  const currentPath = document.location.pathname;
  const currentStatus = getCurrentStatus();

  if (prevPath === currentPath && prevStatus === STATUS_GOING) {
    if (currentStatus === STATUS_PASSED) {
      playSound("ok.mp3");
    } else if (currentStatus === STATUS_FAILED) {
      playSound("ng.mp3");
    }
  }

  prevPath = currentPath;
  prevStatus = currentStatus;
};

exec();
setInterval(exec, 2000);
