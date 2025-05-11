import { MatchStatus } from "./MatchStatus ";

export interface Match {
  id: string;
  title: string;
  competition: string;
  date: string;
  status: MatchStatus;
}