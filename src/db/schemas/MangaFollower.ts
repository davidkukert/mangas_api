import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const MangaFollowerPlain = t.Object(
  {
    id: t.Integer(),
    mangaId: t.String(),
    followerId: t.String(),
    status: t.Union(
      [
        t.Literal("reading"),
        t.Literal("completed"),
        t.Literal("onHold"),
        t.Literal("dropped"),
        t.Literal("planToRead"),
      ],
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const MangaFollowerRelations = t.Object(
  {
    manga: t.Object(
      {
        id: t.String(),
        title: t.String(),
        alternativeTitles: t.Array(t.String(), { additionalProperties: false }),
        description: __nullable__(t.String()),
        originalLanguage: t.String(),
        publicationDemographic: __nullable__(
          t.Union(
            [
              t.Literal("shounen"),
              t.Literal("shoujo"),
              t.Literal("seinen"),
              t.Literal("josei"),
            ],
            { additionalProperties: false },
          ),
        ),
        status: t.Union(
          [
            t.Literal("ongoing"),
            t.Literal("completed"),
            t.Literal("hiatus"),
            t.Literal("cancelled"),
          ],
          { additionalProperties: false },
        ),
        year: __nullable__(t.Integer()),
        contentRating: t.Union(
          [
            t.Literal("safe"),
            t.Literal("suggestive"),
            t.Literal("erotica"),
            t.Literal("pornographic"),
          ],
          { additionalProperties: false },
        ),
        state: t.Union(
          [
            t.Literal("draft"),
            t.Literal("published"),
            t.Literal("submitted"),
            t.Literal("rejected"),
          ],
          { additionalProperties: false },
        ),
        createdAt: t.Date(),
        updatedAt: t.Date(),
      },
      { additionalProperties: false },
    ),
    follower: t.Object(
      {
        id: t.String(),
        username: t.String(),
        password: t.String(),
        role: t.Union([t.Literal("reader"), t.Literal("admin")], {
          additionalProperties: false,
        }),
        createdAt: t.Date(),
        updatedAt: t.Date(),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const MangaFollowerPlainInputCreate = t.Object(
  {
    status: t.Optional(
      t.Union(
        [
          t.Literal("reading"),
          t.Literal("completed"),
          t.Literal("onHold"),
          t.Literal("dropped"),
          t.Literal("planToRead"),
        ],
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

export const MangaFollowerPlainInputUpdate = t.Object(
  {
    status: t.Optional(
      t.Union(
        [
          t.Literal("reading"),
          t.Literal("completed"),
          t.Literal("onHold"),
          t.Literal("dropped"),
          t.Literal("planToRead"),
        ],
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

export const MangaFollowerRelationsInputCreate = t.Object(
  {
    manga: t.Object(
      {
        connect: t.Object(
          {
            id: t.String({ additionalProperties: false }),
          },
          { additionalProperties: false },
        ),
      },
      { additionalProperties: false },
    ),
    follower: t.Object(
      {
        connect: t.Object(
          {
            id: t.String({ additionalProperties: false }),
          },
          { additionalProperties: false },
        ),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const MangaFollowerRelationsInputUpdate = t.Partial(
  t.Object(
    {
      manga: t.Object(
        {
          connect: t.Object(
            {
              id: t.String({ additionalProperties: false }),
            },
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
      follower: t.Object(
        {
          connect: t.Object(
            {
              id: t.String({ additionalProperties: false }),
            },
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
    },
    { additionalProperties: false },
  ),
);

export const MangaFollowerWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.Integer(),
          mangaId: t.String(),
          followerId: t.String(),
          status: t.Union(
            [
              t.Literal("reading"),
              t.Literal("completed"),
              t.Literal("onHold"),
              t.Literal("dropped"),
              t.Literal("planToRead"),
            ],
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
    { $id: "MangaFollower" },
  ),
);

export const MangaFollowerWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            {
              id: t.Integer(),
              mangaId_followerId: t.Object(
                { mangaId: t.String(), followerId: t.String() },
                { additionalProperties: false },
              ),
            },
            { additionalProperties: false },
          ),
          { additionalProperties: false },
        ),
        t.Union(
          [
            t.Object({ id: t.Integer() }),
            t.Object({
              mangaId_followerId: t.Object(
                { mangaId: t.String(), followerId: t.String() },
                { additionalProperties: false },
              ),
            }),
          ],
          { additionalProperties: false },
        ),
        t.Partial(
          t.Object({
            AND: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            NOT: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            OR: t.Array(Self, { additionalProperties: false }),
          }),
          { additionalProperties: false },
        ),
        t.Partial(
          t.Object(
            {
              id: t.Integer(),
              mangaId: t.String(),
              followerId: t.String(),
              status: t.Union(
                [
                  t.Literal("reading"),
                  t.Literal("completed"),
                  t.Literal("onHold"),
                  t.Literal("dropped"),
                  t.Literal("planToRead"),
                ],
                { additionalProperties: false },
              ),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "MangaFollower" },
);

export const MangaFollowerSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      mangaId: t.Boolean(),
      followerId: t.Boolean(),
      status: t.Boolean(),
      manga: t.Boolean(),
      follower: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const MangaFollowerInclude = t.Partial(
  t.Object(
    {
      status: t.Boolean(),
      manga: t.Boolean(),
      follower: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const MangaFollowerOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      mangaId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      followerId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const MangaFollower = t.Composite(
  [MangaFollowerPlain, MangaFollowerRelations],
  { additionalProperties: false },
);

export const MangaFollowerInputCreate = t.Composite(
  [MangaFollowerPlainInputCreate, MangaFollowerRelationsInputCreate],
  { additionalProperties: false },
);

export const MangaFollowerInputUpdate = t.Composite(
  [MangaFollowerPlainInputUpdate, MangaFollowerRelationsInputUpdate],
  { additionalProperties: false },
);
