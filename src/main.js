import * as dotenv from 'dotenv'
dotenv.config()
import cleanup from "./cleanup.js";
import copy from "./copy.js";
import {exec} from "./util.js";

const preCopyCommand = process.env.PRE_COPY_COMMAND;
const copyCommand = process.env.COPY_COMMAND;
const destinationDir = process.env.DESTINATION_DIR || 'backups';
const sourceDir = process.env.SOURCE_DIR || 'source/';

if (preCopyCommand) {
  exec(preCopyCommand, 'PRE_COPY_COMMAND');
}

if (copyCommand) {
  exec(copyCommand);
} else {
  copy(
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
