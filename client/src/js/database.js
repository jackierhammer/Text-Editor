import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // first, we connect to the database and select version
  const jateDB = await openDB('jate', 1);
  // now, we make a new transaction 
  // also, we have to specify data privileges
  const tx = jateDB.transaction('jate', 'readwrite');
  // we open the object store
  const store = tx.objectStore('jate');
  // now, we can pass in the content 
  const req = store.put({value: content});
  // we confirm the data was added
  const res = await req;
  // the following line logs the data added
  console.log('data saved to database', res);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // first, we connect to the database and select version
  const jateDB = await openDB('jate', 1);
  // now, we make a new transaction 
  // also, we have to specify data privileges
  const tx = jateDB.transaction('jate', 'readwrite');
  // we open the object store
  const store = tx.objectStore('jate');
  // now, we can get all the content stored in the database
  const req = store.getAll();
  // we confirm the data was fetched
  const res = await req;
  // the following line logs the data to the console
  console.log(res);
};

initdb();
