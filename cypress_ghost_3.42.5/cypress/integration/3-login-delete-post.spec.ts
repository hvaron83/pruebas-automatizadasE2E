import { Login } from "../page-objects/login";
import { SideBar } from "../page-objects/side-bar";
import { PostPage } from "../page-objects/post-page";
import * as faker from "faker";
import { should } from "chai";
const login = new Login();
const sideBar = new SideBar();
const postPage = new PostPage();

const cookieSessionName =
  Cypress.env("cookieSessionName") || "ghost-admin-api-session";  

describe("Should login and create a post with title succesfully", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });

  const postTitle = faker.lorem.words()

  let datetime;

  before(() => {
    datetime = new Date().toISOString().replace(/:/g, ".");
  });


  beforeEach(() => {
    Cypress.Cookies.preserveOnce(cookieSessionName);
  });

  it("should login the user", () => {
    login.visit();
    login.loginWithEnvUser();
    cy.url().should("include", "/#/site");
    cy.screenshot(`${datetime}/image-1`);
  });

  it("should go to posts", () => {
    if (sideBar.checkIfComponentExists()) {
      cy.log("theres sidebar");
      sideBar.goToPosts();
      cy.screenshot(`${datetime}/image-2`);
    }
  });

  it("should create a post with random title", () => {
    if (postPage.checkIfComponentExists()) {
      postPage.clickNewPost()
      cy.screenshot(`${datetime}/image-3`);
      postPage.fillTitle(postTitle).clickBack()
    }
  });

  it("post with random title should be available on post list", () => {
    cy.contains(postTitle).should("exist")
  });

  it("will enter on created post", () => {
      cy.contains(postTitle).click({force: true})
      cy.screenshot(`${datetime}/image-4`);
  })

  it("post is deleted", () => {
      postPage.clickDelete()
      cy.screenshot(`${datetime}/image-5`);
      postPage.confirmDelete()
  })

  it("post should not exist anymore", () => {
    cy.contains(postTitle).should("not.exist")
})
});