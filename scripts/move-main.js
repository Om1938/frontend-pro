const fs = require("fs");
const path = require("path");

const sourceDirectory = path.join(__dirname, "../landing");
const destinationDirectory = path.join(__dirname, "../dist");

// Function to copy files
function copyFile(source, destination) {
  fs.copyFileSync(source, destination);
  console.log(`Copied ${source} to ${destination}`);
}

// Function to delete the contents of a directory
function deleteDirectoryContents(directory) {
  if (fs.existsSync(directory)) {
    const files = fs.readdirSync(directory);

    files.forEach((file) => {
      const fullPath = path.join(directory, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        deleteDirectoryContents(fullPath); // Recursive call for subdirectories
        fs.rmdirSync(fullPath); // Remove the empty directory
      } else {
        fs.unlinkSync(fullPath); // Delete file
      }
    });
  }
}

// Function to recursively copy files
function copyFilesRecursively(source, destination) {
  const files = fs.readdirSync(source);

  files.forEach((file) => {
    const fullSourcePath = path.join(source, file);
    const fullDestinationPath = path.join(destination, file);
    const stat = fs.statSync(fullSourcePath);

    if (stat.isDirectory()) {
      if (!fs.existsSync(fullDestinationPath)) {
        fs.mkdirSync(fullDestinationPath);
      }
      copyFilesRecursively(fullSourcePath, fullDestinationPath); // Recursive call
    } else {
      copyFile(fullSourcePath, fullDestinationPath); // Copy file
    }
  });
}

// Clear the destination directory first
deleteDirectoryContents(destinationDirectory);

// Create destination directory if it does not exist
if (!fs.existsSync(destinationDirectory)) {
  fs.mkdirSync(destinationDirectory, { recursive: true });
}

// Start the copying process
copyFilesRecursively(sourceDirectory, destinationDirectory);
