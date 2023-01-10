import cp from 'child_process';

function seed() {
  return new Promise((resolve, reject) => {
    const seedProcess = cp.exec('cd ./server && npm run db:reseed');

    seedProcess.stderr.on('data', data => {
      console.error(`db:seed: ${data}`);
    });

    seedProcess.on('close', code => {
      if (code === 0) {
        resolve(true);
      } else {
        reject(new Error(`db:seed child process exited with code ${code}`));
      }
    });
  });
}

export default seed;
