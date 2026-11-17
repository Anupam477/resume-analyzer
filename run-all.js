const { spawn } = require('child_process');
const path = require('path');

const rootDir = __dirname;
const backendDir = path.join(rootDir, 'backend');
const frontendDir = path.join(rootDir, 'resume-project');
const viteBin = path.join(frontendDir, 'node_modules', 'vite', 'bin', 'vite.js');

console.log('\n======================================================');
console.log('🚀 Starting Resume Analyzer Full-Stack Application...');
console.log('======================================================\n');

// 1. Backend Server
const backend = spawn(process.execPath, ['server.js'], {
  cwd: backendDir,
  env: { ...process.env, PORT: process.env.PORT || '5000' }
});

backend.stdout.on('data', (data) => {
  process.stdout.write(`[Backend] ${data}`);
});

backend.stderr.on('data', (data) => {
  process.stderr.write(`[Backend ERROR] ${data}`);
});

// 2. Frontend Vite Dev Server
const frontend = spawn(process.execPath, [viteBin], {
  cwd: frontendDir
});

frontend.stdout.on('data', (data) => {
  process.stdout.write(`[Frontend] ${data}`);
});

frontend.stderr.on('data', (data) => {
  process.stderr.write(`[Frontend ERROR] ${data}`);
});

function cleanup() {
  console.log('\n🛑 Stopping servers...');
  try { backend.kill(); } catch (e) {}
  try { frontend.kill(); } catch (e) {}
  process.exit(0);
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
