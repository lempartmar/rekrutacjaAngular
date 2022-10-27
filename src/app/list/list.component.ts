import { Component, OnInit } from '@angular/core';
import { KeyValuePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [KeyValuePipe],
})
export class ListComponent {
  listOfDogs: any = [];
  mySelect = [];
  selectedValue: any;
  multiple = false;
  pics: any;
  itemImageUrl: any = [];
  wikiUrl: any;

  constructor(
    private keyValue: KeyValuePipe,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.dogDataFetcher();
  }

  dogDataFetcher() {
    const promise = this.fetchListOfDogs();
    const promise2 = this.fetchImage();
    promise.then((dataP1) => {
      promise2.then((dataP2) => {
        this.listOfDogs = dataP1;
        this.itemImageUrl = this.sanitizer.bypassSecurityTrustUrl(dataP2);
      });
    });
  }

  wikiLinkAdd() {
    this.wikiUrl = `https://en.wikipedia.org/wiki/${this.mySelect[0]}`;
  }

  async fetchImage() {
    try {
      let imgURL = `https://dog.ceo/api/breed/${this.mySelect[0]}/images/random`;
      const response = await fetch(imgURL);
      const data = await response.json();
      return data.message;
    } catch (error) {
      return 0;
    }
  }

  async fetchListOfDogs() {
    try {
      const response = await fetch('https://dog.ceo/api/breeds/list/all');
      const data = await response.json();
      const data2 = Object.keys(data.message);
      return data2;
    } catch (error) {
      console.error(`Could not get products: ${error}`);
      return 0;
    }
  }
}
