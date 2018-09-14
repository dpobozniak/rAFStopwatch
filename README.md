# rAFStopwatch
JS stopwatch timer service using requestAnimationFrame

### Usage:

```
import Timer from './rAFStopwatch.js';

// Initialize timer
const counter = Timer({
  countdown: false, // default `True`
  delay: 10,
  onRun: handleTimerRun,
  onEnd: handleTimerEnd,
});

/**
 * Fired on every second
 * @param  {Number} time Current time
 */
function handleTimerRun(time) {
  console.log(time);
}

/**
 * Fired when the timer is finished
 * @param  {Number} time Current time
 */
function handleTimerEnd(time) {
  console.log('Timer finished', time);
}
```

#### Available methods:

- `start` - starts timer for the first time or when has been stopped (reset)
- `stop` - resets timer so it can start from the beginning
- `pause` - pauses timer so it can be resumed from the same point later
- `resume` - resumes timer after being paused

```
document.querySelector('[data-element="start"]').addEventListener('click', () => counter.start());
document.querySelector('[data-element="stop"]').addEventListener('click', () => counter.stop());
document.querySelector('[data-element="pause"]').addEventListener('click', () => counter.pause());
document.querySelector('[data-element="resume"]').addEventListener('click', () => counter.resume());
```
