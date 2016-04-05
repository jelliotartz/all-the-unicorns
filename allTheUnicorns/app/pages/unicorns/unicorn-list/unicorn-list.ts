import {Page, NavController, NavParams} from 'ionic-angular';
import {URLSearchParams, Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {UnicornDetailsPage} from '../unicorn-details/unicorn-details';
import {InfiniteScroll} from 'angular2-infinite-scroll';


@Page({
	selector: 'UnicornListPage',
	directives: [InfiniteScroll],
  templateUrl: 'build/pages/unicorns/unicorn-list/unicorn-list.html'
})

export class UnicornListPage {
	selectedUnicorn: any;
	unicorns: Array<{ id: string, url: string }> = [];
	numberOfScrollRequests: number = 1;

	constructor(private nav: NavController, navParams: NavParams, private http: Http) {
		this.getUnicorns(this.numberOfScrollRequests);
	}

	doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
			this.getUnicorns(this.numberOfScrollRequests);
      console.log('Async operation has ended');
      // infiniteScroll.complete();
    }, 500);
  }

	getUnicorns(offset: number) {
		this.numberOfScrollRequests += 1;
		let search = new URLSearchParams();
		search.set('q', 'unicorn');
		search.set('api_key', 'dc6zaTOxFJmzC');
		search.set('offset', `${offset * 100}`);
		search.set('limit', '100');

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

	onScroll() {
		console.log('scroll event')
	}
}