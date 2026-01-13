# JWK to PEM Native Conversion Utility

This utility provides a native Node.js implementation for converting JSON Web Keys (JWK) to PEM format, replacing the need for the `jwk-to-pem` package.

## Why Replace jwk-to-pem?

- **Security**: Reduces dependency on third-party packages that may have vulnerabilities
- **Native Support**: Node.js 15+ has native JWK support through the crypto module
- **Maintenance**: No external dependencies to maintain or update
- **Performance**: Direct use of native crypto APIs

## Requirements

- Node.js 15.0.0 or higher (for native JWK support)

## Usage

### Convert JWK to PEM

```javascript
const jwkToPem = require('./utils/jwk-to-pem-native');

// Public key
const publicJwk = {
  kty: 'RSA',
  n: 'xGOr-H7A-PWbdgD...',
  e: 'AQAB',
  alg: 'RS256',
  use: 'sig'
};

const pem = jwkToPem(publicJwk);
console.log(pem);
// -----BEGIN PUBLIC KEY-----
// MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...
// -----END PUBLIC KEY-----
```

### Convert Private JWK to PEM

```javascript
const jwkToPem = require('./utils/jwk-to-pem-native');

// Private key (automatically detected by presence of 'd' component)
const privateJwk = {
  kty: 'RSA',
  n: 'xGOr-H7A-PWbdgD...',
  e: 'AQAB',
  d: 'private-key-data...',
  p: '...',
  q: '...',
  dp: '...',
  dq: '...',
  qi: '...'
};

const privatePem = jwkToPem(privateJwk);
// -----BEGIN PRIVATE KEY-----
// ...
// -----END PRIVATE KEY-----

// Or explicitly specify private key
const privatePem2 = jwkToPem(privateJwk, { private: true });
```

## Migration from jwk-to-pem

### Before (using jwk-to-pem package)

```javascript
const jwkToPem = require('jwk-to-pem');

const pem = jwkToPem(jwk);
```

### After (using native Node.js)

```javascript
const jwkToPem = require('./utils/jwk-to-pem-native');

const pem = jwkToPem(jwk);
```

The API is identical, making migration a simple drop-in replacement.

## Supported Key Types

- **RSA** (all sizes)
- **ECDSA** (P-256, P-384, P-521)
- **Ed25519** and **Ed448**

## Error Handling

The function throws descriptive errors:

```javascript
try {
  const pem = jwkToPem(invalidJwk);
} catch (error) {
  console.error(error.message);
  // "JWK must have a kty (key type) property"
  // or "Failed to convert JWK to PEM: ..."
}
```

## Testing

To test the utility:

```javascript
const crypto = require('crypto');
const jwkToPem = require('./utils/jwk-to-pem-native');

// Generate a test key pair
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
});

// Export as JWK
const publicJwk = publicKey.export({ format: 'jwk' });

// Convert to PEM
const pem = jwkToPem(publicJwk);
console.log('Converted PEM:', pem);
```

## Benefits of Native Approach

1. **Zero Dependencies**: No need to install and maintain external packages
2. **Always Up-to-Date**: Uses the crypto implementation from your Node.js version
3. **Security**: Reduced attack surface by eliminating external dependencies
4. **Simple API**: Single function, minimal configuration
5. **Performance**: Direct access to native crypto operations

## Notes

- This implementation requires Node.js 15+ for full JWK support
- For older Node.js versions, consider upgrading
- The utility handles standard JWK formats as defined in RFC 7517
- Private keys are automatically detected by the presence of the `d` component
