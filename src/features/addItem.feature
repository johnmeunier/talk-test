Feature: Adding items to the todo app

  Scenario: Adding a single item
    Given I am on the todo app
    When I write "Groceries" in the new item
    And I click on the add an item button
    Then My todo has the item "Groceries"


  Scenario: Add multiple items to the list
    Given I am on the todo app
    When I write "Groceries" in the new item
    And I click on the add an item button
    And I write "Walk the doggies" in the new item
    And I click on the add an item button
    And I write "Kill some bugs" in the new item
    And I click on the add an item button
    Then My Todo-list has the items :
      | items                         |
      | Groceries                     |
      | Walk the doggies |
      | Kill some bugs                |