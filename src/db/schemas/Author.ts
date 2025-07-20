import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const AuthorPlain = t.Object(
  {
    id: t.String(),
    name: t.String(),
    biography: __nullable__(t.String()),
    socialLinks: __nullable__(t.Any()),
    createdAt: t.Date(),
    updatedAt: t.Date(),
  },
  { additionalProperties: false },
);

export const AuthorRelations = t.Object(
  {
    mangas: t.Array(
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
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const AuthorPlainInputCreate = t.Object(
  {
    name: t.String(),
    biography: t.Optional(__nullable__(t.String())),
    socialLinks: t.Optional(__nullable__(t.Any())),
  },
  { additionalProperties: false },
);

export const AuthorPlainInputUpdate = t.Object(
  {
    name: t.Optional(t.String()),
    biography: t.Optional(__nullable__(t.String())),
    socialLinks: t.Optional(__nullable__(t.Any())),
  },
  { additionalProperties: false },
);

export const AuthorRelationsInputCreate = t.Object(
  {
    mangas: t.Optional(
      t.Object(
        {
          connect: t.Array(
            t.Object(
              {
                id: t.Integer({ additionalProperties: false }),
              },
              { additionalProperties: false },
            ),
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

export const AuthorRelationsInputUpdate = t.Partial(
  t.Object(
    {
      mangas: t.Partial(
        t.Object(
          {
            connect: t.Array(
              t.Object(
                {
                  id: t.Integer({ additionalProperties: false }),
                },
                { additionalProperties: false },
              ),
              { additionalProperties: false },
            ),
            disconnect: t.Array(
              t.Object(
                {
                  id: t.Integer({ additionalProperties: false }),
                },
                { additionalProperties: false },
              ),
              { additionalProperties: false },
            ),
          },
          { additionalProperties: false },
        ),
      ),
    },
    { additionalProperties: false },
  ),
);

export const AuthorWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          name: t.String(),
          biography: t.String(),
          socialLinks: t.Any(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "Author" },
  ),
);

export const AuthorWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            { id: t.String(), name: t.String() },
            { additionalProperties: false },
          ),
          { additionalProperties: false },
        ),
        t.Union(
          [t.Object({ id: t.String() }), t.Object({ name: t.String() })],
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
              name: t.String(),
              biography: t.String(),
              socialLinks: t.Any(),
              createdAt: t.Date(),
              updatedAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Author" },
);

export const AuthorSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      name: t.Boolean(),
      biography: t.Boolean(),
      socialLinks: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      mangas: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const AuthorInclude = t.Partial(
  t.Object(
    { mangas: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const AuthorOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      name: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      biography: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      socialLinks: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const Author = t.Composite([AuthorPlain, AuthorRelations], {
  additionalProperties: false,
});

export const AuthorInputCreate = t.Composite(
  [AuthorPlainInputCreate, AuthorRelationsInputCreate],
  { additionalProperties: false },
);

export const AuthorInputUpdate = t.Composite(
  [AuthorPlainInputUpdate, AuthorRelationsInputUpdate],
  { additionalProperties: false },
);
