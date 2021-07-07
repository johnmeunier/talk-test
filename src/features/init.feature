Feature: Todo list application

  Scenario: Add an item to an empty list
    Given I am on the todo app
    When I write 'Groceries' in the new item
    And I add my new item
    Then My Todo-list has the items :
      | items     |
      | Groceries |

  Scenario: Add multiple items to the list
    Given I am on the todo app
    When I write 'Groceries' in the new item
    And I add my new item
    And I write 'Pick-up the girls from school' in the new item
    And I add my new item
    And I write 'Kill some bugs' in the new item
    And I add my new item
    Then My Todo-list has the items :
      | items                         |
      | Groceries                     |
      | Pick-up the girls from school |
      | Kill some bugs                |