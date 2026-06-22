"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./database");
const models_1 = require("./models");
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', baseUrl });
});
app.get('/api/users/', async (_req, res, next) => {
    try {
        const users = await models_1.UserModel.find().sort({ name: 1 });
        res.json({ users });
    }
    catch (error) {
        next(error);
    }
});
app.get('/api/teams/', async (_req, res, next) => {
    try {
        const teams = await models_1.TeamModel.find().sort({ name: 1 });
        res.json({ teams });
    }
    catch (error) {
        next(error);
    }
});
app.get('/api/activities/', async (_req, res, next) => {
    try {
        const activities = await models_1.ActivityModel.find().sort({ performedAt: -1 });
        res.json({ activities });
    }
    catch (error) {
        next(error);
    }
});
app.get('/api/leaderboard/', async (_req, res, next) => {
    try {
        const leaderboard = await models_1.LeaderboardEntryModel.find().sort({ rank: 1 });
        res.json({ leaderboard });
    }
    catch (error) {
        next(error);
    }
});
app.get('/api/workouts/', async (_req, res, next) => {
    try {
        const workouts = await models_1.WorkoutModel.find().sort({ difficulty: 1, title: 1 });
        res.json({ workouts });
    }
    catch (error) {
        next(error);
    }
});
app.use((error, _req, res, _next) => {
    console.error('API error', error);
    res.status(500).json({ error: 'Internal server error' });
});
(0, database_1.connectToDatabase)()
    .then(() => {
    app.listen(port, () => {
        console.log(`OctoFit backend listening on port ${port}`);
        console.log(`API base URL: ${baseUrl}`);
        console.log(`MongoDB URI: ${database_1.mongoUri}`);
    });
})
    .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
});
