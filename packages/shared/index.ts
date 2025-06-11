export { exampleSchema } from "./schemas/example-schema";
export {
  createPlatformSchema,
  updatePlatformSchema,
} from "./schemas/platform.schema";

export {
  createDistributorSchema,
  updateDistributorSchema,
} from "./schemas/distributor.schema";

export {
  createUserProfileSchema,
  updateUserProfileSchema,
} from "./schemas/user-profile.schema";

export { createGameSchema, updateGameSchema } from "./schemas/game.schema";

export {
  createGameRankSchema,
  updateGameRankSchema,
} from "./schemas/gamerank.schema";

export * from "./schemas/event-attendees";

export * from "./schemas/event-invitations";
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

export {
  createLanguageSchema,
  updateLanguageSchema,
  getLanguagesSchema,
} from "./schemas/languages";

export type { Language } from "./schemas/languages";
