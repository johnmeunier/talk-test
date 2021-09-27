import { defineFeature, loadFeature } from "jest-cucumber";
import {
  getByRole,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  givenIAmOnTheTodoApp,
  givenIHaveTheFollowingTasks,
  thenMyTodolistHasTheItems,
  whenIClickOnTheItem,
  thenTheItemIs,
} from "./init.spec";

const feature = loadFeature("./filter.feature", {
  loadRelativePath: true,
});

defineFeature(feature, (test) => {
  test("I filter by text and some items remain", ({
    given,
    when,
    then,
    and,
  }) => {
    givenIAmOnTheTodoApp(given);
    givenIHaveTheFollowingTasks(and);
    when(/I filter by text "(.*)"/, (filterText) => {
      const section = screen.getByRole("heading", { name: /filter/i })
        .parentNode;
      const filter = within(section).getByLabelText(/by label/i);

      userEvent.type(filter, filterText);
    });
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
    when(/I filter by (.*)/, (filterStatus) => {
      const section = screen.getByRole("heading", { name: /filter/i })
        .parentNode;
      const filter = within(section).getByRole("combobox", { name: /status/i });

      userEvent.selectOptions(filter, within(filter).getByText(filterStatus));
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
    when(/I filter by (.*)/, (filterStatus) => {
      const section = screen.getByRole("heading", { name: /filter/i })
        .parentNode;
      const filter = within(section).getByRole("combobox", { name: /status/i });

      userEvent.selectOptions(filter, within(filter).getByText(filterStatus));
    });
    thenMyTodolistHasTheItems(then);
  });

  test("Status change when filtered", ({ given, when, then, and }) => {
    givenIAmOnTheTodoApp(given);
    givenIHaveTheFollowingTasks(and);
    when(/I filter by (.*)/, (filterStatus) => {
      const section = screen.getByRole("heading", { name: /filter/i })
        .parentNode;
      const filter = within(section).getByRole("combobox", { name: /status/i });

      userEvent.selectOptions(filter, within(filter).getByText(filterStatus));
    });
    whenIClickOnTheItem(when);
    when(/I filter by (.*)/, (filterStatus) => {
      const section = screen.getByRole("heading", { name: /filter/i })
        .parentNode;
      const filter = within(section).getByRole("combobox", { name: /status/i });

      userEvent.selectOptions(filter, within(filter).getByText(filterStatus));
    });
    thenTheItemIs(then);
  });
});
