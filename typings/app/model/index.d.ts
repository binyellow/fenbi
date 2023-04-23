// This file is created by egg-ts-helper@1.34.7
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportExercises from '../../../app/model/exercises';
import ExportSubject from '../../../app/model/subject';

declare module 'egg' {
  interface IModel {
    Exercises: ReturnType<typeof ExportExercises>;
    Subject: ReturnType<typeof ExportSubject>;
  }
}
