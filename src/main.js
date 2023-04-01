import cleanup from "./cleanup.js";
import backup from "./backup.js";
import {execSync} from "child_process";

// these intervals must be ordered ascending otherwise it is possible, that the script won't work properly
// `0D' is needed so the new backup isn't cleaned away instantly
const backupIntervals = ['0D', '1D', '2D', '3D', '1W', '2W', '1M', '2M', '3M', '6M', '1Y', '2Y', '3Y', '10Y', '20Y', '30Y', '100Y'];

// use slash at the end so only the content of the folder will be copied
const sourceDir = 'source/';
const destinationDir = 'backups';
// IMPORTANT the leading "/" represents the source folder
const excludedDirectories = [];

const preBackup = null;

if (preBackup) {
  execSync(preBackup, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error occurred: ${error}`);
      process.exit(1);
    }
    console.log(`Stdout: ${stdout}`);
    console.log(`Stderr: ${stderr}`);
  });
}

backup(sourceDir, destinationDir, excludedDirectories, new Date());
cleanup(destinationDir, backupIntervals, new Date());
