# Notes For The Dev

## Database Schema

dbdocs diagram:
This is the rough draft of the schema

<https://dbdiagram.io/d/stayhardtheapp-66f0c5fea0828f8aa6aefb58>

## Load adjustment algo


### Recovery Considerations

- **If the athlete is not recovering well or cannot complete the prescribed sets/reps:**
  * Adjust load down by **5-10%** to facilitate recovery and maintain performance.
  

### Deloads

- **Commonly used every 4 to 6 weeks** to allow for recovery and prevent overtraining:
  * **Reduce Weight**: Decrease by **50-70%** of the usual working weight.
  * **Reduce Volume**: Decrease total volume by **50-70%** (reps per set and/or total sets).
  * Consider including a **deload week** where the focus shifts to mobility and recovery rather than intensity.

### Progressive Overload

- **On the last set, see how many reps can be performed**:
  * **1-2 Extra Reps**: Increase weight by **2.5-5%** for upper-body lifts and **5-10%** for lower-body lifts.
  * **3-4 Extra Reps**: Increase weight by **5-7.5%** for upper-body lifts and **7.5-12.5%** for lower-body lifts.
  * **5+ Extra Reps**: Increase weight by **7.5-10%** for upper-body lifts and **10-15%** for lower-body lifts. 
  * **Power Exercises**:
  * Increase weight by **2.5-5%** when consistently meeting rep goals.
  * On deload weeks, decrease the load by **10-20%** to facilitate recovery and maintain power output.
  * Implement an **automatic deload button** for easy management during scheduled deload weeks.

### Additional Considerations for Load Management

- **Rate of Perceived Exertion (RPE)**:
  * Encourage athletes to rate their effort on a scale of 1-10 after each set. If the RPE exceeds **7-8** for power exercises, consider reducing the load to maintain speed and explosiveness.
  
* **Bar Speed Monitoring**:
  * For power movements, use velocity-based training principles. If bar speed drops significantly (e.g., below **1.0 m/s**), consider decreasing the weight to focus on explosive movement.

* **Reps in Reserve (RIR)**:
  * Aim to leave **2-3 reps in reserve** during power exercises to ensure adequate explosiveness and prevent fatigue accumulation.

### 1RM Estimation Functionality

- **Implement a functionality that estimates 1RM** based on the number of reps performed at a given weight:
  * Use formulas such as the **Epley formula**:
    \[
    \text{Estimated 1RM} = \text{Weight} \times (1 + \frac{\text{Reps}}{30})
    \]
  * Allow athletes to input their last set performance to dynamically adjust training loads based on their estimated 1RM.

### Have functionality that compares your progress and strength to standards

## Term definition

Say this is your program:

-----

4 day - upper lower split

lower day 1
  squat         | 225 lbs | numberOfSets: 3 | numberOfReps: 6
  deadlift      | 245 lbs | numberOfSets: 3 | numberOfReps: 9

upper day 1
  bench press   | 205 lbs | numberOfSets: 3 | numberOfReps : 10
  lat pulldown  | 205 lbs | numberOfSets: 3 | numberOfReps : 8

lower day 2
  ...
  ...
-----

"4 day - upper lower split" is your "workout_plan"
"lower day 1" is your "workout"
"bench press   | 205 lbs | numberOfSets: 3..." is your "exercise"
"June 21st, 19:32 you did lower day 1" is your "workout_instance"