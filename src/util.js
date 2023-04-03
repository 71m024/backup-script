import {execSync} from "child_process";
import path from "path";

export function exec(command, name = 'COMMAND') {
  console.log(`${name}: ${command}`);
  execSync(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error occurred: ${error}`);
      process.exit(1);
    }
    console.log(`Stdout: ${stdout}`);
    console.log(`Stderr: ${stderr}`);
  });
}
