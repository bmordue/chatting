import { writeFileSync } from "fs";

interface Agent {
  age: number;
}

let agents: Agent[] = [];

interface Cohort {
  lower: number;
  upper: number;
  size: number;
}

// Define age ranges for each group
const PRESCHOOL: Cohort = { lower: 0, upper: 4, size: 40 };
const SCHOOL: Cohort = { lower: 5, upper: 16, size: 120 };
const EARLY_CAREER: Cohort = { lower: 17, upper: 34, size: 200 };
const MID_CAREER: Cohort = { lower: 35, upper: 49, size: 140 };
const LATE_CAREER: Cohort = { lower: 50, upper: 64, size: 90 };
const RETIRED: Cohort = { lower: 65, upper: 74, size: 40 };
const ELDERLY: Cohort = { lower: 75, upper: 110, size: 10 };

// Store the cohorts in an array for easy iteration
const cohorts: Cohort[] = [
  PRESCHOOL,
  SCHOOL,
  EARLY_CAREER,
  MID_CAREER,
  LATE_CAREER,
  RETIRED,
  ELDERLY,
];

// Calculate the total population
const totalPopulation = cohorts.reduce((acc, cohort) => acc + cohort.size, 0);

/*This updated implementation defines the `Cohort` interface to include the lower and upper age bounds and the size of the cohort. It then defines the age ranges and population sizes for each of the groups you provided and stores them in an array for easy iteration.

Finally, it calculates the total population of the cohorts by summing the sizes of all cohorts using the `reduce()` method of the array.

This implementation assumes that the age ranges provided are mutually exclusive and covers the entire population of the UK. If there are any overlaps between the ranges or if any age groups are not included, you may need to adjust the ranges and cohort sizes accordingly.*/

function simulateAgent(agent: Agent) {
  // Apply mortality for this cohort
  // Mortality function should increase with age

  // Apply immigration and emigration to this cohort
  // Both functions should be a function of age and migration trends

  // Apply birth rate to the lowest cohort
  // Birth rate function should be a function of age

  // Increment the age of the agent
  agent.age++;
}
function generateAgents() {
  const agents: Agent[] = [];
  cohorts.forEach((cohort) => {
    const { lower, upper, size } = cohort;
    for (let i = 0; i < size; i++) {
      const age = Math.floor(Math.random() * (upper - lower + 1)) + lower;
      agents.push({ age });
    }
  });
  return agents;
}
function runSimulation() {
  let year = 0;
  const maxYears = 20;

  agents = generateAgents();

  const yearlyData = [];
  while (year < maxYears) {
    agents.forEach(simulateAgent);
    year++;
    cohorts.forEach(updateCohorts);
    yearlyData.push(cohorts);
  }
  writeFileSync("demographics.json", JSON.stringify(yearlyData));
}

// update cohort sizes based on agent ages
function updateCohorts(value: Cohort, index: number, array: Cohort[]): void {
  const agentAges = agents
    .filter((agent) => agent.age >= value.lower && agent.age <= value.upper)
    .map((agent) => agent.age);
  const newCohortSize = agentAges.length;
  array[index] = { ...value, size: newCohortSize };
}

runSimulation();
