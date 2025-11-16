import axios from 'axios';

import { IMAGE_UPLOAD_ENDPOINT } from '@/constants/endpoints';
import { IMAGE_UPLOAD_API_KEY } from '@/constants/environments';

import type { ImageResponse } from '@/interfaces/image.interface';

export const uploadImage = async (image: File) => {
  const formData = new FormData();
  formData.append('image', image);

  const imageUploadUrl = `${IMAGE_UPLOAD_ENDPOINT}?key=${IMAGE_UPLOAD_API_KEY}`;

  const { data } = await axios.post<ImageResponse>(imageUploadUrl, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  const imageUrl = data.data.url;

  return imageUrl;
};
