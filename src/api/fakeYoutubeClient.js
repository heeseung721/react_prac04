import axios from "axios";

export default class FakeYoutubeClient {
  async search({ params }) {
    // 아이디가 있으면 관련된 데이터, 없으면 검색값
    return axios.get(
      `/videos/${params.relatedToVideoId ? "related" : "search"}.json`
    );

    // return params.relatedToVideoId
    //   ? axios.get("/videos/related.json")
    //   : axios.get("videos/search.json");
  }
  async videos() {
    return axios.get("/videos/popular.json");
  }
  async channels() {
    return axios.get("/videos/channel.json");
  }
}
