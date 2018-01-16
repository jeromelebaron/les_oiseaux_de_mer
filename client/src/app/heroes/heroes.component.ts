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
    /** Le héros sélectionné. */
    selectedHero: Hero;

    getHeroes(): void {
        this.heroService.getHeroes()
            .subscribe(listHeroes => this.heroes = listHeroes);
    }

    onSelect(selection: Hero) {
        this.selectedHero = selection;
    }

    constructor(
        private heroService: HeroService
    ) { }

    ngOnInit() {
        this.getHeroes();
    }

}
