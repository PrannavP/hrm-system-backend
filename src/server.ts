import app from "./app";
import { resetAndSeedDatabase } from "./utils/seed";

const PORT = process.env.PORT || 5000;

resetAndSeedDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log('Database seeded and ready!');
    });
}).catch((err) => {
    console.error('Error seeding database:', err);
    process.exit(1);
});