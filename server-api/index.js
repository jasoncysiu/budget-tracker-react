const express = require("express");
const cors = require("cors");
const { google } = require("googleapis");
const port = 1337;
const auth = new google.auth.GoogleAuth({
    keyFile: "credential.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });
  // Instance of Google Sheets API
  const spreadsheetId = "15QgBBOq8dRSqHpf6AE3-rQg24on-kOBZKEIwI0Bd8k8";

// Function to transform the API response into the desired format
function transformData(data) {
    // Extract the headers
    const headers = data.values[0];
    
    // Map over the values starting from the second item
    return data.values.slice(1).map(row => {
        // Reduce each row into an object, using the headers for keys
        return row.reduce((obj, value, index) => {
            // Convert the cost to a number
            let formattedValue = value;
            if (headers[index] === "cost") {
                formattedValue = Number(value);
            }
            obj[headers[index]] = formattedValue;
            return obj;
        }, {});
    });
}

const app = express();
let dummy_transactions = [{ id: 1, item: "Initial transaction", cost: 100 }]; // Initial data

app.use(express.json());

// Or, to specifically allow requests from your React app's origin, you can configure like this:
app.use(
  cors({
    origin: "http://localhost:3000", // React app's server address
  })
);

app.use(express.urlencoded({ extended: true }));


// Google Sheets client initialization
async function initializeGoogleSheetsClient() {
    const auth = new google.auth.GoogleAuth({
      keyFile: "credential.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    return google.sheets({ version: "v4", auth: await auth.getClient() });
  }

app.get("/transactions", async (req, res) => {

    const googleSheets = await initializeGoogleSheetsClient();

  // Read rows from spreadsheet
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Sheet1!A:C",
  });

  res.json(transformData(getRows.data));
});


app.post("/transactions", async (req, res) => {
    const newTransaction = { ...req.body.request }; // Create a new transaction with a unique ID
    const {  id, cost, item } = req.body.request;

    const googleSheets = await initializeGoogleSheetsClient();

    //   Append rows to spreadsheet
      await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Sheet1!A:C",
        valueInputOption: "USER_ENTERED",
        resource: {
          values: [[id, item, cost]],
        },
      });

    
    dummy_transactions = [...dummy_transactions, newTransaction];
    res.status(201).send("Transaction added successfully!");
  });


  app.put("/transactions/:id", async (req, res) => {
    const transactionId = req.params.id; // Get the transaction ID from the URL
    const { cost, item } = req.body; // Assuming you want to update cost and/or item

    const googleSheets = await initializeGoogleSheetsClient();

    // Read the existing data
    const readResponse = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "Sheet1!A:C",
    });

    let data = transformData(readResponse.data);
    let found = false;

    // Update the data if the id matches
    const updatedData = data.map(transaction => {
      if (transaction.id === transactionId) {
        found = true;
        return { ...transaction, cost: cost ?? transaction.cost, item: item ?? transaction.item };
      }
      return transaction;
    });

    if (!found) {
      res.status(404).send("Transaction not found.");
      return;
    }

    // Transform the updated data back into a 2D array suitable for Google Sheets
    const values = updatedData.map(transaction => [transaction.id, transaction.item, transaction.cost]);

    // Write the updated data back to the sheet, including the headers
    await googleSheets.spreadsheets.values.update({
      auth,
      spreadsheetId,
      range: "Sheet1!A:C",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [["id", "item", "cost"], ...values],
      },
    });

    res.send("Transaction updated successfully.");
});


app.listen(port, (req, res) => console.log("running on 1337"));
