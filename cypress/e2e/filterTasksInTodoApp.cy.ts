import { ListItem } from "../support/commands";

describe("Filter Todo list app tasks", () => {
  // 2 active and 2 completed todos tasks
  const listItems: ListItem[] = [
    {
      id: 1,
      text: "Text",
      isCompleted: false,
    },
    {
      id: 2,
      text: "Text 2",
      isCompleted: true,
    },
    {
      id: 3,
      text: "Text 3",
      isCompleted: false,
    },
    {
      id: 4,
      text: "Text 4",
      isCompleted: true,
    },
  ];
  const activeItems: ListItem[] = listItems.filter(
    (listItem) => listItem.isCompleted == false,
  );
  const completedItems: ListItem[] = listItems.filter(
    (listItem) => listItem.isCompleted == true,
  );

  beforeEach(() => {
    // Using localstroage to set up necessary task fields to test filtering
    cy.visit("", {
      onBeforeLoad(win) {
        win.localStorage.setItem("tasks", JSON.stringify(listItems));
      },
    });
    cy.get('[data-testid="display-all"]')
      .should("have.attr", "class")
      .then((attr) => {
        expect(attr).to.include("active");
      });
    cy.assertTaskListSize(listItems.length);
  });

  it("User is able to filter Active tasks", () => {
    cy.get('[data-testid="active-todos"]').click();
    cy.assertTaskListSize(activeItems.length);
    cy.assertToDoTaskstInList(activeItems);
  });

  it("User is able to filter Completed tasks", () => {
    cy.get(".container__filterButton").contains("Completed").click();
    cy.assertTaskListSize(completedItems.length);
    cy.assertToDoTaskstInList(completedItems);
  });
});
