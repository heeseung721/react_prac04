import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import VideoCard from "../components/VideoCard";
import Youtube, { search } from "../api/youtube";
import FakeYoutube from "../api/fakeYoutubeClient";
import { useYoutubeApi } from "../context/YoutubeApiContext";

export default function Videos() {
  const { keyword } = useParams();
  const { youtube } = useYoutubeApi();

  const {
    isLoading,
    error,
    data: videos,
  } = useQuery(["videos", keyword], () => youtube.search(keyword));

  return (
    <>
      <div>Videos {keyword ? `🔍${keyword}` : "🔥"}</div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Something is wrong 😖</p>}
      {videos && (
        <ul>
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </ul>
      )}
    </>
  );

  // return (
  //   <>
  //     {/*  keyword가 있으면 그것을 보여주고, 없으면 핫트렌드 목록을 보여줌 */}
  //     <div>Videos {keyword ? `${keyword}` : "hotTrands"}</div>

  //     {/* isLoading 이라면, error 라면~ (if) */}
  //     {isLoading && <p>Loading...</p>}
  //     {error && <p>Error!</p>}
  //     {videos && (
  //       <ul>
  //         {videos.map((video) => (
  //           <VideoCard key={video.id} video={video} />
  //         ))}
  //       </ul>
  //     )}
  //   </>
  // );
}
