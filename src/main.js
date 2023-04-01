import * as dotenv from 'dotenv'
dotenv.config()
import cleanup from "./cleanup.js";
import backup from "./backup.js";
import {execSync} from "child_process";

const backupCommand = process.env.BACKUP_COMMAND;
if (backupCommand) {
  execSync(backupCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error occurred: ${error}`);
      process.exit(1);
    }
    console.log(`Stdout: ${stdout}`);
    console.log(`Stderr: ${stderr}`);
  });
} else {
  backup(
    process.env.SOURCE_DIR,
    process.env.DESTINATION_DIR,
    process.env.EXCLUDED?.split(' ') || [],
    new Date()
  );
}

cleanup(
  process.env.DESTINATION_DIR,
  process.env.INTERVALS.split(' '),
  new Date()
);
