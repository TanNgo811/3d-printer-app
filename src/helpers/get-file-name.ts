export function getFileName(url: string, includeExtension: boolean) {
  let matches =
    url &&
    typeof url.match === 'function' &&
    url.match(/\/?([^/.]*)\.?([^/]*)$/);
  if (!matches) {
    return null;
  }

  if (includeExtension && matches.length > 2 && matches[2]) {
    return matches.slice(1).join('.');
  }
  return matches[1];
}
