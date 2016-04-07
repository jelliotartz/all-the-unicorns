import {Page, NavController, NavParams} from 'ionic-angular';
import {URLSearchParams, Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {GifDetailsPage} from '../gif-details/gif-details';
import {GifSearch} from '../../search/gif-search.service';
import {giphyItem} from '../giphy-item.interface';


@Page({
	selector: 'GifListPage',
  templateUrl: 'build/pages/gifs/gif-list/gif-list.html',
  providers: [GifSearch]
})

export class GifListPage {
	selectedGif: any;
	// gifs: giphyItem[] = [];
	// gifs: Object[];
	numberOfScrollRequests: number = 1;
	searchParameter: string;

	constructor(private nav: NavController, navParams: NavParams, private http: Http, private _gifSearch: GifSearch) {
			this.getUnicorns();
		}

	doInfinite(infiniteScroll) {
    setTimeout(() => {
			this.getUnicorns();
    }, 500);
  }

	getUnicorns() {

		this._gifSearch.getSearchResults('unicorns');

		// let search = new URLSearchParams();
		// let offsetForThisCall = `${numScrollRequests * 100}`;
		
		// this.numberOfScrollRequests += 1;

		// search.set('q', 'unicorn');
		// search.set('api_key', 'dc6zaTOxFJmzC');
		// search.set('offset', offsetForThisCall);
		// search.set('limit', '100');

		// this.http.get('http://api.giphy.com/v1/gifs/search?', { search })
		// 	.map((res: Response) => res.json())
		// 	.subscribe(
		// 		data => { this.gifs = data },
		// 		err => console.error(err),
		// 		() => console.log('done')
		// 	);

	}

	gifTapped(event, gif) {
		this.nav.push(GifDetailsPage, {
			gif: gif
		});
	}

	// onScroll() {
	// 	console.log('scroll event')
	// }
}

