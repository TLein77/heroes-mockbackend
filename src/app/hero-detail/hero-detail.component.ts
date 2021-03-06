import {Component, Input, OnInit} from "@angular/core";
import {Hero} from "../hero/hero.model";
import {HeroService} from "../hero/hero.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Location} from "@angular/common";

@Component({
    selector: 'my-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['hero-detail.component.css'],
    providers: [HeroService]
})
export class HeroDetailComponent implements OnInit {
    //@Input() hero: Hero;
    hero: Hero;

    constructor(
        private heroService: HeroService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.heroService.getHero(+params['id']))
            .subscribe(hero => {
                console.log('hero::' + JSON.stringify(hero));
                this.hero = hero
            });
    }

    goBack(): void {
        this.location.back();
    }

    save(): void {
        this.heroService.update(this.hero)
            .then(() => this.goBack());
    }
}