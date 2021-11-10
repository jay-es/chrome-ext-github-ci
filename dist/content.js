// @ts-check

/** @typedef {STATUS_OTHER|STATUS_DONE|STATUS_GOING} Status */
const STATUS_OTHER = "OTHER";
const STATUS_DONE = "DONE";
const STATUS_GOING = "GOING";

let prevPath = "";
/** @type {Status} */ let prevStatus = STATUS_OTHER;

const audio = new Audio(chrome.runtime.getURL("audio.mp3"));
audio.load();

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
    } else if ([TEXT_PASSED, TEXT_FAILED1, TEXT_FAILED2].includes(text)) {
      return STATUS_DONE;
    }
  }

  return STATUS_OTHER;
};

const exec = () => {
  const currentPath = document.location.pathname;
  const currentStatus = getCurrentStatus();

  if (
    prevPath === currentPath &&
    prevStatus === STATUS_GOING &&
    currentStatus === STATUS_DONE
  ) {
    audio.play();
  }

  prevPath = currentPath;
  prevStatus = currentStatus;
};

exec();
setInterval(exec, 5000);
