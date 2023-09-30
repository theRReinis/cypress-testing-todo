describe("Add new tasks into Todo app", () => {
  it("User can add a task to the list by typing into input field and pressing enter", () => {
    cy.visit("");
    cy.addNewTask("Cook dinner");
    cy.assertTaskListSize(1).should("have.text", "Cook dinner");
    cy.assertToDoTaskstInList([{ text: "Cook dinner", isCompleted: false }]);
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
    cy.assertToDoTaskstInList([{ text: "Cook dinner", isCompleted: true }]);
  });

  it("User can mark the task as completed by clicking text label", () => {
    cy.visit("");
    cy.addNewTask("Cook dinner");
    cy.assertTaskListSize(1).find("label").click();

    cy.reload();
    cy.assertTaskIsMarkedAsCompleted();
  });
});

describe("Displaying count of tasks left", () => {
  beforeEach(() => {
    cy.visit("");
    cy.assertDisplayCountOfTasksLeft("0 items left");
  });

  it("The display count of tasks left updates when new task is added", () => {
    cy.addNewTask("Cook dinner");
    cy.assertDisplayCountOfTasksLeft("1 item left");
    cy.addNewTask("Buy book");
    cy.assertDisplayCountOfTasksLeft("2 items left");
  });

  it("The display count of tasks left updates when task is marked as completed", () => {
    cy.addNewTask("Cook dinner");
    cy.assertDisplayCountOfTasksLeft("1 item left");
    cy.assertTaskListSize(1).find("label").click();
    cy.assertDisplayCountOfTasksLeft("0 items left");
  });

  it("The display count of tasks left updates when user restores completed task", () => {
    cy.addNewTask("Cook dinner");
    cy.assertDisplayCountOfTasksLeft("1 item left");
    cy.assertTaskListSize(1).find("label").click();
    cy.assertDisplayCountOfTasksLeft("0 items left");
    cy.assertTaskListSize(1).find("label").click();
    cy.assertDisplayCountOfTasksLeft("1 item left");
  });
});

describe("Clear completed tasks", () => {
  it("User is able to clear completed tasks", () => {
    cy.visit("");
    cy.addNewTask("Cook dinner");
    cy.addNewTask("Read book");
    cy.assertTaskListSize(2).first().find("label").click();

    cy.get('[data-testid="clear-all"]').click();
    cy.assertTaskListSize(1);
  });
});
