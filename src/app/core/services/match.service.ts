import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Match } from '../../shared/models/match.model';
import { ApiResponse } from '../../shared/models/ApiResponse'

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  private apiUrl = `${environment.apiUrl}/match`;

  constructor(private http: HttpClient) { }

  // Fetch all matches with optional filters
  getMatches(filters?: { title?: string; competition?: string; status?: number }): Observable<ApiResponse<Match[]>> {
    let params = new HttpParams();

    if (filters) {
      if (filters.title) {
        params = params.set('title', filters.title);
      }
      if (filters.competition) {
        params = params.set('competition', filters.competition);
      }
      if (filters.status !== undefined) {
        params = params.set('status', filters.status.toString());
      }
    }

    return this.http.get<ApiResponse<Match[]>>(`${this.apiUrl}/GetMatches`, { params });
  }

  // Add match to playlist
  addMatchToPlaylist(matchId: string): Observable<any> {
  return this.http.post(`${environment.apiUrl}/playlist/AddToPlaylist`, JSON.stringify(matchId), {
    headers: { 'Content-Type': 'application/json' }
  });
}


  // Remove match from playlist
  removeMatchFromPlaylist(matchId: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/playlist/${matchId}`);
  }
}
