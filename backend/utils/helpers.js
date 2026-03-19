/**
 * backend/utils/helpers.js
 * Helper functions
 */

/**
 * แปลง duration (วินาที) เป็นรูปแบบ mm:ss
 */
function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

module.exports = {
  formatDuration
};
