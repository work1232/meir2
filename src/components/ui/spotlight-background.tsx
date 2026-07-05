/**
 * Site-wide "moving bubbles" background.
 *
 * Deliberately has NO JavaScript animation: the blob drift runs on pure CSS
 * keyframes (see .spotlight-* in index.css), which the browser composites on
 * the GPU with zero main-thread work per frame — this matters a lot for
 * overall site smoothness. Respects prefers-reduced-motion via CSS.
 */
const SpotlightBackground = () => {
  return (
    <div className="spotlight-container" aria-hidden="true">
      <div className="spotlight-overlay">
        <div className="spotlight spotlight-left" />
        <div className="spotlight spotlight-mid" />
        <div className="spotlight spotlight-right" />
      </div>
    </div>
  );
};

export default SpotlightBackground;
