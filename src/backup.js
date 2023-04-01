import path from 'path';
import {format} from 'date-fns';
import {execSync} from 'child_process'

const backup = (sourceDir, destinationDir, excludePaths, currentDate = new Date()) => {

  // Create a date string in the format 'yyyy-mm-dd'
  const today = format(currentDate, 'yyyy-MM-dd');

  // Build the destination path with the current date as the folder name
  const destinationPath = path.join(destinationDir, today);

  // Construct rsync command with exclude options
  let rsyncCommand = `rsync -a --exclude={${excludePaths.join(',')}} ${sourceDir} ${destinationPath}`;

  // Execute rsync command
  execSync(rsyncCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error occurred: ${error}`);
      process.exit(1);
    }
    console.log(`Stdout: ${stdout}`);
    console.log(`Stderr: ${stderr}`);
  });
}

export default backup;
