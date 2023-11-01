const fs = require('fs');
const crypto = require('crypto');

// Check if NODE_ENV is set to "production"
const nodeEnv = process.env.NODE_ENV;

if (nodeEnv && nodeEnv.trim().toLowerCase() === 'production') {
  // Generate a new SECRET_KEY
  const keyLengthInBytes = 32; // 256 bits for a strong secret key
  const secretKey = crypto.randomBytes(keyLengthInBytes).toString('hex');

  // Read the existing .env.production file
  const envFilePath = '.env.production';
  const envData = fs.readFileSync(envFilePath, 'utf8');

  // Update the SECRET_KEY value in .env.production
  const updatedEnvData = envData.replace(/^SECRET_KEY=.*$/m, `SECRET_KEY=${secretKey}`);

  // Write the updated .env.production file
  fs.writeFileSync(envFilePath, updatedEnvData);
}
