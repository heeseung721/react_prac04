import axios from "axios";

export default class FakeYoutube {
  constructor() {}

  async search(keyword) {
    // 함수 앞에 #을 붙이면 자바스크립트의 프라이빗 함수(클래스 내부에서만 호출 가능)
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
  }

  async #searchByKeyword() {
    return axios
      .get(`/videos/search.json`)
      .then((res) => res.data.items)
      .then((items) => items.map((item) => ({ ...item, id: item.id.videoId })));
  }

  async #mostPopular() {
    return axios.get(`/videos/popular.json`).then((res) => res.data.items);
  }
}
