import { Client, Account } from "appwrite";

const client = new Client();

const account = new Account(client);

client
  .setEndpoint("https://appwrite.exampledev.xyz/v1")
  .setProject("64291dbb1f29c794d85e");

export default account;
