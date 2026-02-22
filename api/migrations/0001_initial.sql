-- Core Extensions
CREATE EXTENSION IF NOT EXISTS postgis;

-- 1. Categories
CREATE TABLE Categories (
    Id SERIAL PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Slug VARCHAR(100) UNIQUE NOT NULL
);

-- 2. Users (Basic Auth integrated into your starter)
CREATE TABLE Users (
    Id SERIAL PRIMARY KEY,
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    PasswordHash TEXT NOT NULL,
    PasswordSalt TEXT NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP,
    DeletedAt TIMESTAMP,
    IsActive BOOLEAN DEFAULT TRUE
);

-- 3. Items (Spatial)
CREATE TABLE Items (
    Id SERIAL PRIMARY KEY,
    OwnerId INT REFERENCES Users(Id),
    CategoryId INT REFERENCES Categories(Id),
    Title VARCHAR(255) NOT NULL,
    Description TEXT,
    DailyRate DECIMAL(10, 2),
    Location GEOGRAPHY(POINT, 4326), -- PostGIS Point
    IsAvailable BOOLEAN DEFAULT TRUE,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Rentals (Workflow)
CREATE TABLE Rentals (
    Id SERIAL PRIMARY KEY,
    ItemId INT REFERENCES Items(Id),
    BorrowerId INT REFERENCES Users(Id),
    StartDate DATE NOT NULL,
    EndDate DATE NOT NULL,
    Status VARCHAR(20) DEFAULT 'Requested', -- Requested, Approved, Rejected, Completed
    TotalPrice DECIMAL(10, 2),
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Reviews (Feedback Loop)
CREATE TABLE Reviews (
    Id SERIAL PRIMARY KEY,
    RentalId INT REFERENCES Rentals(Id),
    ReviewerId INT REFERENCES Users(Id),
    Rating INT CHECK (Rating >= 1 AND Rating <= 5),
    Comment TEXT,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indices for performance
CREATE INDEX ix_items_geo ON Items USING GIST (Location);
CREATE INDEX ix_rentals_status ON Rentals (Status);
