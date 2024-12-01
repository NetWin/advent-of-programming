import * as fs from 'fs';
import * as path from 'path';

export function getFolders(src: string): Array<string> {
  return fs.readdirSync(src).filter((file) => fs.statSync(path.join(src, file)).isDirectory());
}
