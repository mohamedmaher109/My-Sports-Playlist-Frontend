import { Component, OnInit } from '@angular/core';
import { MatchService } from '../../../core/services/match.service';
import { Match } from '../../../shared/models/match.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatchStatus } from '../../../shared/models/MatchStatus ';
//import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-match-list',
  standalone:true,
  imports: [FormsModule,CommonModule],//,HttpClientModule],
  templateUrl: './match-list.component.html',
  styleUrl: './match-list.component.scss',
  providers: [MatchService]
})
export class MatchListComponent implements OnInit {
  MatchStatus = MatchStatus;
  matches: Match[] = [];
  statusFilter: string = ''; // '1' = Live, '0' = Replay
  titleFilter: string = '';
  competitionFilter: string = '';

  constructor(private matchService: MatchService) {}

  ngOnInit(): void {
    this.fetchMatches();
  }

  // Fetch matches based on filters
  fetchMatches(): void {
    const status = this.statusFilter !== '' ? parseInt(this.statusFilter) : undefined;
    const filters = {
      title: this.titleFilter,
      competition: this.competitionFilter,
      status: status
    };

    this.matchService.getMatches(filters).subscribe({
      next: (response) => {
        // Ensure that the response data is assigned correctly
        if (response && response.data) {
          this.matches = response.data;
        } else {
          console.error('Invalid response format:', response);
        }
      },
      error: (err) => console.error('Failed to fetch matches', err),
    });
  }

  // Handle changes to filters
  onFilterChange(): void {
    this.fetchMatches();
  }

  addToPlaylist(matchId: string): void {
    this.matchService.addMatchToPlaylist(matchId).subscribe({
      next: () => alert('Match added to playlist!'),
      error: (res) => alert(res.error.message)
        //alert('Failed to add match to playlist.')
    });
  }
  getMatchStatusName(status: MatchStatus): string {
  return MatchStatus[status];
}
resetFilters(): void {
  this.statusFilter = '';
  this.titleFilter = '';
  this.competitionFilter = '';
  this.onFilterChange();
}

}