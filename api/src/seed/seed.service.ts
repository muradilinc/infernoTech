import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import mongoose from 'mongoose';
import { FixturesService } from './fixtures.service';

@Injectable()
export class SeedCommandService {
  constructor(private fixturesService: FixturesService) {}

  @Command({
    command: 'seed',
    describe: 'Seeding database',
  })
  async seed() {
    console.log('Connecting to database...');

    await mongoose.connect('mongodb://localhost/inferno-tech');
    const db = mongoose.connection;

    const collections = ['brands', 'categories', 'products', 'users', 'stores'];

    for (const collectionsName of collections) {
      await this.dropCollection(db, collectionsName);
    }

    await this.fixturesService.createData();

    await this.closeConnection(db);
  }

  async dropCollection(db: mongoose.Connection, collectionName: string) {
    try {
      console.log(`Dropping collection ${collectionName}...`);
      await db.dropCollection(collectionName);
      console.log(`Dropped collection ${collectionName}`);
    } catch (e) {
      console.log(`Collection ${collectionName} was missing, skipping drop...`);
    }
  }

  async closeConnection(db: mongoose.Connection) {
    console.log(`Closing connection`);
    await db.close();
    console.log(`Connection closed`);
  }
}
