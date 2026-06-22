import mongoose from 'mongoose';
import {
  ActivityModel,
  LeaderboardEntryModel,
  TeamModel,
  UserModel,
  WorkoutModel,
} from '../models';

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

const users = [
  {
    name: 'Maya Chen',
    email: 'maya.chen@example.com',
    role: 'member' as const,
    teamName: 'Trail Blazers',
    goals: ['Run a 10K', 'Improve core strength'],
  },
  {
    name: 'Jordan Patel',
    email: 'jordan.patel@example.com',
    role: 'coach' as const,
    teamName: 'Velocity Crew',
    goals: ['Coach weekly HIIT sessions', 'Increase team consistency'],
  },
  {
    name: 'Sofia Martinez',
    email: 'sofia.martinez@example.com',
    role: 'member' as const,
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
    difficulty: 'beginner' as const,
    durationMinutes: 20,
    exercises: ['Cat-cow stretch', 'World greatest stretch', 'Hip flexor lunge', 'Thoracic rotations'],
  },
  {
    title: 'Runner Strength Builder',
    focusArea: 'Lower body',
    difficulty: 'intermediate' as const,
    durationMinutes: 35,
    exercises: ['Goblet squats', 'Reverse lunges', 'Single-leg deadlifts', 'Calf raises'],
  },
  {
    title: 'Full-Body Power Circuit',
    focusArea: 'Conditioning',
    difficulty: 'advanced' as const,
    durationMinutes: 45,
    exercises: ['Kettlebell swings', 'Push presses', 'Box jumps', 'Plank rows'],
  },
];

async function seedDatabase() {
  console.log('Seed the octofit_db database with test data');
  await mongoose.connect(mongoUri);

  await Promise.all([
    UserModel.deleteMany({}),
    TeamModel.deleteMany({}),
    ActivityModel.deleteMany({}),
    LeaderboardEntryModel.deleteMany({}),
    WorkoutModel.deleteMany({}),
  ]);

  await Promise.all([
    UserModel.insertMany(users),
    TeamModel.insertMany(teams),
    ActivityModel.insertMany(activities),
    LeaderboardEntryModel.insertMany(leaderboard),
    WorkoutModel.insertMany(workouts),
  ]);

  console.log('Seed complete');
}

seedDatabase()
  .catch((error: unknown) => {
    console.error('Seed failed', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
