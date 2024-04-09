import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosApi } from "@entities/api";
import { BaseResponse, INews } from "@entities/types";

export const useCurrentNews = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [news, setNews] = useState<INews>();

  useEffect(() => {
    setIsLoading(true);
    axiosApi
      .get<BaseResponse<INews>>(`news/${id}`)
      .then(({ data: { data } }) => {
        setNews(data);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Не удалось найти новость");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);
  return { news, isLoading };
};
