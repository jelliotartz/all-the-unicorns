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
	}

	searchGiphy(searchbar) {
		this._gifSearch.getSearchResults(searchbar.value);
	}

	searchForTrendingGifs(event, gif) {
		this._gifSearch.getTrendingGifs();
	}

	RandomGif(event, gif) {
		this._gifSearch.getRandomGif();
	}

	gifTapped(event, gif) {
		this.nav.push(GifDetailsPage, {
			gif: gif
		});
	}
}

