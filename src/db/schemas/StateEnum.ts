import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const StateEnum = t.Union(
  [
    t.Literal("draft"),
    t.Literal("published"),
    t.Literal("submitted"),
    t.Literal("rejected"),
  ],
  { additionalProperties: false },
);
