const fs = require('fs');
const crypto = require('crypto');

// Generate a new JWT_SECRET
const keyLengthInBytes = 32; // 256 bits for a strong secret key
const jwtSecret = crypto.randomBytes(keyLengthInBytes).toString('hex');
const sessionSecret = crypto.randomBytes(keyLengthInBytes).toString('hex');

// Read the existing .env.production file
const envFilePath = `${process.cwd()}/.env.production`;
const envData = fs.readFileSync(envFilePath, 'utf8');

// Update the JWT_SECRET value in .env.production
const updatedEnvData = envData
  .replace(/^JWT_SECRET=.*$/m, `JWT_SECRET=${jwtSecret}`)
  .replace(/^SESSION_SECRET=.*$/m, `SESSION_SECRET=${sessionSecret}`);

// Write the updated .env.production file
fs.writeFileSync(envFilePath, updatedEnvData);
