export function getIdFromPermalink(permalink) {
  return permalink ? permalink.split('-')[0] : null;
}
