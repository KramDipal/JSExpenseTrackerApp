import React, { createContext, useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite';

import * as FileSystem from 'expo-file-system';

export const DBContextStore = createContext();

export default function DBcreateContextProvider(props){
        const [db, setDb] = useState(null);    
        const [newExpenses, setNewExpenses] = useState([]);
    
        // const setContextState = (newExpense) => {
        //     setNewExpenses((prevState) => [...prevState, newExpense]); // Append to array
        //   };

            // Initialize database
            useEffect(() => {

                const setupDatabase = async () => {
                    try {
                        // await FileSystem.deleteAsync(FileSystem.documentDirectory + 'SQLite/ExpDB.db');
                        // await db.execAsync('ALTER TABLE ExpenseT ADD COLUMN photo TEXT');


                        const database = await SQLite.openDatabaseAsync('ExpDB.db');
                        setDb(database);
    
                        // Create table
                        await database.execAsync(`
                        PRAGMA journal_mode = WAL;
                        CREATE TABLE IF NOT EXISTS ExpenseT (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            refnum TEXT,
                            amount REAL,
                            category TEXT,
                            notes TEXT,
                            date DATETIME,
                            photo TEXT
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


            // Fetch all tasks from the database
            const fetchTasks = async (database = db) => {
                if (!database) return;

                console.log('fetchTasks database ' + JSON.stringify(database));
                try {
                const result = await database.getAllAsync('SELECT * FROM ExpenseT');


                setNewExpenses(result); // Update state with fetched data
                
                console.log('fetchTasks result ' + JSON.stringify(result));

                } catch (error) {
                console.error('Error fetching tasks:', error);
                }
                // return result;
            };


                // Add or Update a task
            const handleSaveTask = async (newExpense) => {
                if (!db) return;

                try {
                    await db.runAsync('INSERT INTO ExpenseT (refnum, amount, category, notes, date, photo) VALUES (?, ?, ?, ?, ?, ?) ', newExpense.id, newExpense.amount, newExpense.category, newExpense.note, newExpense.date, newExpense.photo);  
                    console.log('Record Addded');
                    // setNewExpenses(newExpense);
                    // setContextState(newExpense);

                    //Refresh task after saving
                  fetchTasks();
                } catch (error) {
                console.error('Error saving task:', error);
                }
            };

            console.log('newExpenses ' + JSON.stringify(newExpenses));

    return(
        <DBContextStore.Provider value={{
            db,
            handleSaveTask,
            newExpenses,
            fetchTasks,
            // setupDatabase,
        }}>
            {props.children}
        </DBContextStore.Provider>
    )

}