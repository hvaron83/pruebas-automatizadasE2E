Feature: Remove Tag

  @user1 @web @version3.42.5 @scenario06
  Scenario: Remove Tag
    Given I login into the administrator site
    When I create a new tag using random texts
    And I delete the new tag using random texts
    Then I should not see the link for tag with random text
