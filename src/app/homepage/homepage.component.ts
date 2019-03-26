import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  imageSources =[
    "../assets/vinylstore.jpg", "../assets/vinyl2.jpeg", "../assets/record.jpeg"
  ]
  constructor( ) { }

  ngOnInit() {
  }

}

