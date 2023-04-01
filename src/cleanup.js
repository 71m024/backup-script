import fs from "fs";
import path from "path";

const cleanup = (backupDir, backupIntervals, currentDate = new Date()) => {

  // Keep track of which backups have been assigned to an interval
  const assignedBackups = new Set();

  // Read the backup folders from the file system
  const backups = [];
  const backupFolderNames = fs.readdirSync(backupDir);
  backupFolderNames.forEach(folderName => {
    const folderPath = path.join(backupDir, folderName);
    if (fs.statSync(folderPath).isDirectory()) {
      const dateParts = folderName.split('-');
      const backupDate = new Date(dateParts[0], dateParts[1] - 1, parseInt(dateParts[2]) + 1);
      backups.push({ path: folderPath, date: backupDate });
    }
  });

  // Loop through each backup interval and assign the closest backup to it
  backupIntervals.reverse().forEach(interval => {

    // Parse the interval value and unit
    const value = parseInt(interval.substring(0, interval.length - 1));
    const unit = interval.charAt(interval.length - 1);

    // Calculate the date for this backup interval
    let backupDate = new Date(currentDate.getTime());
    switch (unit) {
      case 'D':
        backupDate.setDate(backupDate.getDate() - value);
        break;
      case 'W':
        backupDate.setDate(backupDate.getDate() - value * 7);
        break;
      case 'M':
        backupDate.setMonth(backupDate.getMonth() - value);
        break;
      case 'Y':
        backupDate.setFullYear(backupDate.getFullYear() - value);
        break;
      default:
        break;
    }

    // Find the closest backup that has not already been assigned
    let closestBackup = null;
    let closestDistance = Infinity;
    backups.forEach(backup => {
      if (!assignedBackups.has(backup)) {
        const backupDateDiff = Math.abs(backup.date.getTime() - backupDate.getTime());
        if (backupDateDiff < closestDistance) {
          closestBackup = backup;
          closestDistance = backupDateDiff;
        }
      }
    });

    // Assign the closest backup to this interval
    if (closestBackup) {
      closestBackup.interval = interval;
      assignedBackups.add(closestBackup);
    }
  });

  // delete the backups which aren't assigned to an interval
  const backupsToDelete = backups.filter(backup => !backup.interval);
  backupsToDelete.forEach(backup => {
    if (fs.existsSync(backup.path)) {
      fs.rmSync(backup.path, { recursive: true });
      console.log(`Deleted useless backup ${backup.path}`);
    }
  });
}

export default cleanup;
