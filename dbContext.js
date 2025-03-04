import React, { createContext, useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite';

import * as FileSystem from 'expo-file-system';

export const DBContextStore = createContext();

export default function DBcreateContextProvider(props){
        const [db, setDb] = useState(null);    
        const [newExpenses, setNewExpenses] = useState([]);
        const [newExpenses2, setNewExpenses2] = useState([]);
        const [budgetGoal, setBudgetGoal] = useState(null); // New state for budget
    
        // const setContextState = (newExpense) => {
        //     setNewExpenses((prevState) => [...prevState, newExpense]); // Append to array
        //   };

            // Initialize database
            useEffect(() => {

                const setupDatabase = async () => {
                    try {
                        // await FileSystem.deleteAsync(FileSystem.documentDirectory + 'SQLite/ExpDB.db');
                        // await db.execAsync('ALTER TABLE ExpenseT ADD COLUMN others TEXT');


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
                            photo TEXT,
                            other TEXT
                        );
                        `);

                        // Budget table (single row for simplicity)
                        await database.execAsync(`
                            CREATE TABLE IF NOT EXISTS BudgetT (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            amount REAL
                            );
                        `);

                        console.log('Database and table initialized');
                        fetchTasks(database);
                        fetchBudget(database); // Fetch initial budget
                        // fetchByRecord(database);

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
                
                // console.log('fetchTasks result ' + JSON.stringify(result));

                } catch (error) {
                console.error('Error fetching tasks:', error);
                }
                // return result;
            };


            // Fetch records by search term (e.g., category)
            const fetchByRecord = async (database = db, search = '') => {
                if (!database) return;

                console.log('fetchByRecord search:', search);
                try {
                    const query = 'SELECT * FROM ExpenseT WHERE category LIKE ? OR notes LIKE ? OR refnum LIKE ? OR date LIKE ? OR other LIKE ? OR amount LIKE ?';
                    const result = await database.getAllAsync(query, [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`]);
                // const query = 'SELECT * FROM ExpenseT WHERE category LIKE ?';
                // const result = await database.getAllAsync(query, [`%${search}%`]); // Use LIKE for 
                // partial matches
                setNewExpenses2(result);
                console.log('fetchByRecord result:', JSON.stringify(result, null, 2));
                return result; // Return result for use in SearchScreen if needed
                } catch (error) {
                console.error('Error fetching fetchByRecord:', error);
                }
            };

            const fetchBudget = async (database = db) => {
                if (!database) return;
                try {
                  const result = await database.getFirstAsync('SELECT amount FROM BudgetT');
                  setBudgetGoal(result ? result.amount : null); // Set null if no budget yet
                //   console.log('fetchBudget result ' + JSON.stringify(result));
                } catch (error) {
                  console.error('Error fetching budget:', error);
                }
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

            const handleSaveBudget = async (budgetAmount) => {
                if (!db) return;
                try {
                // Delete existing budget (single-row table for simplicity)
                await db.runAsync('DELETE FROM BudgetT');
                // Insert new budget
                await db.runAsync('INSERT INTO BudgetT (amount) VALUES (?)', [parseFloat(budgetAmount)]);
                console.log('Budget Saved');
                fetchBudget();
                } catch (error) {
                console.error('Error saving budget:', error);
                }
            };
            // console.log('newExpenses ' + JSON.stringify(newExpenses));

            const deleteRecord = async (id) =>{
                if (!db) return;
                try {
                    await db.runAsync('DELETE FROM ExpenseT WHERE id =?', [id]);
                    console.log('Record deleted');
                    fetchTasks();
                } catch (error) {
                    console.error('Error deleting record:', error);
                }
            }

    return(
        <DBContextStore.Provider value={{
            db,
            handleSaveTask,
            newExpenses,
            fetchTasks,
            newExpenses2,
            budgetGoal,
            fetchByRecord,
            handleSaveBudget,
            deleteRecord,
            // setupDatabase,
        }}>
            {props.children}
        </DBContextStore.Provider>
    )

}