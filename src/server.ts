import app from "./app";
import { resetAndSeedDatabase } from "./utils/seed";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    if (process.env.SEED_DB === 'true') {
        await resetAndSeedDatabase();
        console.log('Database seeded and ready!');
    }
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer().catch((err) => {
    console.error('Error starting server:', err);
    process.exit(1);
});