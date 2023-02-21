import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import FakeYoutube, { search } from "../api/fakeYoutube";
import Youtube from "../api/youtube";
import VideoCard from "../components/VideoCard";

export default function Videos() {
  const { keyword } = useParams();
  const {
    isLoading,
    error,
    data: videos,
    // useQuery: 비동기 상태 관리를 해주는 라이브러리
  } = useQuery(["videos", keyword], () => {
    const youtube = new FakeYoutube();
    return youtube.search(keyword);
  });

  return (
    <>
      {/*  keyword가 있으면 그것을 보여주고, 없으면 핫트렌드 목록을 보여줌 */}
      <div>Videos {keyword ? `${keyword}` : "hotTrands"}</div>

      {/* isLoading 이라면, error 라면~ (if) */}
      {isLoading && <p>Loading...</p>}
      {error && <p>Error!</p>}
      {videos && (
        <ul>
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </ul>
      )}
    </>
  );
}
