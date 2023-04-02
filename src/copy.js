import path from 'path';
import {format} from 'date-fns';
import {execSync} from 'child_process'
import {exec} from "./util.js";

const copy = (sourceDir, destinationDir, excludePaths, currentDate = new Date()) => {

  // Create a date string in the format 'yyyy-mm-dd'
  const today = format(currentDate, 'yyyy-MM-dd');

  // Build the destination path with the current date as the folder name
  const destinationPath = path.join(destinationDir, today);

  excludePaths = excludePaths.map(p => '--exclude=\'' + p + '\'');

  // Construct rsync command with exclude options
  let rsyncCommand = `rsync -a ${excludePaths.join(' ')} ${sourceDir} ${destinationPath}`;

  // Execute rsync command
  exec(rsyncCommand, 'COPY_COMMAND');
}

export default copy;
