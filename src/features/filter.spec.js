import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { defineFeature, loadFeature } from "jest-cucumber";
import {
  givenIAmOnTheTodoApp,
  givenIHaveTheFollowingTasks,
  thenMyTodolistHasTheItems,
  thenTheItemIs,
  whenIClickOnTheItem,
} from "./helpers.steps";

const feature = loadFeature("./filter.feature", {
  loadRelativePath: true,
});

function whenIFilterByText(when) {
  when(/I filter by text "(.*)"/, async (filterText) => {
    const section = screen.getByRole("heading", {
      name: /filter/i,
    }).parentNode;
    const filter = within(section).getByLabelText(/by label/i);

    await userEvent.type(filter, filterText);
  });
}

defineFeature(feature, (test) => {
  test("I filter by text and some items remain", ({
    given,
    when,
    then,
    and,
  }) => {
    givenIAmOnTheTodoApp(given);
    givenIHaveTheFollowingTasks(and);
    whenIFilterByText(when);
    thenMyTodolistHasTheItems(then);
  });

  test("I filter by status active and active items remain", ({
    given,
    when,
    then,
    and,
  }) => {
    givenIAmOnTheTodoApp(given);
    givenIHaveTheFollowingTasks(and);
    when(/I filter by (.*)/, async (filterStatus) => {
      const section = screen.getByRole("heading", {
        name: /filter/i,
      }).parentNode;
      const filter = within(section).getByRole("combobox", { name: /status/i });

      await userEvent.selectOptions(
        filter,
        within(filter).getByText(filterStatus)
      );
    });
    thenMyTodolistHasTheItems(then);
  });

  test("I filter by status completed and completed items remain", ({
    given,
    when,
    then,
    and,
  }) => {
    givenIAmOnTheTodoApp(given);
    givenIHaveTheFollowingTasks(and);
    when(/I filter by (.*)/, async (filterStatus) => {
      const section = screen.getByRole("heading", {
        name: /filter/i,
      }).parentNode;
      const filter = within(section).getByRole("combobox", { name: /status/i });

      await userEvent.selectOptions(
        filter,
        within(filter).getByText(filterStatus)
      );
    });
    thenMyTodolistHasTheItems(then);
  });

  test("Status change when filtered", ({ given, when, then, and }) => {
    givenIAmOnTheTodoApp(given);
    givenIHaveTheFollowingTasks(and);
    when(/I filter by (.*)/, async (filterStatus) => {
      const section = screen.getByRole("heading", {
        name: /filter/i,
      }).parentNode;
      const filter = within(section).getByRole("combobox", { name: /status/i });

      await userEvent.selectOptions(
        filter,
        within(filter).getByText(filterStatus)
      );
    });
    whenIClickOnTheItem(when);
    when(/I filter by (.*)/, async (filterStatus) => {
      const section = screen.getByRole("heading", {
        name: /filter/i,
      }).parentNode;
      const filter = within(section).getByRole("combobox", { name: /status/i });

      await userEvent.selectOptions(
        filter,
        within(filter).getByText(filterStatus)
      );
    });
    thenTheItemIs(then);
  });

  test("Filter should not be case sensitive", ({ given, when, then, and }) => {
    givenIAmOnTheTodoApp(given);
    givenIHaveTheFollowingTasks(and);
    whenIFilterByText(when);
    thenMyTodolistHasTheItems(then);
  });
});
