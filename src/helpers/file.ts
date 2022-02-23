import {ANDROID, IOS} from 'src/config/const';

export function fileURICleaner(uri: string): string {
  let cleanedURI: string = uri;
  if (IOS) {
    if (uri.startsWith('file://')) {
      cleanedURI = uri.replace('file://', '');
      return cleanedURI;
    }
  }
  if (ANDROID) {
    if (!cleanedURI.startsWith('file://')) {
      cleanedURI = `file://${cleanedURI}`;
    }
    return cleanedURI;
  }
  return cleanedURI;
}
