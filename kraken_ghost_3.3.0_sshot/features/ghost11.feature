Feature: Create Post with a new tag

  @user1 @web @version3.3.0 @scenario11
  Scenario: Create Post with a new tag
    Given I login into the administrator site
    When I create a new post using random texts with a random tag
    Then I should see the link for tag with random text
