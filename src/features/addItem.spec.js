import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { defineFeature, loadFeature } from "jest-cucumber";

import App from "../App";






























const feature = loadFeature("./addItem.feature", {
  loadRelativePath: true,
});