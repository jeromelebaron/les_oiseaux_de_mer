import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

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
            catchError(this.handleError('Méthode getHeroes', []))
        );
    }

    getHero(id: number): Observable<Hero> {
        const url = `${this.heroesUrl}/${id}`;
        this.log(`HeroService: fetched hero id=${id}`);
        return this.http.get<Hero>(url).pipe(
            tap(_ => this.log(`fetcthed hero id=${id}`)),
            catchError(this.handleError<Hero>(`Méthode getHero id=${id}`))
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
