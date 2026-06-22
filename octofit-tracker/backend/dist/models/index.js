"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutModel = exports.LeaderboardEntryModel = exports.ActivityModel = exports.TeamModel = exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['member', 'coach', 'admin'], default: 'member' },
    teamName: { type: String, required: true },
    goals: [{ type: String, required: true }],
}, { timestamps: true });
const teamSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    mascot: { type: String, required: true },
    city: { type: String, required: true },
    memberCount: { type: Number, required: true },
    weeklyGoalMinutes: { type: Number, required: true },
    description: { type: String },
    schedule: { type: String },
    maxAttendance: { type: Number },
}, { timestamps: true });
const activitySchema = new mongoose_1.Schema({
    userEmail: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    performedAt: { type: Date, required: true },
}, { timestamps: true });
const leaderboardEntrySchema = new mongoose_1.Schema({
    userEmail: { type: String, required: true },
    userName: { type: String, required: true },
    teamName: { type: String, required: true },
    totalMinutes: { type: Number, required: true },
    points: { type: Number, required: true },
    rank: { type: Number, required: true },
}, { timestamps: true });
const workoutSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    focusArea: { type: String, required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true },
    exercises: [{ type: String, required: true }],
}, { timestamps: true });
exports.UserModel = mongoose_1.models.User || (0, mongoose_1.model)('User', userSchema);
exports.TeamModel = mongoose_1.models.Team || (0, mongoose_1.model)('Team', teamSchema);
exports.ActivityModel = mongoose_1.models.Activity || (0, mongoose_1.model)('Activity', activitySchema);
exports.LeaderboardEntryModel = mongoose_1.models.LeaderboardEntry || (0, mongoose_1.model)('LeaderboardEntry', leaderboardEntrySchema);
exports.WorkoutModel = mongoose_1.models.Workout || (0, mongoose_1.model)('Workout', workoutSchema);
