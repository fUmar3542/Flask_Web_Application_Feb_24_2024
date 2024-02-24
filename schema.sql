-- Schema for Customer_DB table
CREATE TABLE IF NOT EXISTS Customer_DB (
    Customer_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Customer_First_Name TEXT NOT NULL,
    Customer_Last_Name TEXT NOT NULL,
    Age INTEGER NOT NULL,
    Country TEXT NOT NULL
);

-- Schema for Order_DB table
CREATE TABLE IF NOT EXISTS Order_DB (
    Order_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Date TEXT NOT NULL,
    Customer_ID INTEGER NOT NULL,
    Price REAL NOT NULL,
    Chair INTEGER NOT NULL,
    Stool INTEGER NOT NULL,
    "Table" INTEGER NOT NULL,
    Cabinet INTEGER NOT NULL,
    Dresser INTEGER NOT NULL,
    Couch INTEGER NOT NULL,
    Bed INTEGER NOT NULL,
    Shelf INTEGER NOT NULL,
    FOREIGN KEY (Customer_ID) REFERENCES Customer_DB(Customer_ID)
);
