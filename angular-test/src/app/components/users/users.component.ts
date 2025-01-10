import { ChangeDetectionStrategy, Component, DestroyRef } from '@angular/core';
import { UserComponent } from '../user/user.component';
import { UserService } from '../../services/user.service';
import { BehaviorSubject, shareReplay, switchMap, tap } from 'rxjs';
import { User } from '../../models/user';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { LoadingStatus } from '../../models/general';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-users',
  imports: [
    UserComponent,
    NgFor,
    NgIf,
    AsyncPipe,
    MatPaginatorModule,
    MatProgressBarModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UserService],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0 }),
          stagger(100, [
            animate('0.5s', style({ opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class UsersComponent {

  constructor(
    private userService: UserService,
    private destroyRef: DestroyRef
  ) { }

  users: User[] = []

  private pageIndexSub = new BehaviorSubject<number>(0)
  // in the latest angular docs, $ symbol is not used anymore a observable suffix
  readonly pageIndex = this.pageIndexSub.asObservable().pipe(
    shareReplay(1))
  readonly pageSize = 10
  readonly userAmount = 5000

  readonly loading = new BehaviorSubject<LoadingStatus>(LoadingStatus.Loading)
  readonly LoadingStatus = LoadingStatus

  ngOnInit() {
    this.pageIndexSub.pipe(
      tap(() => {
        this.users = []
        this.loading.next(LoadingStatus.Loading)
      }),
      switchMap(page => this.userService.getItems(page).pipe()),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(users => {
      this.users = users
      this.loading.next(LoadingStatus.Loaded)
    })
  }

  handlePageEvent(pageEvent: PageEvent) {
    this.pageIndexSub.next(pageEvent.pageIndex)
  }

}