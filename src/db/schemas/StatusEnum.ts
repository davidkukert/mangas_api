import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const StatusEnum = t.Union(
  [
    t.Literal("ongoing"),
    t.Literal("completed"),
    t.Literal("hiatus"),
    t.Literal("cancelled"),
  ],
  { additionalProperties: false },
);
