// Test file to verify config import works
import { config, buildApiUrl } from './src/config/config';

console.log('Config loaded successfully:', config);
console.log('Build API URL test:', buildApiUrl('/test'));

export default function testConfig() {
  return {
    config,
    buildApiUrl
  };
}
