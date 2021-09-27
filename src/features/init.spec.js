import { defineFeature, loadFeature } from "jest-cucumber";
import { getByRole, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";

const feature = loadFeature("./init.feature", {
  loadRelativePath: true,
});

export function givenIHaveTheFollowingTasks(and) {
  and(/I have the following tasks/, async (table) => {
    for (const { task, status } of table) {
      addItem(task);
      if (status === "completed") {
        await clickItem(task);
      }
    }
  });
}

function whenISelectTheFilter(when) {
  when(/I select the filter '(.*)'/, (filter) => {
    const $selectInput = screen.getByTestId("filterByStatus");
    userEvent.selectOptions($selectInput, filter);
  });
}

async function clickItem(itemName) {
  await waitFor(() =>
    screen
      .getAllByRole("listitem")
      .find((listitem) => listitem.textContent.includes(itemName))
  );

  userEvent.click(
    screen
      .getAllByRole("listitem")
      .find((listitem) => listitem.textContent.includes(itemName))
  );
}

function addItem(text) {
  const input = screen.getByLabelText(/Add/i);
  const button = screen.getByRole("button", { name: /\+/i });

  userEvent.type(input, text);
  userEvent.click(button);
}

export const givenIAmOnTheTodoApp = (given) => {
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
    const button = screen.getByRole("button", { name: /\+/i });
    userEvent.click(button);
  });
};

const whenIAddTheItem = (when) => {
  when(/I add the item '(.*)/, (text) => {
    addItem(text);
  });
};

export const whenIClickOnTheItem = (when) => {
  when(/I click on the item '(.*)'/, async (itemName) => {
    await clickItem(itemName);
  });
};

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
      getByRole(item, "img", { name: new RegExp(status, "i"), exact: false })
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
});
