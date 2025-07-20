import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const MangaPlain = t.Object(
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
);

export const MangaRelations = t.Object(
  {
    authors: t.Array(
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
    tags: t.Array(
      t.Object(
        {
          id: t.String(),
          name: t.String(),
          description: __nullable__(t.String()),
          group: t.Union(
            [
              t.Literal("genre"),
              t.Literal("theme"),
              t.Literal("format"),
              t.Literal("content"),
            ],
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
      { additionalProperties: false },
    ),
    chapters: t.Array(
      t.Object(
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
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const MangaPlainInputCreate = t.Object(
  {
    title: t.String(),
    alternativeTitles: t.Optional(
      t.Array(t.String(), { additionalProperties: false }),
    ),
    description: t.Optional(__nullable__(t.String())),
    originalLanguage: t.String(),
    publicationDemographic: t.Optional(
      __nullable__(
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
    year: t.Optional(__nullable__(t.Integer())),
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
  },
  { additionalProperties: false },
);

export const MangaPlainInputUpdate = t.Object(
  {
    title: t.Optional(t.String()),
    alternativeTitles: t.Optional(
      t.Array(t.String(), { additionalProperties: false }),
    ),
    description: t.Optional(__nullable__(t.String())),
    originalLanguage: t.Optional(t.String()),
    publicationDemographic: t.Optional(
      __nullable__(
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
    ),
    status: t.Optional(
      t.Union(
        [
          t.Literal("ongoing"),
          t.Literal("completed"),
          t.Literal("hiatus"),
          t.Literal("cancelled"),
        ],
        { additionalProperties: false },
      ),
    ),
    year: t.Optional(__nullable__(t.Integer())),
    contentRating: t.Optional(
      t.Union(
        [
          t.Literal("safe"),
          t.Literal("suggestive"),
          t.Literal("erotica"),
          t.Literal("pornographic"),
        ],
        { additionalProperties: false },
      ),
    ),
    state: t.Optional(
      t.Union(
        [
          t.Literal("draft"),
          t.Literal("published"),
          t.Literal("submitted"),
          t.Literal("rejected"),
        ],
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

export const MangaRelationsInputCreate = t.Object(
  {
    authors: t.Optional(
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
    tags: t.Optional(
      t.Object(
        {
          connect: t.Array(
            t.Object(
              {
                id: t.String({ additionalProperties: false }),
              },
              { additionalProperties: false },
            ),
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
    ),
    chapters: t.Optional(
      t.Object(
        {
          connect: t.Array(
            t.Object(
              {
                id: t.String({ additionalProperties: false }),
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

export const MangaRelationsInputUpdate = t.Partial(
  t.Object(
    {
      authors: t.Partial(
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
      tags: t.Partial(
        t.Object(
          {
            connect: t.Array(
              t.Object(
                {
                  id: t.String({ additionalProperties: false }),
                },
                { additionalProperties: false },
              ),
              { additionalProperties: false },
            ),
            disconnect: t.Array(
              t.Object(
                {
                  id: t.String({ additionalProperties: false }),
                },
                { additionalProperties: false },
              ),
              { additionalProperties: false },
            ),
          },
          { additionalProperties: false },
        ),
      ),
      chapters: t.Partial(
        t.Object(
          {
            connect: t.Array(
              t.Object(
                {
                  id: t.String({ additionalProperties: false }),
                },
                { additionalProperties: false },
              ),
              { additionalProperties: false },
            ),
            disconnect: t.Array(
              t.Object(
                {
                  id: t.String({ additionalProperties: false }),
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

export const MangaWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          title: t.String(),
          alternativeTitles: t.Array(t.String(), {
            additionalProperties: false,
          }),
          description: t.String(),
          originalLanguage: t.String(),
          publicationDemographic: t.Union(
            [
              t.Literal("shounen"),
              t.Literal("shoujo"),
              t.Literal("seinen"),
              t.Literal("josei"),
            ],
            { additionalProperties: false },
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
          year: t.Integer(),
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
    { $id: "Manga" },
  ),
);

export const MangaWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            { id: t.String(), title: t.String() },
            { additionalProperties: false },
          ),
          { additionalProperties: false },
        ),
        t.Union(
          [t.Object({ id: t.String() }), t.Object({ title: t.String() })],
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
              title: t.String(),
              alternativeTitles: t.Array(t.String(), {
                additionalProperties: false,
              }),
              description: t.String(),
              originalLanguage: t.String(),
              publicationDemographic: t.Union(
                [
                  t.Literal("shounen"),
                  t.Literal("shoujo"),
                  t.Literal("seinen"),
                  t.Literal("josei"),
                ],
                { additionalProperties: false },
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
              year: t.Integer(),
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
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Manga" },
);

export const MangaSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      title: t.Boolean(),
      alternativeTitles: t.Boolean(),
      description: t.Boolean(),
      originalLanguage: t.Boolean(),
      publicationDemographic: t.Boolean(),
      status: t.Boolean(),
      year: t.Boolean(),
      contentRating: t.Boolean(),
      state: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      authors: t.Boolean(),
      tags: t.Boolean(),
      chapters: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const MangaInclude = t.Partial(
  t.Object(
    {
      publicationDemographic: t.Boolean(),
      status: t.Boolean(),
      contentRating: t.Boolean(),
      state: t.Boolean(),
      authors: t.Boolean(),
      tags: t.Boolean(),
      chapters: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const MangaOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      title: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      alternativeTitles: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      description: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      originalLanguage: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      year: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const Manga = t.Composite([MangaPlain, MangaRelations], {
  additionalProperties: false,
});

export const MangaInputCreate = t.Composite(
  [MangaPlainInputCreate, MangaRelationsInputCreate],
  { additionalProperties: false },
);

export const MangaInputUpdate = t.Composite(
  [MangaPlainInputUpdate, MangaRelationsInputUpdate],
  { additionalProperties: false },
);
