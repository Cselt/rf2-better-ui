import { readdirSync, readFileSync, unlinkSync, writeFileSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

console.log("Build Angular application");
execSync("npm run build", {stdio: 'inherit'});

console.log('Build better-ui script');
execSync('npm run build.scripts', {stdio: 'inherit'});

enum FileTypes {
  main = 'main',
  polyFills = 'polyfills',
  runtime = 'runtime'
}

const interestedFiles: string[] = ['main', 'polyfills', 'runtime'];

const hashes: { [key: string]: string } = {};

readdirSync('./dist/rf2-better-ui').forEach((file: string) => {
  const splits: string[] = file.split('.');
  switch (splits[0]) {
    case FileTypes.main:
      hashes[FileTypes.main] = splits[1];
      break;

    case FileTypes.polyFills:
      hashes[FileTypes.polyFills] = splits[1];
      break;

    case FileTypes.runtime:
      hashes[FileTypes.runtime] = splits[1];
      break;

    default:
      // Delete unnecessary file
      unlinkSync(join('./dist/rf2-better-ui', file));
  }
});

console.log('Read hash numbers', hashes);
let betterUi: string = readFileSync('./dist/scripts/better-ui.js', 'utf8');

Object.values(FileTypes).forEach((value: string) => {

  betterUi = betterUi.replace(`<${FileTypes.main}>`, hashes[FileTypes.main]);
  betterUi = betterUi.replace(`<${FileTypes.runtime}>`, hashes[FileTypes.runtime]);
  betterUi = betterUi.replace(`<${FileTypes.polyFills}>`, hashes[FileTypes.polyFills]);
});

writeFileSync("./dist/scripts/better-ui.js", betterUi, {encoding: 'utf8'});
