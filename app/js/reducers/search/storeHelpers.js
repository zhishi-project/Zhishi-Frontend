export function loadSearchResults(state, results) {
  return [...state, ...results.reverse()];
}
