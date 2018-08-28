import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './main-layout.component.html',
    styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {

    public displayMenu = true;

    constructor(
        private route: ActivatedRoute,
    ) {
        
    }

    ngOnInit() {
        document.body.style.backgroundColor = '#f7f7f7';

        this.route.data.subscribe(data => {
            if (data) {
                if (data.displayMenu === false) {
                    this.displayMenu = false;
                }
            }
            // this.displayMenu = true;
        });

    }

}
