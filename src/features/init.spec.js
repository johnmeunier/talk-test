import React from 'react';
import { defineFeature, loadFeature } from 'jest-cucumber';
import { render, screen } from '@testing-library/react';

import App from '../App';

const feature = loadFeature('./init.feature', {
  loadRelativePath: true,
});

const givenJaccedeALaPageDAccueil = given => {
  given("J'accède à la page d'accueil", () => {
    render(<App />);
  });
};

defineFeature(feature, test => {
  test("Afficher Learn React sur la page d'accueil", ({ given, then }) => {
    givenJaccedeALaPageDAccueil(given);
    then('La page comporte le texte Learn React', () => {
      expect(screen.getByText("Learn React")).toBeInTheDocument();
    });
  });
});