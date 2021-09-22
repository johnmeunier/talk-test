Feature: I should be able to filter my items
  Scenario: I filter by text and some items remain
    Given I am on the todo app
    And I have the following tasks
      | task                    | status    |
      | I should be visible     | completed |
      | I should be hidden      | active    |
      | I should be visible too | active    |
      | I should be hidden too  | completed |
    When I filter by "visible"
    Then My Todo-list has the items :
      | items                   |
      | I should be visible     |
      | I should be visible too |