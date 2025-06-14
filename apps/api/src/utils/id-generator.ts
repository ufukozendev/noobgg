import { Snowflake } from 'nodejs-snowflake';

// Configure Snowflake with custom epoch (2025-01-01 UTC = 1735689600000). Adjust if you need a different epoch
const snowflake = new Snowflake({ custom_epoch: 1735689600000 });

export function generateSnowflakeId(): bigint {
  return BigInt(snowflake.getUniqueID().toString());
}
