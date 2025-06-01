const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (file.endsWith('.tsx')) {
      results.push(fullPath);
    }
  });
  return results;
}

function convertFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let newContent = content
    .replace(/: ?[a-zA-Z<>{}\[\]0-9| ,._]+/g, '') // Strip simple types
    .replace(/import .* from 'react';?/g, match => match.replace(/React.*/, 'React'));

  const newPath = filePath.replace(/\.tsx$/, '.jsx');
  fs.writeFileSync(newPath, newContent);
  fs.unlinkSync(filePath);
  console.log(`✔ Converted: ${filePath} → ${newPath}`);
}

const tsxFiles = walk('.');
tsxFiles.forEach(convertFile);