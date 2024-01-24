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
  try {
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
  } catch (error) {
    handleError(error);
  }
}

async function listAction() {
  const contacts = await listContacts();
  console.log("List of Contacts:");
  console.table(contacts);
}

async function getAction(id) {
  const contact = await getContactById(id);
  console.log("Contact details:");
  console.table(contact);
}

async function addAction(name, email, phone) {
  const newContact = await addContact(name, email, phone);
  console.log("Added new contact:");
  console.table(newContact);
}

async function removeAction(id) {
  const result = await removeContact(id);
  console.log(`Contact removal result: ${result}`);
}

function handleError(error) {
  console.error("Error:", error.message);
}

invokeAction({ action, id, name, email, phone });
