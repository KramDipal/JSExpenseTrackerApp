import * as SQLite from 'expo-sqlite';
import { Text, View } from 'react-native';

import { useEffect, useState } from 'react';



export default function InitDB(){

    const [db, setDb] = useState(null);


        // Initialize database
        useEffect(() => {
            const setupDatabase = async () => {
                try {
                    const database = await SQLite.openDatabaseAsync('ExpDB.db');
                    setDb(database);

                    // Create table
                    await database.execAsync(`
                    PRAGMA journal_mode = WAL;
                    CREATE TABLE IF NOT EXISTS tasks (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        refnum TEXT,
                        food TEXT,
                        catgory TEXT,
                        notes TEXT,
                        date DATETIME,
                    );
                    `);
                    console.log('Database and table initialized');
                    fetchTasks(database);
                } catch (error) {
                    console.error('Error initializing database:', error);
                    Alert.alert('Error', 'Failed to initialize database');
                }
            };
            setupDatabase();
        }, []);    

        return(
            console.log('InitDB')
        );


}