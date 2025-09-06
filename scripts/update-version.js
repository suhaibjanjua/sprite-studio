#!/usr/bin/env node

/**
 * Cache Busting Version Updater
 * 
 * This script automatically updates the version number for cache busting purposes.
 * It generates a version based on the current timestamp to ensure unique builds.
 */

const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(__dirname, '..', 'package.json');
const environmentPath = path.join(__dirname, '..', 'src', 'environments', 'environment.ts');
const environmentDevPath = path.join(__dirname, '..', 'src', 'environments', 'environment.development.ts');
const indexHtmlPath = path.join(__dirname, '..', 'src', 'index.html');

function generateVersion() {
  // Read current version from package.json
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    let currentVersion = packageJson.version || '1.0.0';
    
    // Remove any existing pre-release or build metadata
    currentVersion = currentVersion.split('-')[0].split('+')[0];
    
    // Parse semantic version
    const versionParts = currentVersion.split('.');
    let [major, minor, patch] = versionParts.map(Number);
    
    // Ensure we have valid numbers
    major = major || 1;
    minor = minor || 0;
    patch = patch || 0;
    
    // Auto-increment patch version for cache busting
    const newPatch = patch + 1;
    
    return `${major}.${minor}.${newPatch}`;
  } catch (error) {
    console.error('Error reading current version, using default:', error.message);
    return '1.0.1';
  }
}

function updatePackageJson(newVersion) {
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageJson.version = newVersion;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
    console.log(`✅ Updated package.json version to: ${newVersion}`);
    return true;
  } catch (error) {
    console.error('❌ Error updating package.json:', error.message);
    return false;
  }
}

function updateEnvironmentFile(filePath, newVersion) {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  Environment file not found: ${filePath}`);
      return false;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    
    // Update version in environment file
    const versionRegex = /version:\s*['"`]([^'"`]+)['"`]/;
    const buildTimeRegex = /buildTime:\s*['"`]([^'"`]+)['"`]/;
    const buildNumberRegex = /buildNumber:\s*['"`]([^'"`]+)['"`]/;
    const currentTime = new Date().toISOString();
    const buildNumber = new Date().getTime();
    
    if (versionRegex.test(content)) {
      content = content.replace(versionRegex, `version: '${newVersion}'`);
    } else {
      // Add version if it doesn't exist
      content = content.replace(
        /export const environment = {/,
        `export const environment = {\n  version: '${newVersion}',`
      );
    }
    
    if (buildTimeRegex.test(content)) {
      content = content.replace(buildTimeRegex, `buildTime: '${currentTime}'`);
    } else {
      // Add buildTime if it doesn't exist
      content = content.replace(
        /export const environment = {/,
        `export const environment = {\n  buildTime: '${currentTime}',`
      );
    }
    
    if (buildNumberRegex.test(content)) {
      content = content.replace(buildNumberRegex, `buildNumber: '${buildNumber}'`);
    } else {
      // Add buildNumber if it doesn't exist - insert after version line
      content = content.replace(
        new RegExp(`version: '${newVersion.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}',`),
        `version: '${newVersion}',\n  buildNumber: '${buildNumber}',`
      );
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Updated environment file: ${path.basename(filePath)}`);
    return true;
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
    return false;
  }
}

function updateIndexHtml(newVersion) {
  try {
    if (!fs.existsSync(indexHtmlPath)) {
      console.log(`⚠️  Index HTML file not found: ${indexHtmlPath}`);
      return false;
    }

    let content = fs.readFileSync(indexHtmlPath, 'utf8');
    const currentTime = new Date().toISOString();
    
    // Update version meta tag
    const versionRegex = /<meta name="build-version" content="[^"]*">/;
    const buildTimeRegex = /<meta name="build-time" content="[^"]*">/;
    
    if (versionRegex.test(content)) {
      content = content.replace(versionRegex, `<meta name="build-version" content="${newVersion}">`);
    }
    
    if (buildTimeRegex.test(content)) {
      content = content.replace(buildTimeRegex, `<meta name="build-time" content="${currentTime}">`);
    }
    
    fs.writeFileSync(indexHtmlPath, content);
    console.log(`✅ Updated index.html with version: ${newVersion}`);
    return true;
  } catch (error) {
    console.error(`❌ Error updating ${indexHtmlPath}:`, error.message);
    return false;
  }
}

function main() {
  const newVersion = generateVersion();
  console.log(`🚀 Updating version for cache busting: ${newVersion}`);
  console.log(`📅 Build timestamp: ${new Date().toISOString()}`);
  
  const results = [
    updatePackageJson(newVersion),
    updateEnvironmentFile(environmentPath, newVersion),
    updateEnvironmentFile(environmentDevPath, newVersion),
    updateIndexHtml(newVersion)
  ];
  
  if (results.every(result => result)) {
    console.log('✅ All files updated successfully!');
    console.log(`📦 New version: ${newVersion}`);
    process.exit(0);
  } else {
    console.error('❌ Some files failed to update');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { generateVersion, updatePackageJson, updateEnvironmentFile, updateIndexHtml };
