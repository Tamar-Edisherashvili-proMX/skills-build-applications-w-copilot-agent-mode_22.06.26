import { Schema, model, models } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  role: 'member' | 'coach' | 'admin';
  teamName: string;
  goals: string[];
}

export interface ITeam {
  name: string;
  mascot: string;
  city: string;
  memberCount: number;
  weeklyGoalMinutes: number;
}

export interface IActivity {
  userEmail: string;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  performedAt: Date;
}

export interface ILeaderboardEntry {
  userEmail: string;
  userName: string;
  teamName: string;
  totalMinutes: number;
  points: number;
  rank: number;
}

export interface IWorkout {
  title: string;
  focusArea: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
  exercises: string[];
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['member', 'coach', 'admin'], default: 'member' },
    teamName: { type: String, required: true },
    goals: [{ type: String, required: true }],
  },
  { timestamps: true },
);

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, unique: true },
    mascot: { type: String, required: true },
    city: { type: String, required: true },
    memberCount: { type: Number, required: true },
    weeklyGoalMinutes: { type: Number, required: true },
  },
  { timestamps: true },
);

const activitySchema = new Schema<IActivity>(
  {
    userEmail: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    performedAt: { type: Date, required: true },
  },
  { timestamps: true },
);

const leaderboardEntrySchema = new Schema<ILeaderboardEntry>(
  {
    userEmail: { type: String, required: true },
    userName: { type: String, required: true },
    teamName: { type: String, required: true },
    totalMinutes: { type: Number, required: true },
    points: { type: Number, required: true },
    rank: { type: Number, required: true },
  },
  { timestamps: true },
);

const workoutSchema = new Schema<IWorkout>(
  {
    title: { type: String, required: true },
    focusArea: { type: String, required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true },
    exercises: [{ type: String, required: true }],
  },
  { timestamps: true },
);

export const UserModel = models.User || model<IUser>('User', userSchema);
export const TeamModel = models.Team || model<ITeam>('Team', teamSchema);
export const ActivityModel = models.Activity || model<IActivity>('Activity', activitySchema);
export const LeaderboardEntryModel =
  models.LeaderboardEntry || model<ILeaderboardEntry>('LeaderboardEntry', leaderboardEntrySchema);
export const WorkoutModel = models.Workout || model<IWorkout>('Workout', workoutSchema);
