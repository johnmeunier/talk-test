Feature: Sorting tasks by status

  Scenario: The default sort orders items by creation date
    Given I am on the todo app
    And I have the following tasks
      | task   | status    |
      | first  | completed |
      | second | active    |
      | third  | active    |
      | fourth | completed |
    When I sort by "Default"
    Then My Todo-list has the items in order:
      | items  |
      | first  |
      | second |
      | third  |
      | fourth |

  Scenario: The Active sort orders items by active first, then creation date
    Given I am on the todo app
    And I have the following tasks
      | task   | status    |
      | first  | completed |
      | second | active    |
      | third  | active    |
      | fourth | completed |
    When I sort by "Active items first"
    Then My Todo-list has the items in order:
      | items  |
      | second |
      | third  |
      | first  |
      | fourth |

  Scenario: The Completed sort orders items by active first, then creation date
    Given I am on the todo app
    And I have the following tasks
      | task   | status    |
      | first  | completed |
      | second | active    |
      | third  | active    |
      | fourth | completed |
    When I sort by "Completed items first"
    Then My Todo-list has the items in order:
      | items  |
      | first  |
      | fourth |
      | second |
      | third  |


