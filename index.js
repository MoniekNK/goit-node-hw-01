const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const { action, id, name, email, phone } = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listAction();
      break;

    case "get":
      getAction(id);
      break;

    case "add":
      addAction(name, email, phone);
      break;

    case "remove":
      removeAction(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

async function listAction() {
  try {
    const contacts = await listContacts();
    console.log("List of Contacts:");
    console.table(contacts);
  } catch (error) {
    console.error("Error listing contacts:", error.message);
  }
}

async function getAction(id) {
  try {
    const contact = await getContactById(id);
    console.log("Contact details:");
    console.table(contact);
  } catch (error) {
    console.error("Error getting contact:", error.message);
  }
}

async function addAction(name, email, phone) {
  try {
    const newContact = await addContact(name, email, phone);
    console.log("Added new contact:");
    console.table(newContact);
  } catch (error) {
    console.error("Error adding contact:", error.message);
  }
}

async function removeAction(id) {
  try {
    const result = await removeContact(id);
    console.log(`Contact removal result: ${result}`);
  } catch (error) {
    console.error("Error removing contact:", error.message);
  }
}

invokeAction({ action, id, name, email, phone });
