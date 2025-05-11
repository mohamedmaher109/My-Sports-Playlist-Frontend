import { Routes } from '@angular/router';
import { MatchListComponent } from './features/matches/match-list/match-list.component';
import { MyPlaylistComponent } from './features/playlist/my-playlist/my-playlist.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'matches', component: MatchListComponent, canActivate: [AuthGuard] },
  { path: 'playlist', component: MyPlaylistComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

