import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const MangaAuthorPlain = t.Object(
  {
    id: t.Integer(),
    mangaId: t.String(),
    authorId: t.String(),
    role: t.Union([t.Literal("author"), t.Literal("artist")], {
      additionalProperties: false,
    }),
  },
  { additionalProperties: false },
);

export const MangaAuthorRelations = t.Object(
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
    author: t.Object(
      {
        id: t.String(),
        name: t.String(),
        biography: __nullable__(t.String()),
        socialLinks: __nullable__(t.Any()),
        createdAt: t.Date(),
        updatedAt: t.Date(),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const MangaAuthorPlainInputCreate = t.Object(
  {
    role: t.Union([t.Literal("author"), t.Literal("artist")], {
      additionalProperties: false,
    }),
  },
  { additionalProperties: false },
);

export const MangaAuthorPlainInputUpdate = t.Object(
  {
    role: t.Optional(
      t.Union([t.Literal("author"), t.Literal("artist")], {
        additionalProperties: false,
      }),
    ),
  },
  { additionalProperties: false },
);

export const MangaAuthorRelationsInputCreate = t.Object(
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
    author: t.Object(
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

export const MangaAuthorRelationsInputUpdate = t.Partial(
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
      author: t.Object(
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

export const MangaAuthorWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.Integer(),
          mangaId: t.String(),
          authorId: t.String(),
          role: t.Union([t.Literal("author"), t.Literal("artist")], {
            additionalProperties: false,
          }),
        },
        { additionalProperties: false },
      ),
    { $id: "MangaAuthor" },
  ),
);

export const MangaAuthorWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            {
              id: t.Integer(),
              mangaId_authorId: t.Object(
                { mangaId: t.String(), authorId: t.String() },
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
              mangaId_authorId: t.Object(
                { mangaId: t.String(), authorId: t.String() },
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
              authorId: t.String(),
              role: t.Union([t.Literal("author"), t.Literal("artist")], {
                additionalProperties: false,
              }),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "MangaAuthor" },
);

export const MangaAuthorSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      mangaId: t.Boolean(),
      authorId: t.Boolean(),
      role: t.Boolean(),
      manga: t.Boolean(),
      author: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const MangaAuthorInclude = t.Partial(
  t.Object(
    {
      role: t.Boolean(),
      manga: t.Boolean(),
      author: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const MangaAuthorOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      mangaId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      authorId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const MangaAuthor = t.Composite(
  [MangaAuthorPlain, MangaAuthorRelations],
  { additionalProperties: false },
);

export const MangaAuthorInputCreate = t.Composite(
  [MangaAuthorPlainInputCreate, MangaAuthorRelationsInputCreate],
  { additionalProperties: false },
);

export const MangaAuthorInputUpdate = t.Composite(
  [MangaAuthorPlainInputUpdate, MangaAuthorRelationsInputUpdate],
  { additionalProperties: false },
);
