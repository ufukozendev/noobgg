import { Snowflake } from 'nodejs-snowflake';

// Configure Snowflake. Adjust customEpoch if you need different epoch (default: 2023-01-01 UTC)
const snowflake = new Snowflake({ custom_epoch: 1735689600000 });

export function generateSnowflakeId(): bigint {
  return BigInt(snowflake.getUniqueID().toString());
}
