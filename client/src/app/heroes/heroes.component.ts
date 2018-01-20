import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
    selector: 'app-heroes',
    templateUrl: './heroes.component.html',
    styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

    /** La liste complète des héros. */
    heroes: Hero[];

    constructor(
        private heroService: HeroService
    ) { }

    ngOnInit() {
        this.getHeroes();
    }

    getHeroes(): void {
        this.heroService.getHeroes()
            .subscribe(listHeroes => this.heroes = listHeroes);
    }

    add(name: string): void {
        name = name.trim();
        if (!name) {
            return;
        } else {
            this.heroService.add({name} as Hero)
                .subscribe(
                    hero => this.heroes.push(hero)
                );
        }
    }

    deleteHero(hero: Hero): void {
        this.heroes = this.heroes.filter(h => h !== hero);
        this.heroService.delete(hero).subscribe();
    }
}
