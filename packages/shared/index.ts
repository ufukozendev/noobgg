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
  createGameSchema,
  updateGameSchema,
} from "./schemas/game.schema";

export {
  createGameRankSchema,
  updateGameRankSchema,
} from "./schemas/gamerank.schema";

export {
  createUserProfileSchema,
  updateUserProfileSchema,
} from "./schemas/user-profile.schema";

// Pagination Schemas
export {
  paginationQuerySchema,
  paginationMetaSchema,
  createPaginatedResponseSchema,
  type PaginationParams,
  type PaginationMeta,
  type PaginatedResponse,
  type PaginationQueryInput,
  type PaginationMetaOutput,
} from "./schemas/pagination.schema";

// OpenAPI Response Schemas
export {
  ErrorResponseSchema,
  GameResponseSchema,
  GamesListResponseSchema,
  GamesPaginatedResponseSchema,
  DistributorResponseSchema,
  DistributorsListResponseSchema,
  DistributorsPaginatedResponseSchema,
  PlatformResponseSchema,
  PlatformsListResponseSchema,
  PlatformsPaginatedResponseSchema,
  GameRankResponseSchema,
  GameRanksListResponseSchema,
  GameRanksPaginatedResponseSchema,
  UserProfileResponseSchema,
  UserProfilesListResponseSchema,
  UserProfilesPaginatedResponseSchema,
  IdParamSchema,
  SuccessResponseSchema,
} from "./schemas/openapi-responses.schema";
