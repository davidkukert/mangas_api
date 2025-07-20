import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const MangaAuthorRoleEnum = t.Union(
  [t.Literal("author"), t.Literal("artist")],
  { additionalProperties: false },
);
