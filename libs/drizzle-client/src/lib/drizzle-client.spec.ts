import { drizzleClient } from './drizzle-client';

describe('drizzleClient', () => {
  it('should work', () => {
    expect(drizzleClient()).toEqual('drizzle-client');
  });
});
