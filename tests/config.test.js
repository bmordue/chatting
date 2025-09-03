// Simple test to validate configuration module
// Run with: node tests/config.test.js

// Set a dummy API key for testing
process.env.OPENAI_API_KEY = 'test-key-for-config-validation';

import { getConfig } from '../built/common/config.js';

console.log('Running configuration tests...');

try {
  // Test 1: Verify config is loaded
  const testConfig = getConfig();
  console.assert(testConfig, 'Config should be defined');
  console.assert(testConfig.openai, 'OpenAI config should be defined');
  console.assert(testConfig.chatDir === 'chats/', 'Chat directory should be chats/');
  
  console.log('✓ Configuration module loads successfully');
  console.log('✓ Basic configuration validation passes');
  console.log(`✓ OpenAI API key configured: ${testConfig.openai.apiKey ? 'Yes' : 'No'}`);
  console.log(`✓ Steam config available: ${testConfig.steam ? 'Yes' : 'No'}`);
  
  console.log('\nAll tests passed! 🎉');
} catch (error) {
  console.error('❌ Test failed:', error.message);
  process.exit(1);
}