import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from "@angular/material/card"
import { MatButtonModule } from "@angular/material/button"
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar"
import { NgIf } from '@angular/common';
import { User } from '../../models/user';

@Component({
  selector: 'app-user',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    NgIf
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  @Input()
  user: User | undefined

  copy() {
    if (this.user?.email) {
      navigator.clipboard.writeText(this.user?.email ?? 'no email ')
        .then(() => this.showSnackBar('email is coppied'))
    } else {
      this.showSnackBar('email was not provided')
    }
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    })
  }

}