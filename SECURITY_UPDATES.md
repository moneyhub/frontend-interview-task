# Security Updates - MON-2681

This document summarises the security updates made to remove vulnerable dependencies and implement native Node.js solutions.

## Summary

All security vulnerabilities have been resolved. The project now uses:
- **0 vulnerabilities** (down from 54)
- Native Node.js crypto APIs instead of third-party packages
- Latest stable versions of all dependencies

## Changes Made

### 1. Native JWK to PEM Conversion Utility

Created `utils/jwk-to-pem-native.js` to replace the `jwk-to-pem` package with native Node.js crypto functionality.

**Benefits:**
- Zero external dependencies for JWK/PEM operations
- Uses Node.js 15+ native JWK support
- Reduced attack surface
- Better performance with native crypto APIs
- No maintenance burden from external packages

**Key Features:**
- `jwkToPem()` - Convert public JWK to PEM format
- `jwkToPrivatePem()` - Convert private JWK to PEM format
- `verifyJwtWithJwk()` - Verify JWT tokens directly with JWK (more efficient)
- Full error handling and validation
- Supports RSA, ECDSA, and RSA-PSS key types

**Usage Example:**
```javascript
const { jwkToPem, verifyJwtWithJwk } = require('./utils/jwk-to-pem-native');

// Convert JWK to PEM
const pem = jwkToPem(publicJwk);

// Or verify JWT directly (recommended)
const payload = verifyJwtWithJwk(token, jwk);
```

### 2. Dependency Upgrades

Upgraded all major dependencies to latest stable versions:

| Package | Old Version | New Version | Change |
|---------|-------------|-------------|--------|
| Next.js | 10.0.3 | 14.2.35 | Major upgrade |
| React | 17.0.1 | 18.3.1 | Major upgrade |
| React DOM | 17.0.1 | 18.3.1 | Major upgrade |
| styled-components | 5.2.1 | 6.3.6 | Major upgrade |

### 3. Build Configuration Updates

- **Removed** `.babelrc` - No longer needed with Next.js 14
- **Removed** `babel-plugin-styled-components` - Replaced by built-in compiler
- **Added** `next.config.js` - Configured Next.js SWC compiler with styled-components support

### 4. Vulnerabilities Resolved

All 54 vulnerabilities have been fixed, including:

**Critical (10 → 0):**
- loader-utils prototype pollution
- minimist prototype pollution
- shell-quote command injection
- elliptic cryptographic issues
- cipher-base and pbkdf2 type checking issues
- sha.js hash rewind vulnerabilities

**High (26 → 0):**
- sharp command injection
- node-fetch header forwarding
- browserify-sign signature forgery
- semver, braces, glob-parent ReDoS
- JSON5 prototype pollution
- Multiple other ReDoS vulnerabilities

**Moderate (16 → 0):**
- @babel/runtime RegExp complexity
- browserslist ReDoS
- postcss parsing errors
- color-string ReDoS
- nanoid exposure issues

**Low (2 → 0):**
- Various minor issues

## Migration Guide

### If Using @mft/mh-policy-enforcement

If your codebase uses the `@mft/mh-policy-enforcement` package with `jwk-to-pem`, update it to use the native utility:

**Before:**
```javascript
const jwkToPem = require('jwk-to-pem');
const pem = jwkToPem(jwk);
```

**After:**
```javascript
const { jwkToPem } = require('./utils/jwk-to-pem-native');
const pem = jwkToPem(jwk);
```

### For JWT Verification

Consider using the more efficient direct verification method:

**Before:**
```javascript
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');

const pem = jwkToPem(jwk);
const payload = jwt.verify(token, pem);
```

**After:**
```javascript
const { verifyJwtWithJwk } = require('./utils/jwk-to-pem-native');

// Skips PEM conversion step
const payload = verifyJwtWithJwk(token, jwk);
```

## Testing

The build has been verified to work correctly:

```bash
npm run build
# ✓ Compiled successfully
# ✓ All pages generated
```

## Next Steps

1. **Test the application** - Run the dev server and verify all functionality works
2. **Update documentation** - If using the JWK utility elsewhere, update docs
3. **Remove jwk-to-pem** - If it was previously installed, ensure it's removed from all package.json files
4. **Regular audits** - Run `npm audit` regularly to catch new vulnerabilities early

## Verification

Run the following to verify zero vulnerabilities:

```bash
npm audit
# found 0 vulnerabilities
```

## Requirements

- Node.js 15.0.0 or higher (for native JWK support)
- npm 7.0.0 or higher (recommended)

## Resources

- [Node.js Crypto Documentation](https://nodejs.org/api/crypto.html)
- [Next.js 14 Documentation](https://nextjs.org/docs)
- [styled-components v6 Migration](https://styled-components.com/docs/advanced#nextjs)
- [JWK Specification (RFC 7517)](https://tools.ietf.org/html/rfc7517)

## Contact

For questions or issues related to these changes, please refer to:
- Linear Issue: MON-2681
- Branch: `cursor/MON-2681-policy-enforcement-jwk-to-pem-native-aaf8`
