import express from 'express';
import bodyParser from 'body-parser';
import i18n from './config/i18n';
import logger from './config/logger';
import storageRoutes from './routes/storage.routes';

const app = express();
const port = process.env.PORT || 6000;

app.use(bodyParser.json());
app.use(i18n.init);

app.use('/api/storage', storageRoutes);

app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
});

