import fs from 'fs';
import path from 'path';

/**
 * Clears all files from the upload directory.
 */
export async function clearUploadFolder() {
  // Define the upload directory path
  const uploadDir = path.join(__dirname, '../uploads');

  // Read all files in the upload directory
  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      console.error('Error reading upload directory:', err);
      return;
    }

    // Iterate through each file and delete it
    files.forEach(file => {
      const filePath = path.join(uploadDir, file);

      fs.unlink(filePath, err => {
        if (err) {
          console.error('Error deleting file:', file, err);
        }
      });
    });
  });
}
