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
  runtime = 'runtime',
  styles = 'styles'
}

const interestedFiles: string[] = ['main', 'polyfills', 'runtime', 'styles'];

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

    case FileTypes.styles:
      hashes[FileTypes.styles] = splits[1];
      break;
  }
});

// Delete unnecessary files
unlinkSync(join('./dist/rf2-better-ui/index.html'));
unlinkSync(join('./dist/rf2-better-ui/favicon.ico'));

console.log('Read hash numbers', hashes);
let betterUi: string = readFileSync('./dist/scripts/better-ui.js', 'utf8');

Object.values(FileTypes).forEach((value: string) => {

  betterUi = betterUi.replace(`<${FileTypes.main}>`, hashes[FileTypes.main]);
  betterUi = betterUi.replace(`<${FileTypes.runtime}>`, hashes[FileTypes.runtime]);
  betterUi = betterUi.replace(`<${FileTypes.polyFills}>`, hashes[FileTypes.polyFills]);
  betterUi = betterUi.replace(`<${FileTypes.styles}>`, hashes[FileTypes.styles]);
});

writeFileSync("./dist/scripts/better-ui.js", betterUi, {encoding: 'utf8'});
