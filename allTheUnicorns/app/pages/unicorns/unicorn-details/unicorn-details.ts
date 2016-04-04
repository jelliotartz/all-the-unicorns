import {Page, NavController, NavParams} from 'ionic-angular';


@Page({
  templateUrl: 'build/pages/unicorns/unicorn-details/unicorn-details.html'
})

export class UnicornDetailsPage {
	selectedUnicorn: any;

	constructor(private nav: NavController, navParams: NavParams) {
    this.selectedUnicorn = navParams.get('unicorn');
  }
}