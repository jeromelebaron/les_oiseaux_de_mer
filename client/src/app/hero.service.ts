import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class HeroService {

    private heroesUrl = 'api/heroes';

    constructor(
        private http: HttpClient,
        private messageService: MessageService
    ) {}

    getHeroes(): Observable<Hero[]> {
        this.log('Hero service : heroes fetched');
        return this.http.get<Hero[]>(this.heroesUrl)
        .pipe(
            tap(heroes => this.log('fetched heroes')),
            catchError(this.handleError('getHeroes', []))
        );
    }

    getHero(id: number): Observable<Hero> {
        const url = `${this.heroesUrl}/${id}`;
        this.log(`HeroService: fetched hero id=${id}`);
        return this.http.get<Hero>(url).pipe(
            tap(_ => this.log(`fetcthed hero id=${id}`)),
            catchError(this.handleError<Hero>(`getHero id=${id}`))
        );
    }

    update(hero: Hero): Observable<any> {
        return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
            tap(_ => this.log(`updated hero id=${hero.id}`)),
            catchError(this.handleError<any>(`update hero id=${hero.id}`))
        );
    }

    add(hero: Hero): Observable<Hero> {
        return this.http.post(this.heroesUrl, hero, httpOptions).pipe(
            tap((newHero: Hero) => this.log(`added hero id=${newHero.id}`)),
            catchError(this.handleError<any>(`add`))
        );
    }

    delete(hero: Hero | number): Observable<Hero> {
        const id = typeof hero === 'number' ? hero : hero.id;
        const url = `${this.heroesUrl}/${id}`;
        return this.http.delete<Hero>(url, httpOptions).pipe(
            tap((deletedHero: Hero) => this.log(`Deleted hero id=${id}`)),
            catchError(this.handleError<any>(`delete`))
        );
    }

    /**
    * Handle Http operation that failed.
    * Let the app continue.
    * @param operation - name of the operation that failed
    * @param result - optional value to return as the observable result
    */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        this.messageService.add('HeroService: ' + message);
    }
}
