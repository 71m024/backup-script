import * as dotenv from 'dotenv'
dotenv.config()
import cleanup from "./cleanup.js";
import backup from "./backup.js";
import {execSync} from "child_process";
import path from 'path';

const backupCommand = process.env.BACKUP_COMMAND;
const destinationDir = process.env.DESTINATION_DIR || 'backups';
const sourceDir = process.env.SOURCE_DIR || 'source/';

if (backupCommand) {
  console.log(path.resolve(backupCommand));
  execSync(path.resolve(backupCommand), (error, stdout, stderr) => {
    if (error) {
      console.error(`Error occurred: ${error}`);
      process.exit(1);
    }
    console.log(`Stdout: ${stdout}`);
    console.log(`Stderr: ${stderr}`);
  });
} else {
  console.log(`copy ${sourceDir} to ${destinationDir}`)
  backup(
    sourceDir,
    destinationDir,
    process.env.EXCLUDED?.split(' ') || [],
    new Date()
  );
}

console.log('do the cleanup');
cleanup(
  destinationDir,
  process.env.INTERVALS.split(' ') || [],
  new Date()
);
