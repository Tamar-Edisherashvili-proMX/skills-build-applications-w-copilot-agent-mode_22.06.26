"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const models_1 = require("../models");
const users = [
    {
        name: 'Maya Chen',
        email: 'maya.chen@example.com',
        role: 'member',
        teamName: 'Trail Blazers',
        goals: ['Run a 10K', 'Improve core strength'],
    },
    {
        name: 'Jordan Patel',
        email: 'jordan.patel@example.com',
        role: 'coach',
        teamName: 'Velocity Crew',
        goals: ['Coach weekly HIIT sessions', 'Increase team consistency'],
    },
    {
        name: 'Sofia Martinez',
        email: 'sofia.martinez@example.com',
        role: 'member',
        teamName: 'Trail Blazers',
        goals: ['Build endurance', 'Complete three workouts weekly'],
    },
];
const teams = [
    {
        name: 'Trail Blazers',
        mascot: 'Comet',
        city: 'Seattle',
        memberCount: 12,
        weeklyGoalMinutes: 1800,
    },
    {
        name: 'Velocity Crew',
        mascot: 'Bolt',
        city: 'Austin',
        memberCount: 9,
        weeklyGoalMinutes: 1350,
    },
    {
        name: 'Manga Maniacs',
        mascot: 'Inkling',
        city: 'Mergington',
        memberCount: 12,
        weeklyGoalMinutes: 900,
        description: 'Explore the fantastic stories of the most interesting characters from Japanese Manga (graphic novels).',
        schedule: 'Tuesdays at 7pm',
        maxAttendance: 15,
    },
];
const activities = [
    {
        userEmail: 'maya.chen@example.com',
        type: 'Outdoor Run',
        durationMinutes: 42,
        caloriesBurned: 390,
        performedAt: new Date('2026-06-18T07:30:00.000Z'),
    },
    {
        userEmail: 'jordan.patel@example.com',
        type: 'Strength Training',
        durationMinutes: 55,
        caloriesBurned: 460,
        performedAt: new Date('2026-06-19T18:15:00.000Z'),
    },
    {
        userEmail: 'sofia.martinez@example.com',
        type: 'Cycling',
        durationMinutes: 60,
        caloriesBurned: 520,
        performedAt: new Date('2026-06-20T12:00:00.000Z'),
    },
];
const leaderboard = [
    {
        userEmail: 'sofia.martinez@example.com',
        userName: 'Sofia Martinez',
        teamName: 'Trail Blazers',
        totalMinutes: 240,
        points: 1240,
        rank: 1,
    },
    {
        userEmail: 'jordan.patel@example.com',
        userName: 'Jordan Patel',
        teamName: 'Velocity Crew',
        totalMinutes: 215,
        points: 1125,
        rank: 2,
    },
    {
        userEmail: 'maya.chen@example.com',
        userName: 'Maya Chen',
        teamName: 'Trail Blazers',
        totalMinutes: 198,
        points: 1030,
        rank: 3,
    },
];
const workouts = [
    {
        title: 'Morning Mobility Reset',
        focusArea: 'Flexibility',
        difficulty: 'beginner',
        durationMinutes: 20,
        exercises: ['Cat-cow stretch', 'World greatest stretch', 'Hip flexor lunge', 'Thoracic rotations'],
    },
    {
        title: 'Runner Strength Builder',
        focusArea: 'Lower body',
        difficulty: 'intermediate',
        durationMinutes: 35,
        exercises: ['Goblet squats', 'Reverse lunges', 'Single-leg deadlifts', 'Calf raises'],
    },
    {
        title: 'Full-Body Power Circuit',
        focusArea: 'Conditioning',
        difficulty: 'advanced',
        durationMinutes: 45,
        exercises: ['Kettlebell swings', 'Push presses', 'Box jumps', 'Plank rows'],
    },
];
async function seedDatabase() {
    console.log('Seed the octofit_db database with test data');
    await (0, database_1.connectToDatabase)();
    await Promise.all([
        models_1.UserModel.deleteMany({}),
        models_1.TeamModel.deleteMany({}),
        models_1.ActivityModel.deleteMany({}),
        models_1.LeaderboardEntryModel.deleteMany({}),
        models_1.WorkoutModel.deleteMany({}),
    ]);
    await Promise.all([
        models_1.UserModel.insertMany(users),
        models_1.TeamModel.insertMany(teams),
        models_1.ActivityModel.insertMany(activities),
        models_1.LeaderboardEntryModel.insertMany(leaderboard),
        models_1.WorkoutModel.insertMany(workouts),
    ]);
    console.log('Seed complete');
}
seedDatabase()
    .catch((error) => {
    console.error('Seed failed', error);
    process.exitCode = 1;
})
    .finally(async () => {
    await (0, database_1.disconnectFromDatabase)();
});
