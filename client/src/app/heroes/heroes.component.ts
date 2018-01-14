import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';

@Component({
    selector: 'app-heroes',
    templateUrl: './heroes.component.html',
    styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
    
    /** La liste complète des héros. */
    heroes = HEROES;
    /** Le héros sélectionné. */
    selectedHero: Hero;

    onSelect(selection: Hero) {
        this.selectedHero = selection;
    }

    constructor() { }
    
    ngOnInit() {
    }

}
