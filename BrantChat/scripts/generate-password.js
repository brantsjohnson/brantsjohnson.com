const bcrypt = require('bcryptjs');

// Generate access code hashes for multiple companies
const accessCodes = {
  'google': 'google123',
  'microsoft': 'microsoft123',
  'apple': 'apple123',
  'admin': 'password'
};

const saltRounds = 10;

console.log('🔐 Generating access code hashes for BrantChat...\n');

Object.entries(accessCodes).forEach(([company, accessCode]) => {
  bcrypt.hash(accessCode, saltRounds, (err, hash) => {
    if (err) {
      console.error(`Error generating hash for ${company}:`, err);
      return;
    }
    
    console.log(`${company.toUpperCase()}:`);
    console.log(`  Access Code: ${accessCode}`);
    console.log(`  Hash: ${hash}`);
    console.log('');
  });
});

console.log('📝 Copy these hashes to the COMPANY_PASSWORDS object in app/api/auth/route.ts');
console.log('⚠️  Remember to change these default access codes before going live!');
