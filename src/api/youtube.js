export default class Youtube {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async search(keyword) {
    // 함수 앞에 #을 붙이면 자바스크립트의 프라이빗 함수(클래스 내부에서만 호출 가능)
    // 키워드가 있다면 키워드로 검색, 없다면 유명한 목록을 보여줌
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
  }

  async channelImageURL(id) {
    return this.apiClient
      .channels({ params: { part: "snippet", id } })
      .then((res) => res.data.items[0].snippet.thumbnails.default.url);
  }

  async relatedVideos(id) {
    return this.apiClient
      .search({
        params: {
          part: "snippet",
          maxResults: 25,
          type: "video",
          relatedToVideoId: id,
        },
      })
      .then((res) =>
        res.data.items.map((item) => ({ ...item, id: item.id.videoId }))
      );
  }

  async #searchByKeyword(keyword) {
    return this.apiClient
      .search({
        params: {
          part: "snippet",
          maxResults: 25,
          type: "video",
          q: keyword,
        },
      })
      .then((res) =>
        res.data.items.map((item) => ({ ...item, id: item.id.videoId }))
      );
  }

  async #mostPopular() {
    return this.apiClient
      .videos({
        params: {
          part: "snippet",
          maxResults: 25,
          chart: "mostPopular",
        },
      })
      .then((res) => res.data.items);
  }
}
