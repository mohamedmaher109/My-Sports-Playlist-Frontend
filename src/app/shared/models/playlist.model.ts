import { Match } from './match.model';

export interface PlaylistItem {
  userId: number;
  matchId: number;
  match?: Match;
}