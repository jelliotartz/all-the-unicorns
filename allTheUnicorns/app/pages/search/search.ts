import {Page, NavController, NavParams} from 'ionic-angular';
import {URLSearchParams, Http, Response} from 'angular2/http';


export class Search {

	numberOfScrollRequests: number = 1;
	searchParameter: string;



	searchForGif(offset: number) {
			this.numberOfScrollRequests += 1;
			let search = new URLSearchParams();
			search.set('q', `${this.searchParameter}`);
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

	getSearchResults(searchbar) {
			this.searchParameter = searchbar.value;
			this.searchForGif(this.numberOfScrollRequests);
			console.log(this.searchParameter);

}