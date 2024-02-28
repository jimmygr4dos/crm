import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from 'dotenv';

import { loadCredentials } from "./enviroment";
import { User } from "../modules/users/models/user.model";
import { Customer } from "../modules/customers/models/customer.model";
import { Contact } from "../modules/contacts/models/contact.model";

dotenv.config();

const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = loadCredentials();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  username: MYSQL_USER,
  password: MYSQL_PASS,
  database: MYSQL_DB,
  entities: [User, Customer, Contact],
  logging: false,
  synchronize: true,
});

