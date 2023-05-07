import { Client, Account, Databases } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://appwrite.exampledev.xyz:3031/v1")
  .setProject("63f842ea1273d5966e7c"); // Your project ID

export const account = new Account(client);
export const user = new Account(client);
export const database = new Databases(client, "6416d4e0482d1c06be35");
