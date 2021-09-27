Feature: I should be able to filter my items
  Scenario: I filter by text and some items remain
    Given I am on the todo app
    And I have the following tasks
      | task                    | status    |
      | I should be visible     | completed |
      | I should be hidden      | active    |
      | I should be visible too | active    |
      | I should be hidden too  | completed |
    When I filter by text "visible"
    Then My Todo-list has the items :
      | items                   |
      | I should be visible     |
      | I should be visible too |

  Scenario: I filter by status active and active items remain
    Given I am on the todo app
    And I have the following tasks
      | task               | status    |
      | I am completed     | completed |
      | I am active        | active    |
      | I am active too    | active    |
      | I am completed too | completed |
    When I filter by Active
    Then My Todo-list has the items :
      | items           |
      | I am active     |
      | I am active too |

  Scenario: I filter by status completed and completed items remain
    Given I am on the todo app
    And I have the following tasks
      | task               | status    |
      | I am completed     | completed |
      | I am active        | active    |
      | I am active too    | active    |
      | I am completed too | completed |
    When I filter by Completed
    Then My Todo-list has the items :
      | items              |
      | I am completed     |
      | I am completed too |