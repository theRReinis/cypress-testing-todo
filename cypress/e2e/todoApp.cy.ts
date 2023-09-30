describe("Add new tasks into ToDo app", () => {

  it("User can add a task to the list by typing into input field and pressing enter", () => {
    cy.visit("");
    cy.get('[data-testid="main-input"]').type("Cook dinner{enter}");
    cy.get('[data-testid="list-item"]')
      .should("have.length", 1)
      .should('have.text', 'Cook dinner');
  });

  it("User added task appears to at the end of the list", () => {
    cy.visit("");
    cy.get('[data-testid="main-input"]').type("Cook dinner{enter}");
    cy.get('[data-testid="main-input"]').type("Read book{enter}");
    cy.get('[data-testid="list-item"]')
      .should("have.length", 2).last().should('have.text', 'Read book');
  });
});

describe("Complete tasks into ToDo app", () => {
    
    it("User can mark the task as completed by clicking on the check button", () => {
      cy.visit("");
      cy.get('[data-testid="main-input"]').type("Cook dinner{enter}");
      cy.get('[data-testid="list-item"]')
        .should("have.length", 1).find('[type=checkbox]').click({force:true});

      cy.reload();
      cy.get('[data-testid="list-item"]').within((el) => {
        cy.wrap(el).find('[type=checkbox]').should('have.attr', 'checked')
        cy.wrap(el).find('label').should('have.css', 'text-decoration', 'line-through solid rgb(225, 219, 218)');
      });

    });

    it("User can mark the task as completed by clicking text label", () => {
        cy.visit("");
        cy.get('[data-testid="main-input"]').type("Cook dinner{enter}");
        cy.get('[data-testid="list-item"]')
          .should("have.length", 1).find('label').click();
  
        cy.reload();
        cy.get('[data-testid="list-item"]').within((el) => {
          cy.wrap(el).find('[type=checkbox]').should('have.attr', 'checked')
          cy.wrap(el).find('label').should('have.css', 'text-decoration', 'line-through solid rgb(225, 219, 218)');
        });
  
      });
});
