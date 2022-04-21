import { defineFeature, loadFeature } from "jest-cucumber";
import {
  getByRole,
  render,
  screen,
  waitFor,
  within,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";

import {
  givenIAmOnTheTodoApp,
  whenIWriteInTheNewItem,
  whenIAddMyNewItem,
  whenIAddTheItem,
  whenIClickOnTheItem,
} from "./helpers.steps";
import App from "../App";
import { server } from "../mocks/server";

const feature = loadFeature("./init.feature", {
  loadRelativePath: true,
});

export const thenMyTodolistHasTheItems = (then) => {
  then(/My Todo-list has the items :/, async (table) => {
    const expectedItems = table.map((r) => r.items);
    await waitFor(() =>
      expect(
        screen.getAllByRole("listitem")[expectedItems.length - 1]
      ).toBeInTheDocument()
    );
    const items = screen.getAllByRole("listitem");

    expectedItems.forEach((item, index) => {
      expect(items[index]).toHaveTextContent(item);
    });
  });
};

export const thenTheItemIs = (then) => {
  then(/The item '(.*)' is (active|completed)/, async (itemName, status) => {
    const item = await waitFor(() =>
      screen
        .getAllByRole("listitem")
        .find((listitem) => listitem.textContent.includes(itemName))
    );

    expect(
      within(item).getByRole("img", {
        name: new RegExp(status, "i"),
        exact: false,
      })
    ).toBeInTheDocument();
  });
};

defineFeature(feature, (test) => {
  test("Add an item to an empty list", ({ given, when, and, then }) => {
    givenIAmOnTheTodoApp(given);
    whenIWriteInTheNewItem(when);
    whenIAddMyNewItem(and);
    thenMyTodolistHasTheItems(then);
  });

  test("Add multiple items to the list", ({ given, when, and, then }) => {
    givenIAmOnTheTodoApp(given);
    whenIWriteInTheNewItem(when);
    whenIAddMyNewItem(and);
    whenIWriteInTheNewItem(when);
    whenIAddMyNewItem(and);
    whenIWriteInTheNewItem(when);
    whenIAddMyNewItem(and);
    thenMyTodolistHasTheItems(then);
  });

  test("Default status of an item is active", ({ given, when, and, then }) => {
    givenIAmOnTheTodoApp(given);
    whenIWriteInTheNewItem(when);
    whenIAddMyNewItem(and);
    thenTheItemIs(then);
  });

  test("Toggle status of an item", ({ given, when, and, then }) => {
    givenIAmOnTheTodoApp(given);
    whenIAddTheItem(and);
    whenIClickOnTheItem(when);
    thenTheItemIs(then);
  });

  test("Toggle a single item among many", ({ given, when, and, then }) => {
    givenIAmOnTheTodoApp(given);
    whenIAddTheItem(and);
    whenIAddTheItem(and);
    whenIAddTheItem(and);
    whenIClickOnTheItem(when);
    whenIClickOnTheItem(when);
    whenIClickOnTheItem(when);
    thenTheItemIs(then);
    thenTheItemIs(then);
    thenTheItemIs(then);
  });

  test("Should retrieve my existing items", ({ given, when, then, and }) => {
    given(/I have previously added the following items/, (table) => {
      server.use(
        rest.get("/items", (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json({
              items: table.map((e, i) => ({
                id: i,
                label: e.item,
                completed: e.status === "completed",
              })),
            })
          );
        })
      );
    });

    givenIAmOnTheTodoApp(and);

    thenTheItemIs(then);
    thenTheItemIs(then);
    thenTheItemIs(then);
  });
});
