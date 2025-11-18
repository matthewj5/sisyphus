import app from './app.js';
import { env } from './config/env.js';

function main() {
  app.listen(env.PORT, () => {
    console.log(`🪨 Sisyphus backend is running at http://localhost:${env.PORT}`);
    console.log('Making hard deadlines...');
  });
}

main();
