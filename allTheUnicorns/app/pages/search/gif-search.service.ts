import {Page, NavController, NavParams} from 'ionic-angular';
import {URLSearchParams, Http, Response} from 'angular2/http';
import {Injectable} from 'angular2/core';

@Injectable()
export class GifSearch {
	// gifs: giphyItem[] = [];
	// gifs: Array<Object>;
	gifs: Object[];

	numberOfScrollRequests: number = 1;
	searchParameter: string;

	constructor(private http: Http) {}

	searchForGif() {
		this.numberOfScrollRequests += 1;
		let search = new URLSearchParams();
		search.set('q', `${this.searchParameter}`);
		search.set('api_key', 'dc6zaTOxFJmzC');
		search.set('offset', `${this.numberOfScrollRequests * 100}`);
		search.set('limit', '100');

		this.http.get('http://api.giphy.com/v1/gifs/search?', { search })
			.map((res: Response) => res.json())
			.subscribe(
				data => { this.gifs = data },
				err => console.error(err),
				() => console.log('done')
			);
	}

	getSearchResults(searchTerms: string) {
		this.searchParameter = searchTerms;
		this.searchForGif();
		return this.gifs;
	}
}