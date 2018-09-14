/**
 * isFunction helper
 * @param {Any} arg Argument to check if is a function type
 * @returns {Boolean} `true` if argument is a function and `false` otherwise
 */
function isFunction(arg) {
  return typeof arg === 'function';
}

/**
 * Timer Service
 * @param {Object} config Configuration object used for initialization
 * @param {Number} config.delay Interval time in seconds
 * @param {Boolean} config.countdown Indicates if timer should go up or down
 * @param {Function} config.onRun Fired in every second
 * @param {Function} config.onEnd Fired when the timer is finished
 */
const TimerService = ({
  delay = 3, countdown = true, onRun, onEnd,
}) => {
  let isRunning = true;
  let pauseEndTime = 0;
  let pauseStartTime = 0;
  let pauseTime = 0;
  let prevSecond = 0;
  let rAF = null;
  let startTime = null;

  function rAFRender(timestamp) {
    startTime = startTime || timestamp;

    if (!isRunning) {
      return false;
    }

    const timeElapsedSinceStart = timestamp - startTime - pauseTime;
    const secondsElapsedSinceStart = Math.floor(timeElapsedSinceStart / 1000);
    const currentSecond = countdown ? delay - secondsElapsedSinceStart : secondsElapsedSinceStart;
    console.log('ccc', currentSecond);

    if (prevSecond !== secondsElapsedSinceStart) {
      prevSecond = secondsElapsedSinceStart;

      if (isFunction(onRun)) {
        onRun(currentSecond);
      }

      if (secondsElapsedSinceStart >= delay) {
        stop();

        if (isFunction(onEnd)) {
          onEnd(currentSecond);
        }

        return false;
      }
    }

    rAF = window.requestAnimationFrame(rAFRender);

    return false;
  }

  function start() {
    if (!rAF) {
      isRunning = true;
      window.requestAnimationFrame(rAFRender);
    }
  }

  function pause() {
    isRunning = false;
    pauseStartTime = +new Date();
  }

  function resume() {
    if (rAF && !isRunning) {
      isRunning = true;
      pauseEndTime = +new Date();
      pauseTime += pauseEndTime - pauseStartTime;
      window.requestAnimationFrame(rAFRender);
    }
  }

  function stop() {
    window.cancelAnimationFrame(rAF);
    pauseEndTime = 0;
    pauseStartTime = 0;
    pauseTime = 0;
    rAF = null;
    startTime = null;
  }

  return Object.freeze({
    pause,
    resume,
    start,
    stop,
  });
};

export default TimerService;
