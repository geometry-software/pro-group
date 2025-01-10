import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Response } from '../models/general';
import { map } from 'rxjs';

@Injectable()
export class UserService {

  constructor(
    private httpClient: HttpClient
  ) { }

  private readonly baseUrl = 'https://randomuser.me/api/'
  private readonly itemsAmount = 9

  getItems(page: number) {
    const params = new HttpParams().append('page', page++).append('results', this.itemsAmount)
    return this.httpClient.get<Response>(this.baseUrl, { params: params }).pipe(
      map(value => value.results)
    )
  }

}