import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  DeleteCommand
} from "@aws-sdk/lib-dynamodb";

//Connects to the DynamoDB with the given credentials
const client = new DynamoDBClient({
  region: process.env.REACT_APP_AWS_REGION,
  credentials: {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
  }
});
const docClient = DynamoDBDocumentClient.from(client);

// Reads all the todo in the Todo db
export async function scanTodos() {
  const { Items } = await docClient.send(
    new ScanCommand({ TableName: "Todo" })
  );
  return Items || [];
}

// Adds new todos to the Todo databse table
export async function createTodo(item) {
  await docClient.send(new PutCommand({ TableName: "Todo", Item: item }));
}

{
  /* item = {
  id: '123456',
  text: 'i am a task',
  complete: false
} */
}
// Updates existing todo items - Basically Edits the todo
export async function updateTodo(id, updates) {
  const updateFields = Object.keys(updates)
    .map((key, i) => {
      `#key${i} = :val${i}`;
    })
    .join(", ");
}

// Deletes a given todo item based on the id
export async function deleteTodo(id) {
  await docClient.send(new DeleteCommand({ TableName: "Todo", Key: { id } }));
}
