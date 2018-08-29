import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
    // public displayMenu = true;

    // constructor(
    //     private route: ActivatedRoute,
    // ) {

    // }

    // ngOnInit() {
    //     document.body.style.backgroundColor = '#f7f7f7';

    //     this.route.data.subscribe(data => {
    //         if (data) {
    //             if (data.displayMenu === false) {
    //                 this.displayMenu = false;
    //             }
    //         }
    //         // this.displayMenu = true;
    //     });

    // }

