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

defineFeature(feature, (test) => {
  test("Add an item to the list", ({ given, when, and, then }) => {
    givenIAmOnTheTodoApp(given);
    when(/I write '(.*)' in the new item/, (text) => {
      const input = screen.getByLabelText(/Add/i);

      userEvent.type(input, text);
    });
    and(/I add my new item/, () => {
      const button = screen.getByRole("button", { name: /Add/ });
      userEvent.click(button);
    });
    then(/My Todo-list has the items :/, (table) => {
      const expectedItems = table.map((r) => r.items);
      const items = screen.getAllByRole("listitem");

      expectedItems.forEach((item, index) => {
        expect(items[index]).toContain(item);
      });
    });
  });
});
