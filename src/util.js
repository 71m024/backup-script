import {execSync} from "child_process";

export function exec(command, name = 'COMMAND') {
  console.log(`${name}: ${command}`);
  execSync(command, {stdio: 'inherit'});
}
