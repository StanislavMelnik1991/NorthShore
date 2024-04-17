import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import { BaseResponse, IImage } from '@entities/types';

export const useUploadImage = () => {
  const handleUploadImage = useCallback(async (file: File) => {
    console.log(file);
    // const blob = new Blob([file], { type: "base64" });
    const formData = new FormData();
    formData.append('file', file);
    try {
      const {
        data: { data },
      } = await axiosApi.post<BaseResponse<IImage>>('upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data.url;
    } catch (error) {
      console.error(error);
      toast.error('Не удалось загрузить файл');
    }
    return '';
  }, []);
  return {
    handleUploadImage,
  };
};
