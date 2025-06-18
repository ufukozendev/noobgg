import { Snowflake } from 'nodejs-snowflake';

// Configure Snowflake with custom epoch (2023-01-01 UTC = 1672531200000). Adjusted to past date to prevent negative IDs
const snowflake = new Snowflake({ custom_epoch: 1672531200000 });

export function generateSnowflakeId(): bigint {
  return BigInt(snowflake.getUniqueID().toString());
}
