import { Login } from "../page-objects/login";
import { Profile } from "../page-objects/profile";
import * as faker from "faker";

const login = new Login();
const profile = new Profile();


const cookieSessionName =
  Cypress.env("cookieSessionName") || "ghost-admin-api-session";  

describe("Will try to login using using a non-email string and a password", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });

  faker.seed(123)
  const email = faker.internet.email()

  let datetime;
  before(() => {
    datetime = new Date().toISOString().replace(/:/g, ".");
  });
  beforeEach(() => {
    Cypress.Cookies.preserveOnce(cookieSessionName);
  });

  it("should go to login", () => {
    login.visit();
    login.loginWithEnvUser()
    cy.screenshot(`${datetime}/image-1`);
  });

  it("should go to profile page", () => {
    profile.goToProfile()
  })

  it("write a non valid email", () => {
    profile.fillEmail(email)
    profile.clickSave()
  })

  it("it should not trigger any warm", () => {
    cy.xpath(`//p[@class="response"]`).should('have.attr', 'hidden')
  })

  it("should return mail to normal", () => {
      profile.goToProfile()
      profile.fillEmail(Cypress.env('user'))
      profile.clickSave()
    })
});