/// <reference types="cypress" />

Cypress.Commands.add("addNewTask", addNewTask);
Cypress.Commands.add("assertTaskListSize", assertTaskListSize);
Cypress.Commands.add(
  "assertTaskIsMarkedAsCompleted",
  assertTaskIsMarkedAsCompleted
);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Add new task by typing text into input field and pressing Enter
       * @param taskText
       */
      addNewTask(taskText: string): void;
      /**
       * Assert task list size have expected number of tasks
       * @param expectedNumberOfTasks
       * @return Task list
       *
       */
      assertTaskListSize(expectedNumberOfTasks: number): Cypress.Chainable;
      /**
       * Assert the task is marked as completed by verifying 2 things:
       *
       *    Checkbox have attribute: checked
       *    Text label have CSS style: line-through
       */
      assertTaskIsMarkedAsCompleted(): void;
    }
  }
}

export function addNewTask(taskText: string): void {
  cy.get('[data-testid="main-input"]').type(`${taskText}{enter}`);
}

export function assertTaskListSize(
  expextedTaskAmount: number
): Cypress.Chainable {
  return cy
    .get('[data-testid="list-item"]')
    .should("have.length", expextedTaskAmount);
}

export function assertTaskIsMarkedAsCompleted(): void {
  cy.assertTaskListSize(1).within((el) => {
    cy.wrap(el).find("[type=checkbox]").should("have.attr", "checked");
    cy.wrap(el)
      .find("label")
      .should(
        "have.css",
        "text-decoration",
        "line-through solid rgb(225, 219, 218)"
      );
  });
}
