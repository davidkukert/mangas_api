import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const FollowStatusEnum = t.Union(
  [
    t.Literal("reading"),
    t.Literal("completed"),
    t.Literal("onHold"),
    t.Literal("dropped"),
    t.Literal("planToRead"),
  ],
  { additionalProperties: false },
);
