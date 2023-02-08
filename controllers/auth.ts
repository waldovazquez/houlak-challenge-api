import {
  Request,
  Response,
} from 'express';

import querystring from 'querystring';
import axios from 'axios';

import { generateRandomString } from '../utils/functions';

export const login = (req: Request, res: Response) => {
  const state = generateRandomString(8);

  res.cookie('spotify_auth_state', state);

  const scope = 'user-read-private user-read-email';

  const url = `https://accounts.spotify.com/authorize?${querystring.stringify({
    response_type: 'token',
    client_id: process.env.CLIENT_ID,
    scope,
    redirect_uri: process.env.REDIRECT_URI,
    state
  })}`;

  const response = {
    url
  }

  res.json(response);
};

export const getUserByToken = async (req: Request, res: Response) => {
  const {
    token,
  } = req.query;

  try {
    const { data } = await axios.get('https://api.spotify.com/v1/me', {
      headers: { 'Authorization': 'Bearer ' + token },
    });

    const response = {
      display_name: data.display_name,
      external_urls: data.external_urls,
      images: data.images
    }

    res.json(response);

  } catch (error) {
    return res.status(500).json({
      msg: 'Please contact the administrator',
    });
  }
};