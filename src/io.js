import Path from 'path';
import Fs from 'fs';

export const mkdirs = (dir) => {
  const initDir = Path.isAbsolute(dir) ? Path.sep : '';
  dir.split(Path.sep).reduce((parentDir, childDir) => {
    const curDir = Path.resolve(parentDir, childDir);
    if (Fs.existsSync(curDir) === false) {
      Fs.mkdirSync(curDir);
    }
    return curDir;
  }, initDir);
};

export const saveFile = (data, file) => {
  Fs.writeFileSync(file, JSON.stringify(data), 'utf8');
};

export const loadFile = (file) => {
  if (Fs.existsSync(file)) {
    return JSON.parse(Fs.readFileSync(file).toString());
  }
  return null;
};
