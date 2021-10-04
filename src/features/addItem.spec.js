import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { defineFeature, loadFeature } from "jest-cucumber";

import App from "../App";

describe("Adding items to the todo app", () => {
  test("fake", () => { expect(true).toBe(true)});
})





























const feature = loadFeature("./addItem.feature", {
  loadRelativePath: true,
});