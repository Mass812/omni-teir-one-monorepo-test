'use strict';
export function log() {
  console.log('[34m%s[0m', 'good from log-service');
  return 'Hello from log-service';
}
log();
