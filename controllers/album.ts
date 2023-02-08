import {
  Request,
  Response,
} from 'express';

import axios from 'axios';
import requestIp from 'request-ip';

import Petition from '../models/petition';

import {
  AlbumDetailsResponse,
  AlbumResponse,
  ArtistResponse,
} from '../interfaces';

export const getAlbums = async (req: Request, res: Response) => {
  try {
    const token = req.header('x-access-token');
    const { artist } = req.query;

    const artists = await axios.get<ArtistResponse>(`https://api.spotify.com/v1/search?type=artist&q=${artist}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });

    const petitionData = {
      artist_name: artists.data.artists.items[0].name,
      date: new Date(),
      user_ip: requestIp.getClientIp(req)
    };

    await Petition.create(petitionData);

    if (artists && artists.data) {
      const albumsResponse = await axios.get<AlbumResponse>(`https://api.spotify.com/v1/artists/${artists.data.artists.items[0].id}/albums`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      const albums = await Promise.all(
        albumsResponse.data.items.map(async (album) => {
          const albumDetailsResponse = await axios.get<AlbumDetailsResponse>(`https://api.spotify.com/v1/albums/${album.id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            },
          });

          if (albumDetailsResponse && albumDetailsResponse.data) {
            const formatResponse = {
              artists: albumDetailsResponse.data.artists,
              external_urls: albumDetailsResponse.data.external_urls.spotify,
              id: albumDetailsResponse.data.id,
              images: albumDetailsResponse.data.images,
              name: albumDetailsResponse.data.name,
              popularity: albumDetailsResponse.data.popularity,
              release_date: albumDetailsResponse.data.release_date,
            };

            return formatResponse;
          }

          return null;
        })
      );

      const firstArtist = {
        href: artists.data.artists.items[0].external_urls.spotify,
        id: artists.data.artists.items[0].id,
        images: artists.data.artists.items[0].images,
        name: artists.data.artists.items[0].name,
      };

      const albumsSortedDescending = albums.sort((a, b) => {
        if (a === null) return 1;
        if (b === null) return -1;
        if (a === null && b === null) return 0;
        return b.popularity > a.popularity ? 1 : -1
      });

      const response = {
        albums: albumsSortedDescending,
        artist: firstArtist,
      }

      return res.json(response);
    }
  } catch (error) {
    return res.status(500).json({
      msg: 'Please contact the administrator',
    });
  }
};