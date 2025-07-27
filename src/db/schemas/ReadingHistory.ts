import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const ReadingHistoryPlain = t.Object(
  {
    id: t.Integer(),
    chapterId: t.String(),
    userId: t.String(),
    readingAt: t.Date(),
    page: __nullable__(t.Integer()),
  },
  { additionalProperties: false },
);

export const ReadingHistoryRelations = t.Object(
  {
    chapter: t.Object(
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
    ),
    user: t.Object(
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

export const ReadingHistoryPlainInputCreate = t.Object(
  {
    readingAt: t.Optional(t.Date()),
    page: t.Optional(__nullable__(t.Integer())),
  },
  { additionalProperties: false },
);

export const ReadingHistoryPlainInputUpdate = t.Object(
  {
    readingAt: t.Optional(t.Date()),
    page: t.Optional(__nullable__(t.Integer())),
  },
  { additionalProperties: false },
);

export const ReadingHistoryRelationsInputCreate = t.Object(
  {
    chapter: t.Object(
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
    user: t.Object(
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

export const ReadingHistoryRelationsInputUpdate = t.Partial(
  t.Object(
    {
      chapter: t.Object(
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
      user: t.Object(
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

export const ReadingHistoryWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.Integer(),
          chapterId: t.String(),
          userId: t.String(),
          readingAt: t.Date(),
          page: t.Integer(),
        },
        { additionalProperties: false },
      ),
    { $id: "ReadingHistory" },
  ),
);

export const ReadingHistoryWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            {
              id: t.Integer(),
              chapterId_userId: t.Object(
                { chapterId: t.String(), userId: t.String() },
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
              chapterId_userId: t.Object(
                { chapterId: t.String(), userId: t.String() },
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
              chapterId: t.String(),
              userId: t.String(),
              readingAt: t.Date(),
              page: t.Integer(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "ReadingHistory" },
);

export const ReadingHistorySelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      chapterId: t.Boolean(),
      userId: t.Boolean(),
      readingAt: t.Boolean(),
      page: t.Boolean(),
      chapter: t.Boolean(),
      user: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const ReadingHistoryInclude = t.Partial(
  t.Object(
    { chapter: t.Boolean(), user: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const ReadingHistoryOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      chapterId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      userId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      readingAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      page: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const ReadingHistory = t.Composite(
  [ReadingHistoryPlain, ReadingHistoryRelations],
  { additionalProperties: false },
);

export const ReadingHistoryInputCreate = t.Composite(
  [ReadingHistoryPlainInputCreate, ReadingHistoryRelationsInputCreate],
  { additionalProperties: false },
);

export const ReadingHistoryInputUpdate = t.Composite(
  [ReadingHistoryPlainInputUpdate, ReadingHistoryRelationsInputUpdate],
  { additionalProperties: false },
);
