/**
 * Tests for JWK to PEM native conversion utility
 */

const crypto = require('crypto');
const jwkToPem = require('./jwk-to-pem-native');

describe('jwkToPem', () => {
  describe('RSA Public Keys', () => {
    let publicJwk;
    let publicKey;

    beforeAll(() => {
      // Generate a test RSA key pair
      const { publicKey: pubKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
      });
      publicKey = pubKey;
      publicJwk = publicKey.export({ format: 'jwk' });
    });

    it('should convert RSA public JWK to PEM format', () => {
      const pem = jwkToPem(publicJwk);
      
      expect(pem).toBeDefined();
      expect(typeof pem).toBe('string');
      expect(pem).toContain('-----BEGIN PUBLIC KEY-----');
      expect(pem).toContain('-----END PUBLIC KEY-----');
    });

    it('should produce PEM that matches the original key', () => {
      const pem = jwkToPem(publicJwk);
      
      // Convert back to verify
      const recreatedKey = crypto.createPublicKey(pem);
      const recreatedJwk = recreatedKey.export({ format: 'jwk' });
      
      expect(recreatedJwk.n).toBe(publicJwk.n);
      expect(recreatedJwk.e).toBe(publicJwk.e);
      expect(recreatedJwk.kty).toBe(publicJwk.kty);
    });

    it('should work with minimal RSA public JWK', () => {
      const minimalJwk = {
        kty: 'RSA',
        n: publicJwk.n,
        e: publicJwk.e,
      };
      
      const pem = jwkToPem(minimalJwk);
      
      expect(pem).toBeDefined();
      expect(pem).toContain('-----BEGIN PUBLIC KEY-----');
    });
  });

  describe('RSA Private Keys', () => {
    let privateJwk;
    let privateKey;

    beforeAll(() => {
      // Generate a test RSA key pair
      const { privateKey: privKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
      });
      privateKey = privKey;
      privateJwk = privateKey.export({ format: 'jwk' });
    });

    it('should convert RSA private JWK to PEM format (auto-detect)', () => {
      const pem = jwkToPem(privateJwk);
      
      expect(pem).toBeDefined();
      expect(typeof pem).toBe('string');
      expect(pem).toContain('-----BEGIN PRIVATE KEY-----');
      expect(pem).toContain('-----END PRIVATE KEY-----');
    });

    it('should convert RSA private JWK to PEM format (explicit)', () => {
      const pem = jwkToPem(privateJwk, { private: true });
      
      expect(pem).toBeDefined();
      expect(pem).toContain('-----BEGIN PRIVATE KEY-----');
      expect(pem).toContain('-----END PRIVATE KEY-----');
    });

    it('should produce PEM that matches the original private key', () => {
      const pem = jwkToPem(privateJwk);
      
      // Convert back to verify
      const recreatedKey = crypto.createPrivateKey(pem);
      const recreatedJwk = recreatedKey.export({ format: 'jwk' });
      
      expect(recreatedJwk.n).toBe(privateJwk.n);
      expect(recreatedJwk.e).toBe(privateJwk.e);
      expect(recreatedJwk.d).toBe(privateJwk.d);
      expect(recreatedJwk.kty).toBe(privateJwk.kty);
    });

    it('should be usable for signing and verification', () => {
      const pem = jwkToPem(privateJwk);
      const privateKeyObj = crypto.createPrivateKey(pem);
      
      // Extract public key from private key
      const publicKeyObj = crypto.createPublicKey(privateKeyObj);
      
      // Sign some data
      const data = 'test data';
      const sign = crypto.createSign('RSA-SHA256');
      sign.update(data);
      const signature = sign.sign(privateKeyObj);
      
      // Verify with public key
      const verify = crypto.createVerify('RSA-SHA256');
      verify.update(data);
      const isValid = verify.verify(publicKeyObj, signature);
      
      expect(isValid).toBe(true);
    });
  });

  describe('ECDSA Keys', () => {
    let publicJwk;
    let privateJwk;

    beforeAll(() => {
      // Generate EC key pair
      const { publicKey, privateKey } = crypto.generateKeyPairSync('ec', {
        namedCurve: 'P-256',
      });
      publicJwk = publicKey.export({ format: 'jwk' });
      privateJwk = privateKey.export({ format: 'jwk' });
    });

    it('should convert EC public JWK to PEM format', () => {
      const pem = jwkToPem(publicJwk);
      
      expect(pem).toBeDefined();
      expect(pem).toContain('-----BEGIN PUBLIC KEY-----');
      expect(pem).toContain('-----END PUBLIC KEY-----');
    });

    it('should convert EC private JWK to PEM format', () => {
      const pem = jwkToPem(privateJwk);
      
      expect(pem).toBeDefined();
      expect(pem).toContain('-----BEGIN PRIVATE KEY-----');
      expect(pem).toContain('-----END PRIVATE KEY-----');
    });

    it('should produce valid EC PEM that can be used for signing', () => {
      const privatePem = jwkToPem(privateJwk);
      const publicPem = jwkToPem(publicJwk);
      
      const privateKeyObj = crypto.createPrivateKey(privatePem);
      const publicKeyObj = crypto.createPublicKey(publicPem);
      
      // Sign and verify
      const data = 'test data';
      const sign = crypto.createSign('sha256');
      sign.update(data);
      const signature = sign.sign(privateKeyObj);
      
      const verify = crypto.createVerify('sha256');
      verify.update(data);
      const isValid = verify.verify(publicKeyObj, signature);
      
      expect(isValid).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('should throw error for null input', () => {
      expect(() => jwkToPem(null)).toThrow('JWK must be an object');
    });

    it('should throw error for undefined input', () => {
      expect(() => jwkToPem(undefined)).toThrow('JWK must be an object');
    });

    it('should throw error for non-object input', () => {
      expect(() => jwkToPem('not an object')).toThrow('JWK must be an object');
      expect(() => jwkToPem(123)).toThrow('JWK must be an object');
      expect(() => jwkToPem([])).toThrow('JWK must be an object');
    });

    it('should throw error for JWK without kty property', () => {
      const invalidJwk = {
        n: 'some-value',
        e: 'AQAB',
      };
      
      expect(() => jwkToPem(invalidJwk)).toThrow('JWK must have a kty (key type) property');
    });

    it('should throw error for malformed JWK', () => {
      // Node.js crypto is lenient, but using inconsistent key type should fail
      const malformedJwk = {
        kty: 'EC',
        n: 'some-rsa-modulus', // RSA property on EC key - inconsistent
        e: 'AQAB',
      };
      
      expect(() => jwkToPem(malformedJwk)).toThrow();
    });

    it('should throw error for unsupported key type', () => {
      const unsupportedJwk = {
        kty: 'oct',
        k: 'some-symmetric-key',
      };
      
      expect(() => jwkToPem(unsupportedJwk)).toThrow('Failed to convert JWK to PEM');
    });
  });

  describe('Real-world JWK Examples', () => {
    it('should handle standard RSA-256 JWK from Auth0/JWKS', () => {
      // Example structure similar to what you'd get from a JWKS endpoint
      const { publicKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
      });
      const jwk = publicKey.export({ format: 'jwk' });
      
      // Add typical JWKS metadata
      const jwksStyleJwk = {
        ...jwk,
        alg: 'RS256',
        use: 'sig',
        kid: 'test-key-id',
      };
      
      const pem = jwkToPem(jwksStyleJwk);
      
      expect(pem).toBeDefined();
      expect(pem).toContain('-----BEGIN PUBLIC KEY-----');
      
      // Verify it creates a valid key
      const recreatedKey = crypto.createPublicKey(pem);
      expect(recreatedKey).toBeDefined();
    });

    it('should handle EC P-256 JWK (ES256)', () => {
      const { publicKey } = crypto.generateKeyPairSync('ec', {
        namedCurve: 'P-256',
      });
      const jwk = publicKey.export({ format: 'jwk' });
      
      const jwksStyleJwk = {
        ...jwk,
        alg: 'ES256',
        use: 'sig',
        kid: 'test-ec-key',
      };
      
      const pem = jwkToPem(jwksStyleJwk);
      
      expect(pem).toBeDefined();
      expect(pem).toContain('-----BEGIN PUBLIC KEY-----');
    });

    it('should handle EC P-384 JWK (ES384)', () => {
      const { publicKey } = crypto.generateKeyPairSync('ec', {
        namedCurve: 'P-384',
      });
      const jwk = publicKey.export({ format: 'jwk' });
      
      const pem = jwkToPem(jwk);
      
      expect(pem).toBeDefined();
      expect(pem).toContain('-----BEGIN PUBLIC KEY-----');
    });
  });

  describe('API Compatibility', () => {
    it('should work as a default export', () => {
      expect(typeof jwkToPem).toBe('function');
    });

    it('should work as a named export', () => {
      const { jwkToPem: namedExport } = require('./jwk-to-pem-native');
      expect(typeof namedExport).toBe('function');
    });

    it('should be a drop-in replacement for jwk-to-pem package', () => {
      // Simulate the original jwk-to-pem package API
      const { publicKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
      });
      const jwk = publicKey.export({ format: 'jwk' });
      
      // Original package usage: const pem = jwkToPem(jwk)
      const pem = jwkToPem(jwk);
      
      expect(pem).toBeDefined();
      expect(typeof pem).toBe('string');
      expect(pem).toMatch(/^-----BEGIN PUBLIC KEY-----/);
      expect(pem.trim()).toMatch(/-----END PUBLIC KEY-----$/);
    });
  });

  describe('Edge Cases', () => {
    it('should handle JWK with extra properties', () => {
      const { publicKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
      });
      const jwk = publicKey.export({ format: 'jwk' });
      
      const jwkWithExtras = {
        ...jwk,
        alg: 'RS256',
        use: 'sig',
        kid: 'key-id',
        x5c: ['cert-chain'],
        x5t: 'thumbprint',
        extra_field: 'should-be-ignored',
      };
      
      const pem = jwkToPem(jwkWithExtras);
      
      expect(pem).toBeDefined();
      expect(pem).toContain('-----BEGIN PUBLIC KEY-----');
    });

    it('should handle different RSA key sizes', () => {
      const sizes = [2048, 3072, 4096];
      
      sizes.forEach(size => {
        const { publicKey } = crypto.generateKeyPairSync('rsa', {
          modulusLength: size,
        });
        const jwk = publicKey.export({ format: 'jwk' });
        const pem = jwkToPem(jwk);
        
        expect(pem).toBeDefined();
        expect(pem).toContain('-----BEGIN PUBLIC KEY-----');
      });
    });

    it('should handle empty options object', () => {
      const { publicKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
      });
      const jwk = publicKey.export({ format: 'jwk' });
      
      const pem = jwkToPem(jwk, {});
      
      expect(pem).toBeDefined();
      expect(pem).toContain('-----BEGIN PUBLIC KEY-----');
    });

    it('should handle options with invalid properties', () => {
      const { publicKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
      });
      const jwk = publicKey.export({ format: 'jwk' });
      
      const pem = jwkToPem(jwk, { invalid: true, random: 'prop' });
      
      expect(pem).toBeDefined();
      expect(pem).toContain('-----BEGIN PUBLIC KEY-----');
    });
  });
});
