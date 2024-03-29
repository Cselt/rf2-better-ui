export interface Setup {
  name: string;
  sameVehicleClass: boolean;
  created: string; // Date
  modified: string; // Date
  numDiffUpgrades: number;
}

export interface SetupSummary {
  settingSummaries: unknown;
  activeSetup: string;
  compareToSetup: string;
}
