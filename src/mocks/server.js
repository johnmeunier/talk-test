import { setupServer } from "msw/node";
import { rest } from "msw";

// This configures a request mocking server with the given request handlers.

export const server = setupServer(
  rest.get("/items", (req, res, ctx) => {
    return res(
      ctx.json({
        items: [],
      }),
      ctx.delay()
    );
  })
);
