import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Match } from '../../shared/models/match.model';
import { ApiResponse } from '../../shared/models/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  private apiUrl = `${environment.apiUrl}/playlist`;

  constructor(private http: HttpClient) { }

  // Get user's playlist
  getUserPlaylist(userId: string): Observable<ApiResponse<Match[]>> {
    return this.http.get<ApiResponse<Match[]>>(`${this.apiUrl}/GetUserPlaylist`);
  }
  // Remove match from playlist
 removeMatchFromPlaylist(matchId: string): Observable<any> {
  return this.http.delete(`${this.apiUrl}/RemoveFromPlaylist`, {
    params: { matchId }
  });
}
}
