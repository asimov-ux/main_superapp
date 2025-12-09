const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');

/**
 * Contract Checker - Validates token files against schema
 * Ensures compatibility across versions
 */

class ContractChecker {
  constructor() {
    this.ajv = new Ajv({ allErrors: true, strict: false });
    this.schema = null;
    this.errors = [];
  }

  /**
   * Main validation process
   */
  async check() {
    try {
      console.log('🔍 Starting contract validation...\n');

      this.loadSchema();
      const tokenFiles = this.findTokenFiles();

      if (tokenFiles.length === 0) {
        console.warn('⚠️  No token files found to validate');
        return true;
      }

      let allValid = true;

      for (const file of tokenFiles) {
        const isValid = this.validateTokenFile(file);
        if (!isValid) {
          allValid = false;
        }
      }

      if (allValid) {
        console.log('\n✅ All token files are valid!');
        return true;
      } else {
        console.error('\n❌ Validation failed with errors');
        this.printErrors();
        process.exit(1);
      }
    } catch (error) {
      console.error('❌ Contract check failed:', error.message);
      process.exit(1);
    }
  }

  /**
   * Load schema
   */
  loadSchema() {
    const schemaPath = path.join(
      __dirname,
      '..',
      'projects',
      'ui-tokens',
      'schema',
      'contract.schema.json'
    );

    if (!fs.existsSync(schemaPath)) {
      throw new Error(`Schema not found at: ${schemaPath}`);
    }

    this.schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));
    console.log(`📋 Loaded schema v${this.schema.version}`);
  }

  /**
   * Find all token files
   */
  findTokenFiles() {
    const tokensDir = path.join(
      __dirname,
      '..',
      'projects',
      'ui-tokens',
      'src',
      'tokens'
    );

    if (!fs.existsSync(tokensDir)) {
      return [];
    }

    return fs
      .readdirSync(tokensDir)
      .filter((file) => file.endsWith('.json'))
      .map((file) => path.join(tokensDir, file));
  }

  /**
   * Validate individual token file
   */
  validateTokenFile(filePath) {
    const fileName = path.basename(filePath);
    console.log(`\n📦 Validating: ${fileName}`);

    try {
      const tokens = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

      // Version compatibility check
      if (
        !this.checkVersionCompatibility(tokens.version, this.schema.version)
      ) {
        this.errors.push({
          file: fileName,
          error: `Version incompatibility: token v${tokens.version} vs schema v${this.schema.version}`,
        });
        console.error(`  ❌ Version incompatible`);
        return false;
      }

      // Schema validation
      const validate = this.ajv.compile(this.schema);
      const valid = validate(tokens);

      if (!valid) {
        validate.errors.forEach((error) => {
          this.errors.push({
            file: fileName,
            path: error.instancePath,
            message: error.message,
            params: error.params,
          });
        });
        console.error(`  ❌ Schema validation failed`);
        return false;
      }

      // Custom validations
      const customValid = this.runCustomValidations(tokens, fileName);
      if (!customValid) {
        return false;
      }

      console.log(`  ✅ Valid`);
      return true;
    } catch (error) {
      this.errors.push({
        file: fileName,
        error: `Parse error: ${error.message}`,
      });
      console.error(`  ❌ Parse failed`);
      return false;
    }
  }

  /**
   * Check semantic version compatibility
   */
  checkVersionCompatibility(tokenVersion, schemaVersion) {
    const [tMajor, tMinor] = tokenVersion.split('.').map(Number);
    const [sMajor, sMinor] = schemaVersion.split('.').map(Number);

    // Major version must match
    if (tMajor !== sMajor) {
      return false;
    }

    // Minor version of tokens must be <= schema minor version
    return tMinor <= sMinor;
  }

  /**
   * Run custom validation rules
   */
  runCustomValidations(tokens, fileName) {
    let valid = true;

    // Check for required color tokens
    const requiredColors = ['primary', 'secondary', 'neutral'];
    requiredColors.forEach((colorGroup) => {
      if (!tokens.tokens.color[colorGroup]) {
        this.errors.push({
          file: fileName,
          error: `Missing required color group: ${colorGroup}`,
        });
        valid = false;
      }
    });

    // Validate brand whitelist if specified
    if (tokens.brand) {
      const allowedBrands = ['default', 'brand-a', 'brand-b', 'brand-c'];
      if (!allowedBrands.includes(tokens.brand)) {
        this.errors.push({
          file: fileName,
          error: `Invalid brand: ${tokens.brand}. Allowed: ${allowedBrands.join(
            ', '
          )}`,
        });
        valid = false;
      }
    }

    // Ensure mode overrides don't introduce new tokens
    if (tokens.tokens.modes) {
      Object.entries(tokens.tokens.modes).forEach(([mode, overrides]) => {
        // This is a simplified check - in production, compare against base tokens
        if (Object.keys(overrides).length === 0) {
          this.errors.push({
            file: fileName,
            error: `Empty mode override: ${mode}`,
          });
          valid = false;
        }
      });
    }

    return valid;
  }

  /**
   * Print formatted errors
   */
  printErrors() {
    console.log('\n📋 Validation Errors:\n');

    const errorsByFile = {};
    this.errors.forEach((err) => {
      if (!errorsByFile[err.file]) {
        errorsByFile[err.file] = [];
      }
      errorsByFile[err.file].push(err);
    });

    Object.entries(errorsByFile).forEach(([file, errors]) => {
      console.log(`\n  ${file}:`);
      errors.forEach((err) => {
        if (err.path) {
          console.log(`    • ${err.path}: ${err.message}`);
        } else {
          console.log(`    • ${err.error || err.message}`);
        }
      });
    });
  }
}

// Execute check
const checker = new ContractChecker();
checker.check();
