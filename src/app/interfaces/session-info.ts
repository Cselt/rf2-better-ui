import { GamePhase } from './game-phase';

export interface SessionInfo {
  trackName: string;
  session: string;
  currentEventTime: number;
  endEventTime: number;
  maximumLaps: number;
  lapDistance: number;
  numberOfVehicles: number;
  gamePhase: GamePhase;
  yellowFlagState: string;
  sectorFlag: string[];
  startLightFrame: number;
  numRedLights: number;
  inRealtime: boolean;
  playerName: string;
  playerFileName: string;
  darkCloud: number;
  raining: number;
  ambientTemp: number;
  trackTemp: number;
  windSpeed: {
    x: number;
    y: number;
    z: number;
    velocity: number;
  };

  minPathWetness: number;
  averagePathWetness: number;
  maxPathWetness: number;
  gameMode: string;
  passwordProtected: boolean;
  serverPort: number;
  maxPlayers: number;
  serverName: string;
  startEventTime: number;
  raceCompletion: unknown;
}
