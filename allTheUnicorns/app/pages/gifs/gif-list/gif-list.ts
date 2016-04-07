import {Page, NavController, NavParams} from 'ionic-angular';
import {URLSearchParams, Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {GifDetailsPage} from '../gif-details/gif-details';


@Page({
	selector: 'GifListPage',
  templateUrl: 'build/pages/gifs/gif-list/gif-list.html'
})

export class GifListPage {
	selectedGif: any;
	gifs: giphyItem[] = [];
	numberOfScrollRequests: number = 1;
	searchParameter: string;

	constructor(private nav: NavController, navParams: NavParams, private http: Http) {
		this.getUnicorns(this.numberOfScrollRequests);
	}

	doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
			this.getUnicorns(this.numberOfScrollRequests);
      console.log('Async operation has ended');
    }, 500);
  }

	getUnicorns(numScrollRequests: number) {
		let search = new URLSearchParams();
		let offsetForThisCall = `${numScrollRequests * 100}`;
		
		this.numberOfScrollRequests += 1;

		search.set('q', 'unicorn');
		search.set('api_key', 'dc6zaTOxFJmzC');
		search.set('offset', offsetForThisCall);
		search.set('limit', '100');

		this.http.get('http://api.giphy.com/v1/gifs/search?', { search })
			.map((res: Response) => res.json())
			.subscribe(
				data => { this.gifs = data },
				err => console.error(err),
				() => console.log('done')
			);
	}

	gifTapped(event, gif) {
		this.nav.push(GifDetailsPage, {
			gif: gif
		});
	}

	onScroll() {
		console.log('scroll event')
	}

}

interface giphyItem {
	id: string;
	thumbnailUrl: string;
	url: string;
}

