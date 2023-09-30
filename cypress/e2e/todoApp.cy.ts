describe("Add new tasks into Todo app", () => {
  it("User can add a task to the list by typing into input field and pressing enter", () => {
    cy.visit("");
    cy.addNewTask("Cook dinner");
    cy.assertTaskListSize(1).should("have.text", "Cook dinner");
  });

  it("User added task appears to at the end of the list", () => {
    cy.visit("");
    cy.addNewTask("Cook dinner");
    cy.addNewTask("Read book");
    cy.assertTaskListSize(2).last().should("have.text", "Read book");
  });
});

describe("Complete tasks into Todo app", () => {
  it("User can mark the task as completed by clicking on the check button", () => {
    cy.visit("");
    cy.addNewTask("Cook dinner");
    cy.assertTaskListSize(1).find("[type=checkbox]").click({ force: true });

    cy.reload();
    cy.assertTaskIsMarkedAsCompleted();
  });

  it("User can mark the task as completed by clicking text label", () => {
    cy.visit("");
    cy.addNewTask("Cook dinner");
    cy.assertTaskListSize(1).find("label").click();

    cy.reload();
    cy.assertTaskIsMarkedAsCompleted();
  });
});
