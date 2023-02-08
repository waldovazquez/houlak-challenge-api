export interface ArtistResponse {
    artists: Artists;
}

interface Artists {
    href: string;
    items: Item[];
    limit: number;
    next: string;
    offset: number;
    previous: null;
    total: number;
}

interface Item {
    external_urls: ExternalUrls;
    followers: Followers;
    genres: string[];
    href: string;
    id: string;
    images: Image[];
    name: string;
    popularity: number;
    type: Type;
    uri: string;
}

interface ExternalUrls {
    spotify: string;
}

interface Followers {
    href: null;
    total: number;
}

interface Image {
    height: number;
    url: string;
    width: number;
}

enum Type {
    Artist = "artist",
}
