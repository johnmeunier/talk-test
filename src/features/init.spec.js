import { defineFeature, loadFeature } from "jest-cucumber";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";

const feature = loadFeature("./init.feature", {
  loadRelativePath: true,
});

const givenIAmOnTheTodoApp = (given) => {
  given("I am on the todo app", () => {
    render(<App />);
  });
};

const whenIWriteInTheNewItem = (when) => {
  when(/I write '(.*)' in the new item/, (text) => {
    const input = screen.getByLabelText(/Add/i);

    userEvent.type(input, text);
  });
};
const whenIAddMyNewItem = (when) => {
  when(/I add my new item/, () => {
    const button = screen.getByRole("button", { name: /Add/ });
    userEvent.click(button);
  });
};

const thenMyTodolistHasTheItems = (then) => {
  then(/My Todo-list has the items :/, (table) => {
    const expectedItems = table.map((r) => r.items);
    const items = screen.getAllByRole("listitem");

    expectedItems.forEach((item, index) => {
      expect(items[index]).toHaveTextContent(item);
    });
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
});
