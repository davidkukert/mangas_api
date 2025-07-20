import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const DemographicEnum = t.Union(
  [
    t.Literal("shounen"),
    t.Literal("shoujo"),
    t.Literal("seinen"),
    t.Literal("josei"),
  ],
  { additionalProperties: false },
);
