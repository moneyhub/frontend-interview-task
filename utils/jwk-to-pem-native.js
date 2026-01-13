/**
 * JWK to PEM conversion utility using native Node.js crypto module
 * This replaces the need for the jwk-to-pem package
 * 
 * Requires Node.js 15+ for native JWK support
 */

const crypto = require('crypto');

/**
 * Convert a JWK (JSON Web Key) to PEM format using Node.js native crypto
 * @param {Object} jwk - The JWK object
 * @param {Object} options - Optional configuration
 * @param {boolean} options.private - Whether this is a private key (default: false)
 * @returns {string} PEM formatted key
 */
function jwkToPem(jwk, options = {}) {
  if (!jwk || typeof jwk !== 'object' || Array.isArray(jwk)) {
    throw new Error('JWK must be an object');
  }

  if (!jwk.kty) {
    throw new Error('JWK must have a kty (key type) property');
  }

  const isPrivate = options.private || false;

  try {
    // Determine if this is a private key by checking for private key components
    const hasPrivateComponents = jwk.d !== undefined;
    
    // Create appropriate KeyObject from the JWK
    const keyObject = hasPrivateComponents || isPrivate
      ? crypto.createPrivateKey({ key: jwk, format: 'jwk' })
      : crypto.createPublicKey({ key: jwk, format: 'jwk' });

    // Export to PEM format
    const pem = keyObject.export({
      type: hasPrivateComponents || isPrivate ? 'pkcs8' : 'spki',
      format: 'pem'
    });

    return pem;
  } catch (error) {
    throw new Error(`Failed to convert JWK to PEM: ${error.message}`);
  }
}

module.exports = jwkToPem;
// Also export as named export for compatibility
module.exports.jwkToPem = jwkToPem;
