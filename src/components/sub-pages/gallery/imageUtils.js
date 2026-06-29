// Matches the `-Z 800` resize used by generateThumbnails.mjs — the thumbnail's
// longest edge is capped at this many pixels.
export const THUMB_MAX_DIM = 800;

// Thumbnails aren't stored with their own w/h, but sips -Z preserves aspect
// ratio while capping the longest edge, so we can derive it from the original.
export function getThumbDimensions(naturalW, naturalH) {
  if (naturalW >= naturalH) {
    return { width: THUMB_MAX_DIM, height: Math.round((naturalH / naturalW) * THUMB_MAX_DIM) };
  }
  return { width: Math.round((naturalW / naturalH) * THUMB_MAX_DIM), height: THUMB_MAX_DIM };
}

// For photographic content, sharpness gains above 2x device pixel ratio are
// not perceptible but the bandwidth cost is real (most responsive-image
// services, e.g. Cloudinary/Imgix, cap srcset selection the same way). At an
// uncapped DPR (3x on most modern phones), the 800px thumbnail never wins
// against any real photo in this gallery — capping is what makes the
// thumbnail a usable choice on mobile instead of a dead code path.
export const QUALITY_DPR_CAP = 2;

// Picks the smallest available source that still covers the pixels actually
// needed on screen (display size * device pixel ratio, capped for quality).
export function pickOptimalSrc(item, displayWidthCss, dpr = 1) {
  if (!item.thumbSrc) return item.src;
  const neededPx = displayWidthCss * Math.min(dpr, QUALITY_DPR_CAP);
  const { width: thumbWidth } = getThumbDimensions(item.w, item.h);
  return neededPx <= thumbWidth ? item.thumbSrc : item.src;
}

// CSS width an image would render at under object-fit: contain inside a box
// bounded by maxWidthRatio/maxHeightRatio of the viewport.
export function getContainedWidth(naturalW, naturalH, viewport, { maxWidthRatio = 0.9, maxHeightRatio = 0.85 } = {}) {
  const maxW = viewport.width * maxWidthRatio;
  const maxH = viewport.height * maxHeightRatio;
  const ratio = naturalW / naturalH;
  return Math.min(maxW, maxH * ratio);
}
