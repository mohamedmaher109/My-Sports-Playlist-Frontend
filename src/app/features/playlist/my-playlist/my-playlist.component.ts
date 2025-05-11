import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistService } from '../../../core/services/playlist.service';
import { Match } from '../../../shared/models/match.model';
import { ApiResponse } from '../../../shared/models/ApiResponse';
import { MatchStatus } from '../../../shared/models/MatchStatus ';

@Component({
  selector: 'app-my-playlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-playlist.component.html',
  styleUrls: ['./my-playlist.component.scss'],
  providers:[PlaylistService]
})
export class MyPlaylistComponent implements OnInit {
  MatchStatus = MatchStatus;
  playlist: Match[] = [];
  loading = false;
  error: string | null = null;
  

  constructor(private playlistService: PlaylistService) {}

  ngOnInit(): void {
    this.fetchPlaylist();
  }

  fetchPlaylist(): void {
    this.loading = true;
    this.playlistService.getUserPlaylist('').subscribe({
      next: (res: ApiResponse<Match[]>) => {
        this.playlist = res.data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load playlist.';
        this.loading = false;
      }
    });
  }

  removeFromPlaylist(matchId: string): void {
    this.playlistService.removeMatchFromPlaylist(matchId).subscribe({
      next: () => {
        alert("Match removed from list successfully.")
        this.playlist = this.playlist.filter(m => m.id !== matchId);
      },
      error: () => {
        this.error = 'Failed to remove match.';
      }
    });
  }
}
