/**
 * JWK to PEM conversion utilities using native Node.js crypto module
 * This replaces the need for the jwk-to-pem package
 * 
 * Requires Node.js 15+ for native JWK support
 */

const crypto = require('crypto');

/**
 * Convert a JWK (JSON Web Key) to PEM format using Node.js native crypto
 * @param {Object} jwk - The JWK object
 * @param {string} jwk.kty - Key type (RSA, EC, etc.)
 * @param {boolean} isPrivate - Whether this is a private key (default: false)
 * @returns {string} PEM formatted key
 */
function jwkToPem(jwk, isPrivate = false) {
  if (!jwk || typeof jwk !== 'object') {
    throw new Error('JWK must be an object');
  }

  if (!jwk.kty) {
    throw new Error('JWK must have a kty (key type) property');
  }

  try {
    // Create a KeyObject from the JWK
    const keyObject = crypto.createPublicKey({
      key: jwk,
      format: 'jwk'
    });

    // Export to PEM format
    const pem = keyObject.export({
      type: isPrivate ? 'pkcs8' : 'spki',
      format: 'pem'
    });

    return pem;
  } catch (error) {
    throw new Error(`Failed to convert JWK to PEM: ${error.message}`);
  }
}

/**
 * Convert a private JWK to PEM format
 * @param {Object} jwk - The private JWK object
 * @returns {string} PEM formatted private key
 */
function jwkToPrivatePem(jwk) {
  if (!jwk || typeof jwk !== 'object') {
    throw new Error('JWK must be an object');
  }

  if (!jwk.kty) {
    throw new Error('JWK must have a kty (key type) property');
  }

  try {
    // Create a KeyObject from the private JWK
    const keyObject = crypto.createPrivateKey({
      key: jwk,
      format: 'jwk'
    });

    // Export to PEM format
    const pem = keyObject.export({
      type: 'pkcs8',
      format: 'pem'
    });

    return pem;
  } catch (error) {
    throw new Error(`Failed to convert private JWK to PEM: ${error.message}`);
  }
}

/**
 * Verify a JWT using a JWK without converting to PEM first
 * This is more efficient than converting to PEM
 * @param {string} token - The JWT to verify
 * @param {Object} jwk - The JWK to verify against
 * @returns {Object} Decoded payload if valid
 */
function verifyJwtWithJwk(token, jwk) {
  if (!token || typeof token !== 'string') {
    throw new Error('Token must be a string');
  }

  if (!jwk || typeof jwk !== 'object') {
    throw new Error('JWK must be an object');
  }

  try {
    // Split the JWT
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid JWT format');
    }

    const [headerB64, payloadB64, signatureB64] = parts;

    // Decode header to determine algorithm
    const header = JSON.parse(Buffer.from(headerB64, 'base64url').toString());
    
    // Create public key from JWK
    const publicKey = crypto.createPublicKey({
      key: jwk,
      format: 'jwk'
    });

    // Verify signature
    const verify = crypto.createVerify(getAlgorithmForJwt(header.alg));
    verify.update(`${headerB64}.${payloadB64}`);
    
    const signature = Buffer.from(signatureB64, 'base64url');
    const isValid = verify.verify(publicKey, signature);

    if (!isValid) {
      throw new Error('Invalid signature');
    }

    // Decode and return payload
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString());
    
    // Check expiration
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      throw new Error('Token has expired');
    }

    return payload;
  } catch (error) {
    throw new Error(`JWT verification failed: ${error.message}`);
  }
}

/**
 * Map JWT algorithm to Node.js crypto algorithm
 * @param {string} jwtAlg - JWT algorithm (RS256, ES256, etc.)
 * @returns {string} Node.js crypto algorithm name
 */
function getAlgorithmForJwt(jwtAlg) {
  const algorithms = {
    'RS256': 'RSA-SHA256',
    'RS384': 'RSA-SHA384',
    'RS512': 'RSA-SHA512',
    'ES256': 'sha256',
    'ES384': 'sha384',
    'ES512': 'sha512',
    'PS256': 'RSA-SHA256',
    'PS384': 'RSA-SHA384',
    'PS512': 'RSA-SHA512'
  };

  const algorithm = algorithms[jwtAlg];
  if (!algorithm) {
    throw new Error(`Unsupported algorithm: ${jwtAlg}`);
  }

  return algorithm;
}

module.exports = {
  jwkToPem,
  jwkToPrivatePem,
  verifyJwtWithJwk,
  getAlgorithmForJwt
};
