/// <reference types="cypress" />

export interface ListItem {
  id?: number;
  text: string;
  isCompleted: boolean;
}

Cypress.Commands.add("addNewTask", addNewTask);
Cypress.Commands.add("assertTaskListSize", assertTaskListSize);
Cypress.Commands.add(
  "assertTaskIsMarkedAsCompleted",
  assertTaskIsMarkedAsCompleted
);
Cypress.Commands.add(
  "assertDisplayCountOfTasksLeft",
  assertDisplayCountOfTasksLeft
);
Cypress.Commands.add("assertToDoTaskstInList", assertToDoTaskstInList);
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
      /**
       * Assert text of displayed count of left tasks
       * @param expectedText
       */
      assertDisplayCountOfTasksLeft(expectedText: string): void;
      /**
       * Assert todo tasks in list by providing expected values
       * @param expecteTaskValues - Expected list item array that is saved in local storage
       */
      assertToDoTaskstInList(expecteTaskValues: ListItem[]): void;
    }
  }
}

function addNewTask(taskText: string): void {
  cy.get('[data-testid="main-input"]').type(`${taskText}{enter}`);
}

function assertTaskListSize(expextedTaskAmount: number): Cypress.Chainable {
  return cy
    .get('[data-testid="list-item"]')
    .should("have.length", expextedTaskAmount);
}

function assertTaskIsMarkedAsCompleted(): void {
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

function assertDisplayCountOfTasksLeft(expectedText: string): void {
  cy.get("footer span").should("have.text", expectedText);
}

function assertToDoTaskstInList(expectedTodos: ListItem[]): Cypress.Chainable {
  return cy.get('[data-testid="list-item"]').then(($todos) => {
    expectedTodos.forEach((todo, index) => {
      expect($todos[index]).to.have.text(todo.text);
      const checkBoxEl = Cypress.$($todos[index]).find("[type=checkbox]");
      if (todo.isCompleted) {
        expect(checkBoxEl).to.have.checked;
      } else {
        expect(checkBoxEl).not.to.have.checked;
      }
    });
  });
}
