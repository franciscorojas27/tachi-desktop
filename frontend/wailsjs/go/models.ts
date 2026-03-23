export namespace models {
	
	export class Category {
	    id: string;
	    name: string;
	
	    static createFrom(source: any = {}) {
	        return new Category(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	    }
	}
	export class Chapter {
	    chapter: number;
	    link: string;
	    create: number;
	    img?: string[];
	
	    static createFrom(source: any = {}) {
	        return new Chapter(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.chapter = source["chapter"];
	        this.link = source["link"];
	        this.create = source["create"];
	        this.img = source["img"];
	    }
	}
	export class ChapterDetail {
	    id: string;
	    title: string;
	    link: string;
	    chapter: number;
	    image: string;
	    demography: string;
	    type: string;
	    isLgbt: string;
	
	    static createFrom(source: any = {}) {
	        return new ChapterDetail(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.title = source["title"];
	        this.link = source["link"];
	        this.chapter = source["chapter"];
	        this.image = source["image"];
	        this.demography = source["demography"];
	        this.type = source["type"];
	        this.isLgbt = source["isLgbt"];
	    }
	}
	export class ChaptersContainer {
	    recentNsfw: ChapterDetail[];
	    recentEsp: ChapterDetail[];
	
	    static createFrom(source: any = {}) {
	        return new ChaptersContainer(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.recentNsfw = this.convertValues(source["recentNsfw"], ChapterDetail);
	        this.recentEsp = this.convertValues(source["recentEsp"], ChapterDetail);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class TopItem {
	    id: string;
	    name: string;
	    image: string;
	    status: string;
	    caps: number;
	
	    static createFrom(source: any = {}) {
	        return new TopItem(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.image = source["image"];
	        this.status = source["status"];
	        this.caps = source["caps"];
	    }
	}
	export class TopSection {
	    topWeekend: TopItem[];
	    topTotal: TopItem[];
	
	    static createFrom(source: any = {}) {
	        return new TopSection(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.topWeekend = this.convertValues(source["topWeekend"], TopItem);
	        this.topTotal = this.convertValues(source["topTotal"], TopItem);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class ManhwaCreated {
	    id: string;
	    title: string;
	    image: string;
	    type: string;
	    demography: string;
	    isErotic: string;
	    platform: string;
	    categories: number[];
	
	    static createFrom(source: any = {}) {
	        return new ManhwaCreated(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.title = source["title"];
	        this.image = source["image"];
	        this.type = source["type"];
	        this.demography = source["demography"];
	        this.isErotic = source["isErotic"];
	        this.platform = source["platform"];
	        this.categories = source["categories"];
	    }
	}
	export class Home {
	    lastCreated: ManhwaCreated[];
	    lastCreatedNsfw: ManhwaCreated[];
	    top: TopSection;
	    chapters: ChaptersContainer;
	
	    static createFrom(source: any = {}) {
	        return new Home(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.lastCreated = this.convertValues(source["lastCreated"], ManhwaCreated);
	        this.lastCreatedNsfw = this.convertValues(source["lastCreatedNsfw"], ManhwaCreated);
	        this.top = this.convertValues(source["top"], TopSection);
	        this.chapters = this.convertValues(source["chapters"], ChaptersContainer);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	
	export class ManhwaDetails {
	    id: string;
	    name: string;
	    platform: string;
	    image: string;
	    status: string;
	    categories: Category[];
	    synopsis: string;
	    chapter_count: number;
	    the_real_name: string;
	    link_spanish: string;
	    name_spanish: string;
	    is_erotic: boolean;
	    type: string;
	    demography: string;
	    real_id: string;
	    popularity: number;
	    chapters: Chapter[];
	    authors: string[];
	    is_hiatus: boolean;
	    hiatus_images: any[];
	
	    static createFrom(source: any = {}) {
	        return new ManhwaDetails(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.platform = source["platform"];
	        this.image = source["image"];
	        this.status = source["status"];
	        this.categories = this.convertValues(source["categories"], Category);
	        this.synopsis = source["synopsis"];
	        this.chapter_count = source["chapter_count"];
	        this.the_real_name = source["the_real_name"];
	        this.link_spanish = source["link_spanish"];
	        this.name_spanish = source["name_spanish"];
	        this.is_erotic = source["is_erotic"];
	        this.type = source["type"];
	        this.demography = source["demography"];
	        this.real_id = source["real_id"];
	        this.popularity = source["popularity"];
	        this.chapters = this.convertValues(source["chapters"], Chapter);
	        this.authors = source["authors"];
	        this.is_hiatus = source["is_hiatus"];
	        this.hiatus_images = source["hiatus_images"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class NavigationChapter {
	    id: string;
	    chapter: string;
	
	    static createFrom(source: any = {}) {
	        return new NavigationChapter(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.chapter = source["chapter"];
	    }
	}
	export class Navigation {
	    PreviousChapter: NavigationChapter;
	    NextChapter: NavigationChapter;
	
	    static createFrom(source: any = {}) {
	        return new Navigation(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.PreviousChapter = this.convertValues(source["PreviousChapter"], NavigationChapter);
	        this.NextChapter = this.convertValues(source["NextChapter"], NavigationChapter);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class ManhwaView {
	    id: string;
	    name: string;
	    chapter: number;
	    images: string[];
	    navigation: Navigation;
	
	    static createFrom(source: any = {}) {
	        return new ManhwaView(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.chapter = source["chapter"];
	        this.images = source["images"];
	        this.navigation = this.convertValues(source["navigation"], Navigation);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	
	
	export class SearchResult {
	    id: string;
	    slug: string;
	    source: string;
	    cover_image: string;
	    status: string;
	    genres: number[];
	    chapters: number;
	    format: string;
	    is_adult: boolean;
	    target_audience: string;
	    title: string;
	
	    static createFrom(source: any = {}) {
	        return new SearchResult(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.slug = source["slug"];
	        this.source = source["source"];
	        this.cover_image = source["cover_image"];
	        this.status = source["status"];
	        this.genres = source["genres"];
	        this.chapters = source["chapters"];
	        this.format = source["format"];
	        this.is_adult = source["is_adult"];
	        this.target_audience = source["target_audience"];
	        this.title = source["title"];
	    }
	}
	export class SearchData {
	    results: SearchResult[];
	    next: boolean;
	
	    static createFrom(source: any = {}) {
	        return new SearchData(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.results = this.convertValues(source["results"], SearchResult);
	        this.next = source["next"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	
	

}

