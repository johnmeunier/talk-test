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

  Scenario: Default status of an item is active
    Given I am on the todo app
    When I write 'Groceries' in the new item
    And I add my new item
    Then The item 'Groceries' is active

  Scenario: Toggle status of an item
    Given I am on the todo app
    When I add the item 'Groceries'
    And I click on the item 'Groceries'
    Then The item 'Groceries' is completed

  Scenario: Toggle a single item among many
    Given I am on the todo app
    When I add the item 'Groceries'
    And I add the item 'Pick-up the girls from school'
    And I add the item 'Kill some bugs'
    And I click on the item 'Pick-up the girls from school'
    And I click on the item 'Pick-up the girls from school'
    And I click on the item 'Kill some bugs'
    Then The item 'Groceries' is active
    And The item 'Pick-up the girls from school' is active
    But The item 'Kill some bugs' is completed

# Scenario: Should retrieve my existing items
#   Given I have previously added the following items
#     | item                          | status    |
#     | Pick-up the girls from school | completed |
#     | Kill some bugs                | active    |
#     | Groceries                     | active    |
#   And I am on the todo app
#   Then The item 'Pick-up the girls from school' is completed
#   But The item 'Kill some bugs' is active
#   And The item 'Groceries' is active



