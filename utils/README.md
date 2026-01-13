# JWK to PEM Native Conversion Utility

This utility provides native Node.js implementations for converting JSON Web Keys (JWK) to PEM format, replacing the need for the `jwk-to-pem` package.

## Why Replace jwk-to-pem?

- **Security**: Reduces dependency on third-party packages that may have vulnerabilities
- **Native Support**: Node.js 15+ has native JWK support through the crypto module
- **Maintenance**: No external dependencies to maintain or update
- **Performance**: Direct use of native crypto APIs

## Requirements

- Node.js 15.0.0 or higher (for native JWK support)

## Usage

### Convert Public JWK to PEM

```javascript
const { jwkToPem } = require('./jwk-to-pem-native');

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
const { jwkToPrivatePem } = require('./jwk-to-pem-native');

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

const privatePem = jwkToPrivatePem(privateJwk);
```

### Verify JWT with JWK (More Efficient)

Instead of converting JWK to PEM first, you can verify JWTs directly:

```javascript
const { verifyJwtWithJwk } = require('./jwk-to-pem-native');

const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...';
const jwk = { /* your JWK */ };

try {
  const payload = verifyJwtWithJwk(token, jwk);
  console.log('Token is valid:', payload);
} catch (error) {
  console.error('Token verification failed:', error.message);
}
```

## Migration from jwk-to-pem

### Before (using jwk-to-pem package)

```javascript
const jwkToPem = require('jwk-to-pem');

const pem = jwkToPem(jwk);
```

### After (using native Node.js)

```javascript
const { jwkToPem } = require('./utils/jwk-to-pem-native');

const pem = jwkToPem(jwk);
```

The API is nearly identical for basic usage, making migration straightforward.

## Supported Key Types

- **RSA** (RS256, RS384, RS512)
- **ECDSA** (ES256, ES384, ES512)
- **RSA-PSS** (PS256, PS384, PS512)

## Error Handling

All functions throw descriptive errors:

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

To test the utility, you can use the following example:

```javascript
const crypto = require('crypto');
const { jwkToPem, verifyJwtWithJwk } = require('./jwk-to-pem-native');

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
4. **Type Safety**: Native crypto APIs are well-documented and typed
5. **Performance**: Direct access to native crypto operations

## Notes

- This implementation requires Node.js 15+ for full JWK support
- For older Node.js versions, consider upgrading or using a polyfill
- The utility handles standard JWK formats as defined in RFC 7517
