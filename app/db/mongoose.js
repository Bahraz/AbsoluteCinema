import mongoose from 'mongoose';
import { database } from '../config.js';

mongoose.connect(database);