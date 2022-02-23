```mermaid
graph TD;
   Routines --> RoutineList
   RoutineList --> CreateRoutine
   RoutineList --> EditRoutine
   CreateRoutine --> FormBase
   EditRoutine --> FormBase
   CreateRoutine --> ExerciseList
   EditRoutine --> ExerciseList
```
