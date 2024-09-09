#! /usr/bin/env node
const execSync = require('child_process').execSync;
const fs = require('fs');

try {
  try {
    execSync('pnpm --version', { stdio: 'ignore' });
    console.log('pnpm is already installed');
  } catch {
    console.log('Installing pnpm globally...');
    execSync('npm install -g pnpm');
  }

  console.log('Running pnpm install...');
  execSync('pnpm install');

  console.log('Running pnpm audit fix...');
  execSync('pnpm audit --fix');

  console.log('Updating package.json...');
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  if (packageJson.pnpm && packageJson.pnpm.overrides) {
    packageJson.overrides = packageJson.pnpm.overrides;
    delete packageJson.pnpm.overrides;
    if (Object.keys(packageJson.pnpm).length === 0) {
      delete packageJson.pnpm;
    }
    fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
  }

  console.log('Removing package-lock.yaml...');
  if (fs.existsSync('pnpm-lock.yaml')) {
    fs.unlinkSync('pnpm-lock.yaml');
  }

  console.log('Running npm install...');
  execSync('npm install');

  console.log('All steps completed successfully!');
} catch (error) {
  console.error('An error occurred:', error.message);
}