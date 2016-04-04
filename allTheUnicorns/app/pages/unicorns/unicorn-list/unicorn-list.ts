import {Page, NavController, NavParams} from 'ionic-angular';
import {URLSearchParams, Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {UnicornDetailsPage} from '../unicorn-details/unicorn-details';

@Page({
  templateUrl: 'build/pages/unicorns/unicorn-list/unicorn-list.html'
})

export class UnicornListPage {
	selectedUnicorn: any;
	unicorns: Array<{ id: string, url: string }>;

	constructor(private nav: NavController, navParams: NavParams, private http: Http) {
		this.getUnicorns();
	}

	getUnicorns() {
		let search = new URLSearchParams();
		search.set('q', 'unicorn');
		search.set('api_key', 'dc6zaTOxFJmzC');

		this.http.get('http://api.giphy.com/v1/gifs/search?', { search })
			.map((res: Response) => res.json())
			.subscribe(
			data => { this.unicorns = data },
			err => console.error(err),
			() => console.log('done')
			);
	}

	unicornTapped(event, unicorn) {
		this.nav.push(UnicornDetailsPage, {
			unicorn: unicorn
		});
	}
}