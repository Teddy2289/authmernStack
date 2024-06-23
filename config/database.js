import mongoose from 'mongoose';

const connection = async () => {
    const dbName = "authdb"
    try {
        await mongoose.connect('mongodb://localhost:27017', {
            dbName: dbName,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Connected to ${dbName} database`);
    } catch (err) {
        console.error("Error connecting to the database:", err);
    }
}

export { connection };
