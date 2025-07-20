import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const ChapterPlain = t.Object(
  {
    id: t.String(),
    number: t.String(),
    title: __nullable__(t.String()),
    volume: __nullable__(t.String()),
    pages: t.Integer(),
    translatedLanguage: t.String(),
    mangaId: t.String(),
    createdAt: t.Date(),
    updatedAt: t.Date(),
  },
  { additionalProperties: false },
);

export const ChapterRelations = t.Object(
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
  },
  { additionalProperties: false },
);

export const ChapterPlainInputCreate = t.Object(
  {
    number: t.String(),
    title: t.Optional(__nullable__(t.String())),
    volume: t.Optional(__nullable__(t.String())),
    pages: t.Integer(),
    translatedLanguage: t.String(),
  },
  { additionalProperties: false },
);

export const ChapterPlainInputUpdate = t.Object(
  {
    number: t.Optional(t.String()),
    title: t.Optional(__nullable__(t.String())),
    volume: t.Optional(__nullable__(t.String())),
    pages: t.Optional(t.Integer()),
    translatedLanguage: t.Optional(t.String()),
  },
  { additionalProperties: false },
);

export const ChapterRelationsInputCreate = t.Object(
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
  },
  { additionalProperties: false },
);

export const ChapterRelationsInputUpdate = t.Partial(
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
    },
    { additionalProperties: false },
  ),
);

export const ChapterWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          number: t.String(),
          title: t.String(),
          volume: t.String(),
          pages: t.Integer(),
          translatedLanguage: t.String(),
          mangaId: t.String(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "Chapter" },
  ),
);

export const ChapterWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            {
              id: t.String(),
              mangaId_number: t.Object(
                { mangaId: t.String(), number: t.String() },
                { additionalProperties: false },
              ),
            },
            { additionalProperties: false },
          ),
          { additionalProperties: false },
        ),
        t.Union(
          [
            t.Object({ id: t.String() }),
            t.Object({
              mangaId_number: t.Object(
                { mangaId: t.String(), number: t.String() },
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
              id: t.String(),
              number: t.String(),
              title: t.String(),
              volume: t.String(),
              pages: t.Integer(),
              translatedLanguage: t.String(),
              mangaId: t.String(),
              createdAt: t.Date(),
              updatedAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Chapter" },
);

export const ChapterSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      number: t.Boolean(),
      title: t.Boolean(),
      volume: t.Boolean(),
      pages: t.Boolean(),
      translatedLanguage: t.Boolean(),
      mangaId: t.Boolean(),
      manga: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const ChapterInclude = t.Partial(
  t.Object(
    { manga: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const ChapterOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      number: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      title: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      volume: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      pages: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      translatedLanguage: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      mangaId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const Chapter = t.Composite([ChapterPlain, ChapterRelations], {
  additionalProperties: false,
});

export const ChapterInputCreate = t.Composite(
  [ChapterPlainInputCreate, ChapterRelationsInputCreate],
  { additionalProperties: false },
);

export const ChapterInputUpdate = t.Composite(
  [ChapterPlainInputUpdate, ChapterRelationsInputUpdate],
  { additionalProperties: false },
);
