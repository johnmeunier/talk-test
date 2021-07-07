Feature: Todo list application

  Scenario: Add an item to the list
    Given I am on the todo app
    When I write 'Groceries' in the new item
    And I add my new item
    Then My Todo-list has the items :
      | items     |
      | Groceries |