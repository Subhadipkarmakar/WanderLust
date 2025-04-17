const dns = require('dns');
const { promisify } = require('util');

// Set DNS servers to Google's public DNS
dns.setServers(['8.8.8.8', '8.8.4.4']);

const resolveTxt = promisify(dns.resolveTxt);
const resolve4 = promisify(dns.resolve4);
const resolve = promisify(dns.resolve);

async function checkDns() {
  try {
    console.log('Checking DNS resolution for MongoDB Atlas using Google DNS...');
    
    // Try to resolve the hostname directly
    console.log('Resolving cluster0.v0mi0fh.mongodb.net...');
    const addresses = await resolve('cluster0.v0mi0fh.mongodb.net');
    console.log('Addresses:', addresses);
    
    // Try to resolve TXT records
    console.log('Resolving TXT records for cluster0.v0mi0fh.mongodb.net...');
    const txtRecords = await resolveTxt('cluster0.v0mi0fh.mongodb.net');
    console.log('TXT records:', txtRecords);
    
  } catch (err) {
    console.error('DNS resolution error:', err);
  }
}

checkDns();