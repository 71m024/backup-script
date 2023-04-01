import cleanup from "./cleanup.js";
import backup from "./backup.js";

// these intervals should be written from the ascending otherwise it is possible, that the script won't work properly
// `0D' is needed so the new backup isn't cleaned away instantly
const backupIntervals = ['0D', '1D', '2D', '3D', '1W', '2W', '1Y'];

// use slash at the end so only the content of the folder will be copied
const sourceDir = 'source/';
const destinationDir = 'backups';
// IMPORTANT the leading "/" represents the source folder
const excludedDirectories = [];

//for testing
const currentDate = new Date();
currentDate.setDate((new Date()).getDate() + 108);

backup(sourceDir, destinationDir, excludedDirectories, currentDate);
cleanup(destinationDir, backupIntervals, currentDate);
