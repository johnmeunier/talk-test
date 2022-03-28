import { rest } from "msw";

export const handlers = [
  rest.get("/items", (req, res, ctx) => {
    return res(
      ctx.json({
        items: [
          {
            id: 1,
            label: "First item",
            completed: false,
          },
          {
            id: 2,
            label: "Second item",
            completed: true,
          },
          {
            id: 3,
            label: "Third item",
            completed: false,
          },
        ],
      }),
      ctx.delay()
    );
  }),
];
