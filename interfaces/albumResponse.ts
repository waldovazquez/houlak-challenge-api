export interface AlbumResponse {
    href: string;
    items: Item[];
    limit: number;
    next: string;
    offset: number;
    previous: null;
    total: number;
}

interface Item {
    album_group: Album;
    album_type: Album;
    artists: Artist[];
    available_markets: string[];
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: Date;
    release_date_precision: ReleaseDatePrecision;
    total_tracks: number;
    type: ItemType;
    uri: string;
}

enum Album {
    Single = "single",
}

interface Artist {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    name: string;
    type: ArtistType;
    uri: string;
}

interface ExternalUrls {
    spotify: string;
}

enum ArtistType {
    Artist = "artist",
}

interface Image {
    height: number;
    url: string;
    width: number;
}

enum ReleaseDatePrecision {
    Day = "day",
}

enum ItemType {
    Album = "album",
}
