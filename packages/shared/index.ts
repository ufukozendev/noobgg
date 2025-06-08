export { exampleSchema } from "./schemas/example-schema";
export {
  createPlatformSchema,
  updatePlatformSchema,
} from "./schemas/platform.schema";

export {
  createDistributorSchema,
  updateDistributorSchema,
} from "./schemas/distributor.schema";

export{
  createUserProfileSchema,
  updateUserProfileSchema
} from "./schemas/user-profile.schema"

export {
  createGameSchema,
  updateGameSchema,
} from "./schemas/game.schema";

export {
  createGameRankSchema,
  updateGameRankSchema,
} from "./schemas/gamerank.schema";

// OpenAPI Response Schemas
export {
  ErrorResponseSchema,
  GameResponseSchema,
  GamesListResponseSchema,
  DistributorResponseSchema,
  DistributorsListResponseSchema,
  PlatformResponseSchema,
  PlatformsListResponseSchema,
  GameRankResponseSchema,
  GameRanksListResponseSchema,
  IdParamSchema,
  SuccessResponseSchema,
} from "./schemas/openapi-responses.schema";
