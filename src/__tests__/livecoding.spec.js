import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { defineFeature, loadFeature } from "jest-cucumber";

import App from "../App";

const feature = loadFeature("./livecoding.feature", {
  loadRelativePath: true,
});

describe("insert new items in the todo app", () => {
  test("insert 1 item", async () => {
    render(<App />);
    const input = screen.getByLabelText(/Add/i);
    userEvent.type(input, "Groceries");
    userEvent.click(screen.getByRole("button", { name: "+" }));

    await waitFor(() =>
      expect(screen.getByText(/Groceries/i)).toBeInTheDocument()
    );
  });

  test("inserting multiple items into the todo app", async () => {
    render(<App />);
    const input = screen.getByLabelText(/Add/i);
    userEvent.type(input, "Groceries");
    userEvent.click(screen.getByRole("button", { name: "+" }));

    userEvent.type(input, "Pick up the girls from school");
    userEvent.click(screen.getByRole("button", { name: "+" }));

    await waitFor(() =>
      expect(screen.getByText(/Groceries/i)).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(
        screen.getByText(/Pick up the girls from school/i)
      ).toBeInTheDocument()
    );
  });
});

defineFeature(feature, (test) => {
  test("Adding a single item", ({ given, when, then, and }) => {
    givenIamOnTheTodoApp(given);
    whenIWriteInTheNewItem(when);
    whenIAddMyNewItem(and);
    then(/My todo has the item "(.*)"/, async (itemName) => {
      await waitFor(() =>
        expect(screen.getByText(itemName)).toBeInTheDocument()
      );
    });
  });

  test("Add multiple items to the list", ({ given, when, then, and }) => {
    givenIamOnTheTodoApp(given);
    whenIWriteInTheNewItem(when);
    whenIAddMyNewItem(and);
    whenIWriteInTheNewItem(when);
    whenIAddMyNewItem(and);
    whenIWriteInTheNewItem(when);
    whenIAddMyNewItem(and);
    then("My Todo-list has the items :", async (table) => {
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
  });
});
function whenIAddMyNewItem(and) {
  and(/I click on the add an item button/, () => {
    userEvent.click(screen.getByRole("button", { name: "+" }));
  });
}

function whenIWriteInTheNewItem(when) {
  when(/I write "(.*)" in the new item/, (typedText) => {
    userEvent.type(screen.getByLabelText(/Add/), typedText);
  });
}

function givenIamOnTheTodoApp(given) {
  given(/I am on the todo app/, () => {
    render(<App />);
  });
}
