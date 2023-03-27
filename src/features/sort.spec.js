import { defineFeature, loadFeature } from "jest-cucumber";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  givenIAmOnTheTodoApp,
  givenIHaveTheFollowingTasks,
} from "./helpers.steps";

const feature = loadFeature("./sort.feature", {
  loadRelativePath: true,
});

defineFeature(feature, (test) => {
  test("The default sort orders items by creation date", ({
    given,
    when,
    then,
    and,
  }) => {
    givenIAmOnTheTodoApp(given);
    givenIHaveTheFollowingTasks(and);
    when(/I sort by "(.*)"/, async (filterText) => {
      const section = screen.getByRole("heading", { name: /sort/i }).parentNode;
      const filter = within(section).getByRole("combobox", { name: /status/i });

      await userEvent.selectOptions(
        filter,
        within(filter).getByText(filterText)
      );
    });
    then(/My Todo-list has the items in order:/, (table) => {
      const items = screen.getAllByRole("listitem");
      for (const [item, index] of table.map((row, index) => [
        row.items,
        index,
      ])) {
        expect(items[index]).toHaveTextContent(item);
      }
    });
  });

  test("The Active sort orders items by active first, then creation date", ({
    given,
    when,
    then,
    and,
  }) => {
    givenIAmOnTheTodoApp(given);
    givenIHaveTheFollowingTasks(and);
    when(/I sort by "(.*)"/, async (filterText) => {
      const section = screen.getByRole("heading", { name: /sort/i }).parentNode;
      const filter = within(section).getByRole("combobox", { name: /status/i });

      await userEvent.selectOptions(
        filter,
        within(filter).getByText(filterText)
      );
    });
    then(/My Todo-list has the items in order:/, (table) => {
      const items = screen.getAllByRole("listitem");
      for (const [item, index] of table.map((row, index) => [
        row.items,
        index,
      ])) {
        expect(items[index]).toHaveTextContent(item);
      }
    });
  });

  test("The Completed sort orders items by active first, then creation date", ({
    given,
    when,
    then,
    and,
  }) => {
    givenIAmOnTheTodoApp(given);
    givenIHaveTheFollowingTasks(and);
    when(/I sort by "(.*)"/, async (filterText) => {
      const section = screen.getByRole("heading", { name: /sort/i }).parentNode;
      const filter = within(section).getByRole("combobox", { name: /status/i });

      await userEvent.selectOptions(
        filter,
        within(filter).getByText(filterText)
      );
    });
    then(/My Todo-list has the items in order:/, (table) => {
      const items = screen.getAllByRole("listitem");
      for (const [item, index] of table.map((row, index) => [
        row.items,
        index,
      ])) {
        expect(items[index]).toHaveTextContent(item);
      }
    });
  });
});
